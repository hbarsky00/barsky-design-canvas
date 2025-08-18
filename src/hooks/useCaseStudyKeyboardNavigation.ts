
import { useState, useEffect, useCallback } from "react";
import { use3DTransition } from "./use3DTransition";
import { useIsMobile } from "./use-mobile";

interface CaseStudySection {
  id: string;
  title: string;
}

export const useCaseStudyKeyboardNavigation = (sections: CaseStudySection[]) => {
  // Add virtual "hero" section at index 0, shift all other sections by 1
  const allSections = [
    { id: 'hero', title: 'Hero' },
    ...sections
  ];
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
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
    if (index < 0 || index >= allSections.length) return;
    
    setIsNavigating(true);
    setCurrentSectionIndex(index);
    
    // Handle hero section (index 0) - scroll to top
    if (index === 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      // Handle regular sections (index 1+) - find the actual section
      const sectionId = allSections[index].id;
      const element = document.getElementById(sectionId);
      
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    }
    
    // Reset navigation state after scroll completion
    setTimeout(() => {
      setIsNavigating(false);
    }, 2000);
  }, [allSections]);

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
    
    const newIndex = currentSectionIndex + 1;
    if (newIndex < allSections.length) {
      triggerTransition('down', () => {
        scrollToSection(newIndex);
      });
    }
  }, [currentSectionIndex, scrollToSection, allSections.length, isTransitioning, triggerTransition]);

  // Track current section on scroll
  useEffect(() => {
    let ticking = false;
    let scrollDetectionDelay: number | null = null;

        const handleScroll = () => {
      if (ticking || isTransitioning || isNavigating) return;
      
      // Clear any existing delay
      if (scrollDetectionDelay) {
        clearTimeout(scrollDetectionDelay);
      }
      
      // Add a larger delay to prevent immediate section switching during navigation
      scrollDetectionDelay = window.setTimeout(() => {
        if (isTransitioning || isNavigating) return;
        
        ticking = true;
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const viewportHeight = window.innerHeight;
          const viewportCenter = scrollPosition + viewportHeight / 2;

          // If we're near the top of the page (first 300px), stay in hero section
          if (scrollPosition < 300) {
            setCurrentSectionIndex(0); // Hero section
            ticking = false;
            return;
          }

          let newSectionIndex = 1; // Start from index 1 (first real section after hero)
          let minDistance = Infinity;

          // Check actual sections (skip hero at index 0)
          for (let i = 1; i < allSections.length; i++) {
            const element = document.getElementById(allSections[i].id);
            if (element) {
              const rect = element.getBoundingClientRect();
              const elementTop = scrollPosition + rect.top;
              const elementPosition = elementTop + rect.height * 0.3; // 30% into the element
              const distance = Math.abs(viewportCenter - elementPosition);

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
      }, 400); // 400ms delay to prevent rapid section switching during navigation
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollDetectionDelay) {
        clearTimeout(scrollDetectionDelay);
      }
    };
  }, [allSections, isTransitioning, isNavigating]);

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
            // Swipe up - go to next section
            navigateDown();
          } else {
            // Swipe down - go to previous section
            navigateUp();
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
    canNavigateDown: currentSectionIndex < allSections.length - 1,
    isTransitioning,
    transitionDirection: direction,
    transitionVariation: variation,
    // Add mobile state
    isMobile,
    // Add touch device detection
    isTouchDevice: isTouchDevice(),
  };
};
