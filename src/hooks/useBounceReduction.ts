import { useEffect, useState } from 'react';

interface BounceReductionConfig {
  enableExitIntent?: boolean;
  enableScrollEngagement?: boolean;
  enablePerformanceOptimizations?: boolean;
}

export const useBounceReduction = (config: BounceReductionConfig = {}) => {
  const [metrics, setMetrics] = useState({
    pageLoadTime: 0,
    scrollDepth: 0,
    timeOnPage: 0,
    hasInteracted: false,
  });

  useEffect(() => {
    const startTime = performance.now();

    // Track page load time
    const handleLoad = () => {
      const loadTime = performance.now() - startTime;
      setMetrics(prev => ({ ...prev, pageLoadTime: loadTime }));
    };

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setMetrics(prev => ({ 
        ...prev, 
        scrollDepth: Math.max(prev.scrollDepth, scrollPercent) 
      }));
    };

    // Track user interaction
    const handleInteraction = () => {
      setMetrics(prev => ({ ...prev, hasInteracted: true }));
    };

    // Track time on page
    const timeInterval = setInterval(() => {
      setMetrics(prev => ({ 
        ...prev, 
        timeOnPage: performance.now() - startTime 
      }));
    }, 1000);

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      clearInterval(timeInterval);
    };
  }, []);

  // Calculate engagement score
  const engagementScore = Math.min(
    (metrics.scrollDepth * 0.4) + 
    (metrics.timeOnPage / 1000 * 0.3) + 
    (metrics.hasInteracted ? 30 : 0),
    100
  );

  return {
    metrics,
    engagementScore,
    isHighEngagement: engagementScore > 60,
    isLikelyToBounce: engagementScore < 20 && metrics.timeOnPage > 5000,
  };
};