
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          style={{ perspective: 1400 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            style={{ transformStyle: "preserve-3d", transformOrigin: "center" }}
            initial={{ rotateY: -90, opacity: 0, scale: 0.85 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: 90, opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImageControls
              scale={scale}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onReset={handleReset}
              onClose={onClose}
            />

            {hasMultipleImages && (
              <div className="absolute -top-12 text-white text-sm font-medium z-10">
                {currentIndex + 1} / {imageList.length}
              </div>
            )}

            <motion.img
              key={image}
              src={image}
              alt={title}
              className="max-w-full max-h-[80vh] object-contain cursor-pointer"
              style={{ transform: `scale(${scale})`, transition: "transform 0.3s" }}
              onClick={onClose}
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="bg-white bg-opacity-90 p-4 rounded-lg mt-4 max-w-[80%] text-center">
              <p className="text-black text-sm">{title}</p>
            </div>

            {hasMultipleImages && (
              <NavigationButtons
                onPrev={handlePrevImage}
                onNext={handleNextImage}
                disabled={!hasMultipleImages}
                currentIndex={currentIndex}
                totalImages={imageList.length}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageMaximizer;
