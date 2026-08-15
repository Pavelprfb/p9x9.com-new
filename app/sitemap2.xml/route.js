// /sitemap2.xml - same as old controllers/videoSitemapController.js
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import cache from "@/lib/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cacheKey = "sitemap2";
    let xml = cache.get(cacheKey);

    if (!xml) {
      await connectDB();
      const posts = await Post.find({});

    // 🔒 XML Escape Function
    const escapeXml = (unsafe) => {
      return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    };

    // 🔒 Safe CDATA (prevents breaking if ]] > exists)
    const safeCdata = (text) => {
      return String(text).replace(/]]>/g, "]]]]><![CDATA[>");
    };

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" `;
    xml += `xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`;

    posts.forEach((post) => {
      const safeLoc = escapeXml(
        encodeURI(`https://p9x9.com/videos/${post.routeName}`)
      );

      const safeLastMod = post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : new Date().toISOString();

      const safeDuration = Number(post.duration) || 0;

      xml += `  <url>\n`;
      xml += `    <loc>${safeLoc}</loc>\n`;
      xml += `    <lastmod>${safeLastMod}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `    <video:video>\n`;
      xml += `      <video:thumbnail_loc><![CDATA[${safeCdata(post.imageLink || "")}]]></video:thumbnail_loc>\n`;
      xml += `      <video:title><![CDATA[${safeCdata(post.title || "")}]]></video:title>\n`;
      xml += `      <video:description><![CDATA[${safeCdata(post.description || "")}]]></video:description>\n`;
      xml += `      <video:content_loc><![CDATA[${safeCdata(post.videoLink || "")}]]></video:content_loc>\n`;
      xml += `    </video:video>\n`;
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
