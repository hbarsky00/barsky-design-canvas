
import { useState, useEffect, useCallback } from "react";

export const useHomepageKeyboardNavigation = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  
  // Define sections in order
  const sections = [
    { id: 'hero', element: null as HTMLElement | null },
    { id: 'bio-section', element: null as HTMLElement | null },
    { id: 'projects', element: null as HTMLElement | null },
    { id: 'contact', element: null as HTMLElement | null },
    { id: 'blog-preview', element: null as HTMLElement | null },
    { id: 'faq-section', element: null as HTMLElement | null },
    { id: 'internal-linking', element: null as HTMLElement | null }
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
      // Immediately update the current section index
      setCurrentSectionIndex(index);
    }
  }, [sections]);

  const navigateUp = useCallback(() => {
    const newIndex = Math.max(0, currentSectionIndex - 1);
    scrollToSection(newIndex);
  }, [currentSectionIndex, scrollToSection]);

  const navigateDown = useCallback(() => {
    const newIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
    scrollToSection(newIndex);
  }, [currentSectionIndex, scrollToSection, sections.length]);

  // Improved scroll tracking with better section detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const headerOffset = getHeaderOffset();
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const viewportCenter = scrollPosition + viewportHeight / 2;

        let newSectionIndex = 0;
        let minDistance = Infinity;

        // Find the section whose center is closest to the viewport center
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

        // Only update if the section actually changed
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
    handleScroll(); // Set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle if not typing in an input/textarea
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement) {
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          navigateUp();
          break;
        case 'ArrowDown':
          event.preventDefault();
          navigateDown();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateUp, navigateDown]);

  return {
    currentSectionIndex,
    sections,
    navigateUp,
    navigateDown,
    scrollToSection,
    canNavigateUp: currentSectionIndex > 0,
    canNavigateDown: currentSectionIndex < sections.length - 1
  };
};
