import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { siteSettingsSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const settings = await prisma.siteSetting.findUnique({ where: { id: "global" } });
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authResult = await requireAuth(req, ["ADMIN"]);
    if ("error" in authResult) return authResult.error;

    const body = await req.json();
    const result = siteSettingsSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0]?.message },
        { status: 400 }
      );
    }

    const updated = await prisma.siteSetting.upsert({
      where: { id: "global" },
      update: result.data,
      create: { id: "global", ...result.data },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
  }
}
