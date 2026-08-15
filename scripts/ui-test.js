// scripts/ui-test.js — verify new UI/SEO on prod server
const BASE = "http://127.0.0.1:3005";

(async () => {
  let r = await fetch(BASE + "/");
  let t = await r.text();
  console.log(
    "HOME:", r.status, "len=" + t.length,
    "hero=" + t.includes("WATCH FREE"),
    "ageGate=" + t.includes("age-gate"),
    "logo18=" + t.includes("logo-badge"),
    "jsonldWebSite=" + t.includes('"WebSite"'),
    "canonical=" + (t.match(/rel="canonical" href="([^"]*)"/) || [])[1],
    "videoCard=" + t.includes("video-card-title"),
    "catPills=" + t.includes("cat-pills"),
    "skeleton=" + t.includes("hero-stats")
  );

  const posts = await (await fetch(BASE + "/api/posts?page=1")).json();
  r = await fetch(BASE + "/videos/" + posts[0].routeName);
  t = await r.text();
  console.log(
    "VIDEO:", r.status, "len=" + t.length,
    "breadcrumb=" + t.includes("BreadcrumbList"),
    "playerPage=" + t.includes("video-page"),
    "related=" + t.includes("Related Videos"),
    "actionBtns=" + t.includes("action-btn"),
    "canonical=" + (t.match(/rel="canonical" href="([^"]*)"/) || [])[1]
  );

  r = await fetch(BASE + "/videos");
  t = await r.text();
  console.log("VIDEOS:", r.status, "hero=" + t.includes("ALL P9X9 VIDEOS"));

  r = await fetch(BASE + "/robots.txt");
  t = await r.text();
  console.log("ROBOTS:", r.status, "sitemapLine=" + t.includes("Sitemap: https://p9x9.com/sitemap.xml"));

  r = await fetch(BASE + "/terms");
  t = await r.text();
  console.log("TERMS:", r.status, "newStyle=" + t.includes("terms-card"));

  r = await fetch(BASE + "/sitemap.xml");
  t = await r.text();
  console.log("SITEMAP:", r.status, "urls=" + (t.match(/<url>/g) || []).length, "lastmod=" + t.includes("<lastmod>"));
})();
