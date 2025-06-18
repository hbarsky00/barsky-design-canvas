
import React from 'react';

interface ImageDisplayProps {
  displayedImage: string;
  imageAltText: string;
  aspectRatio?: number;
  priority?: boolean;
  refreshKey?: number;
  onImageClick: () => void;
  onImageError: () => void;
  onImageLoad?: () => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  displayedImage,
  imageAltText,
  aspectRatio,
  priority = false,
  refreshKey = 0,
  onImageClick,
  onImageError,
  onImageLoad
}) => {
  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', displayedImage.substring(0, 50) + '...');
    if (onImageLoad) {
      onImageLoad();
    }
  };

  const handleImageError = () => {
    console.error('❌ Image failed to load:', displayedImage.substring(0, 50) + '...');
    onImageError();
  };

  return (
    <div 
      className="cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={onImageClick}
      style={aspectRatio ? { aspectRatio } : {}}
    >
      <img
        src={displayedImage}
        alt={imageAltText}
        className="w-full h-full object-cover"
        loading={priority ? "eager" : "lazy"}
        onLoad={handleImageLoad}
        onError={handleImageError}
        key={`${displayedImage}-${refreshKey}`}
      />
    </div>
  );
};

export default ImageDisplay;
