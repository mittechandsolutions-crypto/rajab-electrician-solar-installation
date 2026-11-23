import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(req);
    if ("error" in authResult) return authResult.error;

    const { id } = await params;
    const { user } = authResult;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        customer: { select: { id: true, name: true, phone: true, email: true } },
        technician: { select: { id: true, name: true, phone: true } },
        service: true,
        timeline: { orderBy: { createdAt: "asc" } },
        invoices: true,
        review: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    if (user.role === "CUSTOMER" && booking.customerId !== user.id) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Fetch booking detail error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch booking details" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(req);
    if ("error" in authResult) return authResult.error;

    const { id } = await params;
    const { user } = authResult;
    const body = await req.json();

    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    // Customer cancellation
    if (user.role === "CUSTOMER") {
      if (booking.customerId !== user.id) {
        return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
      }

      if (body.action === "CANCEL") {
        if (booking.status === "COMPLETED" || booking.status === "IN_PROGRESS") {
          return NextResponse.json(
            { success: false, error: "Cannot cancel a job that is already in progress or completed" },
            { status: 400 }
          );
        }

        const updated = await prisma.booking.update({
          where: { id },
          data: {
            status: "CANCELLED",
            timeline: {
              create: {
                status: "CANCELLED",
                title: "Booking Cancelled",
                note: body.reason || "Cancelled by customer",
                performedBy: user.name,
              },
            },
          },
        });
        return NextResponse.json({ success: true, booking: updated });
      }
    }

    // Admin / Technician status updates
    if (user.role === "ADMIN" || user.role === "TECHNICIAN") {
      const updateData: Record<string, unknown> = {};

      if (body.status) {
        updateData.status = body.status;
      }
      if (body.technicianId !== undefined) {
        updateData.technicianId = body.technicianId;
      }
      if (body.adminNotes !== undefined) {
        updateData.adminNotes = body.adminNotes;
      }
      if (body.technicianNotes !== undefined) {
        updateData.technicianNotes = body.technicianNotes;
      }
      if (body.finalAmount !== undefined) {
        updateData.finalAmount = Number(body.finalAmount);
      }

      const updated = await prisma.booking.update({
        where: { id },
        data: {
          ...updateData,
          timeline: body.status
            ? {
                create: {
                  status: body.status,
                  title: `Status: ${body.status}`,
                  note: body.note || `Status updated by ${user.name}`,
                  performedBy: user.name,
                },
              }
            : undefined,
        },
      });

      // If marked completed and has final amount, auto-generate invoice if none exists
      if (body.status === "COMPLETED") {
        const existingInv = await prisma.invoice.findFirst({ where: { bookingId: id } });
        if (!existingInv) {
          const invCount = await prisma.invoice.count();
          await prisma.invoice.create({
            data: {
              invoiceNumber: `INV-2026-${String(invCount + 101).padStart(4, "0")}`,
              bookingId: id,
              customerId: booking.customerId,
              subtotal: updated.finalAmount || updated.estimatedCost || 2000,
              totalAmount: updated.finalAmount || updated.estimatedCost || 2000,
              paymentStatus: "UNPAID",
              paymentMethod: "CASH_ON_SERVICE",
            },
          });
        }
      }

      return NextResponse.json({ success: true, booking: updated });
    }

    return NextResponse.json({ success: false, error: "Unauthorized operation" }, { status: 403 });
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json({ success: false, error: "Failed to update booking" }, { status: 500 });
  }
}
