
import { useState, useCallback } from 'react';

export const useProjectDataUpdater = () => {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const updateImageInProjectData = useCallback((projectId: string, oldImagePath: string, newImagePath: string) => {
    console.log(`Project ${projectId}: Replacing ${oldImagePath} with ${newImagePath}`);
    
    // For now, we'll trigger a re-render and log the change
    // In a real implementation, this would update the project data source
    setUpdateTrigger(prev => prev + 1);
    
    // Store the update in localStorage for persistence across sessions
    try {
      const updates = JSON.parse(localStorage.getItem('imageUpdates') || '{}');
      if (!updates[projectId]) {
        updates[projectId] = {};
      }
      updates[projectId][oldImagePath] = newImagePath;
      localStorage.setItem('imageUpdates', JSON.stringify(updates));
      console.log('Image update saved to localStorage:', updates);
    } catch (error) {
      console.error('Failed to save image update:', error);
    }
    
    return true;
  }, []);

  const getUpdatedImagePath = useCallback((projectId: string, originalPath: string) => {
    try {
      const updates = JSON.parse(localStorage.getItem('imageUpdates') || '{}');
      return updates[projectId]?.[originalPath] || originalPath;
    } catch (error) {
      console.error('Failed to get updated image path:', error);
      return originalPath;
    }
  }, []);

  return {
    updateImageInProjectData,
    getUpdatedImagePath,
    updateTrigger
  };
};
