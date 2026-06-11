import React, { useState, useEffect, Suspense, lazy } from "react";
import { cn } from "@/lib/utils";

const WebGLNameFx = lazy(() => import("./WebGLNameFx"));

const EFFECT_COUNT = 6;
const CYCLE_MS = 15000;
const ACTIVE_MS = 2500;

interface WebGLFxWrapProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in ms so multiple wrappers don't flash together. */
  offsetMs?: number;
  /** Starting effect index (0..5). */
  startEffect?: number;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Generic crisp-HTML-on-top + WebGL FX-behind wrapper.
 * Follows the webgl-name-fx skill: HTML stays accessible, shader is decorative.
 */
const WebGLFxWrap: React.FC<WebGLFxWrapProps> = ({
  children,
  className,
  offsetMs = 0,
  startEffect = 0,
  as = "span",
}) => {
  const [effect, setEffect] = useState(startEffect % EFFECT_COUNT);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);
  const Tag = as as any;

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let endTimer: number | undefined;
    let startTimer: number | undefined;
    let interval: number | undefined;
    const trigger = () => {
      setActive(true);
      endTimer = window.setTimeout(() => setActive(false), ACTIVE_MS);
    };
    startTimer = window.setTimeout(() => {
      trigger();
      interval = window.setInterval(() => {
        setEffect((p) => (p + 1) % EFFECT_COUNT);
        trigger();
      }, CYCLE_MS);
    }, offsetMs);
    return () => {
      if (startTimer) window.clearTimeout(startTimer);
      if (interval) window.clearInterval(interval);
      if (endTimer) window.clearTimeout(endTimer);
    };
  }, [reduced, offsetMs]);

  return (
    <Tag className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      {!reduced && (
        <Suspense fallback={null}>
          <WebGLNameFx effect={effect} active={active} />
        </Suspense>
      )}
    </Tag>
  );
};

export default WebGLFxWrap;
