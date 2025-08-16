import { useState, useEffect, useCallback } from "react";
import { use3DTransition } from "./use3DTransition";
import { useIsMobile } from "./use-mobile";

export const useHomepageKeyboardNavigation = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isInCaseStudyMode, setIsInCaseStudyMode] = useState(false);
  const { isTransitioning, direction, variation, triggerTransition } = use3DTransition();
  const isMobile = useIsMobile();
  
  // Define major sections
  const majorSections = [
    { id: 'hero', element: null as HTMLElement | null },
    { id: 'bio-section', element: null as HTMLElement | null },
    { id: 'projects', element: null as HTMLElement | null },
    { id: 'contact', element: null as HTMLElement | null },
    { id: 'blog-preview', element: null as HTMLElement | null },
    { id: 'faq-section', element: null as HTMLElement | null, hiddenOnMobile: true },
    { id: 'internal-linking', element: null as HTMLElement | null }
  ];

  // Define case study sections (when in projects section)
  const caseStudySections = [
    { id: 'case-study-1', element: null as HTMLElement | null },
    { id: 'case-study-2', element: null as HTMLElement | null },
    { id: 'case-study-3', element: null as HTMLElement | null },
    { id: 'case-study-4', element: null as HTMLElement | null }
  ];

  // Filter sections based on mobile visibility and current mode
  const getActiveSections = useCallback(() => {
    if (isInCaseStudyMode) {
      return caseStudySections;
    }
    
    return isMobile 
      ? majorSections.filter(section => !section.hiddenOnMobile)
      : majorSections;
  }, [isInCaseStudyMode, isMobile]);

  // Check if user is in a form field or modal
  const isNavigationBlocked = useCallback(() => {
    const activeElement = document.activeElement;
    if (!activeElement) return false;
    
    // Check for form fields
    const isInput = activeElement instanceof HTMLInputElement;
    const isTextarea = activeElement instanceof HTMLTextAreaElement;
    const isSelect = activeElement instanceof HTMLSelectElement;
    const isContentEditable = activeElement.hasAttribute('contenteditable');
    const isTextboxRole = activeElement.getAttribute('role') === 'textbox';
    
    // Check for modals
    const hasModal = !!document.querySelector('[aria-modal="true"]');
    const hasModalClass = document.body.classList.contains('modal-open');
    
    return isInput || isTextarea || isSelect || isContentEditable || isTextboxRole || hasModal || hasModalClass;
  }, []);

  const getHeaderOffset = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const headerHeight = parseInt(rootStyles.getPropertyValue('--header-height')) || 64;
    // Reduced offset for cleaner transitions
    return headerHeight;
  };

  const scrollToSection = useCallback((index: number) => {
    const activeSections = getActiveSections();
    if (index < 0 || index >= activeSections.length) return;
    
    const sectionId = activeSections[index].id;
    const element = document.getElementById(sectionId);
    
    if (element) {
      // For hero section, scroll to absolute top
      let offsetTop;
      if (sectionId === 'hero') {
        offsetTop = 0;
      } else {
        offsetTop = element.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
      }
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      window.scrollTo({
        top: offsetTop,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      
      // Update URL hash (except for hero)
      if (sectionId !== 'hero') {
        window.history.replaceState(null, '', `#${sectionId}`);
      } else {
        window.history.replaceState(null, '', window.location.pathname);
      }
      
      // Focus the section after scrolling
      setTimeout(() => {
        element.focus({ preventScroll: true });
      }, prefersReducedMotion ? 0 : 300);
      
      setCurrentSectionIndex(index);
    }
  }, [getActiveSections]);

  const navigateUp = useCallback(() => {
    if (isTransitioning || isNavigationBlocked()) return;
    
    const activeSections = getActiveSections();
    let newIndex = currentSectionIndex - 1;
    
    // If we're at the first case study and in case study mode, go back to projects section
    if (isInCaseStudyMode && currentSectionIndex === 0) {
      setIsInCaseStudyMode(false);
      const projectsIndex = majorSections.findIndex(s => s.id === 'projects');
      newIndex = projectsIndex;
    } else if (newIndex >= 0) {
      // Normal navigation within current mode
    } else {
      return; // Can't go up further
    }
    
    triggerTransition('up', () => {
      scrollToSection(newIndex);
    });
  }, [currentSectionIndex, scrollToSection, isTransitioning, triggerTransition, isInCaseStudyMode, getActiveSections, isNavigationBlocked]);

  const navigateDown = useCallback(() => {
    if (isTransitioning || isNavigationBlocked()) return;
    
    const activeSections = getActiveSections();
    let newIndex = currentSectionIndex + 1;
    
    // If we're in the projects section and not in case study mode, enter case study mode
    if (!isInCaseStudyMode && activeSections[currentSectionIndex]?.id === 'projects') {
      setIsInCaseStudyMode(true);
      newIndex = 0; // First case study
    } else if (isInCaseStudyMode && newIndex >= caseStudySections.length) {
      // Exit case study mode and go to next major section
      setIsInCaseStudyMode(false);
      const projectsIndex = majorSections.findIndex(s => s.id === 'projects');
      newIndex = projectsIndex + 1;
    } else if (newIndex < activeSections.length) {
      // Normal navigation within current mode
    } else {
      return; // Can't go down further
    }
    
    triggerTransition('down', () => {
      scrollToSection(newIndex);
    });
  }, [currentSectionIndex, scrollToSection, isTransitioning, triggerTransition, isInCaseStudyMode, getActiveSections, isNavigationBlocked]);

  // Enhanced scroll tracking with better section detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking || isTransitioning) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        // Use a more precise center point for section detection
        const detectionPoint = scrollPosition + viewportHeight * 0.4;

        // First, check if we're in the projects section area
        const projectsElement = document.getElementById('projects');
        if (projectsElement) {
          const projectsRect = projectsElement.getBoundingClientRect();
          const projectsTop = scrollPosition + projectsRect.top;
          const projectsBottom = projectsTop + projectsRect.height;
          
          const isInProjectsArea = detectionPoint >= projectsTop && detectionPoint <= projectsBottom;
          
          if (isInProjectsArea) {
            // Check if we're specifically over a case study card
            let foundCaseStudy = false;
            for (let i = 0; i < caseStudySections.length; i++) {
              const caseStudyElement = document.getElementById(caseStudySections[i].id);
              if (caseStudyElement) {
                const rect = caseStudyElement.getBoundingClientRect();
                const elementTop = scrollPosition + rect.top;
                const elementCenter = elementTop + rect.height / 2;
                
                if (Math.abs(detectionPoint - elementCenter) < rect.height / 2) {
                  setIsInCaseStudyMode(true);
                  setCurrentSectionIndex(i);
                  foundCaseStudy = true;
                  break;
                }
              }
            }
            
            if (!foundCaseStudy) {
              // We're in projects area but not over a specific case study
              setIsInCaseStudyMode(false);
              const projectsIndex = majorSections.findIndex(s => s.id === 'projects');
              setCurrentSectionIndex(projectsIndex);
            }
          } else {
            // We're outside projects area, use major section logic
            setIsInCaseStudyMode(false);
            
            const activeSections = isMobile 
              ? majorSections.filter(section => !section.hiddenOnMobile)
              : majorSections;
              
            let newSectionIndex = 0;
            let minDistance = Infinity;

            for (let i = 0; i < activeSections.length; i++) {
              const element = document.getElementById(activeSections[i].id);
              if (element) {
                const rect = element.getBoundingClientRect();
                const elementTop = scrollPosition + rect.top;
                const elementCenter = elementTop + rect.height / 2;
                const distance = Math.abs(detectionPoint - elementCenter);

                if (distance < minDistance) {
                  minDistance = distance;
                  newSectionIndex = i;
                }
              }
            }
            
            setCurrentSectionIndex(newSectionIndex);
          }
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTransitioning, isMobile]);

  // Keyboard event handling with debouncing
  useEffect(() => {
    let debounceTimeout: NodeJS.Timeout;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isNavigationBlocked()) return;
      
      const isArrowKey = ['ArrowUp', 'ArrowDown', 'Up', 'Down'].includes(event.key);
      const isWASDKey = ['w', 'W', 's', 'S'].includes(event.key);
      
      if (isArrowKey) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        
        // Debounce navigation
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          if (event.key === 'ArrowUp' || event.key === 'Up') {
            navigateUp();
          } else if (event.key === 'ArrowDown' || event.key === 'Down') {
            navigateDown();
          }
        }, 50);
      } else if (isWASDKey && !isMobile) {
        event.preventDefault();
        event.stopPropagation();
        
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          if (event.key === 'w' || event.key === 'W') {
            navigateUp();
          } else if (event.key === 's' || event.key === 'S') {
            navigateDown();
          }
        }, 50);
      }
    };

    document.addEventListener('keydown', handleKeyDown, { 
      passive: false,
      capture: true 
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      clearTimeout(debounceTimeout);
    };
  }, [navigateUp, navigateDown, isMobile, isNavigationBlocked]);

  // Touch gesture support for mobile
  useEffect(() => {
    if (!isMobile) return;

    let startY = 0;
    let startTime = 0;
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1 && !isNavigationBlocked()) {
        startY = event.touches[0].clientY;
        startTime = Date.now();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (event.changedTouches.length === 1 && !isNavigationBlocked()) {
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
  }, [navigateUp, navigateDown, isMobile, isNavigationBlocked]);

  const activeSections = getActiveSections();
  
  return {
    currentSectionIndex,
    sections: activeSections,
    navigateUp,
    navigateDown,
    scrollToSection,
    canNavigateUp: isInCaseStudyMode ? (currentSectionIndex > 0 || true) : currentSectionIndex > 0,
    canNavigateDown: isInCaseStudyMode ? (currentSectionIndex < caseStudySections.length - 1 || true) : currentSectionIndex < activeSections.length - 1,
    isTransitioning,
    transitionDirection: direction,
    transitionVariation: variation,
    isMobile,
    isInCaseStudyMode,
  };
};
