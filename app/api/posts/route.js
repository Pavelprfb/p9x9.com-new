// /api/posts - AJAX pagination for infinite scroll (cached via Next Data Cache)
import { NextResponse } from "next/server";
import { getPostsPage } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";

    const data = await getPostsPage({ page, limit, q, category });

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120"
      }
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}