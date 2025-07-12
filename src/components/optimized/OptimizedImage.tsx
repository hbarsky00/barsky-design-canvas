import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  webpSrc?: string;
  fallbackSrc?: string;
  priority?: boolean;
  aspectRatio?: string;
  onLoadComplete?: () => void;
  sizes?: string;
  srcSet?: string;
  lazyLoad?: boolean;
}

/**
 * High-performance optimized image component with WebP support, responsive loading, and SEO optimization
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  webpSrc,
  fallbackSrc,
  priority = false,
  aspectRatio,
  onLoadComplete,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  srcSet,
  lazyLoad = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazyLoad || priority);
  const [useWebP, setUseWebP] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const pictureRef = useRef<HTMLElement>(null);

  // Check WebP support
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    setUseWebP(checkWebPSupport());
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazyLoad || priority || !('IntersectionObserver' in window)) {
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
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.01,
      }
    );

    const currentRef = pictureRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => observer.disconnect();
  }, [lazyLoad, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoadComplete?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Generate optimized src URLs for different screen sizes
  const generateResponsiveSrc = (baseSrc: string) => {
    if (srcSet) return srcSet;
    
    // Extract file extension and name
    const lastDot = baseSrc.lastIndexOf('.');
    const baseName = baseSrc.substring(0, lastDot);
    const extension = baseSrc.substring(lastDot);
    
    // Generate responsive variants
    return [
      `${baseName}-480w${extension} 480w`,
      `${baseName}-768w${extension} 768w`,
      `${baseName}-1024w${extension} 1024w`,
      `${baseName}-1280w${extension} 1280w`,
      `${baseName}-1920w${extension} 1920w`
    ].join(', ');
  };

  // Determine the best source to use
  const getOptimizedSrc = () => {
    if (hasError) return fallbackSrc || '/placeholder.svg';
    if (webpSrc && useWebP) return webpSrc;
    return src;
  };

  return (
    <picture
      ref={pictureRef}
      className={cn(
        'relative block overflow-hidden bg-neutral-100 dark:bg-neutral-800',
        aspectRatio && `aspect-[${aspectRatio}]`,
        className
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Skeleton loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 animate-pulse" />
      )}

      {/* WebP source for supporting browsers */}
      {isInView && webpSrc && (
        <source
          srcSet={generateResponsiveSrc(webpSrc)}
          sizes={sizes}
          type="image/webp"
        />
      )}

      {/* Fallback image */}
      {isInView && (
        <img
          ref={imgRef}
          src={getOptimizedSrc()}
          alt={alt}
          srcSet={!webpSrc ? generateResponsiveSrc(src) : undefined}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </picture>
  );
};