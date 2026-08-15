// scripts/ui-test12.js — verify Messenger button + nofollow links on video page
(async () => {
  const t = await (await fetch("http://127.0.0.1:3000/videos/pretty-desi-babe-having-hard-fuck-with-lover")).text();
  console.log("messengerBtn:", t.includes("Join Messenger Group"));
  console.log("chatUrl:", t.includes("chat.p9x9.com"));
  console.log("oldTelegramBtn:", t.includes("Join Telegram"));
  const i = t.indexOf("chat.p9x9.com");
  if (i > 0) console.log("messengerTag:", t.slice(i - 220, i + 40).replace(/\n/g, " "));
  const j = t.indexOf("superioroptionaleveryone");
  if (j > 0) console.log("downloadTag:", t.slice(j - 220, j + 40).replace(/\n/g, " "));
})();