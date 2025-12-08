import { useState, useCallback, useRef, useEffect, RefObject } from 'react';

interface SpotlightPosition {
  x: number;
  y: number;
}

interface UseSpotlightEffectReturn {
  spotlightRef: RefObject<HTMLDivElement>;
  spotlightPosition: SpotlightPosition;
  isHovering: boolean;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  spotlightStyle: React.CSSProperties;
}

export const useSpotlightEffect = (
  radius: number = 150,
  color: string = 'hsl(180 100% 50%)',
  intensity: number = 0.15
): UseSpotlightEffectReturn => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [spotlightPosition, setSpotlightPosition] = useState<SpotlightPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlightRef.current) return;
    
    const rect = spotlightRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setSpotlightPosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const spotlightStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    '--spotlight-x': `${spotlightPosition.x}px`,
    '--spotlight-y': `${spotlightPosition.y}px`,
    '--spotlight-radius': `${radius}px`,
    '--spotlight-color': color,
    '--spotlight-intensity': intensity,
  } as React.CSSProperties;

  return {
    spotlightRef,
    spotlightPosition,
    isHovering,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    spotlightStyle,
  };
};

export default useSpotlightEffect;
