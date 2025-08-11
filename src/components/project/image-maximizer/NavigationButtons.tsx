
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  disabled: boolean;
  currentIndex?: number;
  totalImages?: number;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrev,
  onNext,
  disabled,
  currentIndex,
  totalImages,
}) => {
  // Don't render if there's only one image or no images
  if (disabled || !totalImages || totalImages <= 1) return null;

  const canGoPrev = currentIndex !== undefined && currentIndex > 0;
  const canGoNext = currentIndex !== undefined && currentIndex < totalImages - 1;

  return (
    <>
      {canGoPrev && (
        <Button 
          variant="outline"
          size="icon"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 border border-gray-200 shadow-md hover:bg-white z-10 flex items-center justify-center"
          aria-label={`Previous image (${currentIndex} of ${totalImages})`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Previous Image</span>
        </Button>
      )}
      
      {canGoNext && (
        <Button 
          variant="outline"
          size="icon"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 border border-gray-200 shadow-md hover:bg-white z-10 flex items-center justify-center"
          aria-label={`Next image (${(currentIndex || 0) + 2} of ${totalImages})`}
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Next Image</span>
        </Button>
      )}
    </>
  );
};

export default NavigationButtons;
