// /sitemap.xml - same as old controllers/sitemapController.js
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

    xml += `  <url>\n`;
    xml += `    <loc>https://p9x9.com</loc>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    xml += `  <url>\n`;
    xml += `    <loc>https://p9x9.com/terms</loc>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    xml += `  <url>\n`;
    xml += `    <loc>https://p9x9.com/privacy</loc>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    xml += `  <url>\n`;
    xml += `    <loc>https://p9x9.com/about</loc>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.6</priority>\n`;
    xml += `  </url>\n`;

    xml += `  <url>\n`;
    xml += `    <loc>https://p9x9.com/contact</loc>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.6</priority>\n`;
    xml += `  </url>\n`;

    xml += `  <url>\n`;
    xml += `    <loc>https://p9x9.com/videos</loc>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;

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
