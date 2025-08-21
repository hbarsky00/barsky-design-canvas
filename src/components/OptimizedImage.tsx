import React, { useState } from 'react';
import { LazyImage } from './LazyImage';
import { getOptimizedImageSrc, OPTIMIZED_IMAGE_MAP } from '@/utils/imageOptimization';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  fallback?: string;
  onLoadComplete?: () => void;
}

/**
 * Optimized image component with WebP support, lazy loading, and progressive enhancement
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  className,
  fallback,
  onLoadComplete,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const optimizedSrc = getOptimizedImageSrc(src);
  const dimensions = OPTIMIZED_IMAGE_MAP[src];
  
  const handleError = () => {
    setHasError(true);
  };

  const handleLoad = () => {
    onLoadComplete?.();
  };

  // Use fallback to original if optimized version fails
  const finalSrc = hasError ? src : optimizedSrc;

  return (
    <LazyImage
      src={finalSrc}
      alt={alt}
      priority={priority}
      fallback={fallback}
      aspectRatio={dimensions?.aspectRatio}
      onLoadComplete={handleLoad}
      onError={handleError}
      className={cn('transition-opacity duration-300 image-clarity-enhanced image-drop-shadow', className)}
      {...props}
    />
  );
};