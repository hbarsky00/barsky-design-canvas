import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useAIImageEnhancement } from '@/hooks/useAIImageEnhancement';
import { Loader2, Sparkles, Zap } from 'lucide-react';

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
 * AI-Enhanced Image component that automatically improves image quality using AI
 */
export const AIEnhancedImage: React.FC<AIEnhancedImageProps> = ({
  src,
  alt,
  priority = false,
  enableAI = true,
  showEnhancementIndicator = true,
  quality = 'medium',
  fallback,
  onEnhancementComplete,
  className,
  ...props
}) => {
  const [displaySrc, setDisplaySrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const { enhanceImage, getEnhancementStatus, isEnabled } = useAIImageEnhancement({
    enabled: enableAI,
    quality,
    autoEnhance: true
  });

  const enhancementStatus = getEnhancementStatus(src);

  // Auto-enhance image when component mounts or src changes
  useEffect(() => {
    if (!enableAI || !isEnabled || !src) return;

    const enhance = async () => {
      try {
        const enhancedSrc = await enhanceImage(src);
        if (enhancedSrc !== src) {
          setDisplaySrc(enhancedSrc);
          onEnhancementComplete?.(enhancedSrc);
        }
      } catch (error) {
        console.warn('AI enhancement failed, using original:', error);
        setDisplaySrc(src);
      }
    };

    // Small delay to allow component to mount properly
    const timer = setTimeout(enhance, 100);
    return () => clearTimeout(timer);
  }, [src, enableAI, isEnabled, enhanceImage, onEnhancementComplete]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    if (fallback) {
      setDisplaySrc(fallback);
    } else if (displaySrc !== src) {
      // If enhanced version failed, try original
      setDisplaySrc(src);
    }
  };

  const toggleOriginal = () => {
    setShowOriginal(!showOriginal);
    setDisplaySrc(showOriginal ? (enhancementStatus.enhancedSrc || src) : src);
  };

  const isEnhanced = displaySrc !== src && enhancementStatus.enhancedSrc;
  const isProcessing = enhancementStatus.isProcessing;

  return (
    <div className="relative group">
      {/* Main Image */}
      <img
        ref={imgRef}
        src={showOriginal ? src : displaySrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-all duration-300',
          'image-drop-shadow',
          isLoaded ? 'opacity-100' : 'opacity-0',
          isProcessing && 'animate-pulse',
          className
        )}
        {...props}
      />

      {/* Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse rounded" />
      )}

      {/* Enhancement Indicators */}
      {showEnhancementIndicator && enableAI && (
        <div className="absolute top-2 right-2 flex items-center gap-1">
          {/* Processing Indicator */}
          {isProcessing && (
            <div className="bg-background/90 backdrop-blur-sm border border-border rounded-full px-2 py-1 flex items-center gap-1 text-xs">
              <Loader2 className="w-3 h-3 animate-spin text-primary" />
              <span className="text-muted-foreground">Enhancing</span>
            </div>
          )}

          {/* Enhanced Indicator */}
          {isEnhanced && !isProcessing && (
            <div 
              className="bg-background/90 backdrop-blur-sm border border-border rounded-full px-2 py-1 flex items-center gap-1 text-xs cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={toggleOriginal}
              title={showOriginal ? "Show AI Enhanced" : "Show Original"}
            >
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-primary font-medium">
                {showOriginal ? "Original" : "AI Enhanced"}
              </span>
            </div>
          )}

          {/* AI Available Indicator */}
          {!isProcessing && !isEnhanced && isEnabled && (
            <div className="bg-background/90 backdrop-blur-sm border border-border rounded-full px-2 py-1 flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              <Zap className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">AI Ready</span>
            </div>
          )}
        </div>
      )}

      {/* Error State */}
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