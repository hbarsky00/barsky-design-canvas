
/**
 * Utility to prevent image cross-contamination between different contexts
 */

export const getContextualImageKey = (originalSrc: string, context: string): string => {
  return `${context}_${originalSrc}`;
};

export const clearConflictingImageReplacements = (projectId: string) => {
  try {
    // Clear localStorage image updates that might be causing conflicts
    const imageUpdatesKey = 'imageUpdates';
    const updates = JSON.parse(localStorage.getItem(imageUpdatesKey) || '{}');
    
    if (updates[projectId]) {
      console.log('🧹 Clearing conflicting image replacements for project:', projectId);
      
      // Remove any replacements that might be causing cross-contamination
      const conflictingKeys = Object.keys(updates[projectId]).filter(key => 
        key.includes('featureimage1.png') || 
        key.includes('mobilepromo.png') ||
        key.includes('splittime')
      );
      
      conflictingKeys.forEach(key => {
        delete updates[projectId][key];
        console.log('🗑️ Removed conflicting image replacement:', key);
      });
      
      localStorage.setItem(imageUpdatesKey, JSON.stringify(updates));
    }

    // Clear image captions that might be conflicting
    const imageCaptionStorageKey = `image_captions_${projectId}`;
    const captions = JSON.parse(localStorage.getItem(imageCaptionStorageKey) || '{}');
    
    const conflictingCaptionKeys = Object.keys(captions).filter(key => 
      key.includes('featureimage1.png') || 
      key.includes('mobilepromo.png') ||
      key.includes('splittime')
    );
    
    conflictingCaptionKeys.forEach(key => {
      delete captions[key];
      console.log('🗑️ Removed conflicting image caption:', key);
    });
    
    localStorage.setItem(imageCaptionStorageKey, JSON.stringify(captions));
    
    console.log('✅ Image context separation cleanup completed');
    
  } catch (error) {
    console.error('❌ Error clearing conflicting image replacements:', error);
  }
};

export const initializeImageContextSeparation = (projectId: string) => {
  // Clear any existing conflicts when initializing
  clearConflictingImageReplacements(projectId);
  
  // Dispatch event to refresh components
  window.dispatchEvent(new CustomEvent('imageContextCleared', {
    detail: { projectId }
  }));
};
