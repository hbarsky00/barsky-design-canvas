
import React, { useEffect, useRef } from "react";

interface SectionTransitionOverlayProps {
  isActive: boolean;
  onTransitionComplete?: () => void;
}

const SectionTransitionOverlay: React.FC<SectionTransitionOverlayProps> = ({
  isActive,
  onTransitionComplete
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isActive) {
      // Add active class to trigger animation
      overlay.classList.add('active');
      
      // Set timeout for transition completion
      timeoutRef.current = setTimeout(() => {
        onTransitionComplete?.();
      }, 260); // Match CSS transition duration
    } else {
      // Remove active class to fade out
      overlay.classList.remove('active');
      
      // Clear any pending completion callback
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isActive, onTransitionComplete]);

  return (
    <div
      ref={overlayRef}
      data-transition-overlay
      aria-hidden="true"
    />
  );
};

export default SectionTransitionOverlay;
