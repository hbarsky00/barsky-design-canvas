/**
 * Comprehensive Performance Optimization System
 * Implements critical performance enhancements for Core Web Vitals
 */

// Enable all existing optimization systems
import { enableGlobalImageCompression, monitorImagePerformance } from './imageCompressionTracker';
import { preloadCriticalImages, trackCompressionStats } from './imageOptimization';
import { initRealImageOptimization } from './realImageOptimizer';
import { initTouchTargetFixes } from './touchTargetFixer';

export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Critical resource optimization
  optimizeCriticalResources();
  
  // Real fixes
  initRealImageOptimization();
  initTouchTargetFixes();
  
  // Bundle and asset optimization
  optimizeAssetLoading();
  
  // Minimal performance monitoring
  initializePerformanceMonitoring();
  
  console.log('🚀 Real performance fixes applied');
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
 * Enable comprehensive image optimization
 */
const enableImageOptimizations = () => {
  // Enable global compression
  enableGlobalImageCompression();
  
  // Preload critical images
  preloadCriticalImages();
  
  // Run image optimization once on load, not continuously
  setTimeout(() => {
    trackCompressionStats();
  }, 3000);
};

/**
 * Optimize asset loading and reduce render blocking
 */
const optimizeAssetLoading = () => {
  // Add critical CSS inlining
  const criticalCSS = `
    /* Critical above-the-fold styles */
    body { 
      font-family: Inter, sans-serif;
      margin: 0;
      background: linear-gradient(135deg, #f6f8fb 0%, #e8f2ff 50%, #f0f7ff 100%);
    }
    .section-container { max-width: 80rem; margin: 0 auto; padding: 1rem; }
    .glass-card { 
      backdrop-filter: blur(12px);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
};

/**
 * Initialize performance monitoring (minimal, no console spam)
 */
const initializePerformanceMonitoring = () => {
  // Only log critical metrics once on load
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    if (loadTime > 3000) { // Only log if slow
      console.log('📊 Load Time:', Math.round(loadTime), 'ms');
    }
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

/**
 * Monitor and report performance metrics
 */
export const reportPerformanceMetrics = () => {
  setTimeout(() => {
    const metrics = {
      images: document.images.length,
      scripts: document.scripts.length,
      stylesheets: document.styleSheets.length,
      totalElements: document.querySelectorAll('*').length,
    };
    
    console.log('📈 Performance Report:', metrics);
    
    // Check for accessibility issues
    const buttonsWithoutLabels = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').length;
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])').length;
    
    if (buttonsWithoutLabels > 0 || imagesWithoutAlt > 0) {
      console.warn('⚠️ Accessibility Issues:', {
        buttonsWithoutLabels,
        imagesWithoutAlt
      });
    }
  }, 3000);
};