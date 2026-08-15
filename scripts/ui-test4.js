// scripts/ui-test4.js — dev server text check
(async () => {
  const t = await (await fetch("http://127.0.0.1:3000/")).text();
  const bad = ["ভিডিও তে ক্লিক", "ফিরে আসে আবার", "ক্লিক করবে ভিডিও চলবে"];
  bad.forEach((b) => console.log("contains '" + b + "':", t.includes(b)));
  console.log("newDesc:", t.includes("Watch free desi"));
})();
