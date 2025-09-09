import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  priority?: boolean;
  aspectRatio?: string;
  onLoadComplete?: () => void;
}

/**
 * Optimized image component with lazy loading and performance enhancements
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallback = '',
  priority = false,
  aspectRatio,
  onLoadComplete,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoadComplete?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden bg-gray-100',
        aspectRatio && `aspect-[${aspectRatio}]`,
        className
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Skeleton loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={hasError ? fallback : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          style={{
            imageRendering: 'crisp-edges',
            filter: 'contrast(1.02) saturate(1.01)',
          }}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            'image-clarity-enhanced image-drop-shadow',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
};