import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, clearAuthCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, user: null }, { status: 200 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      const response = NextResponse.json({ success: false, user: null }, { status: 200 });
      clearAuthCookie(response);
      return response;
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  clearAuthCookie(response);
  return response;
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (name.length < 2) {
      return NextResponse.json({ success: false, error: "Name must be at least 2 characters" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: session.id },
      data: { name },
      select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 });
  }
}
