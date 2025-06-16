
import React from "react";
import { Maximize } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageDisplayProps {
  displayedImage: string;
  imageAltText: string;
  aspectRatio?: number;
  priority?: boolean;
  refreshKey: number;
  onImageClick: () => void;
  onImageError: () => void;
  children?: React.ReactNode;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  displayedImage,
  imageAltText,
  aspectRatio,
  priority = false,
  refreshKey,
  onImageClick,
  onImageError,
  children
}) => {
  const imageElement = (
    <img 
      src={displayedImage} 
      alt={imageAltText} 
      className="object-contain w-full h-full cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:brightness-95" 
      loading={priority ? "eager" : "lazy"}
      onClick={onImageClick}
      onError={onImageError}
      key={`img-${displayedImage}-${refreshKey}`}
    />
  );

  const maximizeButton = (
    <button 
      onClick={onImageClick}
      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      aria-label="Maximize image"
    >
      <div className="bg-black/50 p-2 rounded-full">
        <Maximize className="h-6 w-6 text-white" />
      </div>
    </button>
  );

  if (aspectRatio) {
    return (
      <AspectRatio ratio={aspectRatio} className="bg-gray-100">
        {imageElement}
        {maximizeButton}
        {children}
      </AspectRatio>
    );
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-[200px] p-4">
      {imageElement}
      {maximizeButton}
      {children}
    </div>
  );
};

export default ImageDisplay;
