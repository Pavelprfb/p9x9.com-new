// scripts/ui-test8.js — verify click-triggered ad layer in dev bundle
const fs = require("fs");
const path = require("path");

(async () => {
  const t = await (await fetch("http://127.0.0.1:3000/videos/pretty-desi-babe-having-hard-fuck-with-lover")).text();
  console.log("adDivClassInHTML:", t.includes("ad-redirect-layer"));

  const chunksDir = "D:\\p9x9New\\.next\\static\\chunks";
  const walk = (dir, acc = []) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p, acc);
      else if (e.name.endsWith(".js")) acc.push(p);
    });
    return acc;
  };

  let found = null;
  for (const f of walk(chunksDir)) {
    const c = fs.readFileSync(f, "utf8");
    if (c.includes("welcomingexpulsion")) {
      found = f;
      const click = c.includes("onClick") || c.includes("handleClick");
      const cookie = c.includes("max-age=600");
      const timer = c.includes("setTimeout");
      console.log("bundle:", path.basename(f), "clickHandler=" + click, "cookie10min=" + cookie, "timer=" + timer);
      const i = c.indexOf("welcomingexpulsion");
      console.log("context:", c.slice(Math.max(0, i - 300), i + 80));
      break;
    }
  }
  if (!found) console.log("NOT FOUND in bundles");
})();