import { LazyImage } from '@/components/LazyImage';

export interface OptimizedImageMapping {
  original: string;
  webp: string;
  width: number;
  height: number;
  aspectRatio: string;
}

// Critical images that need optimization - ordered by size/impact
export const OPTIMIZED_IMAGE_MAP: Record<string, OptimizedImageMapping> = {
  // Profile/Avatar images - KEEP ORIGINAL USER PHOTO
  '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png': {
    original: '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png',
    webp: '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png', // Use original - DO NOT REPLACE
    width: 208,
    height: 208,
    aspectRatio: '1/1'
  },
  // Hero heading image
  '/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png': {
    original: '/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png',
    webp: '/optimized/hero-heading-compressed.webp',
    width: 600,
    height: 154,
    aspectRatio: '600/154'
  },
  // Large project images (biggest file size impact)
  '/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png': {
    original: '/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png',
    webp: '/optimized/herbalink-interface-compressed.webp',
    width: 800,
    height: 500,
    aspectRatio: '8/5'
  },
  '/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png': {
    original: '/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png',
    webp: '/optimized/project-hero-compressed.webp',
    width: 800,
    height: 600,
    aspectRatio: '4/3'
  },
  '/lovable-uploads/0afc5405-ec7b-4938-a467-96cf505b98d8.png': {
    original: '/lovable-uploads/0afc5405-ec7b-4938-a467-96cf505b98d8.png',
    webp: '/optimized/herbalink-mobile-compressed.webp',
    width: 800,
    height: 600,
    aspectRatio: '4/3'
  },
  // Additional large project images
  '/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png': {
    original: '/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png',
    webp: '/optimized/splittime-hero-compressed.webp',
    width: 800,
    height: 600,
    aspectRatio: '4/3'
  },
  '/lovable-uploads/635f7690-e7c5-4e2f-8260-099c3bde45ca.png': {
    original: '/lovable-uploads/635f7690-e7c5-4e2f-8260-099c3bde45ca.png',
    webp: '/optimized/healthcare-professional-compressed.webp',
    width: 600,
    height: 400,
    aspectRatio: '3/2'
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