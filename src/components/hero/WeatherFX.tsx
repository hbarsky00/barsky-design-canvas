import React, { useEffect, useRef } from "react";

/**
 * Weather layer for the hero. Cycles between clear / rain / snow.
 * Drops & flakes "hit" the screen (splash on impact) and a windshield
 * wiper periodically sweeps across to clear everything.
 *
 * DOM-only so it composes with the parallax transforms above/below it.
 */
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

type Mode = "clear" | "rain" | "snow";

const WeatherFX: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const tracked = new Set<HTMLElement>();
    let mode: Mode = "clear";
    let spawning = false;
    let cancelled = false;

    const append = (el: HTMLElement, lifeMs: number) => {
      root.appendChild(el);
      tracked.add(el);
      const t = setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
        tracked.delete(el);
      }, lifeMs);
      timeouts.push(t);
    };

    const spawnDrop = () => {
      if (!spawning || mode !== "rain") return;
      const el = document.createElement("span");
      el.className = "weather-drop";
      const leftPct = rand(0, 100);
      el.style.left = `${leftPct}%`;
      const dur = rand(0.45, 0.9);
      el.style.animationDuration = `${dur}s`;
      el.style.setProperty("--drop-skew", `${rand(-10, -4)}deg`);
      el.style.height = `${rand(14, 26)}px`;
      el.style.opacity = `${rand(0.45, 0.85)}`;
      append(el, dur * 1000 + 200);
      // splash on landing
      const splashT = setTimeout(() => {
        if (!root.isConnected) return;
        const s = document.createElement("span");
        s.className = "weather-splash";
        s.style.left = `${leftPct}%`;
        append(s, 700);
      }, dur * 1000 - 40);
      timeouts.push(splashT);
    };

    const spawnFlake = () => {
      if (!spawning || mode !== "snow") return;
      const el = document.createElement("span");
      el.className = "weather-flake";
      const leftPct = rand(-5, 105);
      el.style.left = `${leftPct}%`;
      const dur = rand(5, 10);
      el.style.animationDuration = `${dur}s`;
      el.style.setProperty("--flake-sway", `${rand(-40, 40)}px`);
      const size = rand(3, 7);
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.opacity = `${rand(0.55, 0.95)}`;
      append(el, dur * 1000 + 300);
      const splashT = setTimeout(() => {
        if (!root.isConnected) return;
        const s = document.createElement("span");
        s.className = "weather-splash weather-splash--snow";
        s.style.left = `${leftPct}%`;
        append(s, 900);
      }, dur * 1000 - 60);
      timeouts.push(splashT);
    };

    let rainInterval: ReturnType<typeof setInterval> | null = null;
    let snowInterval: ReturnType<typeof setInterval> | null = null;

    const startWeather = (m: Mode) => {
      mode = m;
      spawning = true;
      root.dataset.mode = m;
      if (m === "rain") {
        rainInterval = setInterval(spawnDrop, 38);
      } else if (m === "snow") {
        snowInterval = setInterval(spawnFlake, 180);
      }
    };

    const stopSpawning = () => {
      spawning = false;
      if (rainInterval) { clearInterval(rainInterval); rainInterval = null; }
      if (snowInterval) { clearInterval(snowInterval); snowInterval = null; }
    };

    const runWiper = () =>
      new Promise<void>((resolve) => {
        root.classList.add("is-wiping");
        const wiper = document.createElement("div");
        wiper.className = "windshield-wiper";
        const arm = document.createElement("span");
        arm.className = "windshield-wiper-arm";
        const blade = document.createElement("span");
        blade.className = "windshield-wiper-blade";
        arm.appendChild(blade);
        wiper.appendChild(arm);
        root.appendChild(wiper);
        const cleanup = () => {
          if (wiper.parentNode) wiper.parentNode.removeChild(wiper);
          root.classList.remove("is-wiping");
          // clear any remaining droplets/flakes after wipe
          tracked.forEach((el) => {
            if (el.classList.contains("weather-drop") || el.classList.contains("weather-flake")) {
              if (el.parentNode) el.parentNode.removeChild(el);
              tracked.delete(el);
            }
          });
          resolve();
        };
        const t = setTimeout(cleanup, 1700);
        timeouts.push(t);
      });

    // Master cycle
    const cycle = async () => {
      while (!cancelled) {
        // idle clear window
        await wait(rand(10000, 18000));
        if (cancelled) return;
        // pick weather
        const pick: Mode = Math.random() < 0.5 ? "rain" : "snow";
        startWeather(pick);
        await wait(rand(14000, 24000));
        if (cancelled) return;
        // brief wiper while precipitation may still spawn,
        // then stop spawning and let the screen dry
        stopSpawning();
        root.dataset.mode = "clear";
        await runWiper();
        mode = "clear";
      }
    };

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms);
        timeouts.push(t);
      });

    cycle();

    return () => {
      cancelled = true;
      stopSpawning();
      timeouts.forEach(clearTimeout);
      tracked.forEach((el) => { if (el.parentNode) el.parentNode.removeChild(el); });
      tracked.clear();
      delete root.dataset.mode;
      root.classList.remove("is-wiping");
    };
  }, []);

  return <div ref={rootRef} aria-hidden className="weather-fx" data-mode="clear" />;
};

export default WeatherFX;
