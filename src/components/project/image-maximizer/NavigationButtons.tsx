
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  disabled: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrev,
  onNext,
  disabled,
}) => {
  if (disabled) return null;

  return (
    <>
      <Button 
        variant="outline"
        size="icon"
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 border border-gray-200 shadow-md hover:bg-white z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous Image</span>
      </Button>
      
      <Button 
        variant="outline"
        size="icon"
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 border border-gray-200 shadow-md hover:bg-white z-10"
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next Image</span>
      </Button>
    </>
  );
};

export default NavigationButtons;
