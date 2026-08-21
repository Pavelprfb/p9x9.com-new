// /api/add-bd-p9x9-data - same as old shareDataController.createPostDesi
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const data = await req.json().catch(() => ({}));

    // title lowercase করে check করলে safer হবে (optional)
    if (data.title) {
      data.title = data.title.toLowerCase();
    }

    // category কে array তে রূপান্তর
    if (data.category) {
      data.category = data.category.split(",").map((c) => c.trim());
    }

    await connectDB();

    // Check যদি title database এ থাকে
    const existingPost = await Post.findOne({ title: data.title });

    if (existingPost) {
      // যদি থাকে, বাকি data update করো
      Object.keys(data).forEach((key) => {
        if (key !== "title") {
          // title change করা যাবে না
          existingPost[key] = data[key];
        }
      });
      await existingPost.save();
    } else {
      // না থাকলে create করো
      await Post.create(data);
    }

    revalidateTag("posts");

    // relative Location keeps the redirect on the real domain behind proxies
    return new NextResponse(null, { status: 303, headers: { Location: "/admin/update" } });
  } catch (err) {
    console.error(err);
    return new NextResponse("Server Error", { status: 500 });
  }
}
