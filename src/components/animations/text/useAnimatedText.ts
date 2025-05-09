
import { useEffect, useRef, useState } from "react";
import { BaseAnimatedTextProps } from "./AnimatedTextTypes";

export const useAnimatedText = ({ 
  delay = 0, 
  animateOnce = true,
  onComplete,
  text,
  staggerChildren = 0.03,
  duration = 0.5
}: BaseAnimatedTextProps & { staggerChildren?: number, duration?: number }) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      element.style.animationDelay = `${delay}ms`;
    }
    
    // Setup IntersectionObserver for triggering animation when element is in view
    if (!animateOnce || !hasAnimated) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasAnimated(true);
            
            // Call onComplete after animation duration
            if (onComplete) {
              const totalDuration = delay + (text.length * staggerChildren * 1000) + (duration * 1000);
              setTimeout(onComplete, totalDuration);
            }
          }
        },
        { threshold: 0.2 }
      );
      
      if (element) {
        observer.observe(element);
      }
      
      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }
  }, [delay, animateOnce, hasAnimated, onComplete, text, staggerChildren, duration]);

  return { elementRef, isVisible };
};
