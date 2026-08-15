"use client";

import { useRef, useState } from "react";

// Same as old views/admin/add.ejs (posts to /api/admin/add with toast)
export default function AdminAddForm() {
  const [toastMsg, setToastMsg] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  function showToast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  }

  async function copyInput(id) {
    const input = document.getElementById(id);
    if (input) {
      await navigator.clipboard.writeText(input.value);
      showToast("✅ Copied");
    }
  }

  async function pasteInput(id) {
    try {
      const text = await navigator.clipboard.readText();
      document.getElementById(id).value = text;
      showToast("📋 Pasted");
    } catch {
      showToast("❌ Paste blocked");
    }
  }

  function clearInput(id) {
    document.getElementById(id).value = "";
    showToast("🗑 Cleared");
  }

  function field(id, label, icon, required = true) {
    return (
      <div className="field">
        <label>{label}</label>
        <div className="input-wrapper">
          <div className="input-box">
            <i className={`fas ${icon}`}></i>
            <input id={id} name={id} required={required} />
          </div>
          <div className="input-btn">
            <button
              type="button"
              className="copy-btn"
              onClick={() => copyInput(id)}
            >
              Copy
            </button>
            <button
              type="button"
              className="paste-btn"
              onClick={() => pasteInput(id)}
            >
              Paste
            </button>
            <button
              type="button"
              className="clear-btn"
              onClick={() => clearInput(id)}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();

      setResult(json);
      showToast(json.message || "Done");

      if (json.success) {
        formRef.current.reset();
      }
    } catch (err) {
      console.error(err);
      setResult({ success: false, message: "Server Error" });
      showToast("Server Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>➕ Add New Post</h2>

        <form onSubmit={handleSubmit} ref={formRef}>
          {field("routeName", "Route Name", "fa-route")}
          {field("title", "Title", "fa-heading")}
          {field("imageLink", "Image Link", "fa-image")}
          {field("videoLink", "Video Link", "fa-video")}
          {field("duration", "Duration", "fa-clock")}
          {field("description", "Description", "fa-align-left")}
          {field("category", "Category", "fa-tags")}

          <button type="submit" disabled={loading}>
            <i className="fas fa-plus-circle"></i>{" "}
            {loading ? "Adding..." : "Add"}
          </button>
        </form>

        {result && (
          <div
            className="api-result"
            style={{
              marginTop: "15px",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "13px",
              background: result.success
                ? "rgba(76,175,80,0.15)"
                : "rgba(255,65,65,0.15)",
              border: `1px solid ${result.success ? "#4CAF50" : "#ff4141"}`
            }}
          >
            <div>Message: {result.message}</div>
            {result.apiSuccess !== undefined && (
              <div>
                API Sync:{" "}
                {result.apiSuccess ? "✅ Success" : "❌ Failed"} —{" "}
                {result.apiMessage}
              </div>
            )}
          </div>
        )}
      </div>

      <div
        id="toast"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.85)",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: "6px",
          opacity: toastMsg ? 1 : 0,
          pointerEvents: "none",
          transition: "0.5s",
          zIndex: 9999
        }}
      >
        {toastMsg}
      </div>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <style jsx>{`
        .container {
          max-width: 700px;
          margin: 0 auto;
        }

        .card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          padding: 25px;
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }

        h2 {
          text-align: center;
          margin-bottom: 25px;
        }

        .field {
          margin-bottom: 18px;
        }

        label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .input-wrapper {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .input-box {
          position: relative;
          flex: 1;
        }

        .input-box i {
          position: absolute;
          top: 50%;
          left: 12px;
          transform: translateY(-50%);
          color: #aaa;
          font-size: 14px;
        }

        input {
          width: 100%;
          padding: 10px 10px 10px 36px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: #00c6ff;
        }

        .input-btn {
          display: flex;
          gap: 6px;
        }

        .input-btn button {
          padding: 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s;
        }

        .copy-btn {
          background: #4caf50;
          color: #fff;
        }
        .copy-btn:hover {
          background: #3b8a40;
        }

        .paste-btn {
          background: #ffa726;
          color: #fff;
        }
        .paste-btn:hover {
          background: #fb8c00;
        }

        .clear-btn {
          background: #ff4141;
          color: #fff;
        }
        .clear-btn:hover {
          background: #d70000;
        }

        button[type="submit"] {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(45deg, #00c6ff, #0072ff);
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        button[type="submit"]:hover {
          transform: scale(1.03);
          box-shadow: 0 5px 15px rgba(0, 114, 255, 0.4);
        }

        @media (max-width: 480px) {
          .input-wrapper {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
