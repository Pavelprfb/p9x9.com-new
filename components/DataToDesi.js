"use client";

import { useEffect, useRef, useState } from "react";

// Same as old views/allData.ejs (forms post to movieb-f42x.onrender.com)
export default function DataToDesi({ allData }) {
  const [toastMsg, setToastMsg] = useState("");
  const [hiddenCount, setHiddenCount] = useState(0);
  const [visibleCount, setVisibleCount] = useState(allData.length);
  const cardsRef = useRef(null);

  function showToast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2000);
  }

  function updateCount() {
    const allCards = document.querySelectorAll(".data-card");
    let hidden = 0;
    let visible = 0;

    allCards.forEach((card) => {
      if (card.style.display === "none") {
        hidden++;
      } else {
        visible++;
      }
    });

    setHiddenCount(hidden);
    setVisibleCount(visible);
  }

  useEffect(() => {
    // 🔥 HIDE + LOCAL STORAGE (same as old page)
    window.hideData = (id) => {
      const card = document.getElementById("card-" + id);
      if (card) card.style.display = "none";

      localStorage.setItem("hide_" + id, "true");

      showToast("Hidden");
      updateCount();
    };

    // 🔄 ON LOAD
    allData.forEach((data) => {
      if (localStorage.getItem("hide_" + data.id) === "true") {
        const card = document.getElementById("card-" + data.id);
        if (card) card.style.display = "none";
      }
    });

    updateCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.clearAllData = () => {
      localStorage.clear();
      showToast("All Data Cleared");
      location.reload();
    };

    window.copyInput = (btn) => {
      const input = btn.closest(".input-group").querySelector("input");
      navigator.clipboard.writeText(input.value);
      showToast("Copied");
    };

    window.pasteInput = async (btn) => {
      const input = btn.closest(".input-group").querySelector("input");
      try {
        input.value = await navigator.clipboard.readText();
        showToast("Pasted");
      } catch {
        showToast("Blocked");
      }
    };

    window.clearInput = (btn) => {
      const input = btn.closest(".input-group").querySelector("input");
      input.value = "";
      showToast("Cleared");
    };
  }, []);

  function linkGroup(label, value) {
    return (
      <div className="input-group">
        <div style={{ width: "100%", fontSize: "13px", marginBottom: "4px", color: "#ccc" }}>
          {label}
        </div>
        <div className="input-box">
          <i className="fa fa-link"></i>
          <input value={value} readOnly />
        </div>
        <div className="actions">
          <button type="button" className="copy-btn" onClick={(e) => copyInputHandler(e)}>
            Copy
          </button>
          <button type="button" className="paste-btn" onClick={(e) => pasteInputHandler(e)}>
            Paste
          </button>
          <button type="button" className="clear-btn" onClick={(e) => clearInputHandler(e)}>
            Clear
          </button>
        </div>
      </div>
    );
  }

  function copyInputHandler(e) {
    const input = e.currentTarget.closest(".input-group").querySelector("input");
    navigator.clipboard.writeText(input.value);
    showToast("Copied");
  }

  async function pasteInputHandler(e) {
    const input = e.currentTarget.closest(".input-group").querySelector("input");
    try {
      input.value = await navigator.clipboard.readText();
      showToast("Pasted");
    } catch {
      showToast("Blocked");
    }
  }

  function clearInputHandler(e) {
    const input = e.currentTarget.closest(".input-group").querySelector("input");
    input.value = "";
    showToast("Cleared");
  }

  return (
    <>
      <h2>Data To Desi.P9X9</h2>

      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <button
          onClick={() => window.clearAllData && window.clearAllData()}
          style={{
            padding: "10px 15px",
            border: "none",
            borderRadius: "8px",
            background: "#ff4141",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Clear All Data
        </button>

        <div style={{ marginTop: "8px", fontSize: "14px", color: "#ccc" }}>
          Hidden: <span id="hiddenCount">{hiddenCount}</span> | Visible:{" "}
          <span id="visibleCount">{visibleCount}</span>
        </div>
      </div>

      <div className="cards-container" ref={cardsRef}>
        {allData.map((data) => (
          <form
            className="data-card"
            id={`card-${data.id}`}
            key={data.id}
            action="https://movieb-f42x.onrender.com/add/p9x9-signle-data"
            method="post"
          >
            <div className="media-links">
              <a href={data.imageLink} target="_blank">
                <i className="fa fa-eye"></i> Open
              </a>
              <a href={`/download?url=${data.imageLink}`}>
                <i className="fa fa-download"></i> Download
              </a>
            </div>

            {/* desi.p9x9 */}
            <div className="input-group">
              <div style={{ width: "100%", fontSize: "13px", marginBottom: "4px", color: "#ccc" }}>
                DESI.P9X9.COM
              </div>
              <div className="input-box">
                <i className="fa fa-link"></i>
                <input value={`https://desi.p9x9.com/movie/${data.routeName}`} readOnly />
              </div>
              <div className="actions">
                <button type="button" className="copy-btn" onClick={(e) => copyInputHandler(e)}>Copy</button>
                <button type="button" className="paste-btn" onClick={(e) => pasteInputHandler(e)}>Paste</button>
                <button type="button" className="clear-btn" onClick={(e) => clearInputHandler(e)}>Clear</button>
              </div>
            </div>

            {/* p9x9 */}
            <div className="input-group">
              <div style={{ width: "100%", fontSize: "13px", marginBottom: "4px", color: "#ccc" }}>
                P9X9.COM
              </div>
              <div className="input-box">
                <i className="fa fa-link"></i>
                <input value={`https://p9x9.com/videos/${data.routeName}`} readOnly />
              </div>
              <div className="actions">
                <button type="button" className="copy-btn" onClick={(e) => copyInputHandler(e)}>Copy</button>
                <button type="button" className="paste-btn" onClick={(e) => pasteInputHandler(e)}>Paste</button>
                <button type="button" className="clear-btn" onClick={(e) => clearInputHandler(e)}>Clear</button>
              </div>
            </div>

            {/* Route */}
            <div className="input-group">
              <div style={{ width: "100%", fontSize: "13px", marginBottom: "4px", color: "#ccc" }}>
                Route Name
              </div>
              <div className="input-box">
                <i className="fa fa-link"></i>
                <input name="id" defaultValue={data.routeName} />
              </div>
              <div className="actions">
                <button type="button" className="copy-btn" onClick={(e) => copyInputHandler(e)}>Copy</button>
                <button type="button" className="paste-btn" onClick={(e) => pasteInputHandler(e)}>Paste</button>
                <button type="button" className="clear-btn" onClick={(e) => clearInputHandler(e)}>Clear</button>
              </div>
            </div>

            {/* Title */}
            <div className="input-group">
              <div style={{ width: "100%", fontSize: "13px", marginBottom: "4px", color: "#ccc" }}>
                Title
              </div>
              <div className="input-box">
                <i className="fa fa-heading"></i>
                <input name="hadding" defaultValue={data.title} />
              </div>
              <div className="actions">
                <button type="button" className="copy-btn" onClick={(e) => copyInputHandler(e)}>Copy</button>
                <button type="button" className="paste-btn" onClick={(e) => pasteInputHandler(e)}>Paste</button>
                <button type="button" className="clear-btn" onClick={(e) => clearInputHandler(e)}>Clear</button>
              </div>
            </div>

            {/* Image */}
            <div className="input-group">
              <div style={{ width: "100%", fontSize: "13px", marginBottom: "4px", color: "#ccc" }}>
                Image Link
              </div>
              <div className="input-box">
                <i className="fa fa-image"></i>
                <input name="img" defaultValue={data.imageLink} />
              </div>
              <div className="actions">
                <button type="button" className="copy-btn" onClick={(e) => copyInputHandler(e)}>Copy</button>
                <button type="button" className="paste-btn" onClick={(e) => pasteInputHandler(e)}>Paste</button>
                <button type="button" className="clear-btn" onClick={(e) => clearInputHandler(e)}>Clear</button>
              </div>
            </div>

            {/* Video */}
            <div className="input-group">
              <div style={{ width: "100%", fontSize: "13px", marginBottom: "4px", color: "#ccc" }}>
                Video Link
              </div>
              <div className="input-box">
                <i className="fa fa-video"></i>
                <input name="play" defaultValue={data.videoLink} />
              </div>
              <div className="actions">
                <button type="button" className="copy-btn" onClick={(e) => copyInputHandler(e)}>Copy</button>
                <button type="button" className="paste-btn" onClick={(e) => pasteInputHandler(e)}>Paste</button>
                <button type="button" className="clear-btn" onClick={(e) => clearInputHandler(e)}>Clear</button>
              </div>
            </div>

            <button className="submit-btn" type="submit">
              Submit
            </button>

            <button
              type="button"
              className="hide-btn"
              onClick={() => window.hideData && window.hideData(data.id)}
            >
              Hide
            </button>
          </form>
        ))}
      </div>

      <div id="toast">{toastMsg}</div>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <style jsx>{`
        h2 {
          text-align: center;
          margin: 10px;
        }

        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .data-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border-radius: 15px;
          padding: 15px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
          transition: 0.3s;
        }

        .data-card:hover {
          transform: translateY(-5px);
        }

        .media-links {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }

        .media-links a {
          flex: 1;
          text-align: center;
          padding: 8px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .media-links a:hover {
          background: #00c6ff;
        }

        .input-group {
          display: flex;
          gap: 6px;
          margin-bottom: 10px;
        }

        .input-box {
          position: relative;
          flex: 1;
        }

        .input-box i {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          color: #aaa;
          font-size: 13px;
        }

        input {
          width: 100%;
          padding: 10px 10px 10px 34px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 13px;
        }

        input:focus {
          outline: none;
          border-color: #00c6ff;
        }

        .actions {
          display: flex;
          gap: 5px;
        }

        .actions button {
          padding: 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .actions button i {
          pointer-events: none;
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

        .submit-btn {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(45deg, #00c6ff, #0072ff);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
        }

        .hide-btn {
          width: 100%;
          padding: 10px;
          margin-top: 6px;
          border: none;
          border-radius: 8px;
          background: #ff4141;
          color: #fff;
          cursor: pointer;
        }

        #toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.85);
          color: #fff;
          padding: 10px 18px;
          border-radius: 6px;
          opacity: ${toastMsg ? 1 : 0};
          transition: 0.5s;
          z-index: 9999;
        }

        @media (max-width: 500px) {
          .input-group {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
