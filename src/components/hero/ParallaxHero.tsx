import React, { useEffect, useState } from "react";
import HeroContent from "./HeroContent";
import SceneOverlay from "./SceneOverlay";
import { SCENES, DEFAULT_SCENE_ID } from "./scenes";

const ROTATE_MS = 13000;

const ParallaxHero: React.FC = () => {
  const [sceneIndex, setSceneIndex] = useState<number>(() => {
    const i = SCENES.findIndex((s) => s.id === DEFAULT_SCENE_ID);
    return i >= 0 ? i : 0;
  });
  const activeScene = SCENES[sceneIndex];
  const textMode = activeScene.textMode;

  // Drive the global --site-fg from the active scene's textMode so the footer
  // (and any other body-scoped text) stays legible.
  useEffect(() => {
    document.body.dataset.textMode = textMode;
    return () => { delete document.body.dataset.textMode; };
  }, [textMode]);

  // Auto-rotate scenes. Honors prefers-reduced-motion (holds a single scene).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = window.setInterval(() => {
      setSceneIndex((i) => (i + 1) % SCENES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);


  // Subtle hero-name tilt on mouse move (desktop only).
  useEffect(() => {
    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMx = 0;
    let targetMy = 0;

    const apply = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const nameEl = document.querySelector<HTMLElement>(".parallax-content .hero-name");
        if (nameEl) {
          const rx = (-mouseY / 10) * 3;
          const ry = (mouseX / 10) * 3;
          nameEl.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        }
        raf = 0;
      });
    };

    const tick = () => {
      mouseX += (targetMx - mouseX) * 0.08;
      mouseY += (targetMy - mouseY) * 0.08;
      apply();
      requestAnimationFrame(tick);
    };

    const onMouse = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetMx = nx * 10;
      targetMy = ny * 10;
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    const id = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <section
      data-theme="3d"
      data-scene={activeScene.id}
      data-text-mode={textMode}
      aria-label="Hiram Barsky portfolio hero"
      className="parallax-hero"
    >
      {/* Flat scene crossfade stack — all images mounted, active one fades in. */}
      <div className="parallax-scene-stack" aria-hidden>
        {SCENES.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt=""
            loading={i === sceneIndex ? "eager" : "lazy"}
            decoding="async"
            className={`parallax-scene-img ${i === sceneIndex ? "is-active" : ""}`}
          />
        ))}
      </div>

      {/* Per-scene animated overlay (sun/moon + aircraft) */}
      <SceneOverlay scene={activeScene} />

      <div className="parallax-content">
        <HeroContent />
      </div>
    </section>
  );
};

export default ParallaxHero;
