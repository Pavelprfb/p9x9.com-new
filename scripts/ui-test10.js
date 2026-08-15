// scripts/ui-test10.js — related videos 2-col grid + infinite scroll + dedupe
(async () => {
  const t = await (await fetch("http://127.0.0.1:3005/videos/test-video-1")).text();
  console.log("videoPage:", t.includes("player-wrap"), "plyrCDN:", t.includes("cdn.plyr.io"), "suspense:", t.includes("related-grid") || t.includes("RelatedGridSkeleton"));
  console.log("relatedSSRcards:", (t.match(/related-grid/g) || []).length, "sideItemRemoved:", !t.includes("side-item"));

  // dedupe: page 1 + page 2 must have no overlap with current video
  const cur = "test-video-1";
  const p1 = await (await fetch("http://127.0.0.1:3005/api/videos/" + cur + "/related?page=1&limit=10")).json();
  const p2 = await (await fetch("http://127.0.0.1:3005/api/videos/" + cur + "/related?page=2&limit=10")).json();
  const all = [...p1.items, ...p2.items].map((v) => v.routeName);
  console.log("P1:", p1.items.length, "P2:", p2.items.length, "total=" + p1.total);
  console.log("currentExcluded:", !all.includes(cur));
  console.log("noDuplicates:", new Set(all).size === all.length);

  const html = await (await fetch("http://127.0.0.1:3005/videos/test-video-2")).text();
  const cards = (html.match(/class="video-card-link"/g) || []).length;
  console.log("relatedSSRcards(test-video-2):", cards, "(expect 10)");
})();