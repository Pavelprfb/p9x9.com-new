// scripts/ui-test9.js — verify new-tab click layer + no-download video
const fs = require("fs");
const path = require("path");

(async () => {
  const t = await (await fetch("http://127.0.0.1:3000/videos/pretty-desi-babe-having-hard-fuck-with-lover")).text();
  console.log("videoSSR:", t.includes("player-wrap"));
  console.log("layerInSSR(expect false):", t.includes("ad-redirect-layer"));
  console.log("controlsListSSR(expect false - video renders client-side):", t.includes("controlsList"));

  const chunksDir = "D:\\p9x9New\\.next\\static\\chunks";
  const walk = (dir, acc = []) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p, acc);
      else if (e.name.endsWith(".js")) acc.push(p);
    });
    return acc;
  };

  let ad = null;
  for (const f of walk(chunksDir)) {
    const c = fs.readFileSync(f, "utf8");
    if (c.includes("welcomingexpulsion")) {
      ad = c;
      console.log("ad bundle:", path.basename(f));
      console.log("  windowOpen:", c.includes('window.open(AD_URL,"_blank","noopener")') || c.includes('window.open(AD_URL,"_blank")') || c.includes("window.open(AD_URL"));
      console.log("  noTimeoutRedirect:", !c.includes("location.href = AD_URL"));
      console.log("  maxAge600:", c.includes("max-age=600"));
      break;
    }
  }
  if (!ad) console.log("AD BUNDLE NOT FOUND");

  let vp = null;
  for (const f of walk(chunksDir)) {
    const c = fs.readFileSync(f, "utf8");
    if (c.includes("nodownload")) {
      vp = c;
      console.log("video bundle:", path.basename(f));
      console.log("  controlsList:", c.includes('controlsList="nodownload"'));
      console.log("  disablePiP:", c.includes("disablePictureInPicture"));
      console.log("  ctxMenuBlock:", c.includes("preventDefault"));
      break;
    }
  }
  if (!vp) console.log("VIDEO BUNDLE NOT FOUND");

  const css = fs.readFileSync("D:\\p9x9New\\app\\globals.css", "utf8");
  console.log("css bottom48:", css.includes("bottom: 48px"));
})();