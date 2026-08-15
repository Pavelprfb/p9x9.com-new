// scripts/final-sweep.js — remaining endpoint checks
const BASE = "http://localhost:3001";
const paths = [
  "/sitemap.xml",
  "/sitemap2.xml",
  "/download?url=https%3A%2F%2Fpicsum.photos%2Fseed%2F1%2F400%2F250",
  "/api/data-to-bd-p9x9",
  "/admin/p9x9-to-links_p9x9",
  "/admin/add",
  "/admin/update/test-video-1",
  "/videos/test-video-1",
  "/data/all",
  "/notexist-page-xyz",
  "/admin/delete",
  "/admin/logout"
];

(async () => {
  for (const p of paths) {
    try {
      const res = await fetch(BASE + p, { redirect: "manual" });
      const text = await res.text();
      let note = "";
      if (p === "/sitemap.xml" || p === "/sitemap2.xml") {
        const count = (text.match(/<url>/g) || []).length;
        note = ` urlCount=${count} hasSiteDomain=${text.includes("p9x9.com")}`;
      }
      if (p === "/download") {
        const ct = res.headers.get("content-type");
        note = ` contentType=${ct}`;
      }
      if (p === "/videos/test-video-1") {
        note = ` hasJSONLD=${text.includes("VideoObject")} hasPlyr=${text.includes("plyr")} hasSocialBar=${text.includes("58a1ace26b9c00cf5587a03ed3863a01")}`;
      }
      console.log(`${p} => ${res.status} len=${text.length}${note}`);
    } catch (err) {
      console.log(`${p} => ERR ${err.message}`);
    }
  }
})();