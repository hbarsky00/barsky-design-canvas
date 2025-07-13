/**
 * Real Image Optimization - Actual compression and WebP conversion
 */

interface ImageOptimizationConfig {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: 'webp' | 'jpeg' | 'png';
  maxSizeKB: number;
}

const DEFAULT_CONFIG: ImageOptimizationConfig = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 0.85,
  format: 'webp',
  maxSizeKB: 100
};

/**
 * Compress and optimize image files
 */
export const optimizeImage = async (
  imageUrl: string, 
  config: Partial<ImageOptimizationConfig> = {}
): Promise<string> => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  try {
    // Load image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    return new Promise((resolve, reject) => {
      img.onload = () => {
        try {
          // Create canvas for optimization
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            resolve(imageUrl); // Fallback to original
            return;
          }
          
          // Calculate optimal dimensions
          const { width, height } = calculateOptimalDimensions(
            img.width, 
            img.height, 
            finalConfig.maxWidth, 
            finalConfig.maxHeight
          );
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to optimized format
          const optimizedDataUrl = canvas.toDataURL(
            `image/${finalConfig.format}`, 
            finalConfig.quality
          );
          
          // Check file size
          const sizeKB = getDataUrlSizeKB(optimizedDataUrl);
          
          if (sizeKB <= finalConfig.maxSizeKB) {
            resolve(optimizedDataUrl);
          } else {
            // Reduce quality and try again
            const reducedQuality = Math.max(0.6, finalConfig.quality - 0.1);
            const retryDataUrl = canvas.toDataURL(
              `image/${finalConfig.format}`, 
              reducedQuality
            );
            resolve(retryDataUrl);
          }
        } catch (error) {
          console.warn('Image optimization failed:', error);
          resolve(imageUrl); // Fallback to original
        }
      };
      
      img.onerror = () => resolve(imageUrl); // Fallback to original
      img.src = imageUrl;
    });
  } catch (error) {
    console.warn('Image optimization error:', error);
    return imageUrl; // Fallback to original
  }
};

/**
 * Calculate optimal dimensions maintaining aspect ratio
 */
const calculateOptimalDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } => {
  const aspectRatio = originalWidth / originalHeight;
  
  let width = originalWidth;
  let height = originalHeight;
  
  // Scale down if too large
  if (width > maxWidth) {
    width = maxWidth;
    height = width / aspectRatio;
  }
  
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }
  
  return { width: Math.round(width), height: Math.round(height) };
};

/**
 * Get data URL size in KB
 */
const getDataUrlSizeKB = (dataUrl: string): number => {
  const base64 = dataUrl.split(',')[1];
  const byteLength = (base64.length * 3) / 4;
  return byteLength / 1024;
};

/**
 * Preload critical images
 */
export const preloadCriticalImages = (imageUrls: string[]) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Add proper image attributes for performance
 */
export const enhanceImageElement = (img: HTMLImageElement) => {
  // Add loading attribute if not present
  if (!img.loading) {
    img.loading = 'lazy';
  }
  
  // Add proper sizes attribute for responsive images
  if (!img.sizes && img.classList.contains('responsive')) {
    img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }
  
  // Add proper alt text if missing
  if (!img.alt || img.alt.trim() === '') {
    img.alt = 'Image';
    console.warn('Image missing alt text:', img.src);
  }
  
  // Add explicit width/height to prevent layout shift
  if (!img.width && !img.height && img.naturalWidth) {
    img.width = img.naturalWidth;
    img.height = img.naturalHeight;
  }
};

/**
 * Initialize image optimization for all images on page
 */
export const initImageOptimization = () => {
  // Enhance existing images
  document.querySelectorAll('img').forEach((img) => {
    enhanceImageElement(img as HTMLImageElement);
  });
  
  // Monitor for new images
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          const images = element.tagName === 'IMG' 
            ? [element as HTMLImageElement]
            : Array.from(element.querySelectorAll('img'));
          
          images.forEach(enhanceImageElement);
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};