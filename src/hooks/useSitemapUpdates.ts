
import { useEffect } from 'react';
import { submitSitemapToAllPlatforms } from '@/utils/sitemapSubmission';

/**
 * Hook to automatically notify search engines and AI platforms of content updates
 */
export const useSitemapUpdates = () => {
  useEffect(() => {
    // Check if we should submit sitemap (once per session)
    const shouldSubmit = () => {
      const lastSubmission = localStorage.getItem('last_sitemap_submission');
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      
      if (!lastSubmission || parseInt(lastSubmission) < oneDayAgo) {
        return true;
      }
      return false;
    };

    // Submit sitemap if needed
    if (shouldSubmit()) {
      setTimeout(async () => {
        try {
          await submitSitemapToAllPlatforms();
          localStorage.setItem('last_sitemap_submission', Date.now().toString());
          console.log('Sitemap submitted to search engines and AI platforms');
        } catch (error) {
          console.error('Failed to submit sitemap:', error);
        }
      }, 5000); // Wait 5 seconds after page load
    }

    // Track content update events
    const trackContentUpdate = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'content_update_detected', {
          page_path: window.location.pathname,
          timestamp: new Date().toISOString(),
          ai_training_relevant: true
        });
      }
    };

    // Listen for potential content updates
    const observer = new MutationObserver((mutations) => {
      const hasContentChanges = mutations.some(mutation => 
        mutation.type === 'childList' && 
        mutation.addedNodes.length > 0
      );
      
      if (hasContentChanges) {
        trackContentUpdate();
      }
    });

    // Observe content changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

/**
 * Manual sitemap submission function for content updates
 */
export const triggerSitemapUpdate = async (): Promise<boolean> => {
  try {
    await submitSitemapToAllPlatforms();
    localStorage.setItem('last_sitemap_submission', Date.now().toString());
    return true;
  } catch (error) {
    console.error('Manual sitemap submission failed:', error);
    return false;
  }
};
