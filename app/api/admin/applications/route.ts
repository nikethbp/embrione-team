
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import {
  SESSION_COOKIE,
  verifyAdminSession,
} from "@/lib/admin-auth";

export async function GET() {
  try {
    // Verify that the requester has a valid admin session.
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;

    if (!token || !(await verifyAdminSession(token))) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // These values are read on the server, never in browser code.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Server database configuration is missing." },
        { status: 500 }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { data: applications, error } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });


    
if (error) {
  console.error("Admin applications query failed:", {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
  });

  return NextResponse.json(
    {
      error: "Unable to load applications.",
      details: error.message,
      code: error.code,
    },
    { status: 500 }
  );
}

    const records = applications ?? [];

    return NextResponse.json({
      applications: records,
      stats: {
        total: records.length,
        pending: records.filter(
          (member) => member.status === "pending"
        ).length,
        approved: records.filter(
          (member) => member.status === "approved"
        ).length,
      },
    });
  } catch (error) {
    console.error("Admin applications API failed:", error);
    return NextResponse.json(
      { error: "Unable to process the request." },
      { status: 500 }
    );
  }
}



export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;

    if (!token || !(await verifyAdminSession(token))) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    if (
      (typeof id !== "string" && typeof id !== "number") ||
      !["approved", "rejected"].includes(status)
    ) {
      return NextResponse.json(
        { error: "Invalid application ID or status." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Server database configuration is missing." },
        { status: 500 }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );


const { data, error } = await supabase
  .from("members")
  .update({ status })
  .eq("id", id)
  .select("id, status")
  .maybeSingle();


    if (error) {
      console.error("Admin status update failed:", error.message);
      return NextResponse.json(
        { error: "Unable to update application status." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Application not found or no longer pending." },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      application: data,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process status update." },
      { status: 400 }
    );
  }
}

