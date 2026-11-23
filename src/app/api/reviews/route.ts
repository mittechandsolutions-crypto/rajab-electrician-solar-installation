import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { reviewSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    if (req.nextUrl.searchParams.get("all") === "true") {
      const authResult = await requireAuth(req, ["ADMIN"]);
      if ("error" in authResult) return authResult.error;

      const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
      return NextResponse.json({ success: true, reviews });
    }

    const reviews = await prisma.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("Fetch reviews error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAuth(req, ["CUSTOMER", "ADMIN"]);
    if ("error" in authResult) return authResult.error;

    const { user } = authResult;
    const body = await req.json();
    const result = reviewSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0]?.message || "Invalid review data" },
        { status: 400 }
      );
    }

    const data = result.data;
    const review = await prisma.review.create({
      data: {
        userId: user.id,
        bookingId: data.bookingId || null,
        authorName: data.authorName,
        rating: data.rating,
        comment: data.comment,
        isApproved: user.role === "ADMIN", // Admin posts are auto-approved; customers require moderation
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          user.role === "ADMIN"
            ? "Review published"
            : "Thank you! Your review has been submitted for moderation and will appear publicly once approved.",
        review,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submit review error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit review" }, { status: 500 });
  }
}
