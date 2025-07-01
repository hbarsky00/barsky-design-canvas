
import React from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize, X } from "lucide-react";

interface ImageControlsProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onClose: () => void;
}

const ImageControls: React.FC<ImageControlsProps> = ({
  scale,
  onZoomIn,
  onZoomOut,
  onReset,
  onClose,
}) => {
  return (
    <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onZoomOut}
        disabled={scale <= 0.5}
        title="Zoom Out"
        className="h-10 w-10 rounded-full bg-white/90 hover:bg-white border-gray-300 shadow-lg backdrop-blur-sm"
      >
        <ZoomOut className="h-5 w-5 text-gray-700" />
        <span className="sr-only">Zoom Out</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onZoomIn}
        disabled={scale >= 3}
        title="Zoom In"
        className="h-10 w-10 rounded-full bg-white/90 hover:bg-white border-gray-300 shadow-lg backdrop-blur-sm"
      >
        <ZoomIn className="h-5 w-5 text-gray-700" />
        <span className="sr-only">Zoom In</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onReset}
        disabled={scale === 1}
        title="Reset Zoom"
        className="h-10 w-10 rounded-full bg-white/90 hover:bg-white border-gray-300 shadow-lg backdrop-blur-sm"
      >
        <Maximize className="h-5 w-5 text-gray-700" />
        <span className="sr-only">Reset Zoom</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onClose}
        title="Close"
        className="h-10 w-10 rounded-full bg-white/90 hover:bg-white border-gray-300 shadow-lg backdrop-blur-sm"
      >
        <X className="h-5 w-5 text-gray-700" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};

export default ImageControls;
