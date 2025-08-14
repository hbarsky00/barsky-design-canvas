
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applySEOForPage, updateHeadTags } from '@/utils/seoAutoDetector';

/**
 * Global SEO hook that automatically applies page-specific SEO tags
 * Runs on route changes and page renders
 */
export const useGlobalSeo = () => {
  const location = useLocation();

  useEffect(() => {
    // Small delay to ensure DOM is updated after route change
    const timeoutId = setTimeout(() => {
      try {
        console.log('🔍 SEO: Auto-detecting page metadata for:', location.pathname);
        
        const seoData = applySEOForPage();
        updateHeadTags(seoData);
        
        console.log('✅ SEO: Applied metadata:', {
          title: seoData.title,
          description: seoData.description.substring(0, 50) + '...',
          image: seoData.image,
          url: seoData.url,
          type: seoData.type
        });
        
        // Track SEO updates for analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'seo_auto_applied', {
            page_path: location.pathname,
            page_title: seoData.title,
            seo_type: seoData.type,
            has_custom_image: !seoData.image.includes('e8d40a32-b582'),
            timestamp: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('❌ SEO: Auto-detection failed:', error);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.search]);

  return null;
};
