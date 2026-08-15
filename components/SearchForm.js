"use client";

import { useEffect } from "react";

export default function SearchForm() {
  useEffect(() => {
    let cancelled = false;

    async function initSearchForm() {
      const res = await fetch("/data/all");
      const data = await res.json();

      if (cancelled) return;

      const categories = [
        ...new Set(data.flatMap((d) => d.category.map((c) => c.trim())))
      ];
      const categoryContainer = document.getElementById("categoryContainer");
      const maxVisible = 6;

      function renderCategories(showAll = false) {
        categoryContainer.innerHTML = "";
        const catsToShow = showAll
          ? categories
          : categories.slice(0, maxVisible);

        catsToShow.forEach((cat) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.textContent = cat;
          btn.className = "cat-pill";
          btn.addEventListener("click", () => filterByCategory(cat));
          categoryContainer.appendChild(btn);
        });

        if (!showAll && categories.length > maxVisible) {
          const moreBtn = document.createElement("button");
          moreBtn.type = "button";
          moreBtn.textContent = "All categories";
          moreBtn.className = "cat-pill more";
          moreBtn.addEventListener("click", () => renderCategories(true));
          categoryContainer.appendChild(moreBtn);
        }
      }

      renderCategories();

      const searchForm = document.getElementById("searchForm");
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = document
          .getElementById("searchInput")
          .value.toLowerCase()
          .trim();
        const filtered = query
          ? data.filter((d) => d.title.toLowerCase().includes(query))
          : data;
        renderCards(filtered);
      });

      function filterByCategory(cat) {
        const filtered = data.filter((d) =>
          d.category.map((c) => c.trim()).includes(cat)
        );
        renderCards(filtered);
      }

      function cardHtml(item) {
        return `
          <a href="/videos/${item.routeName}" class="video-card-link">
            <div class="video-card">
              <div class="video-thumb">
                <img src="${item.imageLink}" alt="${item.title}" loading="lazy" decoding="async">
                <div class="play-overlay"><i class="fas fa-play"></i></div>
                ${
                  item.duration && item.duration !== "0"
                    ? `<span class="thumb-badge badge-duration">${item.duration}</span>`
                    : ""
                }
                <span class="thumb-badge badge-views"><i class="fas fa-eye"></i> ${item.totalView}</span>
              </div>
              <div class="video-card-body">
                <h3 class="video-card-title">${item.title}</h3>
                <div class="video-card-meta">
                  <span><i class="far fa-calendar-alt"></i> ${new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="video-card-cats">
                  ${item.category.map((c) => `<span>${c.trim()}</span>`).join("")}
                </div>
              </div>
            </div>
          </a>
        `;
      }

      function renderCards(cardsData) {
        const grid = document.querySelector(".grid");
        if (!grid) return;

        if (cardsData.length === 0) {
          grid.innerHTML = `
            <div class="grid-empty">
              <i class="fas fa-search"></i>
              No videos found
            </div>
          `;
          return;
        }

        grid.innerHTML = cardsData.map(cardHtml).join("");
      }
    }

    initSearchForm();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="search-section">
      <form id="searchForm" className="search-form" role="search">
        <i className="fas fa-search search-icon" aria-hidden="true"></i>
        <input
          type="text"
          id="searchInput"
          placeholder="Search video..."
          aria-label="Search video"
        />
        <button type="submit" className="search-submit">
          <i className="fas fa-search" aria-hidden="true"></i>
          <span>Search</span>
        </button>
      </form>

      <div id="categoryContainer" className="cat-pills"></div>
    </div>
  );
}
