/**
 * Real Performance Optimization - Actual fixes, no bloat
 */

import { initRealImageOptimization } from './realImageOptimizer';
import { initTouchTargetFixes } from './touchTargetFixer';

export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Apply real fixes only
  initRealImageOptimization();
  initTouchTargetFixes();
  optimizeCriticalResources();
};

const optimizeCriticalResources = () => {
  // Preload only critical assets
  const criticalAssets = [
    '/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png', // Favicon
  ];

  criticalAssets.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};




/**
 * Optimize images with modern formats and compression
 */
export const optimizeImageElement = (img: HTMLImageElement) => {
  // Add lazy loading if not already present
  if (!img.loading) {
    img.loading = 'lazy';
  }
  
  // Add proper sizing attributes
  if (!img.sizes && img.classList.contains('responsive')) {
    img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }
  
  // Enhance with intersection observer for better control
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const imgElement = entry.target as HTMLImageElement;
        imgElement.style.transition = 'opacity 0.3s ease';
        imageObserver.unobserve(imgElement);
      }
    });
  }, { threshold: 0.1, rootMargin: '50px' });
  
  imageObserver.observe(img);
};
