
import React, { useState } from "react";
import { Maximize, AlertTriangle } from "lucide-react";
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
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    console.error('❌ Image failed to load:', displayedImage);
    setHasError(true);
    setIsLoading(false);
    onImageError();
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', displayedImage.substring(0, 50) + '...');
    setIsLoading(false);
    setHasError(false);
  };

  // Validate image URL
  const isValidUrl = displayedImage && (
    displayedImage.startsWith('http://') || 
    displayedImage.startsWith('https://') || 
    displayedImage.startsWith('/') ||
    displayedImage.startsWith('data:')
  );

  const imageElement = !hasError && isValidUrl ? (
    <img 
      src={displayedImage} 
      alt={imageAltText} 
      className="object-contain w-full h-full cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:brightness-95" 
      loading={priority ? "eager" : "lazy"}
      onClick={onImageClick}
      onError={handleImageError}
      onLoad={handleImageLoad}
      key={`img-${displayedImage}-${refreshKey}`}
    />
  ) : (
    <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500">
      <div className="text-center p-4">
        <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-orange-500" />
        <p className="text-sm font-medium">Image failed to load</p>
        <p className="text-xs text-gray-400 mt-1">
          {!isValidUrl ? 'Invalid URL format' : 'Network or source error'}
        </p>
        <button 
          onClick={() => {
            setHasError(false);
            setIsLoading(true);
            // Force reload by updating the key
            window.location.reload();
          }}
          className="mt-2 px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );

  const maximizeButton = !hasError && isValidUrl && (
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

  const loadingOverlay = isLoading && !hasError && (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );

  if (aspectRatio) {
    return (
      <AspectRatio ratio={aspectRatio} className="bg-gray-100 relative">
        {imageElement}
        {loadingOverlay}
        {maximizeButton}
        {children}
      </AspectRatio>
    );
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-[200px] p-4 relative">
      {imageElement}
      {loadingOverlay}
      {maximizeButton}
      {children}
    </div>
  );
};

export default ImageDisplay;
