// scripts/ui-test7.js — infinite scroll + data cache verify
const BASE = "http://127.0.0.1:3005";

(async () => {
  let r = await fetch(BASE + "/");
  let t = await r.text();
  console.log("HOME:", r.status, "ssrCards=" + (t.match(/video-card-link/g) || []).length, "sentinel=" + t.includes("grid-sentinel"), "noPagination=" + !t.includes("page-btn"));

  r = await fetch(BASE + "/api/posts?page=1&limit=10");
  let j = await r.json();
  console.log("P1:", j.items.length, "total=" + j.total, "hasMore=" + j.hasMore, "cache=" + r.headers.get("cache-control"));
  r = await fetch(BASE + "/api/posts?page=2&limit=10");
  j = await r.json();
  console.log("P2:", j.items.length, "hasMore=" + j.hasMore, "diff=" + j.items[0]._id);
  r = await fetch(BASE + "/api/posts?page=1&limit=10&q=test");
  j = await r.json();
  console.log("SEARCH q=test:", j.items.length, "allMatch=" + j.items.every((i) => i.title.toLowerCase().includes("test")));

  const posts = await (await fetch(BASE + "/api/posts?page=1&limit=10")).json();
  r = await fetch(BASE + "/videos/" + posts.items[0].routeName);
  t = await r.text();
  console.log("VIDEO:", r.status, "playerSSR=" + t.includes("player-wrap"));

  // second-hit speed (data cache)
  const t1 = Date.now();
  await fetch(BASE + "/");
  const t2 = Date.now();
  await fetch(BASE + "/");
  const t3 = Date.now();
  console.log("HOME ms (cold-ish)=" + (t2 - t1), "cached=" + (t3 - t2));

  const login = await fetch(BASE + "/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "admin123" })
  });
  const cookie = login.headers.get("set-cookie").split(";")[0];
  r = await fetch(BASE + "/admin/update", { headers: { cookie } });
  t = await r.text();
  console.log("ADMIN UPDATE:", r.status, "search=" + t.includes("adminSearchInput"));
  r = await fetch(BASE + "/api/admin/posts?page=1&limit=10", { headers: { cookie } });
  j = await r.json();
  console.log("ADMIN API:", r.status, "items=" + j.items.length, "hasMore=" + j.hasMore);
})();