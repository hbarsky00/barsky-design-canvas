import { LazyImage } from '@/components/LazyImage';

export interface OptimizedImageMapping {
  original: string;
  webp: string;
  width: number;
  height: number;
  aspectRatio: string;
}

// Critical images that need optimization
export const OPTIMIZED_IMAGE_MAP: Record<string, OptimizedImageMapping> = {
  // Profile/Avatar images - keep original user photo
  '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png': {
    original: '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png',
    webp: '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png', // Use original for now
    width: 208,
    height: 208,
    aspectRatio: '1/1'
  },
  // Hero heading image
  '/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png': {
    original: '/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png',
    webp: '/optimized/hero-heading.webp',
    width: 600,
    height: 154,
    aspectRatio: '600/154'
  },
  // Herbalink interface
  '/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png': {
    original: '/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png',
    webp: '/optimized/herbalink-interface.webp',
    width: 800,
    height: 500,
    aspectRatio: '8/5'
  },
  // Key project images
  '/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png': {
    original: '/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png',
    webp: '/optimized/project-hero.webp',
    width: 800,
    height: 600,
    aspectRatio: '4/3'
  }
};

/**
 * Get optimized image source with WebP support and fallback
 */
export const getOptimizedImageSrc = (originalSrc: string): string => {
  const mapping = OPTIMIZED_IMAGE_MAP[originalSrc];
  if (mapping) {
    // Check if browser supports WebP
    if (supportsWebP()) {
      return mapping.webp;
    }
  }
  return originalSrc;
};

/**
 * Check if browser supports WebP format
 */
export const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

/**
 * Get image dimensions for optimized loading
 */
export const getImageDimensions = (originalSrc: string) => {
  const mapping = OPTIMIZED_IMAGE_MAP[originalSrc];
  return mapping ? {
    width: mapping.width,
    height: mapping.height,
    aspectRatio: mapping.aspectRatio
  } : null;
};

/**
 * Preload critical images for better performance
 */
export const preloadCriticalImages = () => {
  if (typeof window === 'undefined') return;

  const criticalImages = [
    '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png', // Profile avatar
    '/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png'  // Hero heading
  ];

  criticalImages.forEach(src => {
    const optimizedSrc = getOptimizedImageSrc(src);
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizedSrc;
    document.head.appendChild(link);
  });
};