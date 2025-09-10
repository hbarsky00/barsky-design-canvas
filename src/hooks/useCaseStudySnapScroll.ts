import { useEffect, useRef, useState, useCallback } from 'react';

interface UseCaseStudySnapScrollProps {
  totalCaseStudies: number;
  onCaseStudyChange?: (index: number) => void;
}

export const useCaseStudySnapScroll = ({ 
  totalCaseStudies, 
  onCaseStudyChange 
}: UseCaseStudySnapScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSnapScrolling, setIsSnapScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Smooth scroll to a specific case study
  const scrollToCaseStudy = useCallback((index: number) => {
    if (!containerRef.current || index < 0 || index >= totalCaseStudies) return;
    
    const targetElement = containerRef.current.querySelector(`#case-study-${index + 1}`);
    if (targetElement) {
      setIsSnapScrolling(true);
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Reset snap scrolling flag after animation
      setTimeout(() => setIsSnapScrolling(false), 800);
    }
  }, [totalCaseStudies]);

  // Navigate to next case study
  const navigateNext = useCallback(() => {
    const nextIndex = Math.min(currentIndex + 1, totalCaseStudies - 1);
    if (nextIndex !== currentIndex) {
      scrollToCaseStudy(nextIndex);
    }
  }, [currentIndex, totalCaseStudies, scrollToCaseStudy]);

  // Navigate to previous case study
  const navigatePrevious = useCallback(() => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    if (prevIndex !== currentIndex) {
      scrollToCaseStudy(prevIndex);
    }
  }, [currentIndex, scrollToCaseStudy]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      
      // Check if we're in the case studies section
      const rect = containerRef.current.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      
      if (!isInView) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          navigateNext();
          break;
        case 'ArrowUp':
          e.preventDefault();
          navigatePrevious();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateNext, navigatePrevious]);

  // Track which case study is currently in view using Intersection Observer
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Don't update during snap scrolling to avoid conflicts
        if (isSnapScrolling) return;

        let newIndex = currentIndex;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const id = target.id;
            const match = id.match(/case-study-(\d+)/);
            
            if (match && entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio;
              newIndex = parseInt(match[1]) - 1; // Convert to 0-based index
            }
          }
        });

        if (newIndex !== currentIndex && maxRatio > 0.3) {
          setCurrentIndex(newIndex);
          onCaseStudyChange?.(newIndex);
        }
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    // Observe all case study cards
    const caseStudyCards = containerRef.current.querySelectorAll('[id^="case-study-"]');
    caseStudyCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [currentIndex, isSnapScrolling, onCaseStudyChange]);

  return {
    containerRef,
    currentIndex,
    navigateNext,
    navigatePrevious,
    scrollToCaseStudy,
    isSnapScrolling
  };
};