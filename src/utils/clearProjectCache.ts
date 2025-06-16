
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
  
  // Dispatch event to notify components
  window.dispatchEvent(new CustomEvent('projectCacheCleared', {
    detail: { projectId }
  }));
};

// Auto-clear cache on load for all projects
const pathname = window.location.pathname;
const projectMatch = pathname.match(/\/project\/([^/?]+)/);
if (projectMatch) {
  const projectId = projectMatch[1];
  clearProjectCache(projectId);
  console.log(`Auto-cleared cache for project: ${projectId}`);
}
