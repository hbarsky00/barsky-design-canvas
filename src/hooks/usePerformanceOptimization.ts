
import React, { useEffect } from 'react';
import { preloadCriticalAssets, optimizeWebVitals } from '@/utils/bundleOptimization';
import { setupGlobalErrorHandling, safelyExecute } from '@/utils/errorHandler';

/**
 * Hook to implement performance optimizations
 */
export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    try {
      // Setup global error handling first
      setupGlobalErrorHandling();

      // Lazy load images that are not in viewport
      const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                safelyExecute(() => {
                  img.src = img.dataset.src!;
                  img.removeAttribute('data-src');
                });
              }
              observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px',
          threshold: 0.1
        });

        images.forEach(img => imageObserver.observe(img));
        
        return () => {
          images.forEach(img => imageObserver.unobserve(img));
        };
      };

      // Preload critical images with error handling
      const preloadCriticalImages = () => {
        const criticalImages = [
          '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png', // Avatar
          '/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png'  // Hero heading
        ];
        
        criticalImages.forEach(src => {
          safelyExecute(() => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            link.onerror = () => console.warn('Failed to preload image:', src);
            document.head.appendChild(link);
          });
        });
      };

      // Apply optimizations with error handling
      let cleanup: (() => void) | undefined;
      
      safelyExecute(() => {
        cleanup = lazyLoadImages();
        preloadCriticalImages();
        
        // Additional performance optimizations
        try {
          preloadCriticalAssets();
          optimizeWebVitals();
        } catch (error) {
          console.warn('Performance optimization error:', error);
        }
      });

      return cleanup;
    } catch (error) {
      console.error('Performance optimization hook error:', error);
    }
  }, []);
};
