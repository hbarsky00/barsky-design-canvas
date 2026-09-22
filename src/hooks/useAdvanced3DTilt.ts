import { RefObject } from "react";
import { useReducedMotion, useScroll, useTransform, MotionValue } from "framer-motion";

type Options = {
  maxTilt?: number;
  yDistance?: number;
  childParallax?: number;
  scaleRange?: [number, number, number];
  depthLayers?: number;
  blurIntensity?: number;
};

export const useAdvanced3DTilt = (
  ref: RefObject<HTMLElement>,
  {
    maxTilt = 8,
    yDistance = 20,
    childParallax = 15,
    scaleRange = [0.98, 1, 0.995],
    depthLayers = 3,
    blurIntensity = 2,
  }: Options = {}
) => {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Enhanced rotation with multiple axes
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [
    `${maxTilt}deg`,
    `${maxTilt * 0.3}deg`,
    `-${maxTilt * 0.3}deg`,
    `-${maxTilt}deg`,
  ]);
  
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [
    `${maxTilt * 0.5}deg`,
    "0deg",
    `-${maxTilt * 0.5}deg`,
  ]);

  // Multi-layer parallax
  const y = useTransform(scrollYProgress, [0, 1], [yDistance, -yDistance]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], scaleRange);

  // Depth layers for different elements
  const layers = Array.from({ length: depthLayers }, (_, i) => {
    const multiplier = (i + 1) / depthLayers;
    return {
      y: useTransform(scrollYProgress, [0, 1], [
        childParallax * multiplier, 
        -childParallax * multiplier
      ]),
      scale: useTransform(scrollYProgress, [0, 0.5, 1], [
        1 + (0.02 * multiplier),
        1,
        1 + (0.01 * multiplier)
      ]),
      blur: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [
        `${blurIntensity * multiplier}px`,
        "0px",
        "0px",
        `${blurIntensity * multiplier}px`,
      ]),
    };
  });

  // Dynamic opacity for depth of field
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.7, 1, 1, 0.7]);

  if (reduced) {
    return {
      containerStyle: { 
        rotateX: 0 as unknown as MotionValue<string | number>, 
        rotateY: 0 as unknown as MotionValue<string | number>,
        y: 0, 
        scale: 1,
        opacity: 1,
      },
      layers: layers.map(() => ({ y: 0, scale: 1, blur: "0px" })),
    };
  }

  return {
    containerStyle: { rotateX, rotateY, y, scale, opacity },
    layers,
  };
};