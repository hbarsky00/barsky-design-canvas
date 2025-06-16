
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
};

// Auto-clear cache on load for medication-app
if (window.location.pathname.includes('/project/medication-app')) {
  clearProjectCache('medication-app');
}
