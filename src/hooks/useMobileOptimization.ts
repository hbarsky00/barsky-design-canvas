import { useEffect } from 'react';

/**
 * Hook to implement mobile-specific performance optimizations
 */
export const useMobileOptimization = () => {
  useEffect(() => {
    // Add touch-friendly sizing for interactive elements
    const addTouchOptimization = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* Touch-friendly interactive elements */
        @media (hover: none) and (pointer: coarse) {
          button, [role="button"], .clickable {
            min-height: 44px;
            min-width: 44px;
            padding: 12px 16px;
          }
          
          /* Optimize form inputs for mobile */
          input, textarea, select {
            min-height: 44px;
            font-size: 16px; /* Prevent zoom on iOS */
          }
          
          /* Improve navigation for touch */
          nav a, .nav-link {
            padding: 12px 16px;
            min-height: 44px;
            display: flex;
            align-items: center;
          }
        }
        
        /* Mobile-specific image optimizations */
        @media (max-width: 768px) {
          img {
            height: auto;
            max-width: 100%;
          }
          
          /* Reduce motion for better performance */
          .reduce-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `;
      document.head.appendChild(style);
    };

    // Reduce JavaScript execution on mobile
    const optimizeJavaScript = () => {
      // Defer non-critical animations on mobile
      if (window.innerWidth <= 768) {
        // Disable expensive animations on mobile
        document.documentElement.classList.add('reduce-motion');
        
        // Use passive listeners for better scroll performance
        const passiveSupported = (() => {
          let supported = false;
          try {
            const options = {
              get passive() {
                supported = true;
                return false;
              }
            } as AddEventListenerOptions;
            window.addEventListener('test' as any, () => {}, options);
            window.removeEventListener('test' as any, () => {}, options);
          } catch (err) {
            supported = false;
          }
          return supported;
        })();

        if (passiveSupported) {
          // Add passive listeners for scroll events
          const scrollOptions = { passive: true };
          document.addEventListener('scroll', () => {}, scrollOptions);
          document.addEventListener('touchstart', () => {}, scrollOptions);
          document.addEventListener('touchmove', () => {}, scrollOptions);
        }
      }
    };

    // Optimize images for mobile screens
    const optimizeMobileImages = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        // Add responsive image loading
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          // Add loading="lazy" if not already present
          if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
          }
          
          // Add mobile-optimized sizes if not present
          if (!img.hasAttribute('sizes') && img.hasAttribute('srcset')) {
            img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
          }
        });
      }
    };

    // Apply optimizations
    addTouchOptimization();
    optimizeJavaScript();
    optimizeMobileImages();

    // Re-optimize images when new ones are added
    const observer = new MutationObserver(() => {
      optimizeMobileImages();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};