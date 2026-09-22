import React, { useEffect, useState } from "react";
import HeroContent from "../HeroContent";
import type { ThemeId } from "../themeConfig";

const useClock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
};

const pad = (n: number) => n.toString().padStart(2, "0");

const TeletextChrome: React.FC = () => {
  const now = useClock();
  const date = now
    .toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" })
    .toUpperCase();
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return (
    <>
      <div className="tt-header">
        <span>P100 BARSKY</span>
        <span>{date} {time}</span>
      </div>
      <div className="hero-inner-wrap"><HeroContent /></div>
      <div className="tt-footer">
        <span className="tt-tab tt-red">RED · Home</span>
        <span className="tt-tab tt-green">GREEN · Work</span>
        <span className="tt-tab tt-yellow">YELLOW · About</span>
        <span className="tt-tab tt-blue">BLUE · Contact</span>
      </div>
    </>
  );
};

const Sys7Chrome: React.FC = () => (
  <>
    <div className="sys7-menubar">
      <span className="sys7-apple"></span>
      <span>File</span><span>Edit</span><span>View</span><span>Special</span>
    </div>
    <div className="sys7-window">
      <div className="sys7-titlebar">
        <span className="sys7-close" />
        <span className="sys7-title">Barsky.Folder</span>
      </div>
      <div className="sys7-body"><HeroContent /></div>
    </div>
  </>
);

const VizChrome: React.FC = () => {
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: 48 }, () => 20 + Math.random() * 60)
  );
  useEffect(() => {
    const id = setInterval(() => {
      setBars((prev) => {
        const next = prev.slice(1);
        next.push(20 + Math.random() * 60);
        return next;
      });
    }, 180);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <div className="viz-grid" aria-hidden />
      <div className="viz-sparkline" aria-hidden>
        {bars.map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="viz-stats" aria-hidden>
        <div><span className="viz-stat-k">UPTIME</span><span className="viz-stat-v">99.97%</span></div>
        <div><span className="viz-stat-k">SHIPPED</span><span className="viz-stat-v">04</span></div>
        <div><span className="viz-stat-k">REGION</span><span className="viz-stat-v">NJ-01</span></div>
      </div>
      <div className="hero-inner-wrap"><HeroContent /></div>
    </>
  );
};

const WorkbenchChrome: React.FC = () => {
  const scrollTo = (sel: string) => {
    const el = document.querySelector(sel);
    el?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="wb-iconrow">
        <button className="wb-icon" onClick={() => scrollTo("#projects")}>
          <span className="wb-icon-glyph">▣</span>
          <span>Projects</span>
        </button>
        <button className="wb-icon" onClick={() => scrollTo("#about")}>
          <span className="wb-icon-glyph">◆</span>
          <span>About</span>
        </button>
        <button className="wb-icon" onClick={() => scrollTo("footer")}>
          <span className="wb-icon-glyph">✉</span>
          <span>Contact</span>
        </button>
      </div>
      <div className="wb-window">
        <div className="wb-titlebar">
          <span className="wb-dots">
            <i /><i /><i /><i />
          </span>
          Workbench 1.3 — Barsky
        </div>
        <div className="wb-body"><HeroContent /></div>
      </div>
    </>
  );
};

const STORAGE_LIKES = "barsky-2010s-likes";

const TwentyTensChrome: React.FC = () => {
  const [likes, setLikes] = useState<number>(() => {
    if (typeof window === "undefined") return 247;
    const v = window.localStorage.getItem(STORAGE_LIKES);
    return v ? parseInt(v, 10) : 247;
  });
  const [liked, setLiked] = useState(false);
  const onLike = () => {
    const next = liked ? likes - 1 : likes + 1;
    setLikes(next);
    setLiked(!liked);
    try { window.localStorage.setItem(STORAGE_LIKES, String(next)); } catch {}
  };
  return (
    <>
      <div className="t2010-statusbar">
        <span className="t2010-logo">b</span>
        <span className="t2010-search">Search</span>
        <span className="t2010-nav">Home · Profile · Messages</span>
      </div>
      <div className="t2010-card">
        <div className="t2010-cover" />
        <div className="t2010-body"><HeroContent /></div>
        <div className="t2010-actions">
          <button
            type="button"
            className={`t2010-like ${liked ? "is-liked" : ""}`}
            onClick={onLike}
            aria-pressed={liked}
          >
            👍 Like · {likes.toLocaleString()}
          </button>
          <span className="t2010-meta">· Comment · Share</span>
        </div>
      </div>
    </>
  );
};

interface Props { themeId: ThemeId; }

const StructuralHero: React.FC<Props> = ({ themeId }) => {
  switch (themeId) {
    case "teletext":  return <TeletextChrome />;
    case "sys7":      return <Sys7Chrome />;
    case "viz":       return <VizChrome />;
    case "workbench": return <WorkbenchChrome />;
    case "2010s":     return <TwentyTensChrome />;
    case "simple":
    default:          return <HeroContent />;
  }
};

export default StructuralHero;
