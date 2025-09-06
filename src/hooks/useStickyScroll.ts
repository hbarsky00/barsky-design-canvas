import { useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject, useMemo } from "react";

export interface StickyScrollCard {
  id: string;
  ref: RefObject<HTMLElement>;
}

export interface StickyScrollState {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
  zIndex: number;
  isActive: MotionValue<boolean>;
}

export const useStickyScroll = (
  containerRef: RefObject<HTMLElement>,
  cards: StickyScrollCard[],
  cardIndex: number
): StickyScrollState => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const totalCards = cards.length;
  const cardProgress = 1 / totalCards;
  const startProgress = cardIndex * cardProgress;
  const endProgress = (cardIndex + 1) * cardProgress;

  // Calculate when this card is active (fully visible)
  const isActive = useTransform(
    scrollYProgress,
    [startProgress, startProgress + 0.05, endProgress - 0.05, endProgress],
    [false, true, true, false]
  );

  // Opacity: Immediate transition for layering effect
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, startProgress - 0.01),
      startProgress,
      endProgress,
      Math.min(1, endProgress + 0.01)
    ],
    [0, 1, 1, 0]
  );

  // Scale: slightly scale down when being covered by next card
  const scale = useTransform(
    scrollYProgress,
    [
      startProgress,
      endProgress - 0.1,
      endProgress
    ],
    [1, 1, 0.96]
  );

  // Y position: slide up when being covered for layering effect
  const y = useTransform(
    scrollYProgress,
    [
      startProgress,
      endProgress - 0.1,
      endProgress
    ],
    [0, 0, -30]
  );

  // Z-index: ensure proper layering (higher index = on top)
  const zIndex = cardIndex + 1;

  return useMemo(() => ({
    opacity,
    scale,
    y,
    zIndex,
    isActive
  }), [opacity, scale, y, zIndex, isActive]);
};