/**
 * Image optimization utilities for SEO and performance
 */

interface ImageOptimizationConfig {
  quality: number;
  format: 'webp' | 'jpeg' | 'png';
  maxWidth: number;
  maxHeight: number;
}

/**
 * Generate SEO-friendly filename based on alt text and context
 */
export const generateSEOFilename = (
  altText: string,
  context: string = '',
  format: string = 'webp'
): string => {
  const cleanText = altText
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove multiple consecutive hyphens
    .trim();

  const cleanContext = context
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const parts = [cleanContext, cleanText].filter(Boolean);
  return `${parts.join('-')}.${format}`;
};

/**
 * Generate responsive image URLs for different screen sizes
 */
export const generateResponsiveUrls = (
  baseUrl: string,
  widths: number[] = [480, 768, 1024, 1280, 1920]
): Record<string, string> => {
  const urls: Record<string, string> = {};
  const lastDot = baseUrl.lastIndexOf('.');
  const baseName = baseUrl.substring(0, lastDot);
  const extension = baseUrl.substring(lastDot);

  widths.forEach(width => {
    urls[`${width}w`] = `${baseName}-${width}w${extension}`;
  });

  return urls;
};

/**
 * Generate WebP alternative URL
 */
export const generateWebPUrl = (originalUrl: string): string => {
  const lastDot = originalUrl.lastIndexOf('.');
  const baseName = originalUrl.substring(0, lastDot);
  return `${baseName}.webp`;
};

/**
 * Get optimal image dimensions based on usage context
 */
export const getOptimalDimensions = (
  context: 'hero' | 'gallery' | 'thumbnail' | 'avatar' | 'icon' | 'content'
): { width: number; height: number; aspectRatio: string } => {
  switch (context) {
    case 'hero':
      return { width: 1920, height: 1080, aspectRatio: '16/9' };
    case 'gallery':
      return { width: 1280, height: 853, aspectRatio: '3/2' };
    case 'thumbnail':
      return { width: 400, height: 300, aspectRatio: '4/3' };
    case 'avatar':
      return { width: 200, height: 200, aspectRatio: '1/1' };
    case 'icon':
      return { width: 64, height: 64, aspectRatio: '1/1' };
    case 'content':
      return { width: 800, height: 600, aspectRatio: '4/3' };
    default:
      return { width: 800, height: 600, aspectRatio: '4/3' };
  }
};

/**
 * Generate comprehensive alt text with SEO keywords
 */
export const generateSEOAltText = (
  baseDescription: string,
  keywords: string[] = [],
  context: string = ''
): string => {
  const keywordPhrase = keywords.length > 0 ? ` featuring ${keywords.join(', ')}` : '';
  const contextPhrase = context ? ` for ${context}` : '';
  
  return `${baseDescription}${keywordPhrase}${contextPhrase}`.trim();
};

/**
 * Calculate optimal image quality based on file size target
 */
export const calculateOptimalQuality = (
  originalSizeKB: number,
  targetSizeKB: number = 200
): number => {
  if (originalSizeKB <= targetSizeKB) return 95;
  if (originalSizeKB <= targetSizeKB * 2) return 85;
  if (originalSizeKB <= targetSizeKB * 4) return 75;
  if (originalSizeKB <= targetSizeKB * 8) return 65;
  return 55;
};

/**
 * Get recommended sizes attribute for responsive images
 */
export const getRecommendedSizes = (
  context: 'hero' | 'gallery' | 'thumbnail' | 'avatar' | 'content'
): string => {
  switch (context) {
    case 'hero':
      return '100vw';
    case 'gallery':
      return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'thumbnail':
      return '(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
    case 'avatar':
      return '(max-width: 768px) 15vw, 10vw';
    case 'content':
      return '(max-width: 768px) 100vw, 75vw';
    default:
      return '(max-width: 768px) 100vw, 50vw';
  }
};