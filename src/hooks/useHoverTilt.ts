
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";

type Options = {
  maxTilt?: number;
  scale?: number;
  disabled?: boolean;
};

export const useHoverTilt = <T extends HTMLElement = HTMLElement>(opts: Options = {}) => {
  const { maxTilt = 2, scale = 1.01, disabled = false } = opts;
  const prefersReduced = useReducedMotion();
  const frame = useRef<number | null>(null);

  const isDisabled = disabled || prefersReduced;

  const applyTransform = (el: HTMLElement, rx: number, ry: number, s: number) => {
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`;
    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";
  };

  const onMouseMove: React.MouseEventHandler<T> = (e) => {
    if (isDisabled) return;
    const el = e.currentTarget as unknown as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * (maxTilt * 2);
    const rotateY = (x - 0.5) * (maxTilt * 2);

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      applyTransform(el, rotateX, rotateY, scale);
    });
  };

  const reset = (el: HTMLElement) => {
    el.style.transition = "transform 120ms ease-out";
    applyTransform(el, 0, 0, 1);
  };

  const onMouseLeave: React.MouseEventHandler<T> = (e) => {
    if (isDisabled) return;
    reset(e.currentTarget as unknown as HTMLElement);
  };

  const onFocus: React.FocusEventHandler<T> = (e) => {
    if (isDisabled) return;
    const el = e.currentTarget as unknown as HTMLElement;
    el.style.transition = "transform 150ms ease-out";
    applyTransform(el, 0, 0, scale);
  };

  const onBlur: React.FocusEventHandler<T> = (e) => {
    if (isDisabled) return;
    reset(e.currentTarget as unknown as HTMLElement);
  };

  return { onMouseMove, onMouseLeave, onFocus, onBlur };
};
