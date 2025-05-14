
import React from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image, X, ZoomIn, ZoomOut, Maximize } from "lucide-react";

interface ImageMaximizerProps {
  image: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageMaximizer: React.FC<ImageMaximizerProps> = ({
  image,
  title,
  isOpen,
  onClose,
}) => {
  const [scale, setScale] = React.useState(1);
  
  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.25, 0.5));
  };
  
  const handleReset = () => {
    setScale(1);
  };
  
  // Reset scale when dialog closes
  React.useEffect(() => {
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
        
        <div className="flex-grow overflow-auto bg-gray-50 flex items-center justify-center p-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageMaximizer;
