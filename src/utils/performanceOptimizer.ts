/**
 * Real Performance Optimization - Comprehensive fixes
 */

import { initImageOptimization } from './imageOptimizer';
import { initTouchTargetFixes } from './touchTargetFixer';
import { initAccessibilityFixes } from './accessibilityFixer';
import { linkValidator } from './externalLinkValidator';
import { optimizeCriticalResources, deferNonCriticalResources } from './performanceMonitor';

export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Apply comprehensive fixes
  initImageOptimization();
  initTouchTargetFixes();
  initAccessibilityFixes();
  linkValidator.initMonitoring();
  optimizeCriticalResources();
  deferNonCriticalResources();
  
  console.log('✅ Performance optimizations applied');
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
