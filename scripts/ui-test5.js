// scripts/ui-test5.js — dev video page check
(async () => {
  const posts = await (await fetch("http://127.0.0.1:3000/api/posts?page=1")).json();
  const r = await fetch("http://127.0.0.1:3000/videos/" + posts[0].routeName);
  const t = await r.text();
  console.log("VIDEO:", r.status, "playerSSR=" + t.includes("player-wrap"),
    "src=" + t.includes(posts[0].videoLink), "related=" + t.includes("side-item"),
    "autoplay=" + t.includes("autoPlay"), "len=" + t.length);
  const v = await fetch("http://127.0.0.1:3000/videos");
  const vt = await v.text();
  console.log("VIDEOS:", v.status, "cards=" + (vt.match(/video-card-link/g) || []).length);
})();
