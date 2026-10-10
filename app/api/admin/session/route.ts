
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  verifyAdminSession,
} from "@/lib/admin-auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token || !(await verifyAdminSession(token))) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }

  return NextResponse.json({ authenticated: true });
}



export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
