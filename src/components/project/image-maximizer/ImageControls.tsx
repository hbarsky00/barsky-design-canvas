
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
        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 border-blue-600 shadow-lg backdrop-blur-sm !text-white hover:!text-white active:!text-white focus:!text-white disabled:!text-white"
      >
        <ZoomOut className="h-6 w-6 !text-white !stroke-white !fill-none stroke-2" />
        <span className="sr-only">Zoom Out</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onZoomIn}
        disabled={scale >= 3}
        title="Zoom In"
        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 border-blue-600 shadow-lg backdrop-blur-sm !text-white hover:!text-white active:!text-white focus:!text-white disabled:!text-white"
      >
        <ZoomIn className="h-6 w-6 !text-white !stroke-white !fill-none stroke-2" />
        <span className="sr-only">Zoom In</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onReset}
        disabled={scale === 1}
        title="Reset Zoom"
        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 border-blue-600 shadow-lg backdrop-blur-sm !text-white hover:!text-white active:!text-white focus:!text-white disabled:!text-white"
      >
        <Maximize className="h-6 w-6 !text-white !stroke-white !fill-none stroke-2" />
        <span className="sr-only">Reset Zoom</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onClose}
        title="Close"
        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 border-blue-600 shadow-lg backdrop-blur-sm !text-white hover:!text-white active:!text-white focus:!text-white disabled:!text-white"
      >
        <X className="h-6 w-6 !text-white !stroke-white !fill-none stroke-2" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};

export default ImageControls;
