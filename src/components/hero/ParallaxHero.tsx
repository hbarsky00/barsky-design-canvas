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

  // Auto-cycle through scenes every 18s. Resets whenever scene changes
  // (manual dot clicks reset the timer naturally via dependency).
  useEffect(() => {
    const t = setTimeout(() => {
      const idx = SCENES.findIndex((s) => s.id === sceneId);
      const next = SCENES[(idx + 1) % SCENES.length];
      setSceneId(next.id);
    }, 18000);
    return () => clearTimeout(t);
  }, [sceneId]);


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
        {/* Moon glows during night */}
        <div className="parallax-moon" />
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
                  d="M0,260 L0,180 L 90,140 L 160,170 L 220,70 L 290,140 L 350,95 L 420,30 L 490,110 L 560,75 L 640,140 L 720,45 L 790,120 L 860,80 L 930,135 L 1000,55 L 1080,125 L 1160,90 L 1200,115 L 1200,260 Z"
                  fill={`url(#mb-grad-${i})`}
                />
                <path d="M408,48 L414,40 L420,30 L426,42 L432,48 L426,46 L420,44 L414,46 Z" fill="#d8d3e8" opacity="0.6" />
                <path d="M708,62 L714,54 L720,45 L726,55 L732,62 L726,60 L720,58 L714,60 Z" fill="#d8d3e8" opacity="0.55" />
                <path d="M988,72 L994,64 L1000,55 L1006,65 L1012,72 L1006,70 L1000,68 L994,70 Z" fill="#d8d3e8" opacity="0.5" />
                <path d="M210,86 L215,78 L220,70 L225,80 L230,86 L225,84 L220,82 L215,84 Z" fill="#d8d3e8" opacity="0.45" />
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
                  d="M0,260 L0,210 L 70,160 L 130,220 L 200,80 L 270,215 L 340,140 L 410,225 L 480,55 L 550,220 L 620,170 L 690,225 L 760,95 L 830,215 L 900,150 L 970,225 L 1040,75 L 1110,220 L 1180,165 L 1200,200 L 1200,260 Z"
                  fill={`url(#mf-grad-${i})`}
                />
                <path d="M468,76 L474,66 L480,55 L486,67 L492,76 L486,74 L480,71 L474,74 Z" fill="#d8d3e8" opacity="0.45" />
                <path d="M1028,96 L1034,86 L1040,75 L1046,87 L1052,96 L1046,94 L1040,91 L1034,94 Z" fill="#d8d3e8" opacity="0.4" />
                <path d="M188,100 L194,90 L200,80 L206,92 L212,100 L206,98 L200,95 L194,98 Z" fill="#d8d3e8" opacity="0.4" />
                <path d="M748,116 L754,106 L760,95 L766,107 L772,116 L766,114 L760,111 L754,114 Z" fill="#d8d3e8" opacity="0.35" />
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
                  d="M0,260 L0,180 L 90,140 L 160,170 L 220,70 L 290,140 L 350,95 L 420,30 L 490,110 L 560,75 L 640,140 L 720,45 L 790,120 L 860,80 L 930,135 L 1000,55 L 1080,125 L 1160,90 L 1200,115 L 1200,260 Z"
                  fill={`url(#mbd-grad-${i})`}
                />
                <path d="M408,48 L414,40 L420,30 L426,42 L432,48 L426,46 L420,44 L414,46 Z" fill="#ffffff" opacity="0.9" />
                <path d="M708,62 L714,54 L720,45 L726,55 L732,62 L726,60 L720,58 L714,60 Z" fill="#ffffff" opacity="0.85" />
                <path d="M988,72 L994,64 L1000,55 L1006,65 L1012,72 L1006,70 L1000,68 L994,70 Z" fill="#ffffff" opacity="0.8" />
                <path d="M210,86 L215,78 L220,70 L225,80 L230,86 L225,84 L220,82 L215,84 Z" fill="#ffffff" opacity="0.75" />
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
                  d="M0,260 L0,210 L 70,160 L 130,220 L 200,80 L 270,215 L 340,140 L 410,225 L 480,55 L 550,220 L 620,170 L 690,225 L 760,95 L 830,215 L 900,150 L 970,225 L 1040,75 L 1110,220 L 1180,165 L 1200,200 L 1200,260 Z"
                  fill={`url(#mfd-grad-${i})`}
                />
                <path d="M468,76 L474,66 L480,55 L486,67 L492,76 L486,74 L480,71 L474,74 Z" fill="#ffffff" opacity="0.85" />
                <path d="M1028,96 L1034,86 L1040,75 L1046,87 L1052,96 L1046,94 L1040,91 L1034,94 Z" fill="#ffffff" opacity="0.8" />
                <path d="M188,100 L194,90 L200,80 L206,92 L212,100 L206,98 L200,95 L194,98 Z" fill="#ffffff" opacity="0.8" />
                <path d="M748,116 L754,106 L760,95 L766,107 L772,116 L766,114 L760,111 L754,114 Z" fill="#ffffff" opacity="0.75" />
              </svg>
            ))}
          </div>
        </div>

        {/* City skyline (night) — drifts like the mountains */}
        <div className="parallax-city">
          <div className="parallax-mountains-drift parallax-city-back">
            {[0, 1].map((i) => (
              <svg key={`cbn-${i}`} viewBox="0 0 1200 260" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`cb-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2a1838" />
                    <stop offset="100%" stopColor="#120a1c" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,260 L0,170 L60,170 L60,140 L120,140 L120,180 L180,180 L180,120 L240,120 L240,160 L320,160 L320,100 L380,100 L380,150 L460,150 L460,130 L520,130 L520,170 L600,170 L600,110 L680,110 L680,150 L760,150 L760,135 L840,135 L840,170 L920,170 L920,125 L1000,125 L1000,160 L1080,160 L1080,140 L1140,140 L1140,175 L1200,175 L1200,260 Z"
                  fill={`url(#cb-grad-${i})`}
                />
              </svg>
            ))}
          </div>
          <div className="parallax-mountains-drift parallax-city-front">
            {[0, 1].map((i) => (
              <svg key={`cfn-${i}`} viewBox="0 0 1200 260" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`cf-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#15101c" />
                    <stop offset="100%" stopColor="#050308" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,260 L0,210 L80,210 L80,170 L150,170 L150,200 L220,200 L220,140 L260,140 L260,90 L300,90 L300,150 L370,150 L370,180 L450,180 L450,120 L520,120 L520,75 L560,75 L560,160 L640,160 L640,135 L720,135 L720,180 L800,180 L800,100 L860,100 L860,165 L940,165 L940,130 L1010,130 L1010,175 L1090,175 L1090,150 L1160,150 L1160,195 L1200,195 L1200,260 Z"
                  fill={`url(#cf-grad-${i})`}
                />
                <rect x="278" y="70" width="2" height="20" fill="#050308" />
                <rect x="538" y="55" width="2" height="20" fill="#050308" />
                <rect x="828" y="80" width="2" height="20" fill="#050308" />
                {Array.from({ length: 70 }).map((_, w) => {
                  const xs = [85,105,125,160,180,200,230,245,270,295,310,330,350,380,400,420,460,480,500,520,540,570,590,610,630,650,670,690,710,730,750,770,810,830,850,870,890,910,930,950,970,990,1020,1040,1060,1080,1100,1120,1140,1160];
                  const x = xs[w % xs.length];
                  const yBase = 95 + ((w * 19) % 80);
                  return (
                    <rect
                      key={`win-${i}-${w}`}
                      x={x}
                      y={yBase}
                      width="3"
                      height="4"
                      fill="#ffd27a"
                      opacity={0.55 + ((w * 31) % 45) / 100}
                    />
                  );
                })}
              </svg>
            ))}
          </div>
        </div>

        {/* City skyline (day) — sunlit version */}
        <div className="parallax-city parallax-city-day-wrap">
          <div className="parallax-mountains-drift parallax-city-back">
            {[0, 1].map((i) => (
              <svg key={`cbd-${i}`} viewBox="0 0 1200 260" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`cbd-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9ec5e8" />
                    <stop offset="100%" stopColor="#4f7fa8" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,260 L0,170 L60,170 L60,140 L120,140 L120,180 L180,180 L180,120 L240,120 L240,160 L320,160 L320,100 L380,100 L380,150 L460,150 L460,130 L520,130 L520,170 L600,170 L600,110 L680,110 L680,150 L760,150 L760,135 L840,135 L840,170 L920,170 L920,125 L1000,125 L1000,160 L1080,160 L1080,140 L1140,140 L1140,175 L1200,175 L1200,260 Z"
                  fill={`url(#cbd-grad-${i})`}
                />
              </svg>
            ))}
          </div>
          <div className="parallax-mountains-drift parallax-city-front">
            {[0, 1].map((i) => (
              <svg key={`cfd-${i}`} viewBox="0 0 1200 260" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`cfd-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3a6f9c" />
                    <stop offset="100%" stopColor="#1c3a5e" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,260 L0,210 L80,210 L80,170 L150,170 L150,200 L220,200 L220,140 L260,140 L260,90 L300,90 L300,150 L370,150 L370,180 L450,180 L450,120 L520,120 L520,75 L560,75 L560,160 L640,160 L640,135 L720,135 L720,180 L800,180 L800,100 L860,100 L860,165 L940,165 L940,130 L1010,130 L1010,175 L1090,175 L1090,150 L1160,150 L1160,195 L1200,195 L1200,260 Z"
                  fill={`url(#cfd-grad-${i})`}
                />
                <rect x="278" y="70" width="2" height="20" fill="#1c3a5e" />
                <rect x="538" y="55" width="2" height="20" fill="#1c3a5e" />
                <rect x="828" y="80" width="2" height="20" fill="#1c3a5e" />
              </svg>
            ))}
          </div>
        </div>



        {/* Bald eagles soaring (daytime only) */}
        <div className="parallax-eagles" aria-hidden>
          {[
            { delay: "0s", duration: "42s", top: "22%", scale: 1 },
            { delay: "-16s", duration: "54s", top: "14%", scale: 0.65 },
            { delay: "-32s", duration: "60s", top: "32%", scale: 0.5 },
          ].map((e, i) => (
            <svg
              key={i}
              className="parallax-eagle"
              viewBox="0 0 120 44"
              style={{
                top: e.top,
                animationDelay: e.delay,
                animationDuration: e.duration,
                ["--eagle-scale" as any]: e.scale,
              }}
            >
              {/* Soaring bald eagle silhouette: fingered wingtips, head, fanned tail */}
              <path
                d="M60,22
                   C 58,18 56,16 54,15
                   C 50,14 46,15 42,17
                   C 38,15 34,12 30,11
                   L 31,14 L 27,13 L 28,16 L 24,15 L 25,18 L 21,17 L 22,20
                   C 18,19 14,19 10,20
                   C 16,22 22,23 28,23
                   C 34,24 40,24 46,23
                   C 50,23 54,23 58,24
                   L 60,28
                   L 62,24
                   C 66,23 70,23 74,23
                   C 80,24 86,24 92,23
                   C 98,23 104,22 110,20
                   C 106,19 102,19 98,20
                   L 99,17 L 95,18 L 96,15 L 92,16 L 93,13 L 89,14 L 90,11
                   C 86,12 82,15 78,17
                   C 74,15 70,14 66,15
                   C 64,16 62,18 60,22 Z"
                fill="#1a1410"
              />
              {/* Small white head */}
              <ellipse cx="60" cy="20" rx="2.4" ry="1.8" fill="#f4ede0" />
              {/* Beak hint */}
              <path d="M60,21 L62.2,22 L60,22.4 Z" fill="#d9a23a" />
              {/* Fanned white tail */}
              <path d="M58,24 L60,30 L62,24 Z" fill="#f4ede0" opacity="0.95" />
            </svg>

          ))}
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

