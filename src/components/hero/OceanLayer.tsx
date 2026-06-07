import React, { useEffect, useRef } from "react";

/**
 * Ocean scene layer for the hero. Replaces the mountain silhouettes on its
 * auto-cycle while keeping sky / sun / moon / stars / weather intact.
 *
 * - Three drifting wave bands (animated via existing CSS keyframes).
 * - A small fishing boat silhouette drifting slowly across the horizon.
 * - Occasional fish that arcs out of the water and splashes back.
 *
 * No user controls. Purely ambient.
 */
const OceanLayer: React.FC = () => {
  const fishRootRef = useRef<HTMLDivElement>(null);

  // Sporadic jumping fish — one at a time, random horizontal position.
  useEffect(() => {
    const root = fishRootRef.current;
    if (!root) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const spawnFish = () => {
      if (cancelled) return;
      const el = document.createElement("span");
      el.className = "ocean-fish";
      // keep fish away from the boat / edges
      const leftPct = 10 + Math.random() * 75;
      const flip = Math.random() < 0.5 ? -1 : 1;
      el.style.left = `${leftPct}%`;
      el.style.setProperty("--fish-flip", String(flip));
      root.appendChild(el);
      const remove = setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 2200);
      timeouts.push(remove);
      const next = setTimeout(spawnFish, 6000 + Math.random() * 10000);
      timeouts.push(next);
    };

    const first = setTimeout(spawnFish, 3500);
    timeouts.push(first);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
      while (root.firstChild) root.removeChild(root.firstChild);
    };
  }, []);

  return (
    <div className="parallax-ocean" aria-hidden>
      {/* Distant fishing boat on the horizon */}
      <div className="ocean-boat-track">
        <svg
          className="ocean-boat"
          viewBox="0 0 80 40"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* hull */}
          <path
            d="M6,26 L74,26 L66,34 L14,34 Z"
            fill="#0b1722"
            opacity="0.85"
          />
          {/* mast + fishing rod */}
          <line x1="40" y1="26" x2="40" y2="8" stroke="#0b1722" strokeWidth="1.2" />
          <line x1="40" y1="10" x2="58" y2="20" stroke="#0b1722" strokeWidth="0.8" />
          {/* angler silhouette */}
          <circle cx="30" cy="22" r="2" fill="#0b1722" />
          <rect x="29" y="23" width="2" height="4" fill="#0b1722" />
          {/* line dropping to water */}
          <line
            x1="58"
            y1="20"
            x2="60"
            y2="34"
            stroke="#0b1722"
            strokeWidth="0.4"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Water bands (back -> front, deepest to lightest) */}
      <svg
        className="wave wave-back"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C150,30 300,90 450,60 C600,30 750,90 900,60 C1050,30 1150,90 1200,60 L1200,120 L0,120 Z"
          fill="hsl(210 55% 28%)"
          opacity="0.85"
        />
      </svg>
      <svg
        className="wave wave-mid"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,70 C160,45 320,95 480,70 C640,45 800,95 960,70 C1080,55 1160,90 1200,75 L1200,120 L0,120 Z"
          fill="hsl(205 58% 38%)"
          opacity="0.9"
        />
      </svg>
      <svg
        className="wave wave-front"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,82 C140,60 280,100 420,82 C560,64 700,100 840,82 C980,64 1100,100 1200,86 L1200,120 L0,120 Z"
          fill="hsl(200 62% 48%)"
        />
      </svg>

      {/* Container for sporadic jumping fish */}
      <div ref={fishRootRef} className="ocean-fish-layer" />
    </div>
  );
};

export default OceanLayer;
