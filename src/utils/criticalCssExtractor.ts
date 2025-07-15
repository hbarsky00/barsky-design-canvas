/**
 * Critical CSS Extraction and Inline Optimization
 * Eliminates render-blocking resources by inlining critical CSS
 */

export interface CriticalCSSConfig {
  inlineCriticalCSS: boolean;
  criticalViewportHeight: number;
  deferNonCriticalCSS: boolean;
}

export const criticalCSSConfig: CriticalCSSConfig = {
  inlineCriticalCSS: true,
  criticalViewportHeight: 800,
  deferNonCriticalCSS: true
};

/**
 * Extract and inline critical CSS for above-the-fold content
 */
export const extractCriticalCSS = (): string => {
  const criticalCSS = `
    /* Critical CSS for above-the-fold content */
    body {
      font-family: 'Inter-fallback', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: hsl(var(--foreground));
      background: hsl(var(--background));
      margin: 0;
      padding: 0;
    }
    
    /* Layout essentials */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    /* Navigation critical styles */
    nav {
      position: sticky;
      top: 0;
      z-index: 50;
      background: hsl(var(--background) / 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid hsl(var(--border));
    }
    
    /* Hero section critical styles */
    .hero-section {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem 0;
    }
    
    /* Button critical styles */
    .btn-primary {
      background: hsl(var(--primary));
      color: hsl(var(--primary-foreground));
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .btn-primary:hover {
      background: hsl(var(--primary) / 0.9);
    }
    
    /* Image optimization */
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    
    /* Loading states */
    .loading-skeleton {
      background: linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.8) 50%, hsl(var(--muted)) 100%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    /* Accessibility */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    /* Focus visible */
    .focus-visible {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
    }
  `;
  
  return criticalCSS.replace(/\s+/g, ' ').trim();
};

/**
 * Defer non-critical CSS loading
 */
export const deferNonCriticalCSS = (): void => {
  const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
  
  nonCriticalCSS.forEach((link) => {
    const linkElement = link as HTMLLinkElement;
    linkElement.media = 'print';
    linkElement.onload = () => {
      linkElement.media = 'all';
      linkElement.onload = null;
    };
  });
};

/**
 * Inline critical CSS into the document head
 */
export const inlineCriticalCSS = (): void => {
  if (!criticalCSSConfig.inlineCriticalCSS) return;
  
  const existingCriticalCSS = document.getElementById('critical-css');
  if (existingCriticalCSS) return;
  
  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = extractCriticalCSS();
  document.head.insertBefore(style, document.head.firstChild);
  
  // Defer non-critical CSS
  setTimeout(() => {
    deferNonCriticalCSS();
  }, 100);
};

/**
 * Initialize critical CSS optimization
 */
export const initCriticalCSS = (): void => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inlineCriticalCSS);
  } else {
    inlineCriticalCSS();
  }
};