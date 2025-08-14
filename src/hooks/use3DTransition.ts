
import { useState, useCallback, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export type TransitionDirection = 'up' | 'down' | 'none';

export const use3DTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<TransitionDirection>('none');
  const prefersReducedMotion = useReducedMotion();
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  const triggerTransition = useCallback((transitionDirection: TransitionDirection, callback?: () => void) => {
    if (isTransitioning || prefersReducedMotion) {
      callback?.();
      return;
    }

    setIsTransitioning(true);
    setDirection(transitionDirection);

    // Clear any existing timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Execute callback after a short delay to allow overlay to appear
    const callbackTimeout = setTimeout(() => {
      callback?.();
    }, 200);

    // End transition after animation completes
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setDirection('none');
    }, 1000);

    return () => {
      clearTimeout(callbackTimeout);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [isTransitioning, prefersReducedMotion]);

  return {
    isTransitioning,
    direction,
    triggerTransition,
  };
};
