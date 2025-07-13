/**
 * Image Audit and Optimization Utility
 * Identifies oversized images and provides optimization recommendations
 */

interface ImageAuditResult {
  element: HTMLImageElement;
  src: string;
  displaySize: { width: number; height: number };
  naturalSize: { width: number; height: number };
  transferSize?: number;
  isOversized: boolean;
  wastePercentage: number;
  recommendations: string[];
  format: string;
  hasWebPAlternative: boolean;
  hasLazyLoading: boolean;
  hasAltText: boolean;
  hasDimensions: boolean;
}

interface ImageAuditOptions {
  maxWasteThreshold: number;
  maxFileSizeKB: number;
  checkWebP: boolean;
  checkLazyLoading: boolean;
}

const DEFAULT_OPTIONS: ImageAuditOptions = {
  maxWasteThreshold: 25, // 25% waste threshold
  maxFileSizeKB: 100,
  checkWebP: true,
  checkLazyLoading: true
};

/**
 * Gets the transfer size of an image
 */
const getImageTransferSize = async (url: string): Promise<number | undefined> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentLength = response.headers.get('content-length');
    return contentLength ? parseInt(contentLength, 10) : undefined;
  } catch {
    return undefined;
  }
};

/**
 * Detects image format from URL or data
 */
const detectImageFormat = (src: string): string => {
  if (src.startsWith('data:')) {
    const match = src.match(/data:image\/([^;]+)/);
    return match ? match[1].toUpperCase() : 'UNKNOWN';
  }
  
  const extension = src.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'JPEG';
    case 'png':
      return 'PNG';
    case 'webp':
      return 'WebP';
    case 'gif':
      return 'GIF';
    case 'svg':
      return 'SVG';
    case 'avif':
      return 'AVIF';
    default:
      return 'UNKNOWN';
  }
};

/**
 * Checks if WebP alternative exists
 */
