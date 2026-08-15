"use client";

import { useEffect, useRef, useState } from "react";

// Shared admin list: search box + infinite scroll + lazy loading.
// type: "update" (title + edit link) | "delete" (card + delete form)
//       | "links" (links.p9x9.com forms) | "desi" (desi.p9x9 sync forms)
export default function AdminDataList({ apiUrl, initialData, total, type }) {
  const [items, setItems] = useState(initialData || []);
  const [hasMore, setHasMore] = useState(
    (initialData || []).length < (total || 0)
  );
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const pageRef = useRef(1);
  const qRef = useRef("");
  const loadingRef = useRef(false);
  const sentinelRef = useRef(null);
  const listRef = useRef(null);

  function showToast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2000);
  }

  async function fetchPage(page, q, append) {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: "10" });
      if (q) params.set("q", q);
      const res = await fetch(`${apiUrl}?${params.toString()}`);
      if (res.status === 401) {
        window.location.href = "/admin";
        return;
      }
      const json = await res.json();
      const next = json.items || [];
      setItems((prev) => (append ? [...prev, ...next] : next));
      setHasMore(json.hasMore);
      pageRef.current = page;
    } catch (err) {
      console.error(err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  function handleSearch() {
    const input = document.getElementById("adminSearchInput");
    const q = input ? input.value.trim() : "";
    qRef.current = q;
    fetchPage(1, q, false);
  }

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          fetchPage(pageRef.current + 1, qRef.current, true);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, apiUrl]);

  useEffect(() => {
    if (type !== "links" && type !== "desi") return;

    // global copy/paste/clear handlers (same as old linksP9X9 page)
    window.copyInput = (btn) => {
      const input = btn.closest(".input-group").querySelector("input");
      navigator.clipboard.writeText(input.value);
      showToast("Copied");
    };
    window.pasteInput = async (btn) => {
      const input = btn.closest(".input-group").querySelector("input");
      try {
        input.value = await navigator.clipboard.readText();
        showToast("Pasted");
      } catch {
        showToast("Blocked");
      }
    };
    window.clearInput = (btn) => {
      const input = btn.closest(".input-group").querySelector("input");
      input.value = "";
      showToast("Cleared");
    };

    // hide + localStorage (same as old allData.ejs)
    window.hideData = (id) => {
      const card = document.getElementById("card-" + id);
      if (card) card.style.display = "none";
      try {
        localStorage.setItem("hide_" + id, "true");
      } catch {}
      showToast("Hidden");
    };
  }, [type]);

  function createField(icon, name, value, placeholder, typeAttr = "text") {
    return `
      <div class="input-group">
        <div style="width:100%; font-size:13px; margin-bottom:4px; color:#ccc;">${placeholder}</div>
        <div class="input-box">
          <i class="${icon}"></i>
          <input name="${name}" value="${value || ""}" placeholder="${placeholder}" type="${typeAttr}">
        </div>
        <div class="actions">
          <button type="button" class="copy-btn" onclick="window.copyInput(this)">Copy</button>
          <button type="button" class="paste-btn" onclick="window.pasteInput(this)">Paste</button>
          <button type="button" class="clear-btn" onclick="window.clearInput(this)">Clear</button>
        </div>
      </div>
    `;
  }

  function desiLinkGroup(label, value, readOnly = true) {
    return `
      <div class="input-group">
        <div style="width:100%; font-size:13px; margin-bottom:4px; color:#ccc;">${label}</div>
        <div class="input-box">
          <i class="fa fa-link"></i>
          <input value="${value || ""}" ${readOnly ? "readonly" : ""} ${!readOnly ? `name="${label === "Route Name" ? "id" : label === "Title" ? "hadding" : label === "Image Link" ? "img" : "play"}"` : ""}>
        </div>
        <div class="actions">
          <button type="button" class="copy-btn" onclick="window.copyInput(this)">Copy</button>
          <button type="button" class="paste-btn" onclick="window.pasteInput(this)">Paste</button>
          <button type="button" class="clear-btn" onclick="window.clearInput(this)">Clear</button>
        </div>
      </div>
    `;
  }

  function cardHtml(item) {
    if (type === "update") {
      return `
        <li>
          <b class="post-title">${item.title}</b>
          <div class="actions">
            <a href="/admin/update/${item._id}">
              <i class="fas fa-pen"></i> Edit
            </a>
          </div>
        </li>
      `;
    }

    if (type === "delete") {
      return `
        <div class="card">
          <img src="${item.imageLink}" alt="Image" loading="lazy">
          <div class="content">
            <h3>${item.title}</h3>
            <p><strong>Route:</strong> ${item.routeName}</p>
            <p><strong>Duration:</strong> ${item.duration}</p>
            <p><strong>Total View:</strong> ${item.totalView}</p>
            <p><strong>Category:</strong> ${
              Array.isArray(item.category) ? item.category.join(", ") : item.category
            }</p>
          </div>
          <form action="/api/admin/delete" method="POST" class="delete-form">
            <input type="hidden" name="routeName" value="${item.routeName}">
            <button type="submit" class="delete-btn">Delete</button>
          </form>
        </div>
      `;
    }

    // type === "links"
    return `
      <form method="POST" action="https://links.p9x9.com/create" class="links-form">
        <div class="media-links">
          <a href="${item.imageLink}" target="_blank"><i class="fa fa-eye"></i> Open</a>
          <a href="/download?url=${item.imageLink}"><i class="fa fa-download"></i> Download</a>
        </div>
        ${createField("fa fa-link", "routeName", item.routeName, "Route Name")}
        ${createField("fa fa-heading", "title", item.title, "Title")}
        ${createField("fa fa-image", "imageLink", item.imageLink, "Image Link")}
        ${createField("fa fa-video", "videoLink", item.videoLink, "Video Link")}
        ${createField("fa fa-align-left", "description", item.description, "Description")}
        ${createField("fa fa-file-lines", "shortDescription", item.shortDescription, "Short Description")}
        ${createField("fa fa-eye", "totalView", "0", "Total View", "number")}
        ${createField("fa fa-clock", "duration", item.duration, "Duration")}
        ${createField("fa fa-tags", "category", item.category, "Category")}
        <button class="submit-btn" type="submit">
          <i class="fa fa-paper-plane"></i> Publish Post
        </button>
        <button type="button" class="hide-btn">Hide Data</button>
      </form>
    `;
  }

  function desiCardHtml(item) {
    return `
      <form class="data-card" id="card-${item._id}" action="https://movieb-f42x.onrender.com/add/p9x9-signle-data" method="post">
        <div class="media-links">
          <a href="${item.imageLink}" target="_blank"><i class="fa fa-eye"></i> Open</a>
          <a href="/download?url=${item.imageLink}"><i class="fa fa-download"></i> Download</a>
        </div>
        ${desiLinkGroup("DESI.P9X9.COM", `https://desi.p9x9.com/movie/${item.routeName}`)}
        ${desiLinkGroup("P9X9.COM", `https://p9x9.com/videos/${item.routeName}`)}
        ${desiLinkGroup("Route Name", item.routeName, false)}
        ${desiLinkGroup("Title", item.title, false)}
        ${desiLinkGroup("Image Link", item.imageLink, false)}
        ${desiLinkGroup("Video Link", item.videoLink, false)}
        <button class="submit-btn" type="submit">Submit</button>
        <button type="button" class="hide-btn" onclick="window.hideData && window.hideData('${item._id}')">Hide</button>
      </form>
    `;
  }

  function renderList() {
    listRef.current.innerHTML = items
      .map((item) => (type === "desi" ? desiCardHtml(item) : cardHtml(item)))
      .join("");

    if (type === "desi") {
      // re-apply hidden state (same as old allData.ejs)
      listRef.current.querySelectorAll(".data-card").forEach((card) => {
        const id = card.id.replace("card-", "");
        try {
          if (localStorage.getItem("hide_" + id) === "true") {
            card.style.display = "none";
          }
        } catch {}
      });
    }
  }

  useEffect(() => {
    renderList();

    if (type === "delete" || type === "links") {
      const confirmForms = listRef.current.querySelectorAll(".delete-form");
      confirmForms.forEach((form) => {
        form.addEventListener("submit", function (e) {
          if (!confirm("Are you sure to delete this post?")) e.preventDefault();
        });
      });

      const hideBtns = listRef.current.querySelectorAll(".hide-btn");
      hideBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const form = btn.closest(".links-form");
          if (form) form.remove();
          showToast("Hidden");
        });
      });
    }
  }, [items, type]);

  return (
    <>
      <div className="search-box admin-search-box">
        <input
          type="text"
          id="adminSearchInput"
          placeholder="Search posts..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button type="button" onClick={handleSearch}>
          <i className="fas fa-search"></i>
        </button>
      </div>

      <p className="admin-count">
        <b>{total}</b> total posts {qRef.current ? `(filtered: ${items.length} shown)` : ""}
      </p>

      {type === "update" ? (
        <div className="card">
          {items.length === 0 && (
            <p style={{ textAlign: "center", color: "#aaa" }}>No data found</p>
          )}
          <ul id="postsList" ref={listRef}></ul>
        </div>
      ) : (
        <div
          id="adminCards"
          className={type === "desi" ? "cards-container desi-cards" : "admin-cards"}
          ref={listRef}
        >
          {items.length === 0 && (
            <p style={{ textAlign: "center", color: "#aaa" }}>No data found</p>
          )}
        </div>
      )}

      <div ref={sentinelRef} className="admin-sentinel">
        {loading && (
          <p className="admin-loading">
            <i className="fas fa-spinner fa-spin"></i> Loading...
          </p>
        )}
        {!hasMore && items.length > 0 && (
          <p className="admin-end">All posts loaded</p>
        )}
      </div>

      <div id="toast" className="admin-toast">{toastMsg}</div>
    </>
  );
}