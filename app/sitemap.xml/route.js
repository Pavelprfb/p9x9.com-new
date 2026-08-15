// /sitemap.xml - ALL STATIC PAGES ONLY (home, videos, terms, privacy, about, contact)
// dynamic video URLs live in /sitemap2.xml (video sitemap)
import cache from "@/lib/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cacheKey = "sitemap1";
    let xml = cache.get(cacheKey);

    if (!xml) {
      xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

      const pages = [
        { loc: "https://p9x9.com", changefreq: "daily", priority: "1.0" },
        { loc: "https://p9x9.com/videos", changefreq: "daily", priority: "0.9" },
        { loc: "https://p9x9.com/terms", changefreq: "monthly", priority: "0.6" },
        { loc: "https://p9x9.com/privacy", changefreq: "monthly", priority: "0.6" },
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