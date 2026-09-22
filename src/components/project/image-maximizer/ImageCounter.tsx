
import React from "react";

interface ImageCounterProps {
  currentIndex: number;
  totalImages: number;
  show: boolean;
}

const ImageCounter: React.FC<ImageCounterProps> = ({
  currentIndex,
  totalImages,
  show,
}) => {
  if (!show) return null;

  return (
    <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
      {currentIndex + 1} / {totalImages}
    </div>
  );
};

export default ImageCounter;
