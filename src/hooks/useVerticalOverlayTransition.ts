import { useEffect, useRef, useState, useCallback } from 'react';

interface OverlayTransitionState {
  opacity: number;
  scale: number;
  translateY: number;
  isActive: boolean;
  isInteractive: boolean;
}

interface UseVerticalOverlayTransitionProps {
  totalPanels: number;
  onActiveChange?: (index: number) => void;
}

export const useVerticalOverlayTransition = ({ 
  totalPanels, 
  onActiveChange 
}: UseVerticalOverlayTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionStates, setTransitionStates] = useState<OverlayTransitionState[]>([]);
  const observerRef = useRef<IntersectionObserver>();

  // Initialize transition states
  useEffect(() => {
    const initialStates = Array.from({ length: totalPanels }, (_, index) => ({
      opacity: index === 0 ? 1 : 0,
      scale: index === 0 ? 1 : 0.97,
      translateY: index === 0 ? 0 : 20,
      isActive: index === 0,
      isInteractive: index === 0
    }));
    setTransitionStates(initialStates);
  }, [totalPanels]);

  // Calculate transition state based on visibility ratio
  const calculateTransitionState = useCallback((visibilityRatio: number, isActive: boolean): OverlayTransitionState => {
    // Smooth transitions based on visibility ratio
    const opacity = Math.min(1, Math.max(0, visibilityRatio * 1.5));
    const scale = 0.97 + (0.03 * opacity);
    const translateY = 20 * (1 - opacity);
    
    return {
      opacity,
      scale,
      translateY,
      isActive,
      isInteractive: opacity > 0.2 && isActive
    };
  }, []);

  // Setup intersection observer
  useEffect(() => {
    if (!containerRef.current) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visibilityMap = new Map<number, number>();
      let maxVisibility = 0;
      let newActiveIndex = 0;

      // Calculate visibility ratios for all panels
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const panelMatch = target.id.match(/case-study-(\d+)/);
        
        if (panelMatch) {
          const panelIndex = parseInt(panelMatch[1]) - 1;
          const visibilityRatio = entry.intersectionRatio;
          visibilityMap.set(panelIndex, visibilityRatio);
          
          // Track which panel has highest visibility
          if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            newActiveIndex = panelIndex;
          }
        }
      });

      // Only update if there's significant visibility (threshold to prevent jitter)
      if (maxVisibility > 0.3 && newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
        onActiveChange?.(newActiveIndex);
      }

      // Update transition states for all panels
      setTransitionStates(prev => 
        prev.map((state, index) => {
          const visibilityRatio = visibilityMap.get(index) || 0;
          const isActive = index === newActiveIndex && maxVisibility > 0.3;
          return calculateTransitionState(visibilityRatio, isActive);
        })
      );
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
      rootMargin: '-10% 0px -10% 0px'
    });

    // Observe all panels
    const panels = containerRef.current.querySelectorAll('[id^="case-study-"]');
    panels.forEach(panel => observerRef.current?.observe(panel));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activeIndex, calculateTransitionState, onActiveChange]);

  // Smooth scroll to specific panel
  const scrollToPanel = useCallback((index: number) => {
    if (!containerRef.current || index < 0 || index >= totalPanels) return;
    
    const targetPanel = containerRef.current.querySelector(`#case-study-${index + 1}`);
    if (targetPanel) {
      targetPanel.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [totalPanels]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      
      // Check if we're in the video case studies section
      const rect = containerRef.current.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      
      if (!isInView) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          scrollToPanel(Math.min(activeIndex + 1, totalPanels - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          scrollToPanel(Math.max(activeIndex - 1, 0));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, scrollToPanel, totalPanels]);

  return {
    containerRef,
    activeIndex,
    transitionStates,
    scrollToPanel
  };
};