/**
 * Real Performance Optimization - Comprehensive fixes
 */

import { unifiedPerformanceManager } from './unifiedPerformanceManager';
import { accessibilityManager } from './accessibilityManager';
import { linkValidator } from './externalLinkValidator';
import { initARIAValidation } from './ariaValidator';
import { initAnchorTextValidation } from './anchorTextValidator';
import { initInternalLinkOptimization } from './internalLinkOptimizer';
import { initNetworkPayloadOptimization } from './networkPayloadOptimizer';

export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Phase 1: Unified Performance Management
  unifiedPerformanceManager.initialize();
  
  // Phase 2: Unified Accessibility Management
  accessibilityManager.initialize();
  
  // Phase 3: Advanced SEO Optimizations
  linkValidator.initMonitoring();
  initARIAValidation();
  initAnchorTextValidation();
  initInternalLinkOptimization();
  initNetworkPayloadOptimization();
  
  console.log('🚀 Unified performance & accessibility optimization complete');
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
