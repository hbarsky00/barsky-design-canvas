import { useEffect, useRef, useState } from "react";
import { BaseAnimatedTextProps } from "./AnimatedTextTypes";

/**
 * Drives the staggered reveal in AnimatedText.
 *
 * This used to hold `isVisible` false until an IntersectionObserver
 * (threshold 0.2) said the element was on screen, and the typewriter variant's
 * resting state was `display: "none"`. Together those deadlocked: hidden words
 * collapse the heading to height 0, a zero-area box has an intersectionRatio of
 * 0, 0 never crosses 0.2, so the observer never fired and the words never
 * appeared. Eight of the nine <h2> section headings on the live homepage were
 * stuck at `opacity: 0; display: none` because of it — invisible to readers,
 * and invisible to any crawler that does not run JS.
 *
 * The fix is not a better observer. It is that whether text can be read must
 * never depend on one firing. The reveal now runs on mount, so the resting
 * state is always "about to be visible", and `prefers-reduced-motion` skips
 * even that.
 */
export const useAnimatedText = ({
  delay = 0,
  onComplete,
  text,
  staggerChildren = 0.03,
  duration = 0.5
}: BaseAnimatedTextProps & { staggerChildren?: number, duration?: number }) => {
  const elementRef = useRef<HTMLElement | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [isVisible] = useState(true);

  useEffect(() => {
    const element = elementRef.current;
    if (element && !prefersReducedMotion) {
      element.style.animationDelay = `${delay}ms`;
    }
    if (!onComplete) return;

    const totalDuration = delay + (text.length * staggerChildren * 1000) + (duration * 1000);
    const t = setTimeout(onComplete, prefersReducedMotion ? 0 : totalDuration);
    return () => clearTimeout(t);
  }, [prefersReducedMotion, delay, onComplete, text, staggerChildren, duration]);

  return { elementRef, isVisible };
};
