import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const authResult = await requireAuth(req, ["ADMIN"]);
    if ("error" in authResult) return authResult.error;

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "bookings";

    let csvContent = "";
    let filename = "";

    if (type === "bookings") {
      filename = "rajab_bookings.csv";
      const bookings = await prisma.booking.findMany({
        include: { customer: true, technician: true },
        orderBy: { createdAt: "desc" },
      });

      csvContent = "BookingNumber,CustomerName,Phone,Category,Status,Date,Address,AmountPKR\n";
      for (const b of bookings) {
        const row = [
          `"${b.bookingNumber}"`,
          `"${b.customer.name}"`,
          `"${b.customer.phone}"`,
          `"${b.serviceCategory}"`,
          `"${b.status}"`,
          `"${b.scheduledDate.toISOString().split("T")[0]}"`,
          `"${b.addressText.replace(/"/g, '""')}"`,
          b.finalAmount || b.estimatedCost || 0,
        ].join(",");
        csvContent += row + "\n";
      }
    } else if (type === "quotes") {
      filename = "rajab_solar_quotes.csv";
      const quotes = await prisma.solarQuoteRequest.findMany({
        orderBy: { createdAt: "desc" },
      });

      csvContent = "QuoteNumber,CustomerName,Phone,Area,MonthlyBillPKR,RecommendedKw,EstimatedCostPKR,SystemType,Status\n";
      for (const q of quotes) {
        const row = [
          `"${q.quoteNumber}"`,
          `"${q.name}"`,
          `"${q.phone}"`,
          `"${q.areaLocation}"`,
          q.monthlyBillPKR,
          q.recommendedKw,
          q.estimatedCost,
          `"${q.systemType}"`,
          `"${q.status}"`,
        ].join(",");
        csvContent += row + "\n";
      }
    } else {
      return NextResponse.json({ success: false, error: "Invalid export type" }, { status: 400 });
    }

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ success: false, error: "Failed to export data" }, { status: 500 });
  }
}
