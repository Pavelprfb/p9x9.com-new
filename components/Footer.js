"use client";

import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="logo">
              {siteConfig.websiteName}
              <span className="logo-badge">18+</span>
            </a>
            <p>{siteConfig.hadding}</p>
            <div className="footer-social">
              <a href={siteConfig.smartLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href={siteConfig.smartLink} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={siteConfig.smartLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href={siteConfig.telegramLink} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <i className="fab fa-telegram"></i>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li>
                <a href="/">
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li>
                <a href="/videos">
                  <i className="fas fa-play-circle"></i> All Videos
                </a>
              </li>
              <li>
                <a href="/videos">
                  <i className="fas fa-fire"></i> Latest Videos
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal & Contact</h4>
            <ul>
              <li>
                <a href="/about">
                  <i className="fas fa-info-circle"></i> About Us
                </a>
              </li>
              <li>
                <a href="/contact">
                  <i className="fas fa-envelope"></i> Contact
                </a>
              </li>
              <li>
                <a href="/privacy">
                  <i className="fas fa-shield-alt"></i> Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms">
                  <i className="fas fa-file-contract"></i> Terms & Conditions
                </a>
              </li>
              <li>
                <a href={siteConfig.telegramLink} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-telegram"></i> Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-disclaimer">
          <p>
            © {new Date().getFullYear()} {siteConfig.websiteName}. All rights reserved.
          </p>
          <p>
            This website contains <b>adult content</b> (18+) for adults only. If you are under 18,
            please leave this site immediately. All content is hosted by third parties — we do not
            host any video files on our servers. If you have any issue, contact us via Telegram.
          </p>
        </div>
      </div>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </footer>
  );
}
