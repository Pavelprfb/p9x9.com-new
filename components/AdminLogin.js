"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";

// Admin login (posts JSON to /api/admin/login, cookie set server-side)
export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (data.success) {
        router.push(data.redirect || "/admin/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-card">
        <a href="/" className="adm-login-brand">
          <span className="adm-brand-name">{siteConfig.websiteName}</span>
          <span className="adm-brand-badge">Admin</span>
        </a>
        <h1 className="adm-login-title">
          <i className="fas fa-lock"></i> Welcome back
        </h1>
        <p className="adm-login-sub">Sign in to manage your content</p>

        {error && (
          <div className="adm-alert adm-alert-error" role="alert">
            <i className="fas fa-triangle-exclamation"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="adm-form">
          <div className="adm-field">
            <label htmlFor="admin-username">Username</label>
            <div className="adm-input-box">
              <i className="fas fa-user"></i>
              <input
                id="admin-username"
                type="text"
                name="username"
                placeholder="Enter username"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="adm-field">
            <label htmlFor="admin-password">Password</label>
            <div className="adm-input-box">
              <i className="fas fa-key"></i>
              <input
                id="admin-password"
                type="password"
                name="password"
                placeholder="Enter password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="adm-btn adm-btn-primary adm-btn-block" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-right-to-bracket"></i> Login
              </>
            )}
          </button>
        </form>
      </div>

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