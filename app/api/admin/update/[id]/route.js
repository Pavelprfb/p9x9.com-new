// /api/admin/update/:id - same as old adminController.updatePost
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const data = await req.json().catch(() => ({}));
    data.category = data.category ? data.category.split(",") : [];

    await connectDB();
    await Post.findByIdAndUpdate(id, data);
    revalidateTag("posts");

    return NextResponse.redirect(new URL("/admin/update", req.url), 303);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
