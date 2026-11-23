import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { serviceBookingSchema } from "@/lib/validations";
import { sendEmail, bookingConfirmationTemplate } from "@/lib/mailer";

export async function GET(req: NextRequest) {
  try {
    const authResult = await requireAuth(req);
    if ("error" in authResult) return authResult.error;

    const { user } = authResult;
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const whereClause: Record<string, unknown> = {};

    if (user.role === "CUSTOMER") {
      whereClause.customerId = user.id;
    } else if (user.role === "TECHNICIAN") {
      whereClause.technicianId = user.id;
    }

    if (status && status !== "ALL") {
      whereClause.status = status;
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        customer: { select: { id: true, name: true, phone: true, email: true } },
        technician: { select: { id: true, name: true, phone: true } },
        service: true,
        timeline: { orderBy: { createdAt: "asc" } },
        invoices: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAuth(req);
    if ("error" in authResult) return authResult.error;

    const { user } = authResult;
    const body = await req.json();
    const result = serviceBookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0]?.message || "Invalid booking data" },
        { status: 400 }
      );
    }

    const data = result.data;
    const bookingCount = await prisma.booking.count();
    const bookingNumber = `RE-2026-${String(1000 + bookingCount + 1).padStart(4, "0")}`;
    const fullAddress = `${data.street}, ${data.area}, Faisalabad`;

    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        customerId: user.id,
        serviceId: data.serviceId || null,
        serviceCategory: data.serviceCategory,
        status: "PENDING",
        scheduledDate: new Date(data.scheduledDate),
        scheduledTimeSlot: data.scheduledTimeSlot,
        isEmergency: data.isEmergency,
        addressText: fullAddress,
        description: data.description,
        photos: JSON.stringify(data.photos || []),
        estimatedCost: data.isEmergency ? 2500 : 1500,
        timeline: {
          create: [
            {
              status: "PENDING",
              title: "Booking Submitted",
              note: data.isEmergency ? "Emergency 24/7 priority ticket logged" : "Normal booking logged",
              performedBy: user.name,
            },
          ],
        },
      },
      include: {
        timeline: true,
        customer: true,
      },
    });

    // Send confirmation email asynchronously
    sendEmail({
      to: user.email,
      subject: `[Rajab Electricians] Booking #${bookingNumber} Confirmation`,
      html: bookingConfirmationTemplate({
        bookingNumber,
        customerName: user.name,
        serviceCategory: data.serviceCategory,
        scheduledDate: data.scheduledDate,
        scheduledTimeSlot: data.scheduledTimeSlot,
        address: fullAddress,
      }),
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ success: false, error: "Failed to create booking" }, { status: 500 });
  }
}
