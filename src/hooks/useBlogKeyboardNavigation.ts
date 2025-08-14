
import { useState, useEffect, useCallback } from "react";
import { use3DTransition } from "./use3DTransition";
import { useIsMobile } from "./use-mobile";

interface BlogSection {
  id: string;
  title: string;
}

export const useBlogKeyboardNavigation = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const { isTransitioning, direction, variation, triggerTransition } = use3DTransition();
  const isMobile = useIsMobile();
  
  // Define blog sections in order
  const sections: BlogSection[] = [
    { id: 'blog-header', title: 'Header' },
    { id: 'blog-content', title: 'Content' },
    { id: 'blog-engagement', title: 'Engagement' },
    { id: 'blog-social-share', title: 'Social Share' },
    { id: 'blog-newsletter', title: 'Newsletter' },
    { id: 'blog-author', title: 'Author' },
    { id: 'blog-related', title: 'Related Posts' },
    { id: 'blog-faq', title: 'FAQ' },
    { id: 'blog-services-cta', title: 'Services' }
  ];

  const getHeaderOffset = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const headerHeight = parseInt(rootStyles.getPropertyValue('--header-height')) || 64;
    return headerHeight + 16;
  };

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

  // Enhanced mobile detection
  const isTouchDevice = useCallback(() => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

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

  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement) {
        return;
      }

      const isMobileKeyboard = isMobile && isTouchDevice();
      
      switch (event.key) {
        case 'ArrowUp':
        case 'Up':
          event.preventDefault();
          event.stopPropagation();
          navigateUp();
          break;
        case 'ArrowDown':
        case 'Down':
          event.preventDefault();
          event.stopPropagation();
          navigateDown();
          break;
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

    document.addEventListener('keydown', handleKeyDown, { 
      passive: false,
      capture: true 
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [navigateUp, navigateDown, isMobile, isTouchDevice]);

  // Touch/swipe gesture support for mobile
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

        if (Math.abs(deltaY) > minSwipeDistance && deltaTime < maxSwipeTime) {
          event.preventDefault();
          
          if (deltaY > 0) {
            navigateDown();
          } else {
            navigateUp();
          }
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigateUp, navigateDown, isMobile, isTouchDevice]);

  return {
    currentSectionIndex,
    sections,
    navigateUp,
    navigateDown,
    scrollToSection,
    canNavigateUp: currentSectionIndex > 0,
    canNavigateDown: currentSectionIndex < sections.length - 1,
    isTransitioning,
    transitionDirection: direction,
    transitionVariation: variation,
    isMobile,
    isTouchDevice: isTouchDevice(),
  };
};
