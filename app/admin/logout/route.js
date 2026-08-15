// /admin/logout - same as old adminController.adminLogout
import { NextResponse } from "next/server";

export async function GET(req) {
  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.cookies.set("adminAuth", "", { maxAge: 0, path: "/" });
  return res;
}
