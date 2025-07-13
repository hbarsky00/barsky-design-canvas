/**
 * Performance Monitor - Track and optimize real metrics
 */

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
    this.trackNavigationTiming();
  }

  private initializeObservers() {
    // Track LCP
    this.createObserver('largest-contentful-paint', (entries) => {
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
    });

    // Track FID
    this.createObserver('first-input', (entries) => {
      const firstEntry = entries[0];
      this.metrics.fid = firstEntry.processingStart - firstEntry.startTime;
    });

    // Track CLS
    this.createObserver('layout-shift', (entries) => {
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          this.metrics.cls = (this.metrics.cls || 0) + entry.value;
        }
      });
    });
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

  private trackNavigationTiming() {
    // Track TTFB and FCP
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
      }

      // Track FCP
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        this.metrics.fcp = fcpEntry.startTime;
      }
    });
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  // Check if performance is good
  isPerformanceGood(): boolean {
    return (
      (this.metrics.lcp || 0) < 2500 && // < 2.5s
      (this.metrics.fid || 0) < 100 && // < 100ms
      (this.metrics.cls || 0) < 0.1 && // < 0.1
      (this.metrics.ttfb || 0) < 600 // < 600ms
    );
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Optimize critical resources
 */
export const optimizeCriticalResources = () => {
  // Preload critical assets only
  const criticalAssets = [
    '/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png', // Favicon
    '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png', // Profile avatar
  ];

  criticalAssets.forEach(src => {
    if (!document.querySelector(`link[href="${src}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    }
  });
};

/**
 * Defer non-critical resources
 */
export const deferNonCriticalResources = () => {
  // Defer third-party scripts
  const deferScripts = () => {
    setTimeout(() => {
      // Load any non-critical scripts here
      console.log('Non-critical resources loaded');
    }, 100);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', deferScripts);
  } else {
    deferScripts();
  }
};