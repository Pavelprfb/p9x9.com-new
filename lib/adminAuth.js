// lib/adminAuth.js
// Same admin cookie check as the old middlewares/adminAuth.js
// Usage inside server components / route handlers:
//   const admin = await getAdmin();
//   if (!admin) redirect('/admin');

import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";

export async function getAdmin() {
  const cookieStore = await cookies();
  const adminId = cookieStore.get("adminAuth")?.value;

  if (!adminId) return null;

  try {
    await connectDB();
    const admin = await Admin.findById(adminId).lean();
    return admin;
  } catch (err) {
    console.error(err);
    return null;
  }
}
