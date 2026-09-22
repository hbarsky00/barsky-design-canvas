import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const WebGLIntentRipple = lazy(() => import("./WebGLIntentRipple"));

interface Props {
  children: React.ReactNode;
  className?: string;
  color?: string;
  /** Render as a span (inline) vs div (block). Defaults to div. */
  as?: "div" | "span";
}

/**
 * Wraps a clickable element (card, button, link) and overlays a WebGL ripple
 * shader that responds to hover + click. Navigation stays instant — the
 * ripple is purely visual feedback rendered behind the child content.
 *
 * Respects prefers-reduced-motion (renders nothing).
 */
const IntentRippleWrap: React.FC<Props> = ({ children, className, color, as = "div" }) => {
  const wrapRef = useRef<HTMLDivElement | HTMLSpanElement>(null);
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState(0);
  const [click, setClick] = useState(0);
  const [origin, setOrigin] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  const updateOrigin = useCallback((e: React.PointerEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setOrigin({
      x: (e.clientX - r.left) / r.width,
      y: 1 - (e.clientY - r.top) / r.height,
    });
  }, []);

  const onEnter = (e: React.PointerEvent) => {
    if (reduced) return;
    setMounted(true);
    updateOrigin(e);
    setHover(1);
  };
  const onMove = (e: React.PointerEvent) => {
    if (reduced || !mounted) return;
    updateOrigin(e);
  };
  const onLeave = () => {
    setHover(0);
  };
  const onDown = (e: React.PointerEvent) => {
    if (reduced) return;
    setMounted(true);
    updateOrigin(e);
    setClick(1);
    // decay back so next click can re-trigger
    window.setTimeout(() => setClick(0), 60);
  };

  const Tag = as as any;

  return (
    <Tag
      ref={wrapRef as any}
      className={cn("relative", className)}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerDown={onDown}
    >
      {children}
      {!reduced && mounted && (
        <Suspense fallback={null}>
          <WebGLIntentRipple hover={hover} click={click} origin={origin} color={color} />
        </Suspense>
      )}
    </Tag>
  );
};

export default IntentRippleWrap;
