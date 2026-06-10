import React, { useState, useEffect, Suspense, lazy } from "react";
import { cn } from "@/lib/utils";

const WebGLNameFx = lazy(() => import("./WebGLNameFx"));

const EFFECT_COUNT = 6;
const CYCLE_MS = 15000;
const ACTIVE_MS = 2500;

interface AnimatedNameProps {
  name: string;
  className?: string;
}

/**
 * Crisp HTML text on top, WebGL/Three.js FX layer behind.
 * Cycles 6 distinct shader effects every 15s for 2.5s each.
 * Respects prefers-reduced-motion (no FX layer rendered).
 */
const AnimatedName: React.FC<AnimatedNameProps> = ({ name, className }) => {
  const [effect, setEffect] = useState(0);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

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
    const trigger = () => {
      setActive(true);
      endTimer = window.setTimeout(() => setActive(false), ACTIVE_MS);
    };
    trigger();
    const interval = window.setInterval(() => {
      setEffect((p) => (p + 1) % EFFECT_COUNT);
      trigger();
    }, CYCLE_MS);
    return () => {
      window.clearInterval(interval);
      if (endTimer) window.clearTimeout(endTimer);
    };
  }, [reduced]);

  return (
    <span className={cn("relative inline-block leading-none", className)}>
      <span className="relative z-10">{name}</span>
      {!reduced && (
        <Suspense fallback={null}>
          <WebGLNameFx effect={effect} active={active} />
        </Suspense>
      )}
    </span>
  );
};

export default AnimatedName;
