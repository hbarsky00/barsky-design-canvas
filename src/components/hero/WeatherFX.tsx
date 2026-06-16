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
      const styleRoll = Math.random();
      const classes = ["weather-flake"];
      if (styleRoll > 0.75) classes.push("is-glowy");
      if (styleRoll < 0.25) classes.push("is-sharp");
      el.className = classes.join(" ");
      const leftPct = rand(-5, 105);
      el.style.left = `${leftPct}%`;
      const dur = rand(6, 12);
      el.style.animationDuration = `${dur}s`;
      el.style.setProperty("--flake-sway", `${rand(-50, 50)}px`);
      const size = styleRoll > 0.85 ? rand(7, 10) : rand(3, 6);
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.opacity = `${rand(0.35, 0.9)}`;
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

    // "Clear" = simply fade out and remove all current precipitation.
    // No wiper, no blade — just a gentle dissipation.
    const clearWeather = () =>
      new Promise<void>((resolve) => {
        root.classList.add("is-clearing");
        const t = setTimeout(() => {
          tracked.forEach((el) => {
            if (
              el.classList.contains("weather-drop") ||
              el.classList.contains("weather-flake") ||
              el.classList.contains("weather-splash")
            ) {
              if (el.parentNode) el.parentNode.removeChild(el);
              tracked.delete(el);
            }
          });
          root.classList.remove("is-clearing");
          resolve();
        }, 900);
        timeouts.push(t);
      });

    // Master cycle
    const cycle = async () => {
      // Short initial delay so weather is visible without waiting forever
      await wait(rand(2500, 5000));
      let first = true;
      while (!cancelled) {
        const pick: Mode = Math.random() < 0.5 ? "rain" : "snow";
        startWeather(pick);
        await wait(rand(12000, 18000));
        if (cancelled) return;
        stopSpawning();
        root.dataset.mode = "clear";
        await clearWeather();
        mode = "clear";
        if (cancelled) return;
        // moderate idle gap between weather events
        await wait(rand(8000, 14000));
        first = false;
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
