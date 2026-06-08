import React, { useEffect, useRef } from "react";
import alienShipUrl from "@/assets/hero-alien-ship.png";


/**
 * Spawns shooting stars, meteors, and airplanes into the parallax hero sky.
 * DOM-only (no canvas) so the parent parallax transform still works.
 */
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const SkyEffects: React.FC = () => {
  const fxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = fxRef.current;
    if (!layer) return;

    // Respect reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const tracked = new Set<HTMLElement>();

    const append = (el: HTMLElement, lifeMs: number) => {
      layer.appendChild(el);
      tracked.add(el);
      const onEnd = () => {
        el.removeEventListener("animationend", onEnd);
        if (el.parentNode) el.parentNode.removeChild(el);
        tracked.delete(el);
      };
      el.addEventListener("animationend", onEnd);
      // Hard fallback cleanup in case animationend doesn't fire
      const t = setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
        tracked.delete(el);
      }, lifeMs + 500);
      timeouts.push(t);
    };

    const spawnShootingStar = () => {
      const el = document.createElement("span");
      el.className = "sky-shooting-star";
      el.style.left = `${rand(0, 80)}%`;
      el.style.top = `${rand(5, 50)}%`;
      append(el, 800);
    };

    const spawnMeteor = () => {
      const el = document.createElement("span");
      el.className = "sky-meteor";
      el.style.left = `${rand(0, 60)}%`;
      el.style.top = `${rand(2, 30)}%`;

      // Glowing endpoint dot (delayed fade)
      const dot = document.createElement("span");
      dot.className = "sky-meteor-dot";
      el.appendChild(dot);

      append(el, 1600);
    };

    const spawnAirplane = () => {
      const heroW = layer.clientWidth || window.innerWidth;
      const rtl = Math.random() < 0.5;
      const el = document.createElement("span");
      el.className = "sky-airplane" + (rtl ? " sky-airplane--rtl" : "");
      el.style.top = `${rand(8, 55)}%`;
      const durationS = rand(8, 18);
      el.style.animationDuration = `${durationS}s`;
      if (rtl) {
        el.style.left = `${heroW + 40}px`;
        el.style.setProperty("--airplane-distance", `${-(heroW + 120)}px`);
      } else {
        el.style.left = `-40px`;
        el.style.setProperty("--airplane-distance", `${heroW + 80}px`);
      }

      // Inner body holds orientation (rotate, not mirror-flip, so it never warps)
      const body = document.createElement("span");
      body.className = "sky-airplane-body";
      // SVG silhouette with nose pointing right by default
      body.innerHTML =
        '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">' +
        '<path fill="currentColor" d="M21 12l-7-1.2V5.5a1.5 1.5 0 0 0-3 0v5.3L4 12v1.6l7-1v3.7l-1.8 1v1.2L12 18l2.8.5v-1.2l-1.8-1v-3.7l7 1V12z"/>' +
        '</svg>';
      body.style.transform = rtl ? "rotate(-90deg)" : "rotate(90deg)";
      el.appendChild(body);

      // Blinking light (sits at the tail)
      const light = document.createElement("span");
      light.className = "sky-airplane-light";
      el.appendChild(light);

      append(el, durationS * 1000 + 500);
    };

    const spawnHelicopter = () => {
      const heroW = layer.clientWidth || window.innerWidth;
      const rtl = Math.random() < 0.5;
      const el = document.createElement("span");
      el.className = "sky-helicopter" + (rtl ? " sky-helicopter--rtl" : "");
      // Wider altitude band; helicopters tend to fly lower than planes
      el.style.top = `${rand(18, 65)}%`;
      // Randomize speed per flight (12s brisk → 24s lazy)
      const durationS = rand(12, 24);
      el.style.animationDuration = `${durationS}s`;

      const body = document.createElement("span");
      body.className = "sky-helicopter-body";
      body.textContent = "🚁";
      el.appendChild(body);

      const light = document.createElement("span");
      light.className = "sky-helicopter-light";
      el.appendChild(light);

      if (rtl) {
        el.style.left = `${heroW + 40}px`;
        el.style.setProperty("--heli-distance", `${-(heroW + 120)}px`);
      } else {
        el.style.left = `-40px`;
        el.style.setProperty("--heli-distance", `${heroW + 80}px`);
      }
      append(el, durationS * 1000 + 500);
    };


    const spawnUfo = () => {
      const heroW = layer.clientWidth || window.innerWidth;
      const rtl = Math.random() < 0.5;
      const el = document.createElement("span");
      el.className = "sky-ufo";
      el.textContent = "🛸";
      el.style.top = `${rand(8, 45)}%`;

      const beam = document.createElement("span");
      beam.className = "sky-ufo-beam";
      el.appendChild(beam);

      if (rtl) {
        el.style.left = `${heroW + 60}px`;
        el.style.setProperty("--ufo-distance", `${-(heroW + 140)}px`);
      } else {
        el.style.left = `-60px`;
        el.style.setProperty("--ufo-distance", `${heroW + 100}px`);
      }
      append(el, 18000);
    };

    const scheduleLoop = (fn: () => void, minS: number, maxS: number) => {
      let cancelled = false;
      const tick = () => {
        if (cancelled) return;
        fn();
        const t = setTimeout(tick, rand(minS, maxS) * 1000);
        timeouts.push(t);
      };
      const t = setTimeout(tick, rand(minS, maxS) * 1000);
      timeouts.push(t);
      return () => {
        cancelled = true;
      };
    };

    const cancelStar = scheduleLoop(spawnShootingStar, 4, 8);
    const cancelMeteor = scheduleLoop(spawnMeteor, 15, 30);
    const cancelPlane = scheduleLoop(spawnAirplane, 45, 90);
    const cancelHeli = scheduleLoop(spawnHelicopter, 20, 50);
    const cancelUfo = scheduleLoop(spawnUfo, 30, 70);

    return () => {
      cancelStar();
      cancelMeteor();
      cancelPlane();
      cancelHeli();
      cancelUfo();
      timeouts.forEach(clearTimeout);
      tracked.forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
      tracked.clear();
    };
  }, []);

  return <div ref={fxRef} aria-hidden className="parallax-fx" />;
};

export default SkyEffects;
