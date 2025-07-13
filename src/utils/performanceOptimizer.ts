/**
 * Comprehensive Performance Optimization System
 * Implements critical performance enhancements for Core Web Vitals
 */

// Enable all existing optimization systems
import { enableGlobalImageCompression, monitorImagePerformance } from './imageCompressionTracker';
import { preloadCriticalImages, trackCompressionStats } from './imageOptimization';

export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Critical resource optimization
  optimizeCriticalResources();
  
  // Image optimization
  enableImageOptimizations();
  
  // Bundle and asset optimization
  optimizeAssetLoading();
  
  // Performance monitoring
  initializePerformanceMonitoring();
  
  console.log('🚀 Performance optimizations initialized');
};

/**
 * Optimize critical resources for faster first paint
 */
const optimizeCriticalResources = () => {
  // Preload critical assets
  const criticalAssets = [
    '/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png', // Favicon
    '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png', // Profile
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
  
  // Start external link monitoring
  import('./externalLinkValidator').then(({ monitorExternalLinks }) => {
    monitorExternalLinks(300000); // Check every 5 minutes
  });
  
  // Start touch target monitoring
  import('./touchTargetValidator').then(({ monitorTouchTargets }) => {
    monitorTouchTargets(true); // Enable auto-fix
  });
  
  // Start image performance monitoring
  import('./imageAuditor').then(({ monitorImagePerformance }) => {
    monitorImagePerformance();
  });
  
  // Preload critical images
  preloadCriticalImages();
  
  // Start monitoring
  setTimeout(() => {
    monitorImagePerformance();
    trackCompressionStats();
  }, 2000);
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
 * Initialize performance monitoring
 */
const initializePerformanceMonitoring = () => {
  // Monitor Core Web Vitals
  if ('PerformanceObserver' in window) {
    try {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const lcpEntry = list.getEntries().at(-1);
        if (lcpEntry) {
          console.log('🎯 LCP:', Math.round(lcpEntry.startTime), 'ms');
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          console.log('⚡ FID:', Math.round((entry.processingStart || entry.startTime) - entry.startTime), 'ms');
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsScore = 0;
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsScore += (entry.value || 0);
          }
        });
        if (clsScore > 0) {
          console.log('📐 CLS:', clsScore.toFixed(4));
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (error) {
      console.warn('Performance monitoring not supported:', error);
    }
  }

  // Monitor resource loading
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('📊 Total Load Time:', Math.round(loadTime), 'ms');
    
    // Report network payload
    if ('connection' in navigator && (navigator as any).connection) {
      const connection = (navigator as any).connection;
      console.log('🌐 Connection:', connection.effectiveType, connection.downlink + 'Mbps');
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