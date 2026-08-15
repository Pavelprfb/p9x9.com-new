// scripts/live-check.js — inspect live p9x9.com HTML details
(async () => {
  const t = await (await fetch("https://p9x9.com/")).text();
  const m = t.match(/<meta name="description" content="([^"]{0,90})/);
  console.log("metaDesc:", m ? m[1] : "MISSING");
  console.log("searchSpan:", t.includes(">Search<"));
  console.log("faCdn:", t.includes("font-awesome/6.4.0/css/all.min.css"));
  const v = t.match(/<meta name="viewport"[^>]*>/);
  console.log("viewport:", v ? v[0] : "MISSING");
  console.log("hamburgerLabel:", t.includes('class="hamburger"'));
  console.log("dropdownLabelARIA:", /class="dropdown-toggle" aria-expanded/.test(t));
})();