import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { THEMES, STORAGE_KEY, DEFAULT_THEME, type ThemeId } from "./themeConfig";

interface Props {
  themeId: ThemeId;
  onChange: (id: ThemeId) => void;
}

const StyleSwitcher: React.FC<Props> = ({ themeId, onChange }) => {
  const [open, setOpen] = useState(false);
  const current = THEMES.find((t) => t.id === themeId) || THEMES[14];
  const currentIndex = THEMES.findIndex((t) => t.id === themeId) + 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const tryAnother = () => {
    const others = THEMES.filter((t) => t.id !== themeId);
    const next = others[Math.floor(Math.random() * others.length)];
    onChange(next.id);
  };

  const select = (id: ThemeId) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <>
      <div className="style-switcher-bar">
        <span>Viewing:</span>
        <button className="pill" onClick={() => setOpen(true)} aria-label="Change theme">
          <span className="dot" style={{ background: current.color }} />
          <current.Icon size={14} color={current.color} />
          <strong>{current.label}</strong>
          <ChevronDown size={12} />
        </button>
        <span>version.</span>
        <button className="try-link" onClick={tryAnother}>Try another?</button>
      </div>

      {open && (
        <div className="style-switcher-modal-overlay" onClick={() => setOpen(false)}>
          <div className="style-switcher-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-grid">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  className={`mode-btn ${t.id === themeId ? "active" : ""}`}
                  onClick={() => select(t.id)}
                >
                  <span className="icon-dot" style={{ background: t.id === themeId ? "transparent" : `${t.color}22`, border: `1px solid ${t.color}` }}>
                    <t.Icon size={16} color={t.color} />
                  </span>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="modal-footer">SYSTEM SELECT ({currentIndex}/{THEMES.length})</div>
          </div>
        </div>
      )}
    </>
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
