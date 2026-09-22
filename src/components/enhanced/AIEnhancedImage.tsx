import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AIEnhancedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  enableAI?: boolean;
  showEnhancementIndicator?: boolean;
  quality?: 'low' | 'medium' | 'high';
  fallback?: string;
  onEnhancementComplete?: (enhancedSrc: string) => void;
}

/**
 * Optimized Image component with lazy loading and error handling
 */
export const AIEnhancedImage: React.FC<AIEnhancedImageProps> = ({
  src,
  alt,
  priority = false,
  fallback,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [displaySrc, setDisplaySrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    if (fallback && displaySrc !== fallback) {
      setDisplaySrc(fallback);
    }
  };

  return (
    <div className="relative">
      <img
        ref={imgRef}
        src={displaySrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />

      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
};
