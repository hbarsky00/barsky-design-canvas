import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Palette } from "lucide-react";
import { THEMES, STORAGE_KEY, DEFAULT_THEME, type ThemeId } from "./themeConfig";

interface Props {
  themeId: ThemeId;
  onChange: (id: ThemeId) => void;
}

const StyleSwitcher: React.FC<Props> = ({ themeId, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const currentIndex = THEMES.findIndex((t) => t.id === themeId) + 1;

  useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current && !panelRef.current.contains(target) &&
        buttonRef.current && !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const select = (id: ThemeId) => {
    onChange(id);
    setIsOpen(false);
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Change theme"
        aria-expanded={isOpen}
        style={{
          position: "fixed",
          top: 24,
          right: 24,
          zIndex: 9999,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "#7c6deb",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 20px rgba(124,109,235,0.4)",
        }}
      >
        <Palette size={22} color="#ffffff" />
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          style={{
            position: "fixed",
            top: 88,
            right: 24,
            zIndex: 9999,
            background: "#1a1a1a",
            borderRadius: 14,
            padding: 16,
            width: 320,
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
            {THEMES.map((t) => {
              const active = t.id === themeId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => select(t.id)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "12px 4px",
                    background: active ? "rgba(255,255,255,0.15)" : "transparent",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  <t.Icon size={22} color={t.color} />
                  <span style={{ fontSize: 10, color: "#aaa", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
          <div
            style={{
              marginTop: 12,
              paddingTop: 10,
              borderTop: "0.5px solid #333",
              fontSize: 11,
              color: "#555",
              textAlign: "center",
              letterSpacing: "0.1em",
            }}
          >
            SYSTEM SELECT ({currentIndex}/{THEMES.length})
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export const useStoredTheme = () => {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    return saved && THEMES.some((t) => t.id === saved) ? saved : DEFAULT_THEME;
  });
  const update = (id: ThemeId) => {
    setThemeId(id);
    try { window.localStorage.setItem(STORAGE_KEY, id); } catch {}
  };
  return [themeId, update] as const;
};

export default StyleSwitcher;
