import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HERO_PROJECTS } from "./projects";

const SPRITE_SIZE = 32;

const EightBitHero: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [x, setX] = useState(40);
  const [frame, setFrame] = useState(0);
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(true);
  const keysDown = useRef<Set<string>>(new Set());

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // Keyboard input + walk loop
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
        keysDown.current.add(e.key);
        if (e.key === " " && highlightIdx !== null) {
          navigate(HERO_PROJECTS[highlightIdx].to);
        }
      }
    };
    const onUp = (e: KeyboardEvent) => {
      keysDown.current.delete(e.key);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [highlightIdx, navigate]);

  // Walk loop
  useEffect(() => {
    let raf = 0;
    let frameCount = 0;
    const tick = () => {
      const containerW = containerRef.current?.clientWidth ?? window.innerWidth;
      let moved = false;
      if (keysDown.current.has("ArrowLeft")) {
        setX((prev) => {
          const next = prev - 3;
          return next < -SPRITE_SIZE ? containerW : next;
        });
        moved = true;
      }
      if (keysDown.current.has("ArrowRight")) {
        setX((prev) => {
          const next = prev + 3;
          return next > containerW ? -SPRITE_SIZE : next;
        });
        moved = true;
      }
      if (moved) {
        frameCount++;
        if (frameCount % 8 === 0) setFrame((f) => 1 - f);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Collision: which pill is sprite over?
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const spriteCenter = x + SPRITE_SIZE / 2;
    let foundIdx: number | null = null;
    pillRefs.current.forEach((pill, i) => {
      if (!pill) return;
      const r = pill.getBoundingClientRect();
      const left = r.left - containerRect.left;
      const right = r.right - containerRect.left;
      if (spriteCenter >= left && spriteCenter <= right) foundIdx = i;
    });
    setHighlightIdx(foundIdx);
  }, [x]);

  return (
    <div className="eightbit-hero" ref={containerRef}>
      <div className="eightbit-name">HIRAM BARSKY</div>
      <div className="eightbit-role">LEAD PRODUCT &amp; AI DESIGNER</div>
      <div className="eightbit-tagline">I DESIGN AI-FIRST PRODUCTS THAT SHIP.</div>

      <div className="eightbit-pills">
        {HERO_PROJECTS.map((p, i) => (
          <a
            key={p.id}
            ref={(el) => (pillRefs.current[i] = el)}
            href={p.to}
            className={`eightbit-pill ${highlightIdx === i ? "eightbit-pill--hot" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(p.to);
            }}
          >
            {p.label}
          </a>
        ))}
      </div>

      <div className="eightbit-sprite" style={{ left: x }} aria-hidden>
        <div className={`eightbit-sprite-grid eightbit-sprite-frame-${frame}`} />
      </div>

      {showHint && <div className="eightbit-hint">PRESS ← → TO EXPLORE · SPACE TO ENTER</div>}
    </div>
  );
};

export default EightBitHero;
