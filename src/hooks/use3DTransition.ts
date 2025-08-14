
import { useState, useCallback, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export type TransitionDirection = 'up' | 'down' | 'none';

// Subtle transition variations for dynamic feel
const getTransitionVariation = () => {
  const variations = [
    { intensity: 0.08, duration: 250 },
    { intensity: 0.12, duration: 200 },
    { intensity: 0.15, duration: 300 },
  ];
  return variations[Math.floor(Math.random() * variations.length)];
};

export const use3DTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<TransitionDirection>('none');
  const [variation, setVariation] = useState(getTransitionVariation());
  const prefersReducedMotion = useReducedMotion();
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  const triggerTransition = useCallback((transitionDirection: TransitionDirection, callback?: () => void) => {
    if (isTransitioning || prefersReducedMotion) {
      callback?.();
      return;
    }

    // Get a new variation for this transition
    const newVariation = getTransitionVariation();
    setVariation(newVariation);
    setIsTransitioning(true);
    setDirection(transitionDirection);

    // Clear any existing timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Execute callback almost immediately for smooth scrolling
    const callbackTimeout = setTimeout(() => {
      callback?.();
    }, 50);

    // End transition after brief animation
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setDirection('none');
    }, newVariation.duration);

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
    variation,
    triggerTransition,
  };
};
