
import { useState, useCallback, useRef, useEffect } from "react";

interface UseSectionTransitionOverlayOptions {
  duration?: number;
  respectReducedMotion?: boolean;
}

export const useSectionTransitionOverlay = (options: UseSectionTransitionOverlayOptions = {}) => {
  const { duration = 260, respectReducedMotion = true } = options;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const transitionLockRef = useRef(false);
  const prefersReducedMotion = useRef(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (respectReducedMotion && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotion.current = mediaQuery.matches;
      
      const handleChange = (e: MediaQueryListEvent) => {
        prefersReducedMotion.current = e.matches;
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [respectReducedMotion]);

  const transitionToSection = useCallback(async (
    sectionId: string,
    navigationCallback: () => void
  ) => {
    // Prevent double-trigger
    if (transitionLockRef.current) return;
    
    // Skip animation if reduced motion is preferred
    if (prefersReducedMotion.current) {
      navigationCallback();
      
      // Focus management for accessibility
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        const heading = section?.querySelector('h1, h2, h3');
        if (heading) {
          (heading as HTMLElement).setAttribute('tabindex', '-1');
          (heading as HTMLElement).focus();
        }
      }, 50);
      
      return;
    }

    // Set transition lock
    transitionLockRef.current = true;
    setIsTransitioning(true);

    // Prevent scroll jank
    document.documentElement.classList.add('transition-lock');

    // Show overlay
    setIsOverlayActive(true);

    // Wait for overlay to fade in, then execute navigation
    setTimeout(() => {
      navigationCallback();
      
      // Wait a bit more for section change, then fade out overlay
      setTimeout(() => {
        setIsOverlayActive(false);
        
        // Clean up after overlay fades out
        setTimeout(() => {
          document.documentElement.classList.remove('transition-lock');
          setIsTransitioning(false);
          transitionLockRef.current = false;
          
          // Focus management for accessibility
          const section = document.getElementById(sectionId);
          const heading = section?.querySelector('h1, h2, h3');
          if (heading) {
            (heading as HTMLElement).setAttribute('tabindex', '-1');
            (heading as HTMLElement).focus();
          }
        }, duration);
      }, 50);
    }, Math.floor(duration * 0.8)); // 80% of duration for overlay fade-in

  }, [duration]);

  return {
    isTransitioning,
    isOverlayActive,
    transitionToSection,
    canNavigate: !transitionLockRef.current
  };
};
