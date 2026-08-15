// scripts/lh-report.js — summarize Lighthouse JSON
const fs = require("fs");
const lh = JSON.parse(fs.readFileSync("D:\\p9x9New\\scripts\\lh.json", "utf8"));

console.log("=== SCORES ===");
console.log("perf:", lh.categories.performance?.score * 100);
console.log("a11y:", lh.categories.accessibility?.score * 100);
console.log("bp:", lh.categories["best-practices"]?.score * 100);
console.log("seo:", lh.categories.seo?.score * 100);

const key = [
  "largest-contentful-paint",
  "cumulative-layout-shift",
  "interaction-to-next-paint",
  "first-contentful-paint",
  "total-blocking-time",
  "speed-index",
  "server-response-time",
  "render-blocking-resources",
  "unused-javascript",
  "unused-css-rules",
  "lcp-lazy-loaded",
  "uses-responsive-images",
  "uses-optimized-images",
  "total-byte-weight",
  "third-party-summary",
  "font-display",
  "color-contrast",
  "image-alt",
  "link-name",
  "heading-order",
  "document-title",
  "meta-description",
  "crawlable-anchors",
  "robots-txt",
  "hreflang"
];

console.log("\n=== KEY AUDITS (score=0/1/nonzero are problems) ===");
for (const k of key) {
  const a = lh.audits[k];
  if (!a) continue;
  console.log(
    `- ${k}: score=${a.score} ${a.displayValue ? a.displayValue : ""}`
  );
}

console.log("\n=== a11y failed audits ===");
for (const ref of lh.categories.accessibility.auditRefs) {
  const a = lh.audits[ref.id];
  if (a && a.score !== null && a.score < 1) {
    console.log(`- ${ref.id}: score=${a.score} ${a.title}`);
  }
}

console.log("\n=== perf failed audits ===");
for (const ref of lh.categories.performance.auditRefs) {
  const a = lh.audits[ref.id];
  if (a && a.score !== null && a.score < 1) {
    console.log(`- ${ref.id}: score=${a.score} ${a.title} ${a.displayValue || ""}`);
  }
}

console.log("\n=== seo failed audits ===");
for (const ref of lh.categories.seo.auditRefs) {
  const a = lh.audits[ref.id];
  if (a && a.score !== null && a.score < 1) {
    console.log(`- ${ref.id}: score=${a.score} ${a.title}`);
  }
}

if (lh.audits["render-blocking-resources"]?.details?.items) {
  console.log("\n=== render-blocking items ===");
  for (const it of lh.audits["render-blocking-resources"].details.items.slice(0, 8)) {
    console.log(`- ${it.url} wasted=${it.wastedMs}ms`);
  }
}

if (lh.audits["unused-javascript"]?.details?.items) {
  console.log("\n=== unused JS (top 5) ===");
  for (const it of lh.audits["unused-javascript"].details.items.slice(0, 5)) {
    console.log(`- ${it.url} wasted=${(it.wastedBytes / 1024).toFixed(0)}KB`);
  }
}

if (lh.audits["total-byte-weight"]?.details?.items) {
  console.log("\n=== heavy resources (top 8) ===");
  for (const it of lh.audits["total-byte-weight"].details.items.slice(0, 8)) {
    console.log(`- ${(it.totalBytes / 1024).toFixed(0)}KB ${it.url.slice(0, 110)}`);
  }
}

if (lh.audits["third-party-summary"]?.details?.items) {
  console.log("\n=== third parties ===");
  for (const it of lh.audits["third-party-summary"].details.items.slice(0, 8)) {
    console.log(
      `- ${it.entity?.text || "?"} mainThread=${(it.mainThreadTime || 0).toFixed(0)}ms ${(it.transferSize || 0) / 1024}KB`
    );
  }
}

if (lh.audits["unused-css-rules"]?.details?.items) {
  console.log("\n=== unused CSS (top 5) ===");
  for (const it of lh.audits["unused-css-rules"].details.items.slice(0, 5)) {
    console.log(`- ${it.url} wasted=${(it.wastedBytes / 1024).toFixed(0)}KB`);
  }
}

if (lh.audits["lcp-lazy-loaded"]?.details?.items) {
  console.log("\n=== LCP lazy-loaded ===");
  lh.audits["lcp-lazy-loaded"].details.items.forEach((it) => console.log(`- ${it.url}`));
}

if (lh.audits["color-contrast"]?.details?.items) {
  console.log("\n=== contrast fails ===");
  lh.audits["color-contrast"].details.items.slice(0, 8).forEach((it) =>
    console.log(`- ${it.node?.snippet?.slice(0, 100)} ratio ${it.node?.explanation}`)
  );
}