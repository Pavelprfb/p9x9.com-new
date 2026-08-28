// POST /api/webs-p9x9-data - receives data from webs.p9x9.com
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req) {
  try {
    const data = await req.json().catch(() => ({}));

    const title = String(data.title || "").trim();
    if (!title) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "title is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const routeName = String(data.routeName || "")
      .toLowerCase()
      .trim();

    const category = Array.isArray(data.category)
      ? data.category
      : String(data.category || "").split(",");
    const cleanCategory = category
      .map((c) => String(c).trim())
      .filter((c) => c.length > 0);

    const postData = {
      routeName: routeName || title.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-"),
      title: title.toLowerCase(),
      description: String(data.description || "").trim(),
      imageLink: String(data.imageLink || data.img || "").trim(),
      videoLink: String(data.videoLink || data.video || data.play || "").trim(),
      duration: String(data.duration || "0").trim(),
      category: cleanCategory.length ? cleanCategory : ["viral"]
    };

    await connectDB();

    // Post model-এ unique key হলো routeName
    const existingPost = await Post.findOne({ routeName: postData.routeName });

    if (existingPost) {
      Object.keys(postData).forEach((key) => {
        if (key !== "routeName") {
          existingPost[key] = postData[key];
        }
      });
      await existingPost.save();
    } else {
      await Post.create(postData);
    }

    revalidateTag("posts");

    return new NextResponse(
      JSON.stringify({ success: true, message: "Data saved successfully", routeName: postData.routeName }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Server Error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}
