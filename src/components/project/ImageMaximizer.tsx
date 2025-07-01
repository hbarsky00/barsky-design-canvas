
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import NavigationButtons from "./image-maximizer/NavigationButtons";
import ZoomableImage from "./image-maximizer/ZoomableImage";
import { useImageKeyboardNavigation } from "@/hooks/useImageKeyboardNavigation";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize, X } from "lucide-react";

interface ImageMaximizerProps {
  image: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  imageList?: string[];
  currentIndex?: number;
  hideEditButton?: boolean;
}

const ImageMaximizer: React.FC<ImageMaximizerProps> = ({
  image,
  title,
  isOpen,
  onClose,
  imageList = [],
  currentIndex = 0,
  hideEditButton = false,
}) => {
  const [scale, setScale] = useState(1);
  const { maximizeImage } = useImageMaximizer();
  const hasMultipleImages = imageList && imageList.length > 1;
  
  // Debug logging
  useEffect(() => {
    console.log("ImageMaximizer rendered:", { 
      image, 
      isOpen, 
      listLength: imageList?.length,
      currentIndex,
      hasMultipleImages
    });
  }, [image, isOpen, imageList?.length, currentIndex, hasMultipleImages]);
  
  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.25, 0.5));
  };
  
  const handleReset = () => {
    setScale(1);
  };
  
  const handleNextImage = () => {
    console.log("Next image clicked, hasMultipleImages:", hasMultipleImages, "imageList:", imageList);
    if (hasMultipleImages && imageList) {
      const nextIndex = (currentIndex + 1) % imageList.length;
      console.log("Moving to next image:", nextIndex, imageList[nextIndex]);
      maximizeImage(imageList[nextIndex], title, imageList, nextIndex);
    }
  };
  
  const handlePrevImage = () => {
    console.log("Previous image clicked, hasMultipleImages:", hasMultipleImages, "imageList:", imageList);
    if (hasMultipleImages && imageList) {
      const prevIndex = (currentIndex - 1 + imageList.length) % imageList.length;
      console.log("Moving to previous image:", prevIndex, imageList[prevIndex]);
      maximizeImage(imageList[prevIndex], title, imageList, prevIndex);
    }
  };
  
  // Use our custom keyboard navigation hook
  useImageKeyboardNavigation({
    isOpen,
    onClose,
    onNext: hasMultipleImages ? handleNextImage : undefined,
    onPrevious: hasMultipleImages ? handlePrevImage : undefined,
    onZoomIn: handleZoomIn,
    onZoomOut: handleZoomOut,
    onReset: handleReset,
    hasNavigation: hasMultipleImages
  });
  
  // Reset scale when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setScale(1);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden flex flex-col" hideCloseButton>
        {/* Add DialogTitle for accessibility - can be visually hidden if needed */}
        <DialogTitle className="sr-only">Image: {title}</DialogTitle>
        <DialogDescription className="sr-only">Full size view of the image</DialogDescription>
        
        {/* Floating controls positioned over the image */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={scale <= 0.5}
            title="Zoom Out"
            className="h-10 w-10 text-white hover:bg-white/20 bg-transparent border-none [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
          >
            <ZoomOut className="h-5 w-5" />
            <span className="sr-only">Zoom Out</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={scale >= 3}
            title="Zoom In"
            className="h-10 w-10 text-white hover:bg-white/20 bg-transparent border-none [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
          >
            <ZoomIn className="h-5 w-5" />
            <span className="sr-only">Zoom In</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            disabled={scale === 1}
            title="Reset Zoom"
            className="h-10 w-10 text-white hover:bg-white/20 bg-transparent border-none [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
          >
            <Maximize className="h-5 w-5" />
            <span className="sr-only">Reset Zoom</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            title="Close"
            className="h-10 w-10 text-white hover:bg-white/20 bg-transparent border-none [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Image counter for multiple images */}
        {hasMultipleImages && (
          <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
            {currentIndex + 1} / {imageList.length}
          </div>
        )}
        
        <div className="flex-grow overflow-hidden bg-gray-50 flex items-center justify-center relative">
          <ZoomableImage 
            image={image}
            title={title}
            scale={scale}
          />
          
          <NavigationButtons
            onPrev={handlePrevImage}
            onNext={handleNextImage}
            disabled={!hasMultipleImages}
            currentIndex={currentIndex}
            totalImages={imageList.length}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageMaximizer;
