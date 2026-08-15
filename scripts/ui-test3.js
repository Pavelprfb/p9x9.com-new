// scripts/ui-test3.js — verify SSR data + caching + Suspense
const BASE = "http://127.0.0.1:3005";

(async () => {
  const t0 = Date.now();
  let r = await fetch(BASE + "/");
  let t = await r.text();
  console.log(
    "HOME:", r.status, "ms=" + (Date.now() - t0),
    "ssrCards=" + (t.match(/video-card-link/g) || []).length,
    "ssrSkeleton=" + t.includes('class="skeleton"'),
    "noLoading=" + !t.includes('>Loading...<'),
    "oldBengali=" + t.includes("ক্লিক"),
    "newDesc=" + t.includes("Watch free desi, Bangladeshi"),
    "cacheHeader=" + r.headers.get("cache-control")
  );

  const t1 = Date.now();
  r = await fetch(BASE + "/");
  t = await r.text();
  console.log("HOME 2nd:", r.status, "ms=" + (Date.now() - t1));

  r = await fetch(BASE + "/api/posts?page=1");
  console.log(
    "API POSTS:", r.status,
    "cache=" + r.headers.get("cache-control"),
    "items=" + ((await r.json()) || []).length
  );

  r = await fetch(BASE + "/data/all");
  console.log("DATA/ALL:", r.status, "cache=" + r.headers.get("cache-control"));

  const posts = await (await fetch(BASE + "/api/posts?page=1")).json();
  const t2 = Date.now();
  r = await fetch(BASE + "/videos/" + posts[0].routeName);
  t = await r.text();
  console.log(
    "VIDEO:", r.status, "ms=" + (Date.now() - t2),
    "playerSSR=" + t.includes("player-wrap"),
    "videoSrc=" + t.includes(posts[0].videoLink),
    "noLoading=" + !t.includes("Loading"),
    "relatedSSR=" + t.includes("side-item"),
    "autoplay=" + t.includes("autoPlay")
  );

  r = await fetch(BASE + "/sitemap.xml");
  console.log("SITEMAP:", r.status, "urls=" + (r.headers.get("content-length") || 0));

  const v = await fetch(BASE + "/videos");
  t = await v.text();
  console.log("VIDEOS:", v.status, "ssrCards=" + (t.match(/video-card-link/g) || []).length);
})();