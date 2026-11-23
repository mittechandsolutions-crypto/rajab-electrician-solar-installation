import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "rajab_electricians_fallback_secret_faisalabad_38000";
const COOKIE_NAME = "rajab_auth_token";

export interface TokenPayload {
  id: string;
  email: string;
  name: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function setAuthCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function requireAuth(
  req: NextRequest,
  allowedRoles?: ("CUSTOMER" | "TECHNICIAN" | "ADMIN")[]
): Promise<{ user: TokenPayload } | { error: NextResponse }> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return {
      error: NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 }),
    };
  }

  const payload = verifyToken(token);
  if (!payload) {
    return {
      error: NextResponse.json({ success: false, error: "Invalid or expired session" }, { status: 401 }),
    };
  }

  if (allowedRoles && !allowedRoles.includes(payload.role)) {
    return {
      error: NextResponse.json({ success: false, error: "Forbidden: insufficient permissions" }, { status: 403 }),
    };
  }

  return { user: payload };
}
