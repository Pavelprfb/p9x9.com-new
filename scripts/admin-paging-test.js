// scripts/admin-paging-test.js — admin pagination + search test
const BASE = "http://127.0.0.1:3005";

(async () => {
  const login = await fetch(BASE + "/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "admin123" })
  });
  console.log("LOGIN:", login.status);
  const cookie = login.headers.get("set-cookie").split(";")[0];
  console.log("cookie:", cookie.slice(0, 30) + "...");

  const get = (path) =>
    fetch(BASE + path, { headers: { cookie } }).then(async (r) => ({
      status: r.status,
      json: await r.json()
    }));

  const p1 = await get("/api/admin/posts?page=1&limit=10");
  console.log("P1:", p1.status, "items=" + p1.json.items.length, "total=" + p1.json.total, "hasMore=" + p1.json.hasMore);
  const p2 = await get("/api/admin/posts?page=2&limit=10");
  console.log("P2:", p2.status, "items=" + p2.json.items.length, "sameAsP1=" + (p1.json.items[0]._id === p2.json.items[0]._id));
  const sq = await get("/api/admin/posts?page=1&limit=10&q=desi");
  console.log("SEARCH q=desi:", sq.status, "items=" + sq.json.items.length, "total=" + sq.json.total, "allMatch=" + sq.json.items.every((i) => i.title.toLowerCase().includes("desi")));
  const sq2 = await get("/api/admin/posts?page=1&limit=10&q=zzzz-no-match");
  console.log("SEARCH nomatch:", sq2.status, "items=" + sq2.json.items.length);

  const up = await fetch(BASE + "/admin/update", { headers: { cookie } });
  const ut = await up.text();
  console.log("ADMIN UPDATE:", up.status, "ssrList=" + ut.includes("adminSearchInput"), "ssrSkeleton=" + ut.includes("admin-cards"), "noAllData=" + !ut.includes("video-card"));
  const del = await fetch(BASE + "/admin/delete", { headers: { cookie } });
  const dt = await del.text();
  console.log("ADMIN DELETE:", del.status, "search=" + dt.includes("adminSearchInput"), "skeleton=" + dt.includes("admin-cards"));
  const lk = await fetch(BASE + "/admin/p9x9-to-links_p9x9", { headers: { cookie } });
  const lt = await lk.text();
  console.log("ADMIN LINKS:", lk.status, "search=" + lt.includes("adminSearchInput"), "skeleton=" + lt.includes("admin-cards"));
})();