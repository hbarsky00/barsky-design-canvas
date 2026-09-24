
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsOpen(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClick = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(onClose, 180);
  };

  const visible = isOpen && !isClosing;

  return (
    <div
      className="relative cursor-pointer"
      style={{ width: "min(90vw, 1200px)", height: "80vh" }}
      onClick={handleClick}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transition: "transform 200ms ease-out, opacity 200ms ease-out",
          transform: `scale(${visible ? scale : scale * 0.98})`,
          opacity: visible ? 1 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }}
        />
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);
  
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

  // Focus management. Opening used to leave focus on <body>: a screen reader
  // announced nothing, and Tab kept walking the page behind the overlay. Move
  // focus in on open, keep it inside while open, and hand it back on close.
  useEffect(() => {
    if (!isOpen) return;
    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', trap);
    return () => {
      document.removeEventListener('keydown', trap);
      restoreFocusTo.current?.focus();
    };
  }, [isOpen]);
  
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
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — full screen image`}
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
            ref={dialogRef}
            className="relative flex flex-col items-center"
            style={{ perspective: "1000px" }}
          >
            {/* ImageControls renders null, so until now the only ways out were
                Escape or a backdrop click — nothing visible, nothing named. */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close full screen image"
              className="absolute -top-12 right-0 z-20 rounded-full bg-white/10 p-2
                         text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

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
