import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { solarQuoteSchema } from "@/lib/validations";
import { calculateSolarRequirements } from "@/lib/solarCalculations";
import { requireAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = solarQuoteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0]?.message || "Invalid quote data" },
        { status: 400 }
      );
    }

    const data = result.data;

    // Fetch dynamic rates from site settings
    const setting = await prisma.siteSetting.findUnique({ where: { id: "global" } });
    const calculation = calculateSolarRequirements({
      monthlyBillPKR: data.monthlyBillPKR,
      ratePerWatt: setting?.solarRatePerWattPKR,
      avgUnitCost: setting?.averageUnitCostPKR,
      netMeteringCost: setting?.netMeteringCostPKR,
    });

    const quoteCount = await prisma.solarQuoteRequest.count();
    const quoteNumber = `SQ-2026-${String(100 + quoteCount + 1).padStart(4, "0")}`;

    const quote = await prisma.solarQuoteRequest.create({
      data: {
        quoteNumber,
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        areaLocation: data.areaLocation,
        monthlyBillPKR: data.monthlyBillPKR,
        roofAreaSqFt: data.roofAreaSqFt || null,
        roofType: data.roofType,
        systemType: data.systemType,
        recommendedKw: calculation.recommendedKw,
        estimatedCost: calculation.totalInvestmentPKR,
        status: "NEW",
      },
    });

    return NextResponse.json(
      {
        success: true,
        quote,
        calculation,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Solar quote error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate solar quote" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const authResult = await requireAuth(req, ["ADMIN"]);
    if ("error" in authResult) return authResult.error;

    const quotes = await prisma.solarQuoteRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, quotes });
  } catch (error) {
    console.error("Get quotes error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch quotes" }, { status: 500 });
  }
}
