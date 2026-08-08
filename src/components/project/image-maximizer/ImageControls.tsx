
import React from "react";
import { X } from "lucide-react";

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
    <button
      type="button"
      className="absolute -top-12 right-0 flex items-center justify-center w-11 h-11 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-md z-10 transition-all duration-200"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      aria-label="Close image viewer"
      title="Close (Press Escape)"
    >
      <X className="h-5 w-5 text-black" />
    </button>
  );
};

export default ImageControls;
