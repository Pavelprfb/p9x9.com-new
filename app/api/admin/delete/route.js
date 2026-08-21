// /api/admin/delete - same as old adminController.dataDeletePost
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.formData().catch(() => null);
    const routeName = body ? body.get("routeName") : null;

    if (!routeName) {
      return new NextResponse("Route name is required", { status: 400 });
    }

    await connectDB();

    const post = await Post.findOne({ routeName });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    await Post.findOneAndDelete({ routeName });
    revalidateTag("posts");

    // relative Location keeps the redirect on the real domain behind proxies
    return new NextResponse(null, { status: 303, headers: { Location: "/admin/delete" } });
  } catch (error) {
    console.error("Delete Error:", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
