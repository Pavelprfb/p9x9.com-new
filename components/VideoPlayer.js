"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import AdRedirectLayer from "./AdRedirectLayer";

export default function VideoPlayer({ routeName, initialData }) {
  const [oneData, setOneData] = useState(initialData || null);
  const [error, setError] = useState(null);

  // background view count increment + fresh data (same cookie logic as Express)
  useEffect(() => {
    if (!oneData) return;
    let cancelled = false;

    fetch(`/api/videos/${routeName}`)
      .then((res) => {
        if (res.status === 404) throw new Error("notfound");
        if (!res.ok) throw new Error("server");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        if (json.oneData) setOneData(json.oneData);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.message === "notfound") setError("Video not found");
      });

    return () => {
      cancelled = true;
    };
  }, [routeName]);

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", color: "#ff7a8f" }}>
        <i className="fas fa-exclamation-triangle" style={{ fontSize: 30, display: "block", marginBottom: 12 }}></i>
        {error}
      </div>
    );
  }

  if (!oneData) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", color: "#9d9db4" }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="player-wrap">
        <video
          id="player"
          playsInline
          controls
          controlsList="nodownload"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          poster={oneData.imageLink}
        >
          <source src={oneData.videoLink} type="video/mp4" />
        </video>
        <AdRedirectLayer routeName={routeName} />
      </div>

      <div className="player-info">
        <h1>{oneData.title}</h1>

        <div className="player-meta">
          {oneData.duration && oneData.duration !== "0" && (
            <span>
              <i className="fas fa-clock"></i> {oneData.duration}
            </span>
          )}
          <span>
            <i className="fas fa-eye"></i> {oneData.totalView} views
          </span>
          <span>
            <i className="far fa-calendar-alt"></i>{" "}
            {oneData.formattedDate ||
              new Date(oneData.createdAt).toLocaleDateString("en-US")}
          </span>
        </div>

        <div className="player-actions">
          <a
            href={siteConfig.smartLink}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="action-btn gradient"
          >
            <i className="fas fa-download"></i> Download
          </a>
          <a
            href={siteConfig.messengerLink}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="action-btn telegram"
          >
            <i className="fab fa-facebook-messenger"></i> Join Messenger Group
          </a>
          <button
            type="button"
            className="action-btn ghost"
            onClick={() => {
              navigator.clipboard
                .writeText(window.location.href)
                .then(() => {
                  const toast = document.getElementById("siteToast");
                  if (toast) {
                    toast.textContent = "Link copied to clipboard";
                    toast.classList.add("show");
                    setTimeout(() => toast.classList.remove("show"), 2000);
                  }
                });
            }}
          >
            <i className="fas fa-link"></i> Share
          </button>
        </div>

        {(oneData.category || []).length > 0 && (
          <div className="player-tags">
            {oneData.category.map((cat, i) => (
              <a key={i} href={`/?category=${encodeURIComponent(cat.trim())}`}>
                #{cat.trim()}
              </a>
            ))}
          </div>
        )}

        {oneData.description && oneData.description.trim() !== "" && (
          <div className="player-desc">{oneData.description}</div>
        )}
      </div>

      <div id="siteToast" className="site-toast"></div>
    </>
  );
}