
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

export const useUniversalKeyboardNavigation = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  // Detect sections using the specified selectors
  const detectSections = useCallback(() => {
    const selectors = [
      '[data-section]',
      '.page-section',
      'section[aria-labelledby]'
    ];
    
    const sections: Array<{ id: string; element: HTMLElement }> = [];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
      elements.forEach((element, index) => {
        // Auto-assign ID if missing
        if (!element.id) {
          element.id = `section-${sections.length + 1}`;
        }
        
        // Set tabindex for focus management
        element.tabIndex = -1;
        
        sections.push({
          id: element.id,
          element
        });
      });
    });
    
    return sections;
  }, []);

  // Check for modal/dialog states
  const checkModalState = useCallback(() => {
    const hasAriaModal = !!document.querySelector('[aria-modal="true"]');
    const hasModalClass = document.body.classList.contains('modal-open');
    const hasRadixDialog = !!document.querySelector('[data-state="open"][role="dialog"]');
    
    return hasAriaModal || hasModalClass || hasRadixDialog;
  }, []);

  // Check if user is in a form field or editable content
  const isInFormField = useCallback(() => {
    const activeElement = document.activeElement;
    if (!activeElement) return false;
    
    const isInput = activeElement instanceof HTMLInputElement;
    const isTextarea = activeElement instanceof HTMLTextAreaElement;
    const isSelect = activeElement instanceof HTMLSelectElement;
    const isContentEditable = activeElement.hasAttribute('contenteditable');
    const isTextboxRole = activeElement.getAttribute('role') === 'textbox';
    
    return isInput || isTextarea || isSelect || isContentEditable || isTextboxRole;
  }, []);

  const getHeaderOffset = useCallback(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const headerHeight = parseInt(rootStyles.getPropertyValue('--header-height')) || 64;
    return headerHeight + 16;
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const sections = detectSections();
    if (index < 0 || index >= sections.length) return;
    
    const section = sections[index];
    const element = section.element;
    
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      window.scrollTo({
        top: offsetTop,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      
      // Update URL hash
      if (section.id) {
        window.history.replaceState(null, '', `#${section.id}`);
      }
      
      // Focus the section after scrolling
      setTimeout(() => {
        element.focus({ preventScroll: true });
      }, prefersReducedMotion ? 0 : 300);
      
      setCurrentSectionIndex(index);
    }
  }, [detectSections, getHeaderOffset]);

  const navigateUp = useCallback(() => {
    if (isModalOpen || isInFormField()) return;
    
    const newIndex = Math.max(0, currentSectionIndex - 1);
    if (newIndex !== currentSectionIndex) {
      scrollToSection(newIndex);
    }
  }, [currentSectionIndex, scrollToSection, isModalOpen, isInFormField]);

  const navigateDown = useCallback(() => {
    if (isModalOpen || isInFormField()) return;
    
    const sections = detectSections();
    const newIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
    if (newIndex !== currentSectionIndex) {
      scrollToSection(newIndex);
    }
  }, [currentSectionIndex, scrollToSection, detectSections, isModalOpen, isInFormField]);

  // Debounced keyboard event handler
  useEffect(() => {
    let debounceTimeout: NodeJS.Timeout;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if in form field or modal is open
      if (isInFormField() || isModalOpen) return;
      
      const isArrowKey = ['ArrowUp', 'ArrowDown', 'Up', 'Down'].includes(event.key);
      
      if (!isArrowKey) return;
      
      event.preventDefault();
      event.stopPropagation();
      
      // Debounce navigation
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        if (event.key === 'ArrowUp' || event.key === 'Up') {
          navigateUp();
        } else if (event.key === 'ArrowDown' || event.key === 'Down') {
          navigateDown();
        }
      }, 50);
    };

    document.addEventListener('keydown', handleKeyDown, { passive: false, capture: true });
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      clearTimeout(debounceTimeout);
    };
  }, [navigateUp, navigateDown, isInFormField, isModalOpen]);

  // Modal state monitoring
  useEffect(() => {
    const checkModals = () => {
      setIsModalOpen(checkModalState());
    };
    
    // Check immediately and set up mutation observer
    checkModals();
    
    const observer = new MutationObserver(checkModals);
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['aria-modal', 'data-state', 'class']
    });
    
    return () => observer.disconnect();
  }, [checkModalState]);

  // Initialize current section on load
  useEffect(() => {
    const sections = detectSections();
    if (sections.length === 0) return;
    
    // Check URL hash first
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const targetIndex = sections.findIndex(s => s.id === targetId);
      if (targetIndex !== -1) {
        setCurrentSectionIndex(targetIndex);
        return;
      }
    }
    
    // Use intersection observer to find visible section
    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = { index: 0, ratio: 0 };
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > mostVisible.ratio) {
            const index = sections.findIndex(s => s.element === entry.target);
            if (index !== -1) {
              mostVisible = { index, ratio: entry.intersectionRatio };
            }
          }
        });
        
        if (mostVisible.ratio > 0.4) {
          setCurrentSectionIndex(mostVisible.index);
        }
      },
      { threshold: [0.4, 0.5, 0.6] }
    );
    
    sections.forEach(section => {
      observer.observe(section.element);
    });
    
    return () => observer.disconnect();
  }, [location.hash, detectSections]);

  return {
    currentSectionIndex,
    navigateUp,
    navigateDown,
    scrollToSection,
    canNavigateUp: currentSectionIndex > 0,
    canNavigateDown: currentSectionIndex < detectSections().length - 1,
    isModalOpen,
  };
};
