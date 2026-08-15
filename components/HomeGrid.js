"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function VideoCard({ item, priority }) {
  return (
    <a href={`/videos/${item.routeName}`} className="video-card-link">
      <div className="video-card">
        <div className="video-thumb">
          <Image
            src={item.imageLink}
            alt={item.title}
            fill
            sizes="(max-width: 600px) 50vw, 25vw"
            priority={priority}
          />
          <div className="play-overlay">
            <i className="fas fa-play"></i>
          </div>
          {item.duration && item.duration !== "0" && (
            <span className="thumb-badge badge-duration">{item.duration}</span>
          )}
          <span className="thumb-badge badge-views">
            <i className="fas fa-eye"></i> {item.totalView}
          </span>
        </div>
        <div className="video-card-body">
          <h3 className="video-card-title">{item.title}</h3>
          <div className="video-card-meta">
            <span>
              <i className="far fa-calendar-alt"></i> {item.formattedDate || ""}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function HomeGrid({ query, firstCategory, initialData, total }) {
  const [items, setItems] = useState(initialData || []);
  const [hasMore, setHasMore] = useState(
    (initialData || []).length < (total || 0)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageRef = useRef(1);
  const busyRef = useRef(false);
  const sentinelRef = useRef(null);

  async function loadMore() {
    if (busyRef.current) return;
    busyRef.current = true;
    setLoading(true);
    try {
      const next = pageRef.current + 1;
      const params = new URLSearchParams({ page: String(next), limit: "10" });
      if (query) params.set("q", query);
      if (firstCategory) params.set("category", firstCategory);

      const res = await fetch(`/api/posts?${params.toString()}`);
      const json = await res.json();
      setItems((prev) => [...prev, ...(json.items || [])]);
      setHasMore(json.hasMore);
      pageRef.current = next;
    } catch (err) {
      console.error(err);
      setError("Failed to load more videos");
    } finally {
      busyRef.current = false;
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!("IntersectionObserver" in window) || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !busyRef.current) {
          loadMore();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, query, firstCategory]);

  return (
    <>
      <div className="video-grid grid">
        {items.length === 0 ? (
          <p className="grid-empty">
            <i className="fas fa-film"></i>
            No videos found
          </p>
        ) : (
          items.map((item, i) => (
            <VideoCard key={item._id} item={item} priority={i === 0} />
          ))
        )}
      </div>

      <div className="grid-sentinel" ref={sentinelRef}>
        {loading && (
          <p className="grid-spinner">
            <i className="fas fa-spinner fa-spin"></i> Loading more videos...
          </p>
        )}
        {!hasMore && items.length > 0 && (
          <p className="grid-end">All videos loaded</p>
        )}
        {error && <p className="grid-end">{error}</p>}
      </div>
    </>
  );
}