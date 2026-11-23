import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const authResult = await requireAuth(req, ["ADMIN"]);
    if ("error" in authResult) return authResult.error;

    const [
      totalBookings,
      pendingBookings,
      completedBookings,
      totalQuotes,
      totalCustomers,
      recentBookings,
      recentQuotes,
      invoices,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "PENDING" } }),
      prisma.booking.count({ where: { status: "COMPLETED" } }),
      prisma.solarQuoteRequest.count(),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { customer: { select: { name: true, phone: true } } },
      }),
      prisma.solarQuoteRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.invoice.findMany({
        where: { paymentStatus: "PAID" },
        select: { totalAmount: true },
      }),
    ]);

    const totalRevenue = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);

    return NextResponse.json({
      success: true,
      stats: {
        totalBookings,
        pendingBookings,
        completedBookings,
        totalQuotes,
        totalCustomers,
        totalRevenuePKR: totalRevenue,
      },
      recentBookings,
      recentQuotes,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ success: false, error: "Failed to load dashboard metrics" }, { status: 500 });
  }
}
