// Emergency canonical URL fix - forces correct canonical URLs
export const forceCanonicalFix = () => {
  if (typeof window === 'undefined') return;
  
  const fixCanonicalUrl = () => {
    const canonicals = document.querySelectorAll('link[rel="canonical"]');
    let currentPath = window.location.pathname;
    
    // Strip index.html if present
    if (currentPath.endsWith('/index.html')) {
      currentPath = currentPath.replace('/index.html', '') || '/';
    }
    
    const correctCanonical = `https://barskydesign.pro${currentPath}`;
    
    canonicals.forEach((canonical) => {
      const href = canonical.getAttribute('href');
      if (href && (href.includes('index.html') || href !== correctCanonical)) {
        console.warn('🚨 FIXING CANONICAL:', href, '→', correctCanonical);
        canonical.setAttribute('href', correctCanonical);
      }
    });
  };
  
  const observer = new MutationObserver(fixCanonicalUrl);
  
  // Watch for DOM changes
  observer.observe(document.head, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['href']
  });
  
  // Initial fix
  setTimeout(fixCanonicalUrl, 100);
  
  return observer;
};