// /api/admin/login - same as old adminController.adminLoginPost
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { username, password } = body;

  try {
    await connectDB();
    const admin = await Admin.findOne({ username }).lean();

    if (!admin || admin.password !== password) {
      return NextResponse.json(
        { success: false, error: "Username or Password is incorrect." },
        { status: 401 }
      );
    }

    const res = NextResponse.json({
      success: true,
      redirect: "/admin/dashboard"
    });

    res.cookies.set("adminAuth", admin._id.toString(), {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/"
    });

    return res;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
