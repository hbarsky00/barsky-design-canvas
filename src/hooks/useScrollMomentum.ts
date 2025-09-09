import { useRef, useEffect, useState } from "react";
import { useMotionValue, useSpring, useVelocity } from "framer-motion";

interface ScrollMomentumOptions {
  damping?: number;
  stiffness?: number;
  mass?: number;
  velocityThreshold?: number;
}

export const useScrollMomentum = ({
  damping = 30,
  stiffness = 100,
  mass = 1,
  velocityThreshold = 10
}: ScrollMomentumOptions = {}) => {
  const scrollY = useMotionValue(0);
  const scrollVelocity = useVelocity(scrollY);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'none'>('none');
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Smooth scroll values with spring physics
  const smoothScrollY = useSpring(scrollY, {
    damping,
    stiffness,
    mass
  });

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping * 1.5,
    stiffness: stiffness * 0.8
  });

  useEffect(() => {
    const updateScroll = () => {
      scrollY.set(window.scrollY);
    };

    const handleScroll = () => {
      updateScroll();
      setIsScrolling(true);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set scrolling to false after scroll stops
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // Track scroll direction based on velocity
    const unsubscribe = smoothVelocity.on('change', (velocity) => {
      if (Math.abs(velocity) < velocityThreshold) {
        setScrollDirection('none');
      } else if (velocity > 0) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll(); // Initial value

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scrollY, smoothVelocity, velocityThreshold]);

  return {
    scrollY: smoothScrollY,
    scrollVelocity: smoothVelocity,
    isScrolling,
    scrollDirection,
    // Raw values for immediate access
    rawScrollY: scrollY,
    rawVelocity: scrollVelocity
  };
};

// Hook for momentum-based animations
export const useScrollMomentumAnimation = (
  options: ScrollMomentumOptions & {
    intensityMultiplier?: number;
    maxIntensity?: number;
  } = {}
) => {
  const {
    intensityMultiplier = 1,
    maxIntensity = 50,
    ...momentumOptions
  } = options;

  const { scrollVelocity, scrollDirection, isScrolling } = useScrollMomentum(momentumOptions);

  // Calculate animation intensity based on velocity
  const getAnimationIntensity = (velocity: number) => {
    const intensity = Math.min(
      Math.abs(velocity * intensityMultiplier * 0.01),
      maxIntensity
    );
    return scrollDirection === 'up' ? -intensity : intensity;
  };

  // Momentum-based transforms
  const momentumTransforms = {
    // Rotation based on scroll direction and velocity
    rotateX: scrollVelocity.get() ? getAnimationIntensity(scrollVelocity.get()) * 0.1 : 0,
    rotateY: scrollVelocity.get() ? getAnimationIntensity(scrollVelocity.get()) * 0.05 : 0,
    
    // Translation with momentum
    y: scrollVelocity.get() ? getAnimationIntensity(scrollVelocity.get()) * 0.5 : 0,
    
    // Scale with subtle breathing effect
    scale: isScrolling ? 1 + Math.abs(getAnimationIntensity(scrollVelocity.get())) * 0.002 : 1,
    
    // Blur during fast scrolling
    blur: Math.abs(scrollVelocity.get()) > 1000 ? Math.min(Math.abs(scrollVelocity.get()) * 0.002, 3) : 0
  };

  return {
    ...useScrollMomentum(momentumOptions),
    momentumTransforms,
    animationIntensity: getAnimationIntensity(scrollVelocity.get())
  };
};