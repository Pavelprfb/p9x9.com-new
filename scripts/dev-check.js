// scripts/dev-check.js — verify perf fixes on dev server
(async () => {
  const t = await (await fetch("http://127.0.0.1:3000/")).text();
  console.log("nextImg:", t.includes("_next/image"));
  console.log("imgCount:", (t.match(/<img/g) || []).length);
  console.log("priorityHigh:", t.includes("fetchpriority") || t.includes("fetchPriority"));
  console.log("maxScaleRemoved:", !t.includes("maximum-scale"));
  const v = t.match(/<meta name="viewport"[^>]*>/);
  console.log("viewport:", v ? v[0] : "MISSING");
  console.log("faAsync:", /media="print"[^>]*font-awesome/.test(t));
})();