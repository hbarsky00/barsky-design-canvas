import React, { useEffect, useMemo, useRef } from "react";
import HeroContent from "./HeroContent";
import SkyEffects from "./SkyEffects";



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

      {/* Layer 3: Mountains (with drifting seamless loop) */}
      <div ref={mountainsRef} aria-hidden className="parallax-mountains">
        <div className="parallax-mountains-drift parallax-mountains-back">
          {[0, 1].map((i) => (
            <svg key={i} viewBox="0 0 1200 240" preserveAspectRatio="none">
              <path
                d="M0,240 L0,150 L80,110 L160,140 L240,90 L340,130 L440,80 L540,120 L640,70 L760,110 L880,90 L1000,130 L1100,100 L1200,140 L1200,240 Z"
                fill="#1a0f1f"
              />
            </svg>
          ))}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {[0, 1].map((i) => (
            <svg key={i} viewBox="0 0 1200 240" preserveAspectRatio="none">
              <path
                d="M0,240 L0,180 L100,140 L200,170 L300,120 L420,160 L520,110 L640,150 L760,120 L880,160 L1000,130 L1120,170 L1200,140 L1200,240 Z"
                fill="#0d0d0d"
              />
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
