import React, { useEffect, useMemo, useRef } from "react";
import HeroContent from "./HeroContent";
import SkyEffects from "./SkyEffects";
import mountainsSprite from "@/assets/parallax-mountains.png";



const ParallaxHero: React.FC = () => {
  const skyRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const mountainsRef = useRef<HTMLDivElement>(null);

  const stars = useMemo(() => {
    const rng = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    };
    const r = rng(42);
    return Array.from({ length: 80 }, () => {
      const angle = r() * Math.PI * 2;
      const dist = 8 + r() * 12;
      return {
        x: r() * 100,
        y: r() * 85,
        size: r() > 0.85 ? 3 : 2,
        depth: r() * 0.6 + 0.4,
        driftX: Math.cos(angle) * dist,
        driftY: Math.sin(angle) * dist,
        driftDur: 6 + r() * 14,
        driftDelay: r() * 8,
        twinkleDur: 2 + r() * 3,
        twinkleDelay: r() * 8,
      };
    });
  }, []);

  useEffect(() => {
    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMx = 0;
    let targetMy = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const mx = mouseX;
        const my = mouseY;
        if (skyRef.current) skyRef.current.style.transform = `translate3d(${mx * 0.3}px, ${y * 0.05 + my * 0.3}px, 0)`;
        if (starsRef.current) starsRef.current.style.transform = `translate3d(${mx * 0.8}px, ${y * 0.15 + my * 0.8}px, 0)`;
        if (mountainsRef.current) mountainsRef.current.style.transform = `translate3d(${mx * 1.5}px, ${y * 0.25 + my * 1.5}px, 0)`;
        // Subtle name tilt — max ±3deg
        const nameEl = document.querySelector<HTMLElement>(".parallax-content .hero-name");
        if (nameEl) {
          const rx = (-my / 10) * 3;
          const ry = (mx / 10) * 3;
          nameEl.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        }
        raf = 0;
      });
    };

    const tick = () => {
      mouseX += (targetMx - mouseX) * 0.08;
      mouseY += (targetMy - mouseY) * 0.08;
      onScroll();
      requestAnimationFrame(tick);
    };

    const onMouse = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetMx = nx * 10;
      targetMy = ny * 10;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    const id = requestAnimationFrame(tick);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <section
      data-theme="3d"
      aria-label="Hiram Barsky portfolio hero"
      className="parallax-hero"
    >
      {/* Layer 1: Sky gradient */}
      <div
        ref={skyRef}
        aria-hidden
        className="parallax-sky"
      />

      {/* Layer 2: Stars */}
      <div ref={starsRef} aria-hidden className="parallax-stars">
        {stars.map((s, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: `rgba(255,255,255,${0.4 + s.depth * 0.4})`,
              boxShadow: s.size === 3 ? "0 0 4px rgba(255,255,255,0.4)" : undefined,
              ["--drift-x" as any]: `${s.driftX}px`,
              ["--drift-y" as any]: `${s.driftY}px`,
              ["--drift-dur" as any]: `${s.driftDur}s`,
              ["--drift-delay" as any]: `${s.driftDelay}s`,
              ["--twinkle-dur" as any]: `${s.twinkleDur}s`,
              ["--twinkle-delay" as any]: `${s.twinkleDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 3: Mountains (hand-illustrated, drifting seamless loop) */}
      <div ref={mountainsRef} aria-hidden className="parallax-mountains">
        <div className="parallax-mountains-drift parallax-mountains-back">
          {[0, 1].map((i) => (
            <svg key={i} viewBox="0 0 1200 260" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`mb-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2a1838" />
                  <stop offset="100%" stopColor="#120a1c" />
                </linearGradient>
              </defs>
              <path
                d="M0,260 L0,170 C 60,150 90,135 140,128 L 200,90 L 240,118 C 290,130 320,118 360,108 L 430,60 L 480,98 L 520,82 L 560,112 L 640,55 L 700,100 L 740,86 L 820,118 L 880,75 L 940,110 L 1000,72 L 1060,108 L 1120,92 L 1200,130 L 1200,260 Z"
                fill={`url(#mb-grad-${i})`}
              />
              <path d="M425,68 L440,60 L455,72 L448,76 L440,72 L432,76 Z" fill="#d8d3e8" opacity="0.55" />
              <path d="M635,62 L644,55 L656,68 L650,72 L644,68 L638,72 Z" fill="#d8d3e8" opacity="0.5" />
              <path d="M195,98 L202,90 L212,102 L206,106 L202,102 L198,106 Z" fill="#d8d3e8" opacity="0.4" />
            </svg>
          ))}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {[0, 1].map((i) => (
            <svg key={i} viewBox="0 0 1200 260" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`mf-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#15101c" />
                  <stop offset="100%" stopColor="#050308" />
                </linearGradient>
              </defs>
              <path
                d="M0,260 L0,200 L 80,150 L 130,180 L 180,140 L 230,178 L 300,110 L 360,170 L 410,138 L 480,180 L 540,118 L 600,168 L 680,128 L 740,172 L 800,140 L 870,182 L 930,125 L 1000,170 L 1070,138 L 1130,178 L 1200,150 L 1200,260 Z"
                fill={`url(#mf-grad-${i})`}
              />
              {[60, 155, 260, 380, 505, 625, 760, 895, 1025, 1155].map((cx, idx) => (
                <g key={idx} opacity="0.85">
                  <path d={`M${cx},230 L${cx - 6},244 L${cx + 6},244 Z`} fill="#0a0610" />
                  <path d={`M${cx},220 L${cx - 8},240 L${cx + 8},240 Z`} fill="#0a0610" />
                </g>
              ))}
            </svg>
          ))}
        </div>
      </div>

      {/* Layer 4: Dynamic FX (shooting stars, meteors, airplanes) */}
      <SkyEffects />

      <div className="parallax-content">
        <HeroContent />
      </div>
    </section>
  );
};

export default ParallaxHero;
