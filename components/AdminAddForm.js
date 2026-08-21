"use client";

import { useRef, useState } from "react";

// Add new post (posts JSON to /api/admin/add with toast + result box)
const FIELDS = [
  { id: "routeName", label: "Route Name", icon: "fa-route", placeholder: "my-new-video-post" },
  { id: "title", label: "Title", icon: "fa-heading", placeholder: "Video title" },
  { id: "imageLink", label: "Image Link", icon: "fa-image", placeholder: "https://..." },
  { id: "videoLink", label: "Video Link", icon: "fa-video", placeholder: "https://..." },
  { id: "duration", label: "Duration", icon: "fa-clock", placeholder: "mm:ss" },
  { id: "description", label: "Description", icon: "fa-align-left", placeholder: "Short description" },
  { id: "category", label: "Category", icon: "fa-tags", placeholder: "cat1, cat2, cat3" }
];

export default function AdminAddForm() {
  const [toastMsg, setToastMsg] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const toastTimer = useRef(null);

  function showToast(msg) {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(""), 2500);
  }

  async function copyInput(id) {
    const input = document.getElementById(id);
    if (input) {
      await navigator.clipboard.writeText(input.value);
      showToast("Copied to clipboard");
    }
  }

  async function pasteInput(id) {
    try {
      const text = await navigator.clipboard.readText();
      document.getElementById(id).value = text;
      showToast("Pasted");
    } catch {
      showToast("Paste blocked by browser");
    }
  }

  function clearInput(id) {
    document.getElementById(id).value = "";
    showToast("Field cleared");
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
    <div className="adm-card">
      <form onSubmit={handleSubmit} ref={formRef} className="adm-form">
        {FIELDS.map((f) => (
          <div className="adm-field" key={f.id}>
            <label htmlFor={f.id}>{f.label}</label>
            <div className="adm-input-row">
              <div className="adm-input-box">
                <i className={`fas ${f.icon}`}></i>
                <input
                  id={f.id}
                  name={f.id}
                  required
                  placeholder={f.placeholder}
                  autoComplete="off"
                />
              </div>
              <div className="adm-input-tools">
                <button type="button" className="adm-chip chip-copy" onClick={() => copyInput(f.id)} title="Copy">
                  <i className="fas fa-copy"></i>
                </button>
                <button type="button" className="adm-chip chip-paste" onClick={() => pasteInput(f.id)} title="Paste">
                  <i className="fas fa-paste"></i>
                </button>
                <button type="button" className="adm-chip chip-clear" onClick={() => clearInput(f.id)} title="Clear">
                  <i className="fas fa-eraser"></i>
                </button>
              </div>
            </div>
          </div>
        ))}

        <button type="submit" className="adm-btn adm-btn-primary adm-btn-block" disabled={loading}>
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Adding...
            </>
          ) : (
            <>
              <i className="fas fa-circle-plus"></i> Add Post
            </>
          )}
        </button>
      </form>

      {result && (
        <div className={`adm-alert ${result.success ? "adm-alert-success" : "adm-alert-error"}`}>
          <b>{result.success ? "Success:" : "Failed:"}</b> {result.message}
          {result.apiSuccess !== undefined && (
            <div className="adm-alert-sub">
              API Sync: {result.apiSuccess ? "✅ Success" : "❌ Failed"} — {result.apiMessage}
            </div>
          )}
        </div>
      )}

      <div className={`adm-toast ${toastMsg ? "show" : ""}`}>{toastMsg}</div>
    </div>
  );
}