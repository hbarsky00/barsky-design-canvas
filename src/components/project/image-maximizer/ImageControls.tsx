
import React from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";

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
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onZoomOut}
        disabled={scale <= 0.5}
        title="Zoom Out"
      >
        <ZoomOut className="h-4 w-4" />
        <span className="sr-only">Zoom Out</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onZoomIn}
        disabled={scale >= 3}
        title="Zoom In"
      >
        <ZoomIn className="h-4 w-4" />
        <span className="sr-only">Zoom In</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onReset}
        disabled={scale === 1}
        title="Reset Zoom"
      >
        <Maximize className="h-4 w-4" />
        <span className="sr-only">Reset Zoom</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        title="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};

export default ImageControls;
