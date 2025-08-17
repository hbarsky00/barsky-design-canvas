import { useState, useEffect } from "react";

export const useHomepageKeyboardNavigation = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isInCaseStudyMode, setIsInCaseStudyMode] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down' | 'none'>('none');
  const [transitionVariation, setTransitionVariation] = useState({ intensity: 0, duration: 0 });

  // Simple scroll tracking without navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Check if we're in a case study section
      const caseStudyElements = [
        document.getElementById('case-study-1'),
        document.getElementById('case-study-2'),
        document.getElementById('case-study-3'),
        document.getElementById('case-study-4'),
      ];
      
      let inCaseStudy = false;
      caseStudyElements.forEach((element, index) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setIsInCaseStudyMode(true);
          setCurrentSectionIndex(index);
          inCaseStudy = true;
        }
      });
      
      if (!inCaseStudy) {
        setIsInCaseStudyMode(false);
        // Track major sections
        const majorElements = [
          { id: 'hero', element: document.getElementById('hero') },
          { id: 'bio-section', element: document.getElementById('bio-section') },
          { id: 'projects', element: document.getElementById('projects') },
          { id: 'contact', element: document.getElementById('contact') },
          { id: 'faq-section', element: document.getElementById('faq-section') },
          { id: 'blog-preview', element: document.getElementById('blog-preview') },
        ];
        
        majorElements.forEach((section, index) => {
          if (!section.element) return;
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setCurrentSectionIndex(index);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return {
    currentSectionIndex,
    isInCaseStudyMode,
    sections: [],
    navigateUp: () => {},
    navigateDown: () => {},
    scrollToSection: () => {},
    canNavigateUp: false,
    canNavigateDown: false,
    transitionDirection,
    transitionVariation,
    isTouchDevice,
    isTransitioning: false,
    isMobile: false,
  };
};