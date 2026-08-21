"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";

const NAV_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "fa-chart-line" },
  { href: "/admin/add", label: "Add Post", icon: "fa-plus-circle" },
  { href: "/admin/update", label: "Update", icon: "fa-pen-to-square" },
  { href: "/admin/delete", label: "Delete", icon: "fa-trash-can" },
  { href: "/api/data-to-bd-p9x9", label: "Data to Desi", icon: "fa-database" },
  { href: "/admin/p9x9-to-links_p9x9", label: "P9X9 to Links", icon: "fa-share-nodes" }
];

function isActive(pathname, href) {
  if (href === "/admin/update") {
    return pathname === "/admin/update" || pathname.startsWith("/admin/update/");
  }
  return pathname === href;
}

export default function AdminShell({ title, subtitle, actions, wide = false, children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="adm-shell">
      <header className="adm-topbar">
        <a href="/admin/dashboard" className="adm-brand">
          <span className="adm-brand-name">{siteConfig.websiteName}</span>
          <span className="adm-brand-badge">Admin</span>
        </a>

        <nav className="adm-nav" aria-label="Admin navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`adm-nav-link ${isActive(pathname, link.href) ? "active" : ""}`}
            >
              <i className={`fas ${link.icon}`}></i>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="adm-topbar-right">
          <a href="/" className="adm-btn adm-btn-ghost adm-topbar-site" title="Visit site">
            <i className="fas fa-globe"></i>
            <span>Site</span>
          </a>
          <a href="/admin/logout" className="adm-btn adm-btn-danger-soft adm-topbar-logout">
            <i className="fas fa-right-from-bracket"></i>
            <span>Logout</span>
          </a>
          <button
            type="button"
            className="adm-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <i className={`fas ${open ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </header>

      {open && (
        <>
          <div className="adm-overlay" onClick={() => setOpen(false)}></div>
          <nav className="adm-drawer" aria-label="Admin mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`adm-drawer-link ${isActive(pathname, link.href) ? "active" : ""}`}
                onClick={() => setOpen(false)}
              >
                <i className={`fas ${link.icon}`}></i>
                {link.label}
              </a>
            ))}
            <div className="adm-drawer-sep"></div>
            <a href="/" className="adm-drawer-link">
              <i className="fas fa-globe"></i> Visit Site
            </a>
            <a href="/admin/logout" className="adm-drawer-link danger">
              <i className="fas fa-right-from-bracket"></i> Logout
            </a>
          </nav>
        </>
      )}

      <main className={`adm-main ${wide ? "adm-main-wide" : ""}`}>
        {(title || actions) && (
          <div className="adm-page-head">
            <div className="adm-page-head-text">
              {title && <h1 className="adm-title">{title}</h1>}
              {subtitle && <p className="adm-subtitle">{subtitle}</p>}
            </div>
            {actions && <div className="adm-page-actions">{actions}</div>}
          </div>
        )}
        {children}
      </main>

      {/* FontAwesome (async, non render-blocking) */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        media="print"
        onLoad={(e) => (e.currentTarget.media = "all")}
      />
    </div>
  );
}