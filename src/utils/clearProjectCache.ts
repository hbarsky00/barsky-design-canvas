
export const clearProjectCache = (projectId: string) => {
  // Clear all cached data for this project
  const keysToRemove = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (
      key.includes(`project_${projectId}`) ||
      key.includes(`imageOverrides_${projectId}`) ||
      key.includes(`textOverrides_${projectId}`) ||
      key.includes(`contentBlockOverrides_${projectId}`)
    )) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
  });
  
  console.log(`Cleared ${keysToRemove.length} cached items for project ${projectId}`);
  
  // Clear browser image cache for all images
  clearImageCache();
  
  // Dispatch event to notify components
  window.dispatchEvent(new CustomEvent('projectCacheCleared', {
    detail: { projectId }
  }));
};

// Clear browser image cache by forcing reload of all images
const clearImageCache = () => {
  console.log('🧹 Clearing browser image cache');
  
  // Force reload all images on the page
  document.querySelectorAll('img').forEach((img) => {
    const originalSrc = img.src;
    if (originalSrc && !originalSrc.includes('?v=')) {
      img.src = '';
      setTimeout(() => {
        img.src = originalSrc + '?v=' + Date.now();
      }, 50);
    }
  });
  
  // Clear any cached background images
  document.querySelectorAll('[style*="background-image"]').forEach((element) => {
    const style = (element as HTMLElement).style;
    if (style.backgroundImage) {
      const match = style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (match && match[1] && !match[1].includes('?v=')) {
        const newUrl = match[1] + '?v=' + Date.now();
        style.backgroundImage = style.backgroundImage.replace(match[1], newUrl);
      }
    }
  });
};

// Auto-clear cache on load for all projects
const pathname = window.location.pathname;
const projectMatch = pathname.match(/\/project\/([^/?]+)/);
if (projectMatch) {
  const projectId = projectMatch[1];
  clearProjectCache(projectId);
  console.log(`Auto-cleared cache for project: ${projectId}`);
}
