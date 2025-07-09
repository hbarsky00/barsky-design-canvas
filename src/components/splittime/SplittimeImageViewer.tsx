import React from "react";

interface SplittimeImageViewerProps {
  viewerOpen: boolean;
  currentImage: { src: string; alt: string; caption: string };
  currentZoom: number;
  onClose: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

const SplittimeImageViewer: React.FC<SplittimeImageViewerProps> = ({
  viewerOpen,
  currentImage,
  currentZoom,
  onClose,
  onZoomIn,
  onZoomOut,
  onResetZoom
}) => {
  if (!viewerOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center">
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
            aria-label="Zoom in"
            title="Zoom In (+)"
          >
            <span className="text-black">+</span>
          </button>
          <button
            className="bg-white bg-opacity-90 hover:bg-opacity-100 border-none rounded w-9 h-9 text-lg cursor-pointer font-bold transition-all duration-200"
            onClick={onZoomOut}
            aria-label="Zoom out"
            title="Zoom Out (-)"
          >
            <span className="text-black">−</span>
          </button>
          <button
            className="bg-white bg-opacity-90 hover:bg-opacity-100 border-none rounded w-9 h-9 text-lg cursor-pointer font-bold transition-all duration-200"
            onClick={onResetZoom}
            aria-label="Reset zoom"
            title="Reset Zoom (0)"
          >
            <span className="text-black">⌂</span>
          </button>
        </div>
        
        {/* Main Image */}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[80vh] object-contain transition-transform duration-300"
          style={{ transform: `scale(${currentZoom})` }}
        />
        
        {/* Caption */}
        <div className="bg-white bg-opacity-90 p-4 rounded-lg mt-4 max-w-[80%] text-center">
          <p className="text-black text-sm">{currentImage.caption}</p>
        </div>
      </div>
    </div>
  );
};

export default SplittimeImageViewer;