import { useState, useEffect, useRef } from "react";

export const useHomepageKeyboardNavigation = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isInCaseStudyMode, setIsInCaseStudyMode] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down' | 'none'>('none');
  const [transitionVariation, setTransitionVariation] = useState({ intensity: 0, duration: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastNavigationTime = useRef(0);

  // Define homepage sections in order - includes individual case studies
  const sections = [
    { id: 'intro', element: null as HTMLElement | null },
    { id: 'bio', element: null as HTMLElement | null },
    { id: 'case-study-1', element: null as HTMLElement | null },
    { id: 'case-study-2', element: null as HTMLElement | null },
    { id: 'case-study-3', element: null as HTMLElement | null },
    { id: 'case-study-4', element: null as HTMLElement | null },
    { id: 'contact', element: null as HTMLElement | null },
    { id: 'blog', element: null as HTMLElement | null },
    { id: 'faq', element: null as HTMLElement | null },
  ];

  // Helper function to check if user is in form field
  const isInFormField = () => {
    const activeElement = document.activeElement;
    if (!activeElement) return false;
    
    const tagName = activeElement.tagName.toLowerCase();
    const isFormElement = ['input', 'textarea', 'select'].includes(tagName);
    const isContentEditable = activeElement.getAttribute('contenteditable') === 'true';
    
    return isFormElement || isContentEditable;
  };

  // Get current sections and update their elements
  const getCurrentSections = () => {
    return sections.map(section => ({
      ...section,
      element: document.getElementById(section.id)
    })).filter(section => section.element);
  };

  // Scroll to specific section
  const scrollToSection = (index: number) => {
    if (isInFormField()) return;
    
    const currentSections = getCurrentSections();
    if (index < 0 || index >= currentSections.length) return;
    
    const section = currentSections[index];
    if (!section.element) return;

    // Instant scroll for effortless navigation
    section.element.scrollIntoView({
      behavior: 'auto',
      block: 'center',
    });
  };

  // Navigate up
  const navigateUp = () => {
    const now = Date.now();
    if (now - lastNavigationTime.current < 100) return; // Reduced debounce for responsiveness
    lastNavigationTime.current = now;

    if (isInFormField()) return;
    
    const currentSections = getCurrentSections();
    const newIndex = Math.max(0, currentSectionIndex - 1);
    
    if (newIndex !== currentSectionIndex) {
      setCurrentSectionIndex(newIndex);
      scrollToSection(newIndex);
    }
  };

  // Navigate down
  const navigateDown = () => {
    const now = Date.now();
    if (now - lastNavigationTime.current < 100) return; // Reduced debounce for responsiveness
    lastNavigationTime.current = now;

    if (isInFormField()) return;
    
    const currentSections = getCurrentSections();
    const newIndex = Math.min(currentSections.length - 1, currentSectionIndex + 1);
    
    if (newIndex !== currentSectionIndex) {
      setCurrentSectionIndex(newIndex);
      scrollToSection(newIndex);
    }
  };

  // Scroll tracking and keyboard navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      // Track all sections including individual case studies
      const currentSections = getCurrentSections();
      
      currentSections.forEach((section, index) => {
        if (!section.element) return;
        const rect = section.element.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setCurrentSectionIndex(index);
          // Set case study mode if we're on a case study section
          setIsInCaseStudyMode(section.id.startsWith('case-study-'));
        }
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInFormField()) return;
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          navigateUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          navigateDown();
          break;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSectionIndex]);

  const currentSections = getCurrentSections();
  const canNavigateUp = currentSectionIndex > 0;
  const canNavigateDown = currentSectionIndex < currentSections.length - 1;
  const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobile = isTouchDevice();

  return {
    currentSectionIndex,
    isInCaseStudyMode,
    sections: currentSections,
    navigateUp,
    navigateDown,
    scrollToSection,
    canNavigateUp,
    canNavigateDown,
    transitionDirection,
    transitionVariation,
    isTouchDevice,
    isTransitioning,
    isMobile,
  };
};