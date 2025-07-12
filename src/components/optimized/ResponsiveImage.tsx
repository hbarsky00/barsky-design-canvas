import React from 'react';
import { OptimizedImage } from './OptimizedImage';
import { 
  generateWebPUrl, 
  generateSEOAltText, 
  getRecommendedSizes,
  getOptimalDimensions 
} from '@/utils/imageOptimization';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  context: 'hero' | 'gallery' | 'thumbnail' | 'avatar' | 'content';
  seoKeywords?: string[];
  priority?: boolean;
  className?: string;
  onLoadComplete?: () => void;
  customSizes?: string;
  customAspectRatio?: string;
}

/**
 * Intelligent responsive image component that automatically optimizes for different contexts
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  context,
  seoKeywords = [],
  priority = false,
  className,
  onLoadComplete,
  customSizes,
  customAspectRatio
}) => {
  // Get optimal dimensions for the context
  const { aspectRatio } = getOptimalDimensions(context);
  
  // Generate WebP alternative
  const webpSrc = generateWebPUrl(src);
  
  // Enhance alt text with SEO keywords
  const enhancedAlt = generateSEOAltText(alt, seoKeywords, context);
  
  // Get recommended sizes attribute
  const sizes = customSizes || getRecommendedSizes(context);
  
  // Determine if this should be priority loaded
  const shouldPrioritize = priority || context === 'hero';
  
  // Generate responsive srcSet
  const generateSrcSet = (baseSrc: string) => {
    const lastDot = baseSrc.lastIndexOf('.');
    const baseName = baseSrc.substring(0, lastDot);
    const extension = baseSrc.substring(lastDot);
    
    const widths = context === 'hero' 
      ? [480, 768, 1024, 1280, 1920]
      : context === 'gallery'
      ? [400, 600, 800, 1200]
      : [200, 400, 600, 800];
    
    return widths
      .map(width => `${baseName}-${width}w${extension} ${width}w`)
      .join(', ');
  };

  return (
    <OptimizedImage
      src={src}
      alt={enhancedAlt}
      webpSrc={webpSrc}
      priority={shouldPrioritize}
      aspectRatio={customAspectRatio || aspectRatio}
      sizes={sizes}
      srcSet={generateSrcSet(src)}
      onLoadComplete={onLoadComplete}
      className={className}
      lazyLoad={!shouldPrioritize}
    />
  );
};