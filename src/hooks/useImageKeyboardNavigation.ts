
import { useEffect } from "react";

interface UseImageKeyboardNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  hasNavigation: boolean;
}

/**
 * Custom hook to handle keyboard navigation for the image maximizer
 */
export const useImageKeyboardNavigation = ({
  isOpen,
  onClose,
  onNext,
  onPrevious,
  onZoomIn,
  onZoomOut,
  onReset,
  hasNavigation,
}: UseImageKeyboardNavigationProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowRight':
          if (hasNavigation && onNext) onNext();
          break;
        case 'ArrowLeft':
          if (hasNavigation && onPrevious) onPrevious();
          break;
        case 'Escape':
          onClose();
          break;
        case '+':
        case '=':
          if (onZoomIn) onZoomIn();
          break;
        case '-':
          if (onZoomOut) onZoomOut();
          break;
        case '0':
          if (onReset) onReset();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, hasNavigation, onNext, onPrevious, onClose, onZoomIn, onZoomOut, onReset]);
};
