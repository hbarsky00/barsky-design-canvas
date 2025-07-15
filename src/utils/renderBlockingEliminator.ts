/**
 * Render Blocking Resource Elimination
 * Optimizes JavaScript and CSS loading to improve page rendering
 */

export interface RenderBlockingConfig {
  deferJavaScript: boolean;
  inlineCriticalCSS: boolean;
  preloadKeyResources: boolean;
  optimizeFontLoading: boolean;
}

export const renderBlockingConfig: RenderBlockingConfig = {
  deferJavaScript: true,
  inlineCriticalCSS: true,
  preloadKeyResources: true,
  optimizeFontLoading: true
};

/**
 * Defer non-critical JavaScript
 */
export const deferNonCriticalJS = (): void => {
  const scripts = document.querySelectorAll('script[src]:not([async]):not([defer]):not([data-critical])');
  
  scripts.forEach((script) => {
    const scriptElement = script as HTMLScriptElement;
    
    // Skip if already processed
    if (scriptElement.hasAttribute('data-processed')) return;
    
    // Skip critical scripts
    if (scriptElement.src.includes('critical') || 
        scriptElement.src.includes('polyfill') ||
        scriptElement.src.includes('analytics')) {
      return;
    }
    
    // Add defer attribute
    scriptElement.defer = true;
    scriptElement.setAttribute('data-processed', 'true');
  });
};

/**
 * Optimize font loading with proper display strategies
 */
export const optimizeFontLoading = (): void => {
  // Add font-display: swap to existing font faces
  const existingFonts = document.querySelectorAll('link[href*="fonts"]');
  existingFonts.forEach((link) => {
    const linkElement = link as HTMLLinkElement;
    linkElement.setAttribute('font-display', 'swap');
  });
  
  // Create optimized font loading strategy
  const fontConfig = {
    'Inter': {
      variants: ['300', '400', '500', '600', '700', '800'],
      display: 'swap',
      preload: true
    },
    'Dancing Script': {
      variants: ['400', '500', '600', '700'],
      display: 'swap',
      preload: false
    }
  };
  
  Object.entries(fontConfig).forEach(([family, config]) => {
    const existingLink = document.querySelector(`link[href*="${family.replace(' ', '+')}"]`);
    if (existingLink) {
      const linkElement = existingLink as HTMLLinkElement;
      
      // Update href to include font-display
      let href = linkElement.href;
      if (!href.includes('display=')) {
        href += href.includes('?') ? '&' : '?';
        href += `display=${config.display}`;
        linkElement.href = href;
      }
      
      // Preload critical font variants
      if (config.preload) {
        config.variants.slice(0, 2).forEach((weight) => {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'font';
          preloadLink.type = 'font/woff2';
          preloadLink.crossOrigin = 'anonymous';
          preloadLink.href = `https://fonts.gstatic.com/s/${family.toLowerCase().replace(' ', '')}/v12/${family.replace(' ', '')}-${weight}.woff2`;
          document.head.appendChild(preloadLink);
        });
      }
    }
  });
};

/**
 * Preload key resources for better performance
 */
export const preloadKeyResources = (): void => {
  const keyResources = [
    {
      href: '/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png',
      as: 'image',
      type: 'image/png'
    },
    {
      href: '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png',
      as: 'image',
      type: 'image/png'
    },
    {
      href: '/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png',
      as: 'image',
      type: 'image/png'
    },
    {
      href: '/lovable-uploads/340a0484-22a4-4c70-bf1e-4ec47c317bfb.png',
      as: 'image',
      type: 'image/png'
    }
  ];
  
  keyResources.forEach((resource) => {
    const existingPreload = document.querySelector(`link[rel="preload"][href="${resource.href}"]`);
    if (!existingPreload) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = resource.href;
      preloadLink.as = resource.as;
      if (resource.type) {
        preloadLink.type = resource.type;
      }
      document.head.appendChild(preloadLink);
    }
  });
};

/**
 * Implement resource hints for better loading
 */
