/**
 * Comprehensive SEO & Mobile Optimization Monitor
 * Tracks all implemented optimizations and provides detailed reporting
 */

import { monitorCanonicalTags } from './seoCanonicalMonitor';
import { monitorMobileUsability } from './mobileUsabilityOptimizer';
import { monitorLinkEquity } from './linkEquityDistributor';

interface SEOMetrics {
  canonicalStatus: 'pass' | 'warning' | 'fail';
  mobileUsabilityScore: number;
  linkEquityScore: number;
  totalInteractiveElements: number;
  improperTouchTargets: number;
  internalLinks: number;
  pageLoadTime: number;
  coreWebVitals: {
    lcp: number | null;
    fid: number | null;
    cls: number | null;
  };
}

/**
 * Comprehensive SEO audit
 */
export const performSEOAudit = async (): Promise<SEOMetrics> => {
  const results: SEOMetrics = {
    canonicalStatus: 'pass',
    mobileUsabilityScore: 0,
    linkEquityScore: 0,
    totalInteractiveElements: 0,
    improperTouchTargets: 0,
    internalLinks: 0,
    pageLoadTime: 0,
    coreWebVitals: {
      lcp: null,
      fid: null,
      cls: null
    }
  };

  // Check canonical tags
  const canonicalTags = document.querySelectorAll('link[rel="canonical"]');
  if (canonicalTags.length === 0) {
    results.canonicalStatus = 'fail';
    console.error('❌ No canonical tag found');
  } else if (canonicalTags.length > 1) {
    results.canonicalStatus = 'warning';
    console.warn('⚠️ Multiple canonical tags found');
  } else {
    results.canonicalStatus = 'pass';
    console.log('✅ Canonical tag is properly configured');
  }

  // Check mobile usability
  const interactiveElements = document.querySelectorAll('button, a[href], [role="button"], input[type="submit"]');
  results.totalInteractiveElements = interactiveElements.length;
  
  let improperTargets = 0;
  interactiveElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const minSize = 44;
    
    if (rect.width < minSize || rect.height < minSize) {
      improperTargets++;
    }
  });
  
  results.improperTouchTargets = improperTargets;
  results.mobileUsabilityScore = Math.max(0, 100 - (improperTargets / interactiveElements.length) * 100);

  // Check internal links
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]');
  results.internalLinks = internalLinks.length;

  // Calculate link equity score (simplified)
  results.linkEquityScore = Math.min(100, (results.internalLinks / 10) * 100);

  // Check page load time
  if (window.performance && window.performance.timing) {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    results.pageLoadTime = loadTime;
  }

  // Check Core Web Vitals (if available)
  if ('web-vital' in window) {
    // This would be populated by Web Vitals library if implemented
    // For now, we'll use performance observer if available
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'largest-contentful-paint') {
            results.coreWebVitals.lcp = entry.startTime;
          }
          if (entry.name === 'cumulative-layout-shift') {
            results.coreWebVitals.cls = (entry as any).value || entry.startTime;
          }
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });
    } catch (e) {
      console.log('Performance Observer not available');
    }
  }

  return results;
};

/**
 * Generate SEO audit report
 */
export const generateSEOReport = async (): Promise<void> => {
  const metrics = await performSEOAudit();
  
  console.log('\n🔍 SEO & Mobile Optimization Report');
  console.log('=====================================');
  
  // Canonical Status
  console.log(`\n📋 Canonical Tags: ${metrics.canonicalStatus === 'pass' ? '✅ PASS' : metrics.canonicalStatus === 'warning' ? '⚠️ WARNING' : '❌ FAIL'}`);
  
  // Mobile Usability
  console.log(`\n📱 Mobile Usability Score: ${Math.round(metrics.mobileUsabilityScore)}%`);
  console.log(`   • Total Interactive Elements: ${metrics.totalInteractiveElements}`);
  console.log(`   • Improper Touch Targets: ${metrics.improperTouchTargets}`);
  if (metrics.mobileUsabilityScore < 90) {
    console.warn('   ⚠️ Mobile usability needs improvement');
  } else {
    console.log('   ✅ Mobile usability is excellent');
  }
  
  // Link Equity
  console.log(`\n🔗 Link Equity Score: ${Math.round(metrics.linkEquityScore)}%`);
  console.log(`   • Internal Links Found: ${metrics.internalLinks}`);
  if (metrics.linkEquityScore < 70) {
    console.warn('   ⚠️ Consider adding more internal links');
  } else {
    console.log('   ✅ Good internal linking structure');
  }
  
  // Performance
  console.log(`\n⚡ Performance Metrics:`);
  console.log(`   • Page Load Time: ${Math.round(metrics.pageLoadTime)}ms`);
  if (metrics.coreWebVitals.lcp) {
    console.log(`   • Largest Contentful Paint: ${Math.round(metrics.coreWebVitals.lcp)}ms`);
  }
  
  // Overall Assessment
  const overallScore = Math.round(
    (metrics.canonicalStatus === 'pass' ? 100 : metrics.canonicalStatus === 'warning' ? 70 : 0) * 0.3 +
    metrics.mobileUsabilityScore * 0.4 +
    metrics.linkEquityScore * 0.3
  );
  
  console.log(`\n🎯 Overall SEO Score: ${overallScore}%`);
  
  if (overallScore >= 90) {
    console.log('🎉 Excellent SEO optimization!');
  } else if (overallScore >= 70) {
    console.log('👍 Good SEO with room for improvement');
  } else {
    console.log('📈 SEO needs significant improvement');
  }
  
  console.log('\n=====================================\n');
};

/**
 * Monitor SEO performance in real-time
 */
export const initSEORealTimeMonitoring = () => {
  if (typeof window === 'undefined') return;
  
  // Initial audit
  setTimeout(() => {
    generateSEOReport();
  }, 3000);
  
  // Monitor DOM changes that might affect SEO
  const observer = new MutationObserver(() => {
    // Debounced re-audit
    setTimeout(() => {
      monitorCanonicalTags();
      monitorMobileUsability();
      monitorLinkEquity();
    }, 1000);
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Monitor window resize for mobile usability
  window.addEventListener('resize', () => {
    setTimeout(() => {
      monitorMobileUsability();
    }, 300);
  });
  
  // Re-audit every 30 seconds
  setInterval(() => {
    generateSEOReport();
  }, 30000);
  
  console.log('🔍 SEO real-time monitoring initialized');
};

/**
 * Quick SEO health check
 */
export const quickSEOHealthCheck = () => {
  const issues = [];
  
  // Check canonical tags
  const canonicalTags = document.querySelectorAll('link[rel="canonical"]');
  if (canonicalTags.length === 0) {
    issues.push('No canonical tag found');
  } else if (canonicalTags.length > 1) {
    issues.push('Multiple canonical tags detected');
  }
  
  // Check mobile touch targets
  const interactiveElements = document.querySelectorAll('button, a[href], [role="button"]');
  let improperTargets = 0;
  interactiveElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
      improperTargets++;
    }
  });
  
  if (improperTargets > 0) {
    issues.push(`${improperTargets} touch targets are too small`);
  }
  
  // Check internal links
  const internalLinks = document.querySelectorAll('a[href^="/"]');
  if (internalLinks.length < 5) {
    issues.push('Low internal link count');
  }
  
  if (issues.length === 0) {
    console.log('✅ SEO health check passed!');
    return true;
  } else {
    console.warn('⚠️ SEO issues detected:', issues);
    return false;
  }
};

export default {
  performSEOAudit,
  generateSEOReport,
  initSEORealTimeMonitoring,
  quickSEOHealthCheck
};