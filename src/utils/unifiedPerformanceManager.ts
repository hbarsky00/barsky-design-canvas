/**
 * Unified Performance Manager - Consolidates all performance optimizations
 * Eliminates conflicts between multiple performance systems
 */

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  loadTime: number | null;
}

interface PerformanceThresholds {
  lcp: number; // 2.5s
  fid: number; // 100ms
  cls: number; // 0.1
  ttfb: number; // 600ms
}

class UnifiedPerformanceManager {
  private metrics: PerformanceMetrics = {
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    loadTime: null
  };

  private observers: PerformanceObserver[] = [];
  private cleanupFunctions: (() => void)[] = [];
  private isInitialized = false;

  private thresholds: PerformanceThresholds = {
    lcp: 2500,
    fid: 100,
    cls: 0.1,
    ttfb: 600
  };

  initialize() {
    if (this.isInitialized || typeof window === 'undefined') return;
    
    this.isInitialized = true;
    
    // Phase 1: Critical Resource Optimization
    this.optimizeCriticalResources();
    
    // Phase 2: Performance Monitoring
    this.initializePerformanceMonitoring();
    
    // Phase 3: Mobile Optimizations
    this.initializeMobileOptimizations();
    
    // Phase 4: Image Optimization
    this.initializeImageOptimization();
    
    // Phase 5: Service Worker
    this.initializeServiceWorker();
    
    console.log('🚀 Unified Performance Manager initialized');
  }

  private optimizeCriticalResources() {
    // Inline critical CSS
    const criticalCSS = `
      body { margin: 0; font-family: Inter, sans-serif; }
      .hero-section { min-height: 100vh; display: flex; align-items: center; }
      .navigation { position: fixed; top: 0; width: 100%; z-index: 50; }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);

    // Preload critical assets
    const criticalAssets = [
      { href: '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png', as: 'image' },
      { href: '/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png', as: 'image' },
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap', as: 'style' }
    ];

    criticalAssets.forEach(asset => {
      if (!document.querySelector(`link[href="${asset.href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = asset.href;
        link.as = asset.as;
        link.onload = () => {
          if (asset.as === 'style') {
            link.rel = 'stylesheet';
          }
        };
        document.head.appendChild(link);
      }
    });
  }

  private initializePerformanceMonitoring() {
    // LCP Observer
    this.createObserver('largest-contentful-paint', (entries) => {
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = Math.round(lastEntry.startTime);
    });

    // FID Observer
    this.createObserver('first-input', (entries) => {
      const firstEntry = entries[0];
      this.metrics.fid = Math.round(firstEntry.processingStart - firstEntry.startTime);
    });

    // CLS Observer
    this.createObserver('layout-shift', (entries) => {
      let clsScore = 0;
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      });
      this.metrics.cls = parseFloat(clsScore.toFixed(4));
    });

    // Navigation timing
    const handleLoad = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        this.metrics.ttfb = Math.round(navigation.responseStart - navigation.requestStart);
        this.metrics.loadTime = Math.round(navigation.loadEventEnd - navigation.loadEventStart);
      }

      // FCP
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        this.metrics.fcp = Math.round(fcpEntry.startTime);
      }

      // Log performance summary
      this.logPerformanceSummary();
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }
  }

  private initializeMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Mobile-specific CSS optimizations
      const mobileCSS = `
        @media (hover: none) and (pointer: coarse) {
          button, [role="button"], .clickable {
            min-height: 48px;
            min-width: 48px;
            padding: 12px 16px;
            margin: 4px;
          }
          
          input, textarea, select {
            min-height: 48px;
            font-size: 16px;
          }
          
          nav a, .nav-link {
            padding: 12px 16px;
            min-height: 48px;
            display: flex;
            align-items: center;
          }
        }
        
        @media (max-width: 768px) {
          img {
            height: auto;
            max-width: 100%;
          }
          
          .reduce-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `;
      
      const mobileStyle = document.createElement('style');
      mobileStyle.textContent = mobileCSS;
      document.head.appendChild(mobileStyle);
      
      // Reduce motion for better performance
      document.documentElement.classList.add('reduce-motion');
    }
  }

  private initializeImageOptimization() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Lazy load optimization
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          // Add loading="lazy" if not present
          if (!img.hasAttribute('loading')) {
            img.loading = 'lazy';
          }
          
          // Add responsive sizes
          if (!img.hasAttribute('sizes') && img.hasAttribute('srcset')) {
            img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
          }
          
          // Add smooth transition
          img.style.transition = 'opacity 0.3s ease';
          
          imageObserver.unobserve(img);
        }
      });
    }, { threshold: 0.1, rootMargin: '50px' });

    // Observe all images
    const observeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => imageObserver.observe(img));
    };

    // Initial observation
    observeImages();

    // Re-observe when new images are added
    const mutationObserver = new MutationObserver(observeImages);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    this.cleanupFunctions.push(() => {
      imageObserver.disconnect();
      mutationObserver.disconnect();
    });
  }

  private initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }

  private createObserver(type: string, callback: (entries: any[]) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      observer.observe({ type, buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn(`Performance observer for ${type} not supported:`, error);
    }
  }

  private logPerformanceSummary() {
    const { lcp, fid, cls, ttfb, fcp, loadTime } = this.metrics;
    
    console.log('📊 Performance Summary:');
    console.log(`  LCP: ${lcp}ms ${lcp && lcp < this.thresholds.lcp ? '✅' : '⚠️'}`);
    console.log(`  FID: ${fid}ms ${fid && fid < this.thresholds.fid ? '✅' : '⚠️'}`);
    console.log(`  CLS: ${cls} ${cls && cls < this.thresholds.cls ? '✅' : '⚠️'}`);
    console.log(`  TTFB: ${ttfb}ms ${ttfb && ttfb < this.thresholds.ttfb ? '✅' : '⚠️'}`);
    console.log(`  FCP: ${fcp}ms`);
    console.log(`  Load Time: ${loadTime}ms`);
    
    if (this.isPerformanceGood()) {
      console.log('✅ Overall performance is good');
    } else {
      console.log('⚠️ Performance needs improvement');
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  isPerformanceGood(): boolean {
    const { lcp, fid, cls, ttfb } = this.metrics;
    return (
      (lcp || 0) < this.thresholds.lcp &&
      (fid || 0) < this.thresholds.fid &&
      (cls || 0) < this.thresholds.cls &&
      (ttfb || 0) < this.thresholds.ttfb
    );
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.observers = [];
    this.cleanupFunctions = [];
    this.isInitialized = false;
  }
}

export const unifiedPerformanceManager = new UnifiedPerformanceManager();