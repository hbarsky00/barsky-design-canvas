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

        {/* City skyline (night) */}
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
                  d="M0,260 L0,160 L50,160 L50,135 L100,135 L100,150 L150,150 L150,110 L200,110 L200,145 L260,145 L260,120 L310,120 L310,95 L355,95 L355,135 L405,135 L405,85 L445,85 L445,115 L495,115 L495,150 L545,150 L545,100 L590,100 L590,130 L640,130 L640,90 L685,90 L685,125 L735,125 L735,155 L785,155 L785,105 L830,105 L830,135 L880,135 L880,85 L925,85 L925,120 L975,120 L975,150 L1025,150 L1025,110 L1070,110 L1070,140 L1125,140 L1125,100 L1170,100 L1170,145 L1200,145 L1200,260 Z"
                  fill={`url(#mb-grad-${i})`}
                />
                {/* Dimmer windows on back skyline */}
                <g fill="#d9a55c" opacity="0.45">
                  <rect x="60" y="145" width="2" height="3" /><rect x="70" y="145" width="2" height="3" /><rect x="80" y="145" width="2" height="3" />
                  <rect x="160" y="120" width="2" height="3" /><rect x="175" y="120" width="2" height="3" /><rect x="160" y="135" width="2" height="3" />
                  <rect x="320" y="105" width="2" height="3" /><rect x="335" y="105" width="2" height="3" /><rect x="320" y="120" width="2" height="3" />
                  <rect x="415" y="95" width="2" height="3" /><rect x="430" y="95" width="2" height="3" /><rect x="415" y="110" width="2" height="3" /><rect x="430" y="110" width="2" height="3" />
                  <rect x="555" y="110" width="2" height="3" /><rect x="570" y="110" width="2" height="3" /><rect x="555" y="125" width="2" height="3" />
                  <rect x="650" y="100" width="2" height="3" /><rect x="665" y="100" width="2" height="3" /><rect x="650" y="115" width="2" height="3" />
                  <rect x="795" y="115" width="2" height="3" /><rect x="810" y="115" width="2" height="3" /><rect x="795" y="130" width="2" height="3" />
                  <rect x="890" y="95" width="2" height="3" /><rect x="905" y="95" width="2" height="3" /><rect x="890" y="110" width="2" height="3" /><rect x="905" y="110" width="2" height="3" />
                  <rect x="1035" y="120" width="2" height="3" /><rect x="1050" y="120" width="2" height="3" /><rect x="1035" y="135" width="2" height="3" />
                  <rect x="1135" y="110" width="2" height="3" /><rect x="1150" y="110" width="2" height="3" /><rect x="1135" y="125" width="2" height="3" />
                </g>
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
                  d="M0,260 L0,180 L65,180 L65,120 L130,120 L130,160 L190,160 L190,80 L250,80 L250,140 L310,140 L310,50 L370,50 L370,130 L425,130 L425,170 L490,170 L490,90 L555,90 L555,150 L615,150 L615,60 L675,60 L675,140 L735,140 L735,175 L795,175 L795,100 L855,100 L855,150 L915,150 L915,70 L975,70 L975,140 L1035,140 L1035,165 L1095,165 L1095,110 L1150,110 L1150,155 L1200,155 L1200,260 Z"
                  fill={`url(#mf-grad-${i})`}
                />
                {/* Antennas on tallest towers */}
                <rect x="339" y="28" width="2" height="22" fill="#050308" />
                <rect x="644" y="38" width="2" height="22" fill="#050308" />
                <rect x="944" y="50" width="2" height="20" fill="#050308" />
                {/* Glowing windows */}
                <g fill="#ffd27a" opacity="0.75">
                  <rect x="200" y="100" width="3" height="4" /><rect x="210" y="100" width="3" height="4" /><rect x="220" y="100" width="3" height="4" /><rect x="230" y="100" width="3" height="4" /><rect x="240" y="100" width="3" height="4" />
                  <rect x="200" y="120" width="3" height="4" /><rect x="220" y="120" width="3" height="4" /><rect x="240" y="120" width="3" height="4" />
                  <rect x="200" y="140" width="3" height="4" /><rect x="210" y="140" width="3" height="4" /><rect x="230" y="140" width="3" height="4" />
                  <rect x="320" y="70" width="3" height="4" /><rect x="335" y="70" width="3" height="4" /><rect x="350" y="70" width="3" height="4" />
                  <rect x="320" y="90" width="3" height="4" /><rect x="350" y="90" width="3" height="4" />
                  <rect x="320" y="110" width="3" height="4" /><rect x="335" y="110" width="3" height="4" />
                  <rect x="500" y="110" width="3" height="4" /><rect x="515" y="110" width="3" height="4" /><rect x="530" y="110" width="3" height="4" /><rect x="545" y="110" width="3" height="4" />
                  <rect x="500" y="130" width="3" height="4" /><rect x="530" y="130" width="3" height="4" />
                  <rect x="625" y="80" width="3" height="4" /><rect x="645" y="80" width="3" height="4" /><rect x="665" y="80" width="3" height="4" />
                  <rect x="625" y="100" width="3" height="4" /><rect x="665" y="100" width="3" height="4" />
                  <rect x="625" y="120" width="3" height="4" /><rect x="645" y="120" width="3" height="4" />
                  <rect x="805" y="120" width="3" height="4" /><rect x="820" y="120" width="3" height="4" /><rect x="835" y="120" width="3" height="4" /><rect x="845" y="120" width="3" height="4" />
                  <rect x="805" y="140" width="3" height="4" /><rect x="835" y="140" width="3" height="4" />
                  <rect x="925" y="90" width="3" height="4" /><rect x="945" y="90" width="3" height="4" /><rect x="965" y="90" width="3" height="4" />
                  <rect x="925" y="110" width="3" height="4" /><rect x="965" y="110" width="3" height="4" />
                  <rect x="925" y="130" width="3" height="4" /><rect x="945" y="130" width="3" height="4" />
                  <rect x="1105" y="130" width="3" height="4" /><rect x="1120" y="130" width="3" height="4" /><rect x="1140" y="130" width="3" height="4" />
                </g>
              </svg>
            ))}
          </div>
        </div>

        {/* City skyline — sunlit version that swaps in during daytime */}
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
                  d="M0,260 L0,160 L50,160 L50,135 L100,135 L100,150 L150,150 L150,110 L200,110 L200,145 L260,145 L260,120 L310,120 L310,95 L355,95 L355,135 L405,135 L405,85 L445,85 L445,115 L495,115 L495,150 L545,150 L545,100 L590,100 L590,130 L640,130 L640,90 L685,90 L685,125 L735,125 L735,155 L785,155 L785,105 L830,105 L830,135 L880,135 L880,85 L925,85 L925,120 L975,120 L975,150 L1025,150 L1025,110 L1070,110 L1070,140 L1125,140 L1125,100 L1170,100 L1170,145 L1200,145 L1200,260 Z"
                  fill={`url(#mbd-grad-${i})`}
                />
                {/* Dark windows on daytime back skyline */}
                <g fill="#1c3a5e" opacity="0.55">
                  <rect x="60" y="145" width="2" height="3" /><rect x="70" y="145" width="2" height="3" /><rect x="80" y="145" width="2" height="3" />
                  <rect x="160" y="120" width="2" height="3" /><rect x="175" y="120" width="2" height="3" /><rect x="160" y="135" width="2" height="3" />
                  <rect x="320" y="105" width="2" height="3" /><rect x="335" y="105" width="2" height="3" /><rect x="320" y="120" width="2" height="3" />
                  <rect x="415" y="95" width="2" height="3" /><rect x="430" y="95" width="2" height="3" /><rect x="415" y="110" width="2" height="3" /><rect x="430" y="110" width="2" height="3" />
                  <rect x="555" y="110" width="2" height="3" /><rect x="570" y="110" width="2" height="3" /><rect x="555" y="125" width="2" height="3" />
                  <rect x="650" y="100" width="2" height="3" /><rect x="665" y="100" width="2" height="3" /><rect x="650" y="115" width="2" height="3" />
                  <rect x="795" y="115" width="2" height="3" /><rect x="810" y="115" width="2" height="3" /><rect x="795" y="130" width="2" height="3" />
                  <rect x="890" y="95" width="2" height="3" /><rect x="905" y="95" width="2" height="3" /><rect x="890" y="110" width="2" height="3" /><rect x="905" y="110" width="2" height="3" />
                  <rect x="1035" y="120" width="2" height="3" /><rect x="1050" y="120" width="2" height="3" /><rect x="1035" y="135" width="2" height="3" />
                  <rect x="1135" y="110" width="2" height="3" /><rect x="1150" y="110" width="2" height="3" /><rect x="1135" y="125" width="2" height="3" />
                </g>
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
                  d="M0,260 L0,180 L65,180 L65,120 L130,120 L130,160 L190,160 L190,80 L250,80 L250,140 L310,140 L310,50 L370,50 L370,130 L425,130 L425,170 L490,170 L490,90 L555,90 L555,150 L615,150 L615,60 L675,60 L675,140 L735,140 L735,175 L795,175 L795,100 L855,100 L855,150 L915,150 L915,70 L975,70 L975,140 L1035,140 L1035,165 L1095,165 L1095,110 L1150,110 L1150,155 L1200,155 L1200,260 Z"
                  fill={`url(#mfd-grad-${i})`}
                />
                <rect x="339" y="28" width="2" height="22" fill="#1c3a5e" />
                <rect x="644" y="38" width="2" height="22" fill="#1c3a5e" />
                <rect x="944" y="50" width="2" height="20" fill="#1c3a5e" />
                {/* Dark windows on daytime front skyline */}
                <g fill="#1c3a5e" opacity="0.6">
                  <rect x="200" y="100" width="3" height="4" /><rect x="210" y="100" width="3" height="4" /><rect x="220" y="100" width="3" height="4" /><rect x="230" y="100" width="3" height="4" /><rect x="240" y="100" width="3" height="4" />
                  <rect x="200" y="120" width="3" height="4" /><rect x="220" y="120" width="3" height="4" /><rect x="240" y="120" width="3" height="4" />
                  <rect x="200" y="140" width="3" height="4" /><rect x="210" y="140" width="3" height="4" /><rect x="230" y="140" width="3" height="4" />
                  <rect x="320" y="70" width="3" height="4" /><rect x="335" y="70" width="3" height="4" /><rect x="350" y="70" width="3" height="4" />
                  <rect x="320" y="90" width="3" height="4" /><rect x="350" y="90" width="3" height="4" />
                  <rect x="320" y="110" width="3" height="4" /><rect x="335" y="110" width="3" height="4" />
                  <rect x="500" y="110" width="3" height="4" /><rect x="515" y="110" width="3" height="4" /><rect x="530" y="110" width="3" height="4" /><rect x="545" y="110" width="3" height="4" />
                  <rect x="500" y="130" width="3" height="4" /><rect x="530" y="130" width="3" height="4" />
                  <rect x="625" y="80" width="3" height="4" /><rect x="645" y="80" width="3" height="4" /><rect x="665" y="80" width="3" height="4" />
                  <rect x="625" y="100" width="3" height="4" /><rect x="665" y="100" width="3" height="4" />
                  <rect x="625" y="120" width="3" height="4" /><rect x="645" y="120" width="3" height="4" />
                  <rect x="805" y="120" width="3" height="4" /><rect x="820" y="120" width="3" height="4" /><rect x="835" y="120" width="3" height="4" /><rect x="845" y="120" width="3" height="4" />
                  <rect x="805" y="140" width="3" height="4" /><rect x="835" y="140" width="3" height="4" />
                  <rect x="925" y="90" width="3" height="4" /><rect x="945" y="90" width="3" height="4" /><rect x="965" y="90" width="3" height="4" />
                  <rect x="925" y="110" width="3" height="4" /><rect x="965" y="110" width="3" height="4" />
                  <rect x="925" y="130" width="3" height="4" /><rect x="945" y="130" width="3" height="4" />
                  <rect x="1105" y="130" width="3" height="4" /><rect x="1120" y="130" width="3" height="4" /><rect x="1140" y="130" width="3" height="4" />
                </g>
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

