
export const clearProjectCache = (projectId: string) => {
  if (!projectId) {
    console.warn('⚠️ No projectId provided for cache clearing');
    return;
  }

  console.log('🧹 Clearing cache for project:', projectId);
  
  // Clear all cached data for THIS SPECIFIC PROJECT ONLY
  const keysToRemove = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (
      key.includes(`project_${projectId}`) ||
      key.includes(`imageOverrides_${projectId}`) ||
      key.includes(`textOverrides_${projectId}`) ||
      key.includes(`contentBlockOverrides_${projectId}`) ||
      key.includes(`image_captions_${projectId}`) ||
      key.includes(`published_${projectId}`)
    )) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log('🗑️ Removed cache key:', key);
  });
  
  console.log(`✅ Cleared ${keysToRemove.length} cached items for project ${projectId}`);
  
  // Clear browser image cache for project-specific images only
  clearImageCacheForProject(projectId);
  
  // Dispatch event with project scope
  window.dispatchEvent(new CustomEvent('projectCacheCleared', {
    detail: { projectId }
  }));
};

// Clear browser image cache for project-specific images only
const clearImageCacheForProject = (projectId: string) => {
  console.log('🧹 Clearing browser image cache for project:', projectId);
  
  // Force reload images that belong to this project
  document.querySelectorAll('img').forEach((img) => {
    const originalSrc = img.src;
    // Only clear cache for images that are likely part of this project
    if (originalSrc && 
        (originalSrc.includes('lovable-uploads') || 
         originalSrc.includes(projectId) ||
         img.closest(`[data-project-id="${projectId}"]`))) {
      if (!originalSrc.includes('?v=')) {
        img.src = '';
        setTimeout(() => {
          img.src = originalSrc + '?v=' + Date.now();
        }, 50);
      }
    }
  });
  
  // Clear background images for project-specific elements
  document.querySelectorAll(`[data-project-id="${projectId}"] [style*="background-image"]`).forEach((element) => {
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

// Enhanced auto-clear with project isolation
const pathname = window.location.pathname;
const projectMatch = pathname.match(/\/project\/([^/?]+)/);
if (projectMatch) {
  const currentProjectId = projectMatch[1];
  console.log(`🔍 Auto-clearing cache for current project: ${currentProjectId}`);
  clearProjectCache(currentProjectId);
}
