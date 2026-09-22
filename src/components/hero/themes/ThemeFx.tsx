import React, { useEffect, useRef, useState } from "react";
import type { ThemeId } from "../themeConfig";

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

interface Props {
  themeId: ThemeId;
}

/**
 * Mounts per-theme decorative effects (cursor trails, falling sparkles,
 * crosshairs, click marks, marquees). Tears everything down on theme switch
 * via React unmount + useEffect cleanup.
 */
const ThemeFx: React.FC<Props> = ({ themeId }) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const [visitor, setVisitor] = useState<number>(() =>
    Math.floor(Math.random() * 900000) + 100000
  );

  // 1990S: visitor counter
  useEffect(() => {
    if (themeId !== "1990s") return;
    const id = setInterval(() => setVisitor((v) => v + 1), 3000);
    return () => clearInterval(id);
  }, [themeId]);

  // 1990S: falling sparkles
  useEffect(() => {
    if (themeId !== "1990s" || !layerRef.current) return;
    const layer = layerRef.current;
    const ids: number[] = [];
    const spawn = () => {
      const el = document.createElement("span");
      el.className = "fx-sparkle";
      el.textContent = "✦";
      el.style.left = `${rand(0, 100)}%`;
      el.style.animationDuration = `${rand(4, 9)}s`;
      el.style.fontSize = `${Math.floor(rand(10, 18))}px`;
      el.style.color = ["#ff00ff", "#ffff00", "#00ffff", "#fff"][Math.floor(Math.random() * 4)];
      layer.appendChild(el);
      const t = window.setTimeout(() => el.remove(), 10000);
      ids.push(t);
    };
    const iv = window.setInterval(spawn, 250);
    return () => {
      clearInterval(iv);
      ids.forEach(clearTimeout);
      layer.querySelectorAll(".fx-sparkle").forEach((n) => n.remove());
    };
  }, [themeId]);

  // FLASH: cursor particle trail
  useEffect(() => {
    if (themeId !== "flash" || !layerRef.current) return;
    const layer = layerRef.current;
    const rect = () => layer.getBoundingClientRect();
    const onMove = (e: MouseEvent) => {
      const r = rect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
      const el = document.createElement("span");
      el.className = "fx-flash-particle";
      el.style.left = `${e.clientX - r.left}px`;
      el.style.top = `${e.clientY - r.top}px`;
      layer.appendChild(el);
      setTimeout(() => el.remove(), 600);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      layer.querySelectorAll(".fx-flash-particle").forEach((n) => n.remove());
    };
  }, [themeId]);

  // BRUTALISM: click X marks
  useEffect(() => {
    if (themeId !== "brutalism" || !layerRef.current) return;
    const layer = layerRef.current;
    const heroEl = layer.parentElement?.closest("section");
    if (!heroEl) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea")) return;
      const r = layer.getBoundingClientRect();
      const el = document.createElement("span");
      el.className = "fx-brutal-x";
      el.textContent = "✕";
      el.style.left = `${e.clientX - r.left}px`;
      el.style.top = `${e.clientY - r.top}px`;
      layer.appendChild(el);
      setTimeout(() => el.remove(), 600);
    };
    heroEl.addEventListener("click", onClick);
    return () => {
      heroEl.removeEventListener("click", onClick);
      layer.querySelectorAll(".fx-brutal-x").forEach((n) => n.remove());
    };
  }, [themeId]);

  // SWISS: horizontal crosshair line that tracks cursor Y
  const crosshairRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (themeId !== "swiss" || !layerRef.current || !crosshairRef.current) return;
    const layer = layerRef.current;
    const line = crosshairRef.current;
    let raf = 0;
    let targetY = 0;
    let currentY = 0;
    const onMove = (e: MouseEvent) => {
      const r = layer.getBoundingClientRect();
      targetY = e.clientY - r.top;
    };
    const tick = () => {
      currentY += (targetY - currentY) * 0.15;
      line.style.transform = `translateY(${currentY}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [themeId]);

  return (
    <div ref={layerRef} aria-hidden className={`theme-fx-layer theme-fx-layer--${themeId}`}>
      {themeId === "swiss" && <div ref={crosshairRef} className="fx-swiss-crosshair" />}
      {themeId === "1990s" && (
        <div className="fx-marquee">
          <div className="fx-marquee-track">
            <span>
              ★ WELCOME TO MY HOMEPAGE ★ BEST VIEWED IN 800×600 ★ YOU ARE VISITOR #{visitor.toLocaleString()} ★ SIGN MY GUESTBOOK ★ &nbsp;&nbsp;
              ★ WELCOME TO MY HOMEPAGE ★ BEST VIEWED IN 800×600 ★ YOU ARE VISITOR #{visitor.toLocaleString()} ★ SIGN MY GUESTBOOK ★ &nbsp;&nbsp;
            </span>
          </div>
        </div>
      )}
      {themeId === "1990s" && (
        <div className="fx-visitor-counter">VISITORS: {visitor.toLocaleString()}</div>
      )}
    </div>
  );
};

export default ThemeFx;
