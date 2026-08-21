// /admin/logout - same as old adminController.adminLogout
import { NextResponse } from "next/server";

export async function GET(req) {
  // relative Location keeps the redirect on the real domain behind proxies
  const res = new NextResponse(null, { status: 303, headers: { Location: "/admin" } });
  res.cookies.set("adminAuth", "", { maxAge: 0, path: "/" });
  return res;
}
