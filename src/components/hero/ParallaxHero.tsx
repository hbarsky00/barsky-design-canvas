import React, { useEffect, useMemo, useRef, useState } from "react";
import HeroContent from "./HeroContent";
import SkyEffects from "./SkyEffects";
import WeatherFX from "./WeatherFX";
import { SCENES, DEFAULT_SCENE_ID } from "./scenes";




const ParallaxHero: React.FC = () => {
  const skyRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const mountainsRef = useRef<HTMLDivElement>(null);
  const [isDay, setIsDay] = useState(false);
  const [sceneId, setSceneId] = useState<string>(DEFAULT_SCENE_ID);
  const activeScene = SCENES.find((s) => s.id === sceneId) ?? SCENES[0];
  const isFlatScene = activeScene.image !== null;
  // Text mode: flat scene's textMode wins; mountains keeps day/night driving it.
  const textMode = isFlatScene ? activeScene.textMode : (isDay ? "dark" : "light");


  useEffect(() => {
    const t = setTimeout(() => setIsDay((d) => !d), isDay ? 12000 : 12000);
    return () => clearTimeout(t);
  }, [isDay]);

  // Sync day/night to <body> so footer + body background can theme themselves
  useEffect(() => {
    document.body.dataset.daytime = isDay ? "day" : "night";
    return () => { delete document.body.dataset.daytime; };
  }, [isDay]);

  // When a flat scene is active, let its textMode drive the global --site-fg
  // so the footer (and any other body-scoped text) stays legible. Mountains
  // (live scene) clears this so the day/night binding takes over again.
  useEffect(() => {
    if (isFlatScene) {
      document.body.dataset.textMode = activeScene.textMode;
    } else {
      delete document.body.dataset.textMode;
    }
    return () => { delete document.body.dataset.textMode; };
  }, [isFlatScene, activeScene.textMode]);



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
      data-daytime={isDay ? "day" : "night"}
      data-scene={activeScene.id}
      data-text-mode={textMode}
      aria-label="Hiram Barsky portfolio hero"
      className={`parallax-hero ${isDay ? "is-day" : ""} ${isFlatScene ? "has-flat-scene" : ""}`}
    >
      {/* Flat scene overlay — single full-bleed image, crossfades over live scene */}
      <div className="parallax-scene-stack" aria-hidden>
        {SCENES.filter((s) => s.image).map((s) => (
          <img
            key={s.id}
            src={s.image as string}
            alt=""
            loading={s.id === sceneId ? "eager" : "lazy"}
            decoding="async"
            className={`parallax-scene-img ${s.id === sceneId ? "is-active" : ""}`}
          />
        ))}
      </div>

      {/* Sticky stack so only one viewport-sized scene is visible at a time */}
      <div className="parallax-bg-stack" aria-hidden>

        {/* Night sky */}
        <div ref={skyRef} className="parallax-sky" />
        {/* Day sky fades over night */}
        <div className="parallax-sky-day" />
        {/* Sun rises during day */}
        <div className="parallax-sun" />
        {/* Moon glows during night, with a friendly alien visitor */}
        <div className="parallax-moon">
          <div className="parallax-alien" aria-hidden>
            <div className="parallax-alien-bubble">Hi!</div>
            <svg className="parallax-alien-body" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
              {/* antenna */}
              <line x1="30" y1="14" x2="30" y2="4" stroke="#7cf6c4" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="30" cy="3" r="2.5" fill="#c8ff5e">
                <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
              </circle>
              {/* head */}
              <ellipse cx="30" cy="24" rx="14" ry="13" fill="#9ef0b8" stroke="#3aa676" strokeWidth="1" />
              {/* eyes */}
              <ellipse cx="24" cy="25" rx="3" ry="4" fill="#0b0f1a" />
              <ellipse cx="36" cy="25" rx="3" ry="4" fill="#0b0f1a" />
              <circle cx="25" cy="24" r="0.9" fill="#fff" />
              <circle cx="37" cy="24" r="0.9" fill="#fff" />
              {/* smile */}
              <path d="M25 31 Q30 34 35 31" stroke="#2a6a4a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              {/* body */}
              <path d="M20 36 Q30 34 40 36 L42 58 Q30 62 18 58 Z" fill="#9ef0b8" stroke="#3aa676" strokeWidth="1" />
              {/* waving arm */}
              <path className="parallax-alien-arm" d="M40 40 Q50 36 52 28" stroke="#9ef0b8" strokeWidth="4" fill="none" strokeLinecap="round" />
              <circle className="parallax-alien-hand" cx="52" cy="28" r="3" fill="#9ef0b8" stroke="#3aa676" strokeWidth="0.8" />
              {/* other arm */}
              <path d="M20 40 Q14 48 16 58" stroke="#9ef0b8" strokeWidth="4" fill="none" strokeLinecap="round" />
              {/* legs */}
              <rect x="22" y="56" width="5" height="10" rx="2" fill="#9ef0b8" stroke="#3aa676" strokeWidth="0.8" />
              <rect x="33" y="56" width="5" height="10" rx="2" fill="#9ef0b8" stroke="#3aa676" strokeWidth="0.8" />
            </svg>
          </div>
        </div>
        {/* Subtle daytime clouds */}
        <div className="parallax-clouds" aria-hidden>
          <span className="parallax-cloud parallax-cloud--1" />
          <span className="parallax-cloud parallax-cloud--2" />
          <span className="parallax-cloud parallax-cloud--3" />
          <span className="parallax-cloud parallax-cloud--4" />
        </div>

        {/* Stars */}
        <div ref={starsRef} className="parallax-stars">
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

        {/* Mountains (night) */}
        <div ref={mountainsRef} className="parallax-mountains">
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
              </svg>
            ))}
          </div>
        </div>

        {/* Day mountains — sunlit version that swaps in during daytime */}
        <div className="parallax-mountains parallax-mountains-day">
          <div className="parallax-mountains-drift parallax-mountains-back">
            {[0, 1].map((i) => (
              <svg key={i} viewBox="0 0 1200 260" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`mbd-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9ec5e8" />
                    <stop offset="100%" stopColor="#4f7fa8" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,260 L0,170 C 60,150 90,135 140,128 L 200,90 L 240,118 C 290,130 320,118 360,108 L 430,60 L 480,98 L 520,82 L 560,112 L 640,55 L 700,100 L 740,86 L 820,118 L 880,75 L 940,110 L 1000,72 L 1060,108 L 1120,92 L 1200,130 L 1200,260 Z"
                  fill={`url(#mbd-grad-${i})`}
                />
                <path d="M425,68 L440,60 L455,72 L448,76 L440,72 L432,76 Z" fill="#ffffff" opacity="0.85" />
                <path d="M635,62 L644,55 L656,68 L650,72 L644,68 L638,72 Z" fill="#ffffff" opacity="0.8" />
                <path d="M195,98 L202,90 L212,102 L206,106 L202,102 L198,106 Z" fill="#ffffff" opacity="0.7" />
              </svg>
            ))}
          </div>
          <div className="parallax-mountains-drift parallax-mountains-front">
            {[0, 1].map((i) => (
              <svg key={i} viewBox="0 0 1200 260" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`mfd-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3a6f9c" />
                    <stop offset="100%" stopColor="#1c3a5e" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,260 L0,200 L 80,150 L 130,180 L 180,140 L 230,178 L 300,110 L 360,170 L 410,138 L 480,180 L 540,118 L 600,168 L 680,128 L 740,172 L 800,140 L 870,182 L 930,125 L 1000,170 L 1070,138 L 1130,178 L 1200,150 L 1200,260 Z"
                  fill={`url(#mfd-grad-${i})`}
                />
              </svg>
            ))}
          </div>
        </div>

        {/* Dynamic FX — only over the live mountains scene; flat scenes bake their own sky */}
        {!isFlatScene && <SkyEffects />}
      </div>

      <div className="parallax-content">
        <HeroContent />
      </div>

      {/* Foreground weather + windshield wiper */}
      <WeatherFX />

    </section>

  );
};

export default ParallaxHero;

