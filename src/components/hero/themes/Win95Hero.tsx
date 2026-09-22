import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HERO_PROJECTS } from "./projects";

type WindowState = "normal" | "minimized" | "maximized";

const POS_KEY = "barsky-win95-pos";

const Win95Hero: React.FC = () => {
  const navigate = useNavigate();
  const [pos, setPos] = useState<{ x: number; y: number }>(() => {
    try {
      const raw = localStorage.getItem(POS_KEY);
      return raw ? JSON.parse(raw) : { x: 60, y: 60 };
    } catch {
      return { x: 60, y: 60 };
    }
  });
  const [winState, setWinState] = useState<WindowState>("normal");
  const [showCompose, setShowCompose] = useState(false);
  const [composeData, setComposeData] = useState({ to: "hbarsky01@gmail.com", subject: "", body: "" });
  const dragRef = useRef<{ ox: number; oy: number } | null>(null);

  // Drag handlers
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      setPos({ x: e.clientX - dragRef.current.ox, y: e.clientY - dragRef.current.oy });
    };
    const onUp = () => {
      if (dragRef.current) {
        dragRef.current = null;
        try {
          localStorage.setItem(POS_KEY, JSON.stringify(pos));
        } catch {
          /* noop */
        }
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [pos]);

  const startDrag = (e: React.MouseEvent) => {
    if (winState === "maximized") return;
    dragRef.current = { ox: e.clientX - pos.x, oy: e.clientY - pos.y };
  };

  const windowStyle: React.CSSProperties =
    winState === "maximized"
      ? { left: 8, top: 8, right: 8, width: "auto" }
      : { left: pos.x, top: pos.y, width: 480 };

  const openIcon = (id: string) => {
    if (id === "work") {
      const list = document.getElementById("win95-product-list");
      list?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (id === "contact") {
      setShowCompose(true);
    } else if (id === "github") {
      window.open("https://github.com/hbarsky", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="win95-hero">
      <div className="win95-desktop">
        {[
          { id: "work", label: "My Work" },
          { id: "contact", label: "Contact" },
          { id: "github", label: "GitHub" },
        ].map((icon) => (
          <button
            key={icon.id}
            className="win95-icon"
            onDoubleClick={() => openIcon(icon.id)}
            aria-label={`Open ${icon.label}`}
          >
            <div className="win95-icon-glyph" aria-hidden>
              {icon.id === "work" ? "📁" : icon.id === "contact" ? "✉" : "🐙"}
            </div>
            <span>{icon.label}</span>
          </button>
        ))}
      </div>

      <div
        className={`win95-window win95-window--${winState}`}
        style={winState === "minimized" ? { left: pos.x, top: pos.y, width: 280 } : windowStyle}
      >
        <div className="win95-titlebar" onMouseDown={startDrag}>
          <span className="win95-title">HIRAM_BARSKY.EXE</span>
          <div className="win95-titlebar-buttons">
            <button onClick={() => setWinState(winState === "minimized" ? "normal" : "minimized")} aria-label="Minimize">_</button>
            <button onClick={() => setWinState(winState === "maximized" ? "normal" : "maximized")} aria-label="Maximize">□</button>
          </div>
        </div>
        {winState !== "minimized" && (
          <div className="win95-body">
            <div className="win95-name">HIRAM BARSKY</div>
            <div className="win95-role">Lead Product &amp; AI Designer · Clifton, NJ</div>
            <div className="win95-bio">I design AI-first products that ship.</div>

            <div className="win95-section-label">Shipped Products &amp; Concepts</div>
            <ul id="win95-product-list" className="win95-list">
              {HERO_PROJECTS.map((p) => (
                <li key={p.id}>
                  <Link to={p.to}>{p.label}</Link> — {p.desc}
                </li>
              ))}
            </ul>

            <div className="win95-statusbar">Ready</div>
          </div>
        )}
      </div>

      {showCompose && (
        <div className="win95-window win95-compose" style={{ left: pos.x + 60, top: pos.y + 80, width: 380 }}>
          <div className="win95-titlebar">
            <span className="win95-title">New Message</span>
            <div className="win95-titlebar-buttons">
              <button onClick={() => setShowCompose(false)} aria-label="Close">×</button>
            </div>
          </div>
          <div className="win95-body">
            <label className="win95-field">
              <span>To:</span>
              <input value={composeData.to} onChange={(e) => setComposeData({ ...composeData, to: e.target.value })} />
            </label>
            <label className="win95-field">
              <span>Subject:</span>
              <input value={composeData.subject} onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })} />
            </label>
            <label className="win95-field win95-field--block">
              <span>Message:</span>
              <textarea
                rows={5}
                value={composeData.body}
                onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
              />
            </label>
            <div className="win95-compose-actions">
              <button
                className="win95-btn"
                onClick={() => {
                  const url = `mailto:${encodeURIComponent(composeData.to)}?subject=${encodeURIComponent(
                    composeData.subject
                  )}&body=${encodeURIComponent(composeData.body)}`;
                  window.location.href = url;
                  setShowCompose(false);
                }}
              >
                Send
              </button>
              <button className="win95-btn" onClick={() => setShowCompose(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Win95Hero;
