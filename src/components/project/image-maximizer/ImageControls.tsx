
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Maximize, X } from "lucide-react";

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
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-white/20 shadow-2xl">
      {/* Zoom Out Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomOut}
        disabled={scale <= 0.5}
        title="Zoom Out"
        className="w-11 h-11 rounded-md bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/30 text-white hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-lg"
      >
        <Minus className="h-5 w-5 stroke-2" />
        <span className="sr-only">Zoom Out</span>
      </Button>

      {/* Zoom In Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomIn}
        disabled={scale >= 3}
        title="Zoom In"
        className="w-11 h-11 rounded-md bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/30 text-white hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-lg"
      >
        <Plus className="h-5 w-5 stroke-2" />
        <span className="sr-only">Zoom In</span>
      </Button>

      {/* Reset Zoom / Fit to Screen Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        disabled={scale === 1}
        title="Fit to Screen"
        className="w-11 h-11 rounded-md bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/30 text-white hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-lg"
      >
        <Maximize className="h-5 w-5 stroke-2" />
        <span className="sr-only">Fit to Screen</span>
      </Button>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        title="Close"
        className="w-11 h-11 rounded-md bg-white/10 hover:bg-red-500/80 active:bg-red-600/80 border border-white/30 hover:border-red-400/50 text-white hover:text-white transition-all duration-200 hover:scale-105 shadow-lg"
      >
        <X className="h-5 w-5 stroke-2" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};

export default ImageControls;
