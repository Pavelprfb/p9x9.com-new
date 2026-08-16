// /sitemap.xml - ALL pages: static (home, videos, terms, privacy, about, contact)
// + every video URL (dynamic) — same as the old combined sitemapController.js
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import cache from "@/lib/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cacheKey = "sitemap1";
    let xml = cache.get(cacheKey);

    if (!xml) {
      await connectDB();
      const posts = await Post.find({}).sort({ createdAt: -1 });

      xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

      const pages = [
        { loc: "https://p9x9.com", changefreq: "daily", priority: "1.0" },
        { loc: "https://p9x9.com/videos", changefreq: "daily", priority: "0.9" },
        { loc: "https://p9x9.com/terms", changefreq: "daily", priority: "1.0" },
        { loc: "https://p9x9.com/privacy", changefreq: "daily", priority: "1.0" },
        { loc: "https://p9x9.com/about", changefreq: "monthly", priority: "0.6" },
        { loc: "https://p9x9.com/contact", changefreq: "monthly", priority: "0.6" }
      ];

      pages.forEach((p) => {
        xml += `  <url>\n`;
        xml += `    <loc>${p.loc}</loc>\n`;
        xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
        xml += `    <priority>${p.priority}</priority>\n`;
        xml += `  </url>\n`;
      });

      posts.forEach((post) => {
        xml += `  <url>\n`;
        xml += `    <loc>https://p9x9.com/videos/${encodeURIComponent(post.routeName)}</loc>\n`;
        xml += `    <lastmod>${post.updatedAt.toISOString()}</lastmod>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });

      xml += `</urlset>`;
      cache.set(cacheKey, xml, 300);
    }

    return new Response(xml, {
      headers: { "Content-Type": "application/xml" }
    });
  } catch (err) {
    console.error(err);
    return new Response("Server Error", { status: 500 });
  }
}