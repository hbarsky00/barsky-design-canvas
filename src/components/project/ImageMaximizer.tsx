
import React, { useState, useEffect } from "react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import NavigationButtons from "./image-maximizer/NavigationButtons";
import ImageControls from "./image-maximizer/ImageControls";

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
  
  // Keyboard navigation for viewer (matching Splittime implementation)
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch(event.key) {
        case 'Escape':
          onClose();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case '0':
          handleReset();
          break;
        case 'ArrowLeft':
          if (hasMultipleImages) handlePrevImage();
          break;
        case 'ArrowRight':
          if (hasMultipleImages) handleNextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [isOpen, hasMultipleImages]);
  
  // Reset scale when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setScale(1);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center">
        <ImageControls
          scale={scale}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
          onClose={onClose}
        />
        
        {/* Image counter for multiple images */}
        {hasMultipleImages && (
          <div className="absolute -top-12 text-white text-sm font-medium z-10">
            {currentIndex + 1} / {imageList.length}
          </div>
        )}
        
        {/* Main Image */}
        <img
          src={image}
          alt={title}
          className="max-w-full max-h-[80vh] object-contain transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        />
        
        {/* Caption */}
        <div className="bg-white bg-opacity-90 p-4 rounded-lg mt-4 max-w-[80%] text-center">
          <p className="text-black text-sm">{title}</p>
        </div>
        
        {/* Navigation buttons for multiple images */}
        {hasMultipleImages && (
          <NavigationButtons
            onPrev={handlePrevImage}
            onNext={handleNextImage}
            disabled={!hasMultipleImages}
            currentIndex={currentIndex}
            totalImages={imageList.length}
          />
        )}
      </div>
    </div>
  );
};

export default ImageMaximizer;
