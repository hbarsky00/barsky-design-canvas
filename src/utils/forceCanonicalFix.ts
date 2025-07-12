// Emergency canonical URL fix - forces correct canonical URLs
export const forceCanonicalFix = () => {
  if (typeof window === 'undefined') return;
  
  const observer = new MutationObserver(() => {
    const canonicals = document.querySelectorAll('link[rel="canonical"]');
    const currentPath = window.location.pathname;
    const correctCanonical = `https://barskydesign.pro${currentPath}`;
    
    canonicals.forEach((canonical) => {
      const href = canonical.getAttribute('href');
      if (href && href.includes('index.html')) {
        console.warn('🚨 FIXING CANONICAL:', href, '→', correctCanonical);
        canonical.setAttribute('href', correctCanonical);
      }
    });
  });
  
  // Watch for DOM changes
  observer.observe(document.head, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['href']
  });
  
  // Initial fix
  setTimeout(() => {
    const canonicals = document.querySelectorAll('link[rel="canonical"]');
    const currentPath = window.location.pathname;
    const correctCanonical = `https://barskydesign.pro${currentPath}`;
    
    canonicals.forEach((canonical) => {
      const href = canonical.getAttribute('href');
      if (href && href.includes('index.html')) {
        console.warn('🚨 INITIAL FIX CANONICAL:', href, '→', correctCanonical);
        canonical.setAttribute('href', correctCanonical);
      }
    });
  }, 100);
  
  return observer;
};