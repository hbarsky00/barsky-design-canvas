
import React from "react";

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
    <>
      {/* Close Button */}
      <button
        className="absolute -top-12 right-0 bg-white bg-opacity-90 hover:bg-opacity-100 border-none rounded-full w-10 h-10 text-xl cursor-pointer z-10 transition-all duration-200"
        onClick={onClose}
        aria-label="Close image viewer"
        title="Close (Press Escape)"
      >
        <span className="text-black">×</span>
      </button>
      
      {/* Zoom Controls */}
      <div className="absolute -top-12 left-0 flex gap-3 z-10">
        <button
          className="bg-white bg-opacity-90 hover:bg-opacity-100 border-none rounded w-9 h-9 text-lg cursor-pointer font-bold transition-all duration-200"
          onClick={onZoomIn}
          disabled={scale >= 3}
          aria-label="Zoom in"
          title="Zoom In (+)"
        >
          <span className="text-black">+</span>
        </button>
        <button
          className="bg-white bg-opacity-90 hover:bg-opacity-100 border-none rounded w-9 h-9 text-lg cursor-pointer font-bold transition-all duration-200"
          onClick={onZoomOut}
          disabled={scale <= 0.5}
          aria-label="Zoom out"
          title="Zoom Out (-)"
        >
          <span className="text-black">−</span>
        </button>
        <button
          className="bg-white bg-opacity-90 hover:bg-opacity-100 border-none rounded w-9 h-9 text-lg cursor-pointer font-bold transition-all duration-200"
          onClick={onReset}
          aria-label="Reset zoom"
          title="Reset Zoom (0)"
        >
          <span className="text-black">⌂</span>
        </button>
      </div>
    </>
  );
};

export default ImageControls;
