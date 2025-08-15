
import { useState, useEffect, useCallback } from "react";
import { use3DTransition } from "./use3DTransition";
import { useIsMobile } from "./use-mobile";

interface CaseStudySection {
  id: string;
  title: string;
}

export const useCaseStudyKeyboardNavigation = (sections: CaseStudySection[]) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const { isTransitioning, direction, variation, triggerTransition } = use3DTransition();
  const isMobile = useIsMobile();

  const getHeaderOffset = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const headerHeight = parseInt(rootStyles.getPropertyValue('--header-height')) || 64;
    return headerHeight + 16;
  };

  // Enhanced mobile detection
  const isTouchDevice = useCallback(() => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= sections.length) return;
    
    const sectionId = sections[index].id;
    const element = document.getElementById(sectionId);
    
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
      setCurrentSectionIndex(index);
    }
  }, [sections]);

  const navigateUp = useCallback(() => {
    if (isTransitioning) return;
    
    const newIndex = Math.max(0, currentSectionIndex - 1);
    if (newIndex !== currentSectionIndex) {
      triggerTransition('up', () => {
        scrollToSection(newIndex);
      });
    }
  }, [currentSectionIndex, scrollToSection, isTransitioning, triggerTransition]);

  const navigateDown = useCallback(() => {
    if (isTransitioning) return;
    
    const newIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
    if (newIndex !== currentSectionIndex) {
      triggerTransition('down', () => {
        scrollToSection(newIndex);
      });
    }
  }, [currentSectionIndex, scrollToSection, sections.length, isTransitioning, triggerTransition]);

  // Track current section on scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking || isTransitioning) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const headerOffset = getHeaderOffset();
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const viewportCenter = scrollPosition + viewportHeight / 2;

        let newSectionIndex = 0;
        let minDistance = Infinity;

        for (let i = 0; i < sections.length; i++) {
          const element = document.getElementById(sections[i].id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = scrollPosition + rect.top;
            const elementCenter = elementTop + rect.height / 2;
            const distance = Math.abs(viewportCenter - elementCenter);

            if (distance < minDistance) {
              minDistance = distance;
              newSectionIndex = i;
            }
          }
        }

        setCurrentSectionIndex(prev => {
          if (prev !== newSectionIndex) {
            return newSectionIndex;
          }
          return prev;
        });

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, isTransitioning]);

  // Enhanced keyboard event handling with mobile support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle if not typing in an input/textarea
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement) {
        return;
      }

      // Enhanced mobile keyboard detection
      const isMobileKeyboard = isMobile && isTouchDevice();
      
      switch (event.key) {
        case 'ArrowUp':
        case 'Up': // Fallback for older browsers
          event.preventDefault();
          event.stopPropagation();
          navigateUp();
          break;
        case 'ArrowDown':
        case 'Down': // Fallback for older browsers
          event.preventDefault();
          event.stopPropagation();
          navigateDown();
          break;
        // Additional mobile-friendly keys
        case 'w':
        case 'W':
          if (!isMobileKeyboard) {
            event.preventDefault();
            navigateUp();
          }
          break;
        case 's':
        case 'S':
          if (!isMobileKeyboard) {
            event.preventDefault();
            navigateDown();
          }
          break;
      }
    };

    // Use both keydown and keyup for better mobile support
    const handleKeyUp = (event: KeyboardEvent) => {
      if (isMobile && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    // Enhanced event listeners with better mobile support
    document.addEventListener('keydown', handleKeyDown, { 
      passive: false,
      capture: true 
    });
    
    if (isMobile) {
      document.addEventListener('keyup', handleKeyUp, { 
        passive: false,
        capture: true 
      });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      if (isMobile) {
        document.removeEventListener('keyup', handleKeyUp, true);
      }
    };
  }, [navigateUp, navigateDown, isMobile, isTouchDevice]);

  // Add touch/swipe gesture support for mobile
  useEffect(() => {
    if (!isMobile || !isTouchDevice()) return;

    let startY = 0;
    let startTime = 0;
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        startY = event.touches[0].clientY;
        startTime = Date.now();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (event.changedTouches.length === 1) {
        const endY = event.changedTouches[0].clientY;
        const endTime = Date.now();
        const deltaY = startY - endY;
        const deltaTime = endTime - startTime;

        // Check if it's a valid swipe gesture
        if (Math.abs(deltaY) > minSwipeDistance && deltaTime < maxSwipeTime) {
          event.preventDefault();
          
          if (deltaY > 0) {
            // Swipe up (finger moves up, content should go up) - go to previous section
            navigateUp();
          } else {
            // Swipe down (finger moves down, content should go down) - go to next section
            navigateDown();
          }
        }
      }
    };

    // Add touch event listeners with passive: false for preventDefault
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigateUp, navigateDown, isMobile, isTouchDevice]);

  return {
    currentSectionIndex,
    navigateUp,
    navigateDown,
    scrollToSection,
    canNavigateUp: currentSectionIndex > 0,
    canNavigateDown: currentSectionIndex < sections.length - 1,
    isTransitioning,
    transitionDirection: direction,
    transitionVariation: variation,
    // Add mobile state
    isMobile,
    // Add touch device detection
    isTouchDevice: isTouchDevice(),
  };
};
