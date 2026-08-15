"use client";

import { useEffect, useState } from "react";

export default function AdultWarning() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem("p9x9_adult_ok");
      if (accepted !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleEnter = () => {
    try {
      localStorage.setItem("p9x9_adult_ok", "1");
    } catch {}
    setVisible(false);
  };

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-label="Adult content warning">
      <div className="age-gate-card">
        <div className="age-gate-badge">18+</div>
        <h2>Adult Content Warning</h2>
        <p>
          This website contains adult content and is intended for adults only
          (18 years and older). By entering, you confirm that you are at least
          18 years old and agree to our Terms & Privacy Policy.
        </p>
        <div className="age-gate-actions">
          <button type="button" className="age-gate-enter" onClick={handleEnter}>
            <i className="fas fa-check-circle"></i> I am 18+, Enter
          </button>
          <a href="https://www.google.com" rel="noopener noreferrer" className="age-gate-leave">
            Leave this site
          </a>
        </div>
        <p className="age-gate-note">
          Your consent is saved locally on your device.
        </p>
      </div>
    </div>
  );
}
