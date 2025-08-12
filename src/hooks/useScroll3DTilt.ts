import { RefObject } from "react";
import { useReducedMotion, useScroll, useTransform, MotionValue } from "framer-motion";

type Options = {
  maxTilt?: number;
  yDistance?: number;
  childParallax?: number;
  scaleRange?: [number, number, number];
};

export const useScroll3DTilt = (
  ref: RefObject<Element>,
  {
    maxTilt = 3,
    yDistance = 12,
    childParallax = 8,
    scaleRange = [0.995, 1, 0.997],
  }: Options = {}
) => {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [
    `${maxTilt}deg`,
    "0deg",
    `-${maxTilt * 0.66}deg`,
  ]);
  const y = useTransform(scrollYProgress, [0, 1], [yDistance, -yDistance]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], scaleRange);

  const childY = useTransform(scrollYProgress, [0, 1], [childParallax, -childParallax]);
  const childScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.01, 1, 1.005]);

  if (reduced) {
    return {
      containerStyle: { rotateX: 0 as unknown as MotionValue<string | number>, y: 0, scale: 1 },
      childStyle: { y: 0, scale: 1 },
    };
  }

  return {
    containerStyle: { rotateX, y, scale },
    childStyle: { y: childY, scale: childScale },
  };
};
