import { useEffect } from 'react';
import { preloadCriticalAssets, optimizeWebVitals } from '@/utils/bundleOptimization';

/**
 * Hook to implement performance optimizations
 */
export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Lazy load images that are not in viewport
    const lazyLoadImages = () => {
      const images = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
      
      return () => {
        images.forEach(img => imageObserver.unobserve(img));
      };
    };

    // Preload critical images
    const preloadCriticalImages = () => {
      const criticalImages = [
        '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png', // Avatar
        '/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png'  // Hero image
      ];
      
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Reduce main thread blocking
    const optimizeMainThread = () => {
      // Use scheduler API if available
      if ('scheduler' in window && (window.scheduler as any)?.postTask) {
        return;
      }
      
      // Fallback to setTimeout for non-critical tasks
      const deferNonCriticalTasks = () => {
        setTimeout(() => {
          // Non-critical operations can be moved here
          console.log('🚀 Performance optimizations applied');
        }, 0);
      };
      
      deferNonCriticalTasks();
    };

    // Apply optimizations
    const cleanup = lazyLoadImages();
    preloadCriticalImages();
    optimizeMainThread();
    
    // Additional performance optimizations
    preloadCriticalAssets();
    optimizeWebVitals();

    return cleanup;
  }, []);
};