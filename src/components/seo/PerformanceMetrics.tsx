import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  loadTime: number | null;
}

/**
 * Performance metrics display component for monitoring Core Web Vitals
 */
export const PerformanceMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    loadTime: null
  });

  useEffect(() => {
    const collectMetrics = () => {
      // Collect performance metrics
      if ('PerformanceObserver' in window) {
        // LCP Observer
        const lcpObserver = new PerformanceObserver((list) => {
          const lcpEntry = list.getEntries().at(-1);
          if (lcpEntry) {
            setMetrics(prev => ({ ...prev, lcp: Math.round(lcpEntry.startTime) }));
          }
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // FID Observer
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            const fidValue = Math.round((entry.processingStart || entry.startTime) - entry.startTime);
            setMetrics(prev => ({ ...prev, fid: fidValue }));
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });

        // CLS Observer
        const clsObserver = new PerformanceObserver((list) => {
          let clsScore = 0;
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsScore += (entry.value || 0);
            }
          });
          setMetrics(prev => ({ ...prev, cls: parseFloat(clsScore.toFixed(4)) }));
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      }

      // Load time
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        setMetrics(prev => ({ ...prev, loadTime: Math.round(loadTime) }));
      });
    };

    collectMetrics();
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div className="text-green-400 font-bold mb-1">Performance Metrics</div>
      <div>LCP: {metrics.lcp ? `${metrics.lcp}ms` : '...'}</div>
      <div>FID: {metrics.fid ? `${metrics.fid}ms` : '...'}</div>
      <div>CLS: {metrics.cls ? metrics.cls : '...'}</div>
      <div>Load: {metrics.loadTime ? `${metrics.loadTime}ms` : '...'}</div>
    </div>
  );
};