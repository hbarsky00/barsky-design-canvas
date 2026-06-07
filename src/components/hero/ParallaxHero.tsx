import React, { useEffect, useState } from "react";
import HeroContent from "./HeroContent";
import { SCENES, DEFAULT_SCENE_ID } from "./scenes";

const ParallaxHero: React.FC = () => {
  const [sceneId, setSceneId] = useState<string>(DEFAULT_SCENE_ID);
  const activeScene = SCENES.find((s) => s.id === sceneId) ?? SCENES[0];
  const textMode = activeScene.textMode;

  // Drive the global --site-fg from the active scene's textMode so the footer
  // (and any other body-scoped text) stays legible on every scene. Every scene
  // is flat now — no special-casing.
  useEffect(() => {
    document.body.dataset.textMode = textMode;
    return () => { delete document.body.dataset.textMode; };
  }, [textMode]);

  // Subtle hero-name tilt on mouse move (desktop only). No layer parallax —
  // there are no live layers left to translate.
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
      {/* Flat scene crossfade stack — every scene is a single full-bleed PNG/JPG. */}
      <div className="parallax-scene-stack" aria-hidden>
        {SCENES.map((s) => (
          <img
            key={s.id}
            src={s.image}
            alt=""
            loading={s.id === sceneId ? "eager" : "lazy"}
            decoding="async"
            className={`parallax-scene-img ${s.id === sceneId ? "is-active" : ""}`}
          />
        ))}
      </div>

      <div className="parallax-content">
        <HeroContent />
      </div>

      {/* Scene switcher */}
      <div className="parallax-scene-switcher" aria-label="Scene">
        {SCENES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSceneId(s.id)}
            aria-pressed={s.id === sceneId}
            aria-label={`Switch to ${s.label} scene`}
            className={`scene-dot ${s.id === sceneId ? "is-active" : ""}`}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ParallaxHero;
