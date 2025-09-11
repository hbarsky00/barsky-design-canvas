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
  const calculateTransitionState = useCallback((visibilityRatio: number, isActive: boolean, panelIndex: number, totalPanels: number): OverlayTransitionState => {
    // Enhanced opacity calculation to prevent blank areas
    let opacity: number;
    
    if (isActive) {
      // Active panel gets full opacity based on visibility
      opacity = Math.min(1, Math.max(0.3, visibilityRatio * 1.2));
    } else {
      // Non-active panels get reduced but visible opacity
      opacity = Math.min(0.7, Math.max(0, visibilityRatio * 0.8));
    }
    
    // Ensure first and last panels have minimum visibility
    if ((panelIndex === 0 || panelIndex === totalPanels - 1) && visibilityRatio > 0.1) {
      opacity = Math.max(opacity, 0.4);
    }
    
    const scale = 0.97 + (0.03 * opacity);
    const translateY = 20 * (1 - opacity);
    
    return {
      opacity,
      scale,
      translateY,
      isActive,
      isInteractive: opacity > 0.2
    };
  }, []);

  // Setup intersection observer
  useEffect(() => {
    if (!containerRef.current) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visibilityMap = new Map<number, number>();
      let maxVisibility = 0;
      let newActiveIndex = activeIndex; // Keep current active if no better candidate

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

      // Lower threshold to reduce dead zones - update if visibility > 0.1
      if (maxVisibility > 0.1 && newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
        onActiveChange?.(newActiveIndex);
        console.log(`Setting active panel to ${newActiveIndex} with visibility ${maxVisibility}`);
      }

      // Ensure at least one panel is always visible
      const hasVisiblePanel = Array.from(visibilityMap.values()).some(ratio => ratio > 0.1);
      if (!hasVisiblePanel && visibilityMap.size > 0) {
        // Fallback: keep the current active panel visible
        visibilityMap.set(activeIndex, 0.5);
        console.log(`Fallback: keeping panel ${activeIndex} visible`);
      }

      // Update transition states for all panels
      setTransitionStates(prev => 
        prev.map((state, index) => {
          const visibilityRatio = visibilityMap.get(index) || 0;
          const isActive = index === newActiveIndex && maxVisibility > 0.1;
          return calculateTransitionState(visibilityRatio, isActive, index, totalPanels);
        })
      );
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: '-5% 0px -5% 0px'
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