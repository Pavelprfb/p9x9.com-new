// scripts/admin-test.js — manual end-to-end admin flow test (no external deps, global fetch)
const BASE = "http://localhost:3001";

let cookieHeader = "";
async function req(path, opts = {}) {
  const headers = { ...(opts.headers || {}) };
  if (cookieHeader) headers.cookie = cookieHeader;
  const res = await fetch(BASE + path, { ...opts, headers, redirect: "manual" });
  const setc = res.headers.get("set-cookie");
  if (setc) {
    cookieHeader = setc.split(";")[0];
  }
  const text = await res.text();
  return { status: res.status, headers: res.headers, text };
}

(async () => {
  const results = [];

  // 1. bad login
  let r = await req("/api/admin/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "wrong" })
  });
  results.push(`BAD LOGIN: ${r.status} ${r.text}`);

  // 2. good login
  r = await req("/api/admin/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "admin123" })
  });
  results.push(`OK LOGIN: ${r.status} ${r.text} cookie=${cookieHeader}`);

  // 3. dashboard (authed)
  r = await req("/admin/dashboard");
  results.push(`DASHBOARD: ${r.status} hasWelcome=${r.text.includes("Welcome")}`);

  // 4. update page list (authed)
  r = await req("/admin/update");
  results.push(`ADMIN UPDATE LIST: ${r.status} hasNewTestVideo=${r.text.includes("new-test-video")}`);

  // 5. add new post (authed)
  r = await req("/api/admin/add", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      routeName: "new-test-video",
      title: "New Test Video",
      imageLink: "https://picsum.photos/seed/99/400/250",
      videoLink: "https://www.w3schools.com/html/mov_bbb.mp4",
      duration: "2:15",
      description: "added via api",
      category: "Bangla, New"
    })
  });
  results.push(`ADD: ${r.status} ${r.text}`);

  // 6. duplicate add (routeName exists)
  r = await req("/api/admin/add", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      routeName: "new-test-video",
      title: "Dup",
      imageLink: "x",
      videoLink: "y",
      duration: "1:00",
      description: "d",
      category: "c"
    })
  });
  results.push(`DUP ADD: ${r.status} ${r.text}`);

  // 7. update the new post (find its id from update list first)
  r = await req("/admin/update");
  const m = r.text.match(/\/admin\/update\/([a-f0-9]{24})/);
  let updateRes = "no id found";
  if (m) {
    const r2 = await req(`/api/admin/update/${m[1]}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        routeName: "new-test-video",
        title: "New Test Video UPDATED",
        imageLink: "https://picsum.photos/seed/100/400/250",
        videoLink: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: "4:40",
        description: "updated description",
        category: "New, Updated"
      })
    });
    updateRes = `UPDATE: ${r2.status} ${r2.text}`;
  }
  results.push(updateRes);

  // 8. view/update endpoint
  r = await req("/api/admin/view/update", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ routeName: "new-test-video", totalView: 999 })
  });
  results.push(`VIEW UPDATE: ${r.status} ${r.text}`);

  // 9. delete the new post (form-encoded like the admin UI form)
  const fd = new FormData();
  fd.append("routeName", "new-test-video");
  r = await req("/api/admin/delete", { method: "POST", body: fd });
  results.push(`DELETE: ${r.status} ${r.text}`);

  // 9b. verify it's gone
  r = await req("/api/videos/new-test-video");
  results.push(`VERIFY DELETED: ${r.status}`);

  // 10. add-bd-p9x9-data (full post data like DataToDesi form)
  r = await req("/api/add-bd-p9x9-data", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      title: "BD Full Title Test",
      routeName: "bd-full-title-test",
      description: "bd description",
      imageLink: "https://picsum.photos/seed/50/400/250",
      videoLink: "https://www.w3schools.com/html/mov_bbb.mp4",
      duration: "1:30",
      category: "Bangla, BD"
    })
  });
  results.push(`ADD-BD-P9X9: ${r.status} ${r.text}`);

  // 10b. duplicate title -> should update, not create
  r = await req("/api/add-bd-p9x9-data", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      title: "BD FULL TITLE TEST",
      routeName: "bd-full-title-test",
      description: "updated bd description",
      imageLink: "https://picsum.photos/seed/51/400/250",
      videoLink: "https://www.w3schools.com/html/mov_bbb.mp4",
      duration: "2:00",
      category: "Bangla, BD2"
    })
  });
  results.push(`ADD-BD-P9X9 DUP: ${r.status} ${r.text}`);

  // 10c. verify update happened
  r = await req("/api/videos/bd-full-title-test");
  const vd = JSON.parse(r.text);
  results.push(`VERIFY BD POST: ${r.status} title=${vd.oneData.title} dur=${vd.oneData.duration} cat=${vd.oneData.category.join(",")}`);

  // 11. cleanup: delete bd post
  const fd2 = new FormData();
  fd2.append("routeName", "bd-full-title-test");
  r = await req("/api/admin/delete", { method: "POST", body: fd2 });
  results.push(`CLEANUP DELETE: ${r.status} ${r.text}`);

  results.forEach((l) => console.log(l));
})();