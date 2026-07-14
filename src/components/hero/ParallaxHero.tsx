import React, { useEffect, useMemo, useRef, useState } from "react";
import HeroContent from "./HeroContent";
import SkyEffects from "./SkyEffects";
import WeatherFX from "./WeatherFX";
import { SCENES, DEFAULT_SCENE_ID, LIVE_SCENE_IDS } from "./scenes";
import MountainsSilhouette from "./silhouettes/MountainsSilhouette";
import CitySilhouette from "./silhouettes/CitySilhouette";
import OceanSilhouette from "./silhouettes/OceanSilhouette";

import sunMidday from "@/assets/hero-sun-midday.png";
import sunGolden from "@/assets/hero-sun-golden.png";
import sunHazy from "@/assets/hero-sun-hazy.png";
import sunSunset from "@/assets/hero-sun-sunset.png";
import moonFull from "@/assets/hero-moon.png";
import moonCrescent from "@/assets/hero-moon-crescent.png";
import moonHalf from "@/assets/hero-moon-half.png";
import moonGibbous from "@/assets/hero-moon-gibbous.png";

const MOON_PHASES = [moonCrescent, moonHalf, moonGibbous, moonFull];
const SUN_PHASES = [sunMidday, sunGolden, sunHazy, sunSunset];
const CLOUD_PRESETS = ["clear", "few", "scattered", "overcast"] as const;
type CloudPreset = typeof CLOUD_PRESETS[number];


const ParallaxHero: React.FC = () => {
  const skyRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const mountainsRef = useRef<HTMLDivElement>(null);
  const [isDay, setIsDay] = useState(false);
  const [isTwilight, setIsTwilight] = useState(false);
  const [sceneId, setSceneId] = useState<string>(DEFAULT_SCENE_ID);
  const [moonImg, setMoonImg] = useState(() => MOON_PHASES[Math.floor(Math.random() * MOON_PHASES.length)]);
  const [sunImg, setSunImg] = useState(() => SUN_PHASES[Math.floor(Math.random() * SUN_PHASES.length)]);
  const [clouds, setClouds] = useState<CloudPreset>(() => CLOUD_PRESETS[Math.floor(Math.random() * CLOUD_PRESETS.length)]);
  const activeScene = SCENES.find((s) => s.id === sceneId) ?? SCENES[0];
  const isFlatScene = activeScene.image !== null;
  // Text mode: flat scene's textMode wins; live scenes use day/night.
  const textMode = isFlatScene ? activeScene.textMode : (isDay ? "dark" : "light");


  useEffect(() => {
    const t = setTimeout(() => {
      // Golden-hour pass: a warm dusk/dawn gradient washes over the sky while
      // the day/night crossfade runs, then dissolves into the new sky.
      setIsTwilight(true);
      setIsDay((d) => {
        if (d) {
          setMoonImg(MOON_PHASES[Math.floor(Math.random() * MOON_PHASES.length)]);
        } else {
          setSunImg(SUN_PHASES[Math.floor(Math.random() * SUN_PHASES.length)]);
          setClouds(CLOUD_PRESETS[Math.floor(Math.random() * CLOUD_PRESETS.length)]);
        }
        return !d;
      });
    }, 12000);
    return () => clearTimeout(t);
  }, [isDay]);

  // Dissolve the golden-hour wash shortly after each flip. Lives in its own
  // effect so the flip effect's cleanup (which re-runs on isDay) can't cancel it.
  useEffect(() => {
    if (!isTwilight) return;
    const t = setTimeout(() => setIsTwilight(false), 3400);
    return () => clearTimeout(t);
  }, [isTwilight]);

  // Auto-rotate between live silhouette scenes (mountains <-> city) every 18s.
  // Pauses when a flat image scene is active.
  useEffect(() => {
    if (isFlatScene) return;
    const t = setTimeout(() => {
      setSceneId((prev) => {
        const idx = LIVE_SCENE_IDS.indexOf(prev as typeof LIVE_SCENE_IDS[number]);
        const nextIdx = idx === -1 ? 0 : (idx + 1) % LIVE_SCENE_IDS.length;
        return LIVE_SCENE_IDS[nextIdx];
      });
    }, 18000);
    return () => clearTimeout(t);
  }, [sceneId, isFlatScene]);






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
    return Array.from({ length: 28 }, () => {
      const angle = r() * Math.PI * 2;
      const dist = 6 + r() * 14;
      const sizeRoll = r();
      const size = sizeRoll > 0.92 ? 4 : sizeRoll > 0.65 ? 3 : sizeRoll > 0.3 ? 2 : 1.5;
      return {
        x: r() * 100,
        y: r() * 85,
        size,
        depth: r() * 0.7 + 0.3,
        driftX: Math.cos(angle) * dist,
        driftY: Math.sin(angle) * dist,
        driftDur: 5 + r() * 16,
        driftDelay: r() * 10,
        twinkleDur: 1.5 + r() * 4,
        twinkleDelay: r() * 10,
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
      data-clouds={clouds}
      data-text-mode={textMode}
      aria-label="Hiram Barsky portfolio hero"
      className={`parallax-hero ${isDay ? "is-day" : ""} ${isTwilight ? "is-twilight" : ""} ${isFlatScene ? "has-flat-scene" : ""}`}
    >
      {/* Flat scene overlay — single full-bleed image, crossfades over live scene */}
      <div className="parallax-scene-stack" aria-hidden>
        {SCENES.filter((s) => s.image).map((s) => {
          const isActive = s.id === sceneId;
          return (
            <img
              key={s.id}
              src={s.image as string}
              alt=""
              width={1920}
              height={1080}
              loading={isActive ? "eager" : "lazy"}
              {...(isActive ? { fetchPriority: "high" as const } : {})}
              decoding="async"
              className={`parallax-scene-img ${isActive ? "is-active" : ""}`}
            />
          );
        })}
      </div>

      {/* Sticky stack so only one viewport-sized scene is visible at a time */}
      <div className="parallax-bg-stack" aria-hidden>

        {/* Night sky */}
        <div ref={skyRef} className="parallax-sky" />
        {/* Day sky fades over night */}
        <div className="parallax-sky-day" />
        {/* Golden-hour wash shown briefly during every day/night flip */}
        <div className="parallax-sky-twilight" />
        {/* Sun rises during day */}
        <div className="parallax-sun" style={{ backgroundImage: `url(${sunImg})` }} />
        {/* Moon glows during night */}
        <div className="parallax-moon" style={{ backgroundImage: `url(${moonImg})` }} />
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
                boxShadow: s.size >= 3 ? `0 0 ${s.size + 1}px rgba(255,255,255,${0.25 + s.depth * 0.25})` : undefined,
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

        {/* Live silhouette scenes — mountains and city crossfade by activeScene.id */}
        <div ref={mountainsRef} className="parallax-silhouette-stack" data-active-silhouette={activeScene.id}>
          <div className="parallax-silhouette-slot" data-silhouette="mountains">
            <MountainsSilhouette />
          </div>
          <div className="parallax-silhouette-slot" data-silhouette="city">
            <CitySilhouette />
          </div>
          <div className="parallax-silhouette-slot" data-silhouette="ocean">
            <OceanSilhouette />
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

