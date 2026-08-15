// scripts/ui-test2.js — /videos hero check
const BASE = "http://127.0.0.1:3005";

(async () => {
  const t = await (await fetch(BASE + "/videos")).text();
  console.log("hero class = " + t.includes('class="hero"'));
  const m = t.match(/<h1[^>]*>([^<]*)<\/h1>/);
  console.log("H1 content = " + (m && m[1]));
  console.log("indexContainer = " + t.includes("indexContainer"));
  console.log("has 'ALL' = " + t.includes("ALL"));
})();
