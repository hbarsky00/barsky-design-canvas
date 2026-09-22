import { useCallback, useRef, useEffect } from "react";
import { useScrollMomentum } from "./useScrollMomentum";

interface UseOptimizedScrollOptions {
  throttleMs?: number;
  enabled?: boolean;
}

export const useOptimizedScroll = ({
  throttleMs = 16,
  enabled = true
}: UseOptimizedScrollOptions = {}) => {
  const frameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  
  const { scrollY, scrollDirection, isScrolling } = useScrollMomentum({
    damping: 40,
    stiffness: 120,
    mass: 0.8,
    velocityThreshold: 5
  });

  const throttledUpdate = useCallback((callback: () => void) => {
    if (!enabled) return;
    
    const now = performance.now();
    if (now - lastUpdateRef.current >= throttleMs) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      frameRef.current = requestAnimationFrame(() => {
        callback();
        lastUpdateRef.current = now;
      });
    }
  }, [enabled, throttleMs]);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return {
    scrollY,
    scrollDirection,
    isScrolling,
    throttledUpdate
  };
};