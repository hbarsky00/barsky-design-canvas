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
        
        {/* Main Image */}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[80vh] object-contain transition-transform duration-300 cursor-pointer"
          onClick={onClose}
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