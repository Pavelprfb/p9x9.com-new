// /api/videos/:routeName/related - paginated related videos (never includes the
// current video, cached) — powers the Related Videos infinite scroll
import { NextResponse } from "next/server";
import { getPostsPage } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { routeName } = await params;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const data = await getPostsPage({
      page,
      limit,
      exclude: routeName.toLowerCase()
    });

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