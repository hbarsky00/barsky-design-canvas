import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Performance optimization component for critical resource loading
 */
export const PerformanceSEO: React.FC = () => {
  return (
    <Helmet>
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="//unpkg.com" />
      
      {/* Preconnect to critical domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload critical resources */}
      <link 
        rel="preload" 
        href="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" 
        as="image" 
        type="image/png"
      />
      
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        as="style"
      />
      
      <noscript>
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </noscript>
      
      {/* Critical CSS inline or preload */}
      <style>
        {`
          /* Critical above-the-fold styles */
          body { 
            font-family: system-ui, -apple-system, sans-serif; 
            margin: 0; 
            padding: 0;
            line-height: 1.6;
          }
          
          /* Loading state for hero section */
          .hero-loading {
            min-height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-variant)) 100%);
          }
          
          /* Prevent layout shift for images */
          img {
            max-width: 100%;
            height: auto;
          }
          
          /* Critical navigation styles */
          header {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            backdrop-filter: blur(10px);
          }
          
          /* Skip to main content for accessibility */
          .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: hsl(var(--primary));
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 1001;
          }
          
          .skip-link:focus {
            top: 6px;
          }
        `}
      </style>
      
      
      {/* Resource hints for anticipated navigation */}
      <link rel="prefetch" href="/projects" />
      <link rel="prefetch" href="/about" />
      <link rel="prefetch" href="/contact" />
      
      {/* Optimize loading for key images */}
      <link 
        rel="prefetch" 
        href="/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png"
        as="image"
      />
      
      {/* Preload key scripts */}
      <script>
        {`
          // Critical performance optimizations
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js');
            });
          }
          
          // Optimize image loading
          if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            document.documentElement.classList.add('native-lazy-loading');
          }
          
          // Preload next page on link hover
          let prefetchTimer;
          document.addEventListener('mouseover', function(e) {
            if (e.target.tagName === 'A' && e.target.hostname === location.hostname) {
              clearTimeout(prefetchTimer);
              prefetchTimer = setTimeout(() => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = e.target.href;
                document.head.appendChild(link);
              }, 100);
            }
          });
        `}
      </script>
    </Helmet>
  );
};