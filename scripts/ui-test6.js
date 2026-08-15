// scripts/ui-test6.js — new pages + ad layer + desi page
const BASE = "http://127.0.0.1:3005";

(async () => {
  const login = await fetch(BASE + "/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "admin123" })
  });
  const cookie = login.headers.get("set-cookie").split(";")[0];

  let r = await fetch(BASE + "/about");
  let t = await r.text();
  console.log("ABOUT:", r.status, "h1=" + t.includes("About P9X9"), "canonical=" + t.includes('href="/about"'));

  r = await fetch(BASE + "/contact");
  t = await r.text();
  console.log("CONTACT:", r.status, "h1=" + t.includes("Contact Us"), "email=" + t.includes("prfbdxpftt@gmail.com"));

  r = await fetch(BASE + "/api/data-to-bd-p9x9", { headers: { cookie } });
  t = await r.text();
  console.log("DATA-TO-BD:", r.status, "search=" + t.includes("adminSearchInput"), "skeleton=" + t.includes("admin-cards"), "noAllCards=" + !t.includes("data-card"));

  r = await fetch(BASE + "/");
  t = await r.text();
  console.log("HOME desc:", t.includes("from around the world"), "oldDesc=" + t.includes("Bangladeshi"));

  const posts = await (await fetch(BASE + "/api/posts?page=1")).json();
  r = await fetch(BASE + "/videos/" + posts[0].routeName);
  t = await r.text();
  console.log("VIDEO:", r.status, "hasAdLayerJS=" + t.includes("ad-redirect-layer"), "hasAdUrl=" + t.includes("welcomingexpulsion.com/bqr0ww70a"));

  r = await fetch(BASE + "/sitemap.xml");
  t = await r.text();
  console.log("SITEMAP:", r.status, "urls=" + (t.match(/<url>/g) || []).length, "about=" + t.includes("/about"), "contact=" + t.includes("/contact"));
})();