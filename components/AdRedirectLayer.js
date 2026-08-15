"use client";

import { useEffect, useRef, useState } from "react";

// Invisible overlay on top of the video (click-triggered, opens in a new tab):
// - first visit: invisible div covers the ENTIRE video; clicking it saves the
//   route in a 10-minute cookie, removes the layer, and opens the ad link in a
//   new tab
// - returning within 10 minutes (or from the ad tab): no div, so the video
//   plays normally with full controls
// - returning within 10 minutes: no div, no redirect (per video page)
const AD_URL =
  "https://welcomingexpulsion.com/bqr0ww70a?key=93a942816b667574bfb9c03daa56b8c0";

export default function AdRedirectLayer({ routeName }) {
  const [active, setActive] = useState(false);
  const clickedRef = useRef(false);

  function hasVisitCookie() {
    if (!routeName) return false;
    const key = "p9x9_visit_" + routeName;
    try {
      return document.cookie
        .split(";")
        .some((c) => c.trim().startsWith(key + "="));
    } catch {
      return false;
    }
  }

  useEffect(() => {
    if (!routeName) return;
    if (hasVisitCookie()) return;

    setActive(true);

    // If the user comes back from the ad tab (bfcache / back navigation),
    // drop the layer immediately so the video is fully playable again.
    const onReturn = () => {
      if (hasVisitCookie()) setActive(false);
    };

    window.addEventListener("pageshow", onReturn);
    document.addEventListener("visibilitychange", onReturn);

    return () => {
      window.removeEventListener("pageshow", onReturn);
      document.removeEventListener("visibilitychange", onReturn);
    };
  }, [routeName]);

  function handleClick() {
    if (clickedRef.current || !routeName) return;
    clickedRef.current = true;

    const key = "p9x9_visit_" + routeName;
    try {
      document.cookie = key + "=1; path=/; max-age=600";
    } catch {}

    // remove the layer right away — when the user returns, the video
    // is clickable and the play button works normally
    setActive(false);

    window.open(AD_URL, "_blank", "noopener");
  }

  if (!active) return null;

  return (
    <div
      className="ad-redirect-layer"
      aria-hidden="true"
      onClick={handleClick}
    ></div>
  );
}