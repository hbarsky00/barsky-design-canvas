
// Clear any cached project data and force reload
console.log('🧹 Clearing all project caches on startup');

// Clear any localStorage cache entries
const keysToRemove = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key && (
    key.includes('imageOverrides_') || 
    key.includes('image_replacements_') ||
    key.includes('published_') ||
    key.includes('project_')
  )) {
    keysToRemove.push(key);
  }
}

keysToRemove.forEach(key => {
  localStorage.removeItem(key);
  console.log('🗑️ Removed cache key:', key);
});

// Force clear any cached data
if (typeof window !== 'undefined') {
  window.dispatchEvent(new CustomEvent('clearImageCaches'));
}