const checkWebPAlternative = async (originalSrc: string): Promise<boolean> => {
  try {
    const webpSrc = originalSrc.replace(/\.(jpe?g|png)$/i, '.webp');
    if (webpSrc === originalSrc) return false;
    
    const response = await fetch(webpSrc, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Audits a single image
 */
export const auditImage = async (
  img: HTMLImageElement,
  options: ImageAuditOptions = DEFAULT_OPTIONS
): Promise<ImageAuditResult> => {
  const src = img.currentSrc || img.src;
  const displaySize = {
    width: img.offsetWidth,
    height: img.offsetHeight
  };
  const naturalSize = {
    width: img.naturalWidth,
    height: img.naturalHeight
  };
  
  const transferSize = await getImageTransferSize(src);
  const format = detectImageFormat(src);
  
  // Calculate waste
  const displayPixels = displaySize.width * displaySize.height;
  const naturalPixels = naturalSize.width * naturalSize.height;
  const wastePercentage = naturalPixels > 0 
    ? Math.max(0, ((naturalPixels - displayPixels) / naturalPixels) * 100)
    : 0;
  
  const isOversized = wastePercentage > options.maxWasteThreshold || 
    (transferSize && transferSize > options.maxFileSizeKB * 1024);
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (wastePercentage > options.maxWasteThreshold) {
    const optimalWidth = Math.ceil(displaySize.width * window.devicePixelRatio);
    const optimalHeight = Math.ceil(displaySize.height * window.devicePixelRatio);
    recommendations.push(
      `Resize image to ${optimalWidth}x${optimalHeight}px (accounting for device pixel ratio)`
    );
  }
  
  if (transferSize && transferSize > options.maxFileSizeKB * 1024) {
    recommendations.push(
      `Compress image (current: ${Math.round(transferSize / 1024)}KB, target: <${options.maxFileSizeKB}KB)`
    );
  }
  
  if (format === 'JPEG' || format === 'PNG') {
    recommendations.push('Convert to WebP format for better compression');
  }
  
  if (!img.hasAttribute('loading') && !img.hasAttribute('data-lazy')) {
    recommendations.push('Add lazy loading for non-critical images');
  }
  
  if (!img.alt) {
    recommendations.push('Add descriptive alt text for accessibility');
  }
  
  if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
    recommendations.push('Add width and height attributes to prevent layout shift');
  }
  
  // Check WebP alternative if needed
  const hasWebPAlternative = options.checkWebP && (format === 'JPEG' || format === 'PNG')
    ? await checkWebPAlternative(src)
    : format === 'WebP';
  
  return {
    element: img,
    src,
    displaySize,
    naturalSize,
    transferSize,
    isOversized,
    wastePercentage: Math.round(wastePercentage),
    recommendations,
    format,
    hasWebPAlternative,
    hasLazyLoading: img.hasAttribute('loading') || img.hasAttribute('data-lazy'),
    hasAltText: Boolean(img.alt),
    hasDimensions: img.hasAttribute('width') && img.hasAttribute('height')
  };
};

/**
 * Audits all images on the page
 */
export const auditAllImages = async (
  container: Element | Document = document,
  options: ImageAuditOptions = DEFAULT_OPTIONS
): Promise<{
  oversizedImages: ImageAuditResult[];
  optimizedImages: ImageAuditResult[];
  totalImages: number;
  totalWastedBytes: number;
  optimizationScore: number;
}> => {
  const images = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
  const loadedImages = images.filter(img => img.complete && img.naturalHeight > 0);
  
  console.log(`🖼️ Auditing ${loadedImages.length} loaded images...`);
  
  const results = await Promise.all(
    loadedImages.map(img => auditImage(img, options))
  );
  
  const oversizedImages = results.filter(r => r.isOversized);
  const optimizedImages = results.filter(r => !r.isOversized);
  
  // Calculate total wasted bytes
  const totalWastedBytes = oversizedImages.reduce((total, img) => {
    if (img.transferSize) {
      const optimalSize = (img.displaySize.width * img.displaySize.height * 3); // Rough estimate
      const wastedBytes = Math.max(0, img.transferSize - optimalSize);
      return total + wastedBytes;
    }
    return total;
  }, 0);
  
  const optimizationScore = loadedImages.length > 0 
    ? (optimizedImages.length / loadedImages.length) * 100 
    : 100;
  
  // Log results
  console.group('🖼️ Image Audit Results');
  console.log(`✅ Optimized: ${optimizedImages.length}`);
  console.log(`❌ Oversized: ${oversizedImages.length}`);
  console.log(`📊 Score: ${Math.round(optimizationScore)}%`);
  console.log(`💾 Wasted bytes: ${Math.round(totalWastedBytes / 1024)}KB`);
  
  if (oversizedImages.length > 0) {
    console.warn('Oversized images found:');
    oversizedImages.forEach(img => {
      console.warn(`${img.src}:`, {
        'Display size': `${img.displaySize.width}x${img.displaySize.height}`,
        'Natural size': `${img.naturalSize.width}x${img.naturalSize.height}`,
        'Waste': `${img.wastePercentage}%`,
        'File size': img.transferSize ? `${Math.round(img.transferSize / 1024)}KB` : 'Unknown'
      });
    });
  }
  
  console.groupEnd();
  
  return {
    oversizedImages,
    optimizedImages,
    totalImages: loadedImages.length,
    totalWastedBytes,
    optimizationScore
  };
};

/**
 * Generates optimization suggestions report
 */
export const generateOptimizationReport = (results: ImageAuditResult[]): string => {
  const report = ['# Image Optimization Report\n'];
  
  results.forEach((img, index) => {
    report.push(`## Image ${index + 1}: ${img.src.split('/').pop()}`);
    report.push(`- **Format**: ${img.format}`);
    report.push(`- **Display Size**: ${img.displaySize.width}x${img.displaySize.height}px`);
    report.push(`- **Natural Size**: ${img.naturalSize.width}x${img.naturalSize.height}px`);
    report.push(`- **Waste**: ${img.wastePercentage}%`);
    
    if (img.transferSize) {
      report.push(`- **File Size**: ${Math.round(img.transferSize / 1024)}KB`);
    }
    
    report.push(`- **WebP Available**: ${img.hasWebPAlternative ? '✅' : '❌'}`);
    report.push(`- **Lazy Loading**: ${img.hasLazyLoading ? '✅' : '❌'}`);
    report.push(`- **Alt Text**: ${img.hasAltText ? '✅' : '❌'}`);
    report.push(`- **Dimensions**: ${img.hasDimensions ? '✅' : '❌'}`);
    
    if (img.recommendations.length > 0) {
      report.push('\n**Recommendations:**');
      img.recommendations.forEach(rec => {
        report.push(`- ${rec}`);
      });
    }
    
    report.push('');
  });
  
  return report.join('\n');
};

/**
 * Monitors image loading and performance
 */
export const monitorImagePerformance = (): (() => void) => {
  let observer: MutationObserver;
  
  const checkNewImages = (mutations: MutationRecord[]) => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const images = element.querySelectorAll('img');
            
            images.forEach(img => {
              img.addEventListener('load', () => {
                // Audit new image after it loads
                setTimeout(() => auditImage(img), 100);
              });
            });
          }
        });
      }
    });
  };
  
  // Set up mutation observer
  observer = new MutationObserver(checkNewImages);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Initial audit of existing images
  setTimeout(() => auditAllImages(), 1000);
  
  return () => {
    if (observer) {
      observer.disconnect();
    }
  };
};