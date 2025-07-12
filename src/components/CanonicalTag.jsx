import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function CanonicalTag() {
  const location = useLocation();
  
  useEffect(() => {
    // Remove any existing canonical tags
    const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
    existingCanonicals.forEach(tag => tag.remove());
    
    // Build correct URL for current page
    let canonicalUrl = 'https://barskydesign.pro';
    
    // Add current path, but clean it up
    if (location.pathname && location.pathname !== '/') {
      canonicalUrl += location.pathname;
    }
    
    // Remove trailing slashes except for homepage
    if (canonicalUrl !== 'https://barskydesign.pro' && canonicalUrl.endsWith('/')) {
      canonicalUrl = canonicalUrl.slice(0, -1);
    }
    
    // Create and add canonical tag
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = canonicalUrl;
    document.head.appendChild(canonical);
    
    console.log('Canonical set to:', canonicalUrl); // For debugging
    
    // Cleanup function
    return () => {
      const toRemove = document.querySelector('link[rel="canonical"]');
      if (toRemove) toRemove.remove();
    };
  }, [location.pathname]);
  
  return null;
}