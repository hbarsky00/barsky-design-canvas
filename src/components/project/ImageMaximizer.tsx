
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import NavigationButtons from "./image-maximizer/NavigationButtons";
import ImageControls from "./image-maximizer/ImageControls";

interface FlipCardProps {
  image: string;
  title: string;
  scale: number;
  onClose: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({ image, title, scale, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      style={{
        width: "min(90vw, 1200px)",
        height: "80vh",
        perspective: "1000px",
      }}
      onClick={() => {
        if (isFlipped) onClose();
        else setIsFlipped(true);
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s ease",
          transform: `rotateY(${isFlipped ? 180 : 0}deg) scale(${scale})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            pointerEvents: "none",
            transform: "rotateY(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
};

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div
            className="relative flex flex-col items-center"
            style={{ perspective: "1000px" }}
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

            <FlipCard
              key={image}
              image={image}
              title={title}
              scale={scale}
              onClose={onClose}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageMaximizer;
