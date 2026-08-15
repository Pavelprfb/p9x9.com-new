// scripts/ui-test11.js — verify return-from-ad logic in dev bundle
const fs = require("fs");
const path = require("path");

(async () => {
  await fetch("http://127.0.0.1:3000/videos/pretty-desi-babe-having-hard-fuck-with-lover");
  await new Promise((r) => setTimeout(r, 6000));

  const dir = "D:\\p9x9New\\.next\\static\\chunks";
  const walk = (d, acc = []) => {
    fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p, acc);
      else if (e.name.endsWith(".js")) acc.push(p);
    });
    return acc;
  };

  let found = null;
  for (const f of walk(dir)) {
    const c = fs.readFileSync(f, "utf8");
    if (c.includes("welcomingexpulsion")) {
      found = c;
      console.log("bundle:", path.basename(f));
      console.log("  clickRemovesLayer(setActive false):", /setActive\(!1\)/.test(c) || c.includes("setActive(false)"));
      console.log("  pageshowListener:", c.includes('"pageshow"'));
      console.log("  visibilitychange:", c.includes("visibilitychange"));
      console.log("  cookie10min:", c.includes("max-age=600"));
      console.log("  windowOpen:", c.includes("window.open(AD_URL"));
      break;
    }
  }
  if (!found) console.log("AD BUNDLE NOT FOUND");
})();