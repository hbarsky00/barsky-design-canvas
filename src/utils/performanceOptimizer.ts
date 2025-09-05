/**
 * Enhanced Performance Optimization - Production ready
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
  
  // Production mode - no console logs
  if (import.meta.env.DEV) {
    console.log('✅ Performance optimizations applied');
    console.log('✅ Critical accessibility fixes applied');
    console.log('✅ Anchor text improvements applied');
    console.log('✅ Internal link optimization applied');
    console.log('✅ Network payload optimization applied');
    console.log('🚀 All priority action plan phases complete');
  }
};

/**
 * Enhanced scroll debouncer for better performance
 */
export const createDebouncedScrollHandler = (callback: () => void, delay: number = 16) => {
  let timeoutId: NodeJS.Timeout;
  let lastCall = 0;
  
  return () => {
    const now = Date.now();
    
    clearTimeout(timeoutId);
    
    if (now - lastCall >= delay) {
      lastCall = now;
      callback();
    } else {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        callback();
      }, delay - (now - lastCall));
    }
  };
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
  
  // Enhanced intersection observer for better control
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

/**
 * Critical resource preloader with timing optimization
 */
export const preloadCriticalAssets = () => {
  const criticalAssets = [
    { href: '/favicon.ico', as: 'image' },
    { href: 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp', as: 'image', crossorigin: 'anonymous' }
  ];

  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = asset.href;
    link.as = asset.as;
    if (asset.crossorigin) {
      link.crossOrigin = asset.crossorigin;
    }
    document.head.appendChild(link);
  });
};

/**
 * Service worker registration for caching
 */
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      if (import.meta.env.DEV) {
        console.log('SW registered:', registration);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log('SW registration failed:', error);
      }
    }
  }
};