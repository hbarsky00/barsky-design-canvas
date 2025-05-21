
import React from "react";
import { Image } from "lucide-react";
import ImageControls from "./ImageControls";

interface ImageHeaderProps {
  title: string;
  currentIndex?: number;
  totalImages?: number;
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onClose: () => void;
}

const ImageHeader: React.FC<ImageHeaderProps> = ({
  title,
  currentIndex,
  totalImages,
  scale,
  onZoomIn,
  onZoomOut,
  onReset,
  onClose,
}) => {
  const hasMultipleImages = totalImages && totalImages > 1;

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Image className="h-5 w-5" />
        <span className="line-clamp-1">{title}</span>
        {hasMultipleImages && (
          <span className="text-sm text-gray-500 ml-2">
            {(currentIndex ?? 0) + 1} / {totalImages}
          </span>
        )}
      </h3>
      
      <ImageControls
        scale={scale}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onReset={onReset}
        onClose={onClose}
      />
    </div>
  );
};

export default ImageHeader;
