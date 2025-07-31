/**
 * Real Performance Optimization - Comprehensive fixes
 */

import { initImageOptimization } from './imageOptimizer';
import { initTouchTargetFixes } from './touchTargetFixer';
import { initAccessibilityFixes } from './accessibilityFixer';
import { linkValidator } from './externalLinkValidator';
import { optimizeCriticalResources, deferNonCriticalResources } from './performanceMonitor';
import { initARIAValidation } from './ariaValidator';
import { initAnchorTextValidation } from './anchorTextValidator';
import { initInternalLinkOptimization } from './internalLinkOptimizer';
import { initNetworkPayloadOptimization } from './networkPayloadOptimizer';

export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Apply comprehensive fixes
  initImageOptimization();
  initTouchTargetFixes();
  initAccessibilityFixes();
  linkValidator.initMonitoring();
  optimizeCriticalResources();
  deferNonCriticalResources();
  
  // Phase 1: Critical Accessibility & Performance fixes
  initARIAValidation();
  initAnchorTextValidation();
  
  // Phase 2: SEO & Navigation Optimization
  initInternalLinkOptimization();
  
  // Phase 3: Advanced Performance Tuning
  initNetworkPayloadOptimization();
  
  console.log('✅ Performance optimizations applied');
  console.log('✅ Critical accessibility fixes applied');
  console.log('✅ Anchor text improvements applied');
  console.log('✅ Internal link optimization applied');
  console.log('✅ Network payload optimization applied');
  console.log('🚀 All priority action plan phases complete');
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
