// scripts/dev-check2.js — verify video page + image optimizer
(async () => {
  const t = await (await fetch("http://127.0.0.1:3000/videos/pretty-desi-babe-having-hard-fuck-with-lover")).text();
  console.log("videoPageOK:", t.includes("player-wrap"), "relatedNextImg:", t.includes("_next/image"));

  const m = t.match(/src="([^"]*_next\/image[^"]*)"/);
  if (m) {
    const r = await fetch("http://127.0.0.1:3000" + m[1].replace(/&amp;/g, "&"));
    console.log("optimizer:", r.status, r.headers.get("content-type"), (r.headers.get("content-length") || "?" ) + "B");
  }
})();