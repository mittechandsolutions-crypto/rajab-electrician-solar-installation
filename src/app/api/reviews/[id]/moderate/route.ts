import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(req, ["ADMIN"]);
    if ("error" in authResult) return authResult.error;

    const { id } = await params;
    const body = await req.json();

    const review = await prisma.review.update({
      where: { id },
      data: {
        isApproved: body.isApproved,
        reply: body.reply ?? undefined,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error("Moderate review error:", error);
    return NextResponse.json({ success: false, error: "Failed to moderate review" }, { status: 500 });
  }
}