export const addResourceHints = (): void => {
  const hints = [
    {
      rel: 'dns-prefetch',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'dns-prefetch',
      href: 'https://fonts.gstatic.com'
    },
    {
      rel: 'dns-prefetch',
      href: 'https://www.googletagmanager.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: 'anonymous'
    }
  ];
  
  hints.forEach((hint) => {
    const existingHint = document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`);
    if (!existingHint) {
      const linkElement = document.createElement('link');
      linkElement.rel = hint.rel;
      linkElement.href = hint.href;
      if ((hint as any).crossorigin) {
        linkElement.crossOrigin = (hint as any).crossorigin;
      }
      document.head.appendChild(linkElement);
    }
  });
};

/**
 * Optimize third-party script loading
 */
export const optimizeThirdPartyScripts = (): void => {
  // Google Analytics optimization
  const gtag = document.querySelector('script[src*="gtag"]');
  if (gtag) {
    const gtagScript = gtag as HTMLScriptElement;
    gtagScript.async = true;
    gtagScript.defer = true;
  }
  
  // Add loading="lazy" to iframes
  const iframes = document.querySelectorAll('iframe:not([loading])');
  iframes.forEach((iframe) => {
    const iframeElement = iframe as HTMLIFrameElement;
    iframeElement.loading = 'lazy';
  });
  
  // Optimize social media embeds
  const socialEmbeds = document.querySelectorAll('iframe[src*="twitter.com"], iframe[src*="facebook.com"], iframe[src*="instagram.com"]');
  socialEmbeds.forEach((embed) => {
    const embedElement = embed as HTMLIFrameElement;
    embedElement.loading = 'lazy';
    embedElement.setAttribute('importance', 'low');
  });
};

/**
 * Implement critical resource prioritization
 */
export const prioritizeResources = (): void => {
  // High priority resources
  const highPriorityImages = document.querySelectorAll('img[data-priority="high"], img[priority="high"]');
  highPriorityImages.forEach((img) => {
    const imgElement = img as HTMLImageElement;
    imgElement.loading = 'eager';
    imgElement.fetchPriority = 'high';
  });
  
  // Low priority resources
  const lowPriorityImages = document.querySelectorAll('img[data-priority="low"], img[priority="low"]');
  lowPriorityImages.forEach((img) => {
    const imgElement = img as HTMLImageElement;
    imgElement.loading = 'lazy';
    imgElement.fetchPriority = 'low';
  });
  
  // Prioritize above-the-fold content
  const aboveFoldElements = document.querySelectorAll('[data-above-fold]');
  aboveFoldElements.forEach((element) => {
    const imgs = element.querySelectorAll('img');
    imgs.forEach((img) => {
      img.loading = 'eager';
      img.fetchPriority = 'high';
    });
  });
};

/**
 * Monitor and eliminate render-blocking resources
 */
export const monitorRenderBlocking = (): void => {
  const observer = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry) => {
      const resource = entry as PerformanceResourceTiming;
      
      // Check for potentially render-blocking resources
      if (resource.duration > 100) {
        console.warn(`Slow resource detected: ${resource.name} (${resource.duration}ms)`);
        
        // Suggest optimizations
        if (resource.name.includes('.css')) {
          console.warn('Consider inlining critical CSS and deferring non-critical styles');
        }
        
        if (resource.name.includes('.js')) {
          console.warn('Consider adding defer or async attributes to non-critical scripts');
        }
      }
    });
  });
  
  observer.observe({ entryTypes: ['resource'] });
};

/**
 * Initialize render blocking elimination
 */
export const initRenderBlockingElimination = (): void => {
  if (renderBlockingConfig.deferJavaScript) {
    deferNonCriticalJS();
  }
  
  if (renderBlockingConfig.optimizeFontLoading) {
    optimizeFontLoading();
  }
  
  if (renderBlockingConfig.preloadKeyResources) {
    preloadKeyResources();
    addResourceHints();
  }
  
  optimizeThirdPartyScripts();
  prioritizeResources();
  monitorRenderBlocking();
  
  // Re-run optimizations when DOM changes
  const observer = new MutationObserver(() => {
    setTimeout(() => {
      optimizeThirdPartyScripts();
      prioritizeResources();
    }, 100);
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  
  console.log('🚀 Render blocking elimination initialized');
};