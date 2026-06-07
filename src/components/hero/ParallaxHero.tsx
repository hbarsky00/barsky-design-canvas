import React, { useEffect } from "react";
import HeroContent from "./HeroContent";
import SceneOverlay from "./SceneOverlay";
import { SCENES, DEFAULT_SCENE_ID } from "./scenes";

const ParallaxHero: React.FC = () => {
  const activeScene = SCENES.find((s) => s.id === DEFAULT_SCENE_ID) ?? SCENES[0];
  const textMode = activeScene.textMode;

  // Drive the global --site-fg from the active scene's textMode so the footer
  // (and any other body-scoped text) stays legible.
  useEffect(() => {
    document.body.dataset.textMode = textMode;
    return () => { delete document.body.dataset.textMode; };
  }, [textMode]);

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
      {/* Flat scene image */}
      <div className="parallax-scene-stack" aria-hidden>
        <img
          src={activeScene.image}
          alt=""
          loading="eager"
          decoding="async"
          className="parallax-scene-img is-active"
        />
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
