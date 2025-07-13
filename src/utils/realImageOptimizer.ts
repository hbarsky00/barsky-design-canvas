/**
 * Real Image Optimization - Actually compress and optimize images
 */

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  maxSizeKB?: number;
}

/**
 * Compress an image file to reduce size
 */
export const compressImage = async (
  file: File, 
  options: ImageOptimizationOptions = {}
): Promise<File> => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
    format = 'webp',
    maxSizeKB = 500
  } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const newWidth = Math.floor(img.width * ratio);
      const newHeight = Math.floor(img.height * ratio);

      canvas.width = newWidth;
      canvas.height = newHeight;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, newWidth, newHeight);
      
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to compress image'));
            return;
          }
          
          // Check if size is acceptable
          const sizeKB = blob.size / 1024;
          if (sizeKB <= maxSizeKB) {
            const compressedFile = new File([blob], file.name, {
              type: blob.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            // Try with lower quality
            const lowerQuality = Math.max(0.3, quality - 0.2);
            compressImage(file, { ...options, quality: lowerQuality })
              .then(resolve)
              .catch(reject);
          }
        },
        format === 'webp' ? 'image/webp' : `image/${format}`,
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Optimize all images on the page - add proper attributes and lazy loading
 */
export const optimizePageImages = () => {
  const images = document.querySelectorAll('img');
  
  images.forEach((img) => {
    // Add lazy loading
    if (!img.loading) {
      img.loading = 'lazy';
    }
    
    // Add proper sizing to prevent layout shift
    if (!img.width && !img.height) {
      img.style.aspectRatio = 'auto';
    }
    
    // Add proper alt text if missing
    if (!img.alt) {
      img.alt = 'Image';
    }
    
    // Optimize for WebP if possible
    enhanceImageWithWebP(img);
  });
};

/**
 * Add WebP support with fallbacks
 */
export const enhanceImageWithWebP = (img: HTMLImageElement) => {
  if (!img.src || img.dataset.webpEnhanced) return;
  
  const picture = document.createElement('picture');
  const webpSource = document.createElement('source');
  const fallbackImg = img.cloneNode(true) as HTMLImageElement;
  
  // Add WebP source
  webpSource.srcset = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  webpSource.type = 'image/webp';
  
  picture.appendChild(webpSource);
  picture.appendChild(fallbackImg);
  
  img.parentNode?.replaceChild(picture, img);
  img.dataset.webpEnhanced = 'true';
};

/**
 * Initialize real image optimization
 */
export const initRealImageOptimization = () => {
  // Run optimization once when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizePageImages);
  } else {
    optimizePageImages();
  }
};