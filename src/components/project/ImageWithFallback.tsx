
import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = "",
  fallbackSrc,
  priority = false,
  onLoad,
  onError
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset state when src changes
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
    console.log('✅ Image loaded successfully:', currentSrc.substring(0, 50) + '...');
    if (onLoad) {
      onLoad();
    }
  };

  const handleImageError = () => {
    console.error('❌ Image failed to load:', currentSrc);
    setIsLoading(false);
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      console.log('🔄 Trying fallback image:', fallbackSrc);
      setCurrentSrc(fallbackSrc);
      return;
    }
    
    // If we've tried fallback or no fallback provided, show error state
    setHasError(true);
    if (onError) {
      onError();
    }
  };

  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 ${className}`}>
        <AlertCircle className="h-12 w-12 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 text-center">Image failed to load</p>
        <p className="text-xs text-gray-400 mt-1 max-w-xs break-all">{src}</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

export default ImageWithFallback;
