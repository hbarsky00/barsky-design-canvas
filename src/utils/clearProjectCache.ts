// Force aggressive cache clearing to prevent React module conflicts
export const clearProjectCache = (projectId: string) => {
  if (!projectId) {
    console.warn('⚠️ No projectId provided for cache clearing');
    return;
  }

  console.log('🧹 AGGRESSIVE cache clearing for project:', projectId);
  
  // Force clear all module caches
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        console.log('🗑️ Clearing cache:', name);
        caches.delete(name);
      });
    });
  }
  
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
    // Clean up HTML content before removing
    try {
      const content = localStorage.getItem(key);
      if (content && content.includes('<h3><br></h3>')) {
        const cleanedContent = content.replace(/<h3><br><\/h3>/g, '');
        localStorage.setItem(key, cleanedContent);
        console.log('🧹 Cleaned HTML from cache key:', key);
      } else {
        localStorage.removeItem(key);
        console.log('🗑️ Removed cache key:', key);
      }
    } catch (error) {
      localStorage.removeItem(key);
      console.log('🗑️ Removed cache key (with error):', key);
    }
  });
  
  console.log(`✅ Cleared ${keysToRemove.length} cached items for project ${projectId}`);
  
  // Clear browser image cache for project-specific images only
  clearImageCacheForProject(projectId);
  
  // Force reload the entire page to clear React module cache
  setTimeout(() => {
    console.log('🔄 Force reloading page to clear React module cache');
    window.location.reload();
  }, 1000);
  
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

// Note: Removed problematic auto-reload logic that was causing infinite refresh loop