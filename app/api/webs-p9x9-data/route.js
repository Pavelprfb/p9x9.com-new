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

    if (!data.title) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "title is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    data.title = data.title.toLowerCase();

    if (data.routeName) {
      data.routeName = data.routeName.toLowerCase().trim();
    } else {
      // routeName না থাকলে title থেকে generate
      data.routeName = data.title.replace(/[^\w\s]/g, "").trim().replace(/\s+/g, "-");
    }

    if (data.category) {
      data.category = data.category
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c.length > 0);
    }

    await connectDB();

    // Post model-এ unique key হলো routeName
    const existingPost = await Post.findOne({ routeName: data.routeName });

    if (existingPost) {
      Object.keys(data).forEach((key) => {
        if (key !== "routeName" && key !== "title") {
          existingPost[key] = data[key];
        }
      });
      await existingPost.save();
    } else {
      await Post.create(data);
    }

    revalidateTag("posts");

    return new NextResponse(
      JSON.stringify({ success: true, message: "Data saved successfully", routeName: data.routeName }),
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
