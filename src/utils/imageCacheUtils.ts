
export const clearAllImageCaches = () => {
  console.log('🧹 Clearing all image caches and replacements');
  
  // Clear localStorage image overrides
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (
      key.includes('imageOverrides_') || 
      key.includes('image_replacements_') ||
      key.includes('published_')
    )) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log('🗑️ Removed cache key:', key);
  });
  
  // Force reload all images on the page
  document.querySelectorAll('img').forEach((img) => {
    const originalSrc = img.src;
    img.src = '';
    setTimeout(() => {
      img.src = originalSrc + '?reload=' + Date.now();
    }, 10);
  });
  
  // Dispatch event to refresh all components
  window.dispatchEvent(new CustomEvent('clearImageCaches', {
    detail: { timestamp: Date.now() }
  }));
};
