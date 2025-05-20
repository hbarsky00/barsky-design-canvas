
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image, X, ZoomIn, ZoomOut, Maximize, ArrowLeft, ArrowRight } from "lucide-react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";

interface ImageMaximizerProps {
  image: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  imageList?: string[];
  currentIndex?: number;
}

const ImageMaximizer: React.FC<ImageMaximizerProps> = ({
  image,
  title,
  isOpen,
  onClose,
  imageList = [],
  currentIndex = 0,
}) => {
  const [scale, setScale] = useState(1);
  const { maximizeImage } = useImageMaximizer();
  const hasMultipleImages = imageList && imageList.length > 1;
  
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
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowRight':
          if (hasMultipleImages) handleNextImage();
          break;
        case 'ArrowLeft':
          if (hasMultipleImages) handlePrevImage();
          break;
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
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, hasMultipleImages, currentIndex]);
  
  // Reset scale when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setScale(1);
    }
  }, [isOpen]);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Image className="h-5 w-5" />
            <span className="line-clamp-1">{title}</span>
            {hasMultipleImages && (
              <span className="text-sm text-gray-500 ml-2">
                {currentIndex + 1} / {imageList.length}
              </span>
            )}
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
              <span className="sr-only">Zoom Out</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              disabled={scale >= 3}
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Zoom In</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              disabled={scale === 1}
              title="Reset Zoom"
            >
              <Maximize className="h-4 w-4" />
              <span className="sr-only">Reset Zoom</span>
            </Button>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                title="Close"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
        </div>
        
        <div className="flex-grow overflow-auto bg-gray-50 flex items-center justify-center p-4 relative">
          <div 
            className="relative cursor-grab active:cursor-grabbing transition-all duration-200 overflow-auto"
            style={{
              transform: `scale(${scale})`,
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            <img
              src={image}
              alt={title}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          </div>
          
          {hasMultipleImages && (
            <>
              <Button 
                variant="outline"
                size="icon"
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 border border-gray-200 shadow-md hover:bg-white z-10"
                disabled={imageList.length <= 1}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous Image</span>
              </Button>
              
              <Button 
                variant="outline"
                size="icon"
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 border border-gray-200 shadow-md hover:bg-white z-10"
                disabled={imageList.length <= 1}
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next Image</span>
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageMaximizer;
