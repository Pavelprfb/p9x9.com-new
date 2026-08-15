"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Same as old views/admin/login.ejs (login via /api/admin/login)
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
    <div className="login-box">
      <h2>🔐 Admin Login</h2>

      {error && (
        <div className="error">
          <i className="fas fa-triangle-exclamation"></i>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="field">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          <i className="fas fa-right-to-bracket"></i>{" "}
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <style jsx>{`
        .login-box {
          background: #1f1f1f;
          padding: 30px;
          width: 100%;
          max-width: 380px;
          border-radius: 16px;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.7);
        }

        h2 {
          text-align: center;
          margin-bottom: 25px;
        }

        .error {
          background: #2a0000;
          color: #ff6b6b;
          padding: 10px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 15px;
          text-align: center;
        }

        .field {
          position: relative;
          margin-bottom: 15px;
        }

        .field i {
          position: absolute;
          top: 50%;
          left: 12px;
          transform: translateY(-50%);
          color: #888;
        }

        input {
          width: 80%;
          padding: 12px 12px 12px 38px;
          background: #111;
          border: 1px solid #333;
          border-radius: 10px;
          color: #fff;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: #03dac6;
        }

        button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: #03dac6;
          color: #121212;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
        }

        button:hover {
          background: #00bfa5;
          transform: scale(1.03);
        }

        @media (max-width: 480px) {
          .login-box {
            margin: 0 15px;
            padding: 25px;
          }
        }
      `}</style>
    </div>
  );
}
