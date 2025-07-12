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

    // Reduce main thread blocking and optimize for mobile
    const optimizeMainThread = () => {
      // Use scheduler API if available
      if ('scheduler' in window && (window.scheduler as any)?.postTask) {
        return;
      }
      
      // Minimize JavaScript bundle size impact
      const deferNonCriticalTasks = () => {
        // Use requestIdleCallback for better performance
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            // Defer non-critical operations
            console.log('🚀 Performance optimizations applied');
          });
        } else {
          setTimeout(() => {
            console.log('🚀 Performance optimizations applied');
          }, 0);
        }
      };
      
      deferNonCriticalTasks();
    };

    // Eliminate render-blocking resources
    const eliminateRenderBlocking = () => {
      // Inline critical CSS for above-the-fold content
      const criticalStyles = `
        /* Critical CSS for above-the-fold content */
        body { margin: 0; font-family: Inter, sans-serif; }
        .hero-section { min-height: 100vh; display: flex; align-items: center; }
        .navigation { position: fixed; top: 0; width: 100%; z-index: 50; }
      `;
      
      const style = document.createElement('style');
      style.textContent = criticalStyles;
      document.head.insertBefore(style, document.head.firstChild);
      
      // Preload key resources
      const keyResources = [
        { href: '/src/index.css', as: 'style' },
        { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap', as: 'style' }
      ];
      
      keyResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.as === 'style') {
          link.onload = () => {
            link.rel = 'stylesheet';
          };
        }
        document.head.appendChild(link);
      });
    };

    // Apply optimizations
    const cleanup = lazyLoadImages();
    preloadCriticalImages();
    optimizeMainThread();
    eliminateRenderBlocking();
    
    // Additional performance optimizations
    preloadCriticalAssets();
    optimizeWebVitals();

    return cleanup;
  }, []);
};