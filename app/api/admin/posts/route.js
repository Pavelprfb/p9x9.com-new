// /api/admin/posts - paginated + searchable admin data (infinite scroll, cached)
import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/adminAuth";
import { getPostsPage } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const admin = await getAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const q = searchParams.get("q") || "";

    const data = await getPostsPage({ page, limit, q });

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}