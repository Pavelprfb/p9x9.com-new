// /api/videos/:routeName - single video data + totalView cookie logic
// (same as old controllers/videoController.js singleData, exposed as JSON for the client)
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { routeName } = await params;
    const routeNameLower = routeName.toLowerCase();

    // same cookie handling as cookie-parser + express res.cookie
    // (express stores arrays as "j:" + JSON)
    let viewedRoutes = req.cookies.get("viewedRoutes")?.value || [];
    if (typeof viewedRoutes === "string") {
      if (viewedRoutes.startsWith("j:")) {
        try {
          viewedRoutes = JSON.parse(viewedRoutes.slice(2));
        } catch {
          viewedRoutes = [];
        }
      } else {
        viewedRoutes = [];
      }
    }
    if (!Array.isArray(viewedRoutes)) viewedRoutes = [];

    await connectDB();

    const video = await Post.findOne({ routeName: routeNameLower })
      .select(
        "title description imageLink videoLink duration totalView createdAt category routeName"
      )
      .lean();

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const suggested = await Post.find({ routeName: { $ne: routeNameLower } })
      .select("title imageLink duration totalView routeName category createdAt")
      .sort({ _id: -1 })
      .limit(30)
      .lean();

    // ================= TIME FORMAT =================
    let isoTime = null;
    let formattedDate = null;

    if (video.duration) {
      const parts = video.duration.split(":");
      const m = Number(parts[0]) || 0;
      const s = Number(parts[1]) || 0;
      isoTime = `PT${m}M${s}S`;
    }

    if (video.createdAt) {
      const d = new Date(video.createdAt);
      formattedDate = d.toISOString().split("T")[0];
    }

    // ================= VIEW COUNT =================
    let updatedVideo = video;
    let shouldSetCookie = false;

    if (!viewedRoutes.includes(routeNameLower)) {
      updatedVideo = await Post.findOneAndUpdate(
        { routeName: routeNameLower },
        { $inc: { totalView: 1 } },
        { returnDocument: "after" }
      ).lean();

      viewedRoutes.push(routeNameLower);
      shouldSetCookie = true;
    }

    // deterministic date string (avoids server/client locale mismatch)
    const dateLabel = updatedVideo.createdAt
      ? new Date(updatedVideo.createdAt).toLocaleDateString("en-US")
      : "";

    if (updatedVideo) {
      updatedVideo.formattedDate = dateLabel;
      updatedVideo._id = updatedVideo._id
        ? updatedVideo._id.toString()
        : updatedVideo._id;
    }
    suggested.forEach((s) => {
      s._id = s._id ? s._id.toString() : s._id;
      s.formattedDate = s.createdAt
        ? new Date(s.createdAt).toLocaleDateString("en-US")
        : "";
    });

    const res = NextResponse.json({
      oneData: updatedVideo,
      suggested,
      isoTime,
      formattedDate
    });

    if (shouldSetCookie) {
      res.cookies.set("viewedRoutes", "j:" + JSON.stringify(viewedRoutes), {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        path: "/"
      });
    }

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
