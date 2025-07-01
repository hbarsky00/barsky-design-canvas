
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import NavigationButtons from "./image-maximizer/NavigationButtons";
import ZoomableImage from "./image-maximizer/ZoomableImage";
import ImageControls from "./image-maximizer/ImageControls";
import ImageCounter from "./image-maximizer/ImageCounter";
import { useImageKeyboardNavigation } from "@/hooks/useImageKeyboardNavigation";

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
        <ImageControls
          scale={scale}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
          onClose={onClose}
        />

        {/* Image counter for multiple images */}
        <ImageCounter
          currentIndex={currentIndex}
          totalImages={imageList.length}
          show={hasMultipleImages}
        />
        
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
