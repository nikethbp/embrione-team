
import { NextResponse } from "next/server";
import {
  createAdminSession,
  SESSION_COOKIE,
  SESSION_DURATION,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email;
    const password = body.password;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Admin login is not configured." },
        { status: 500 }
      );
    }

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      email !== adminEmail ||
      password !== adminPassword
    ) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await createAdminSession();
    const response = NextResponse.json({ success: true });

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to process login request." },
      { status: 400 }
    );
  }
}
