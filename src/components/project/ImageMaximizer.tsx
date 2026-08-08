
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import NavigationButtons from "./image-maximizer/NavigationButtons";
import ImageControls from "./image-maximizer/ImageControls";

interface FlipCardProps {
  image: string;
  title: string;
  scale: number;
}

const FlipCard: React.FC<FlipCardProps> = ({ image, title, scale }) => {
  return (
    <div
      className="relative"
      style={{
        width: "min(90vw, 1200px)",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transform: `scale(${scale})`,
          transition: "transform 0.2s ease",
        }}
      />
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
  const previousFocusRef = useRef<HTMLElement | null>(null);

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
    if (hasMultipleImages && imageList) {
      const nextIndex = (currentIndex + 1) % imageList.length;
      maximizeImage(imageList[nextIndex], title, imageList, nextIndex);
    }
  };

  const handlePrevImage = () => {
    if (hasMultipleImages && imageList) {
      const prevIndex = (currentIndex - 1 + imageList.length) % imageList.length;
      maximizeImage(imageList[prevIndex], title, imageList, prevIndex);
    }
  };

  // Keyboard navigation for viewer (matching Splittime implementation).
  // currentIndex must be in the deps: the listener closes over it via the
  // prev/next handlers, so without it arrow-key navigation acts on a stale
  // index after the first move.
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
        case 'Tab': {
          // Keep focus inside the dialog while it's open
          const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href]'
          );
          if (!focusables || focusables.length === 0) break;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [isOpen, hasMultipleImages, currentIndex, imageList?.length]);

  // Move focus into the dialog on open; restore it to the trigger on close.
  // Restore happens in the effect cleanup because the provider unmounts this
  // component on close (isOpen never flips to false while mounted). setTimeout
  // rather than rAF so focus still lands when the page isn't actively painting.
  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => {
      const closeButton = dialogRef.current?.querySelector<HTMLElement>(
        '[aria-label="Close image viewer"]'
      );
      (closeButton ?? dialogRef.current)?.focus();
    }, 50);
    return () => {
      window.clearTimeout(timer);
      previousFocusRef.current?.focus?.();
      previousFocusRef.current = null;
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={title || "Image viewer"}
          tabIndex={-1}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 outline-none"
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
