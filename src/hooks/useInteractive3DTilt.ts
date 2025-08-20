import { RefObject, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

type Options = {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
};

export const useInteractive3DTilt = (
  ref: RefObject<HTMLElement>,
  {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.02,
    speed = 400,
    glare = false,
  }: Options = {}
) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      setTilt({
        x: deltaY * maxTilt,
        y: -deltaX * maxTilt,
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref, maxTilt, isHovered, reduced]);

  if (reduced) {
    return {
      containerStyle: {},
      glareStyle: {},
      isHovered: false,
    };
  }

  const containerStyle = {
    transform: `perspective(${perspective}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? scale : 1})`,
    transition: isHovered ? 'none' : `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
  };

  const glareStyle = glare ? {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(${Math.atan2(tilt.y, tilt.x) * (180 / Math.PI) + 90}deg, 
      rgba(255,255,255,${Math.min(Math.abs(tilt.x + tilt.y) * 0.01, 0.15)}) 0%, 
      transparent 80%)`,
    borderRadius: 'inherit',
    pointerEvents: 'none' as const,
    opacity: isHovered ? 1 : 0,
    transition: `opacity ${speed}ms ease`,
  } : {};

  return {
    containerStyle,
    glareStyle,
    isHovered,
  };
};