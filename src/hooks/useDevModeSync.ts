
import { useState, useCallback, useMemo } from 'react';
import { useProjectPersistence } from './useProjectPersistence';
import { toast } from 'sonner';

export const useDevModeSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { getProjectData, clearProjectData } = useProjectPersistence(projectId);

  const projectData = useMemo(() => {
    if (!projectId) return { textContent: {}, imageReplacements: {}, contentBlocks: {} };
    return getProjectData();
  }, [getProjectData, projectId]);

  const hasChangesToSync = useMemo(() => {
    if (!projectId) return false;
    
    console.log('Checking for changes to sync:', projectData);
    
    // Check for text content changes
    const textKeys = Object.keys(projectData.textContent || {});
    const hasTextChanges = textKeys.length > 0 && textKeys.some(key => {
      const value = projectData.textContent[key];
      return value && value.trim() !== '';
    });
    
    // Check for image replacement changes
    const imageKeys = Object.keys(projectData.imageReplacements || {});
    const hasImageChanges = imageKeys.length > 0 && imageKeys.some(key => {
      const value = projectData.imageReplacements[key];
      return value && value !== key; // Changed if replacement is different from original
    });
    
    // Check for content block changes
    const blockKeys = Object.keys(projectData.contentBlocks || {});
    const hasContentBlockChanges = blockKeys.length > 0 && blockKeys.some(key => {
      const blocks = projectData.contentBlocks[key];
      return blocks && Array.isArray(blocks) && blocks.length > 0;
    });
    
    // Also check for published overrides that might exist
    const publishedImages = localStorage.getItem(`imageOverrides_${projectId}`);
    const publishedText = localStorage.getItem(`textOverrides_${projectId}`);
    const publishedBlocks = localStorage.getItem(`contentBlockOverrides_${projectId}`);
    
    const hasPublishedChanges = publishedImages || publishedText || publishedBlocks;
    
    const totalChanges = hasTextChanges || hasImageChanges || hasContentBlockChanges || hasPublishedChanges;
    
    console.log('Changes detected:', {
      textChanges: hasTextChanges,
      imageChanges: hasImageChanges,
      contentBlockChanges: hasContentBlockChanges,
      publishedChanges: hasPublishedChanges,
      totalChanges,
      textContentKeys: textKeys,
      imageReplacementKeys: imageKeys,
      contentBlockKeys: blockKeys,
      projectData
    });
    
    return totalChanges;
  }, [projectData, projectId]);

  const safeSetItem = useCallback((key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
      console.log(`Successfully saved ${key} to localStorage`);
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn(`Storage quota exceeded for ${key}, attempting cleanup...`);
        
        // Try to free up space by removing old data
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const storageKey = localStorage.key(i);
          if (storageKey && (
            storageKey.startsWith('project_') || 
            storageKey.startsWith('imageOverrides_') ||
            storageKey.startsWith('textOverrides_') ||
            storageKey.startsWith('contentBlockOverrides_')
          ) && storageKey !== key) {
            keysToRemove.push(storageKey);
          }
        }
        
        // Remove old project data to free up space
        keysToRemove.forEach(keyToRemove => {
          try {
            localStorage.removeItem(keyToRemove);
          } catch (e) {
            console.warn('Failed to remove key:', keyToRemove);
          }
        });
        
        // Try again after cleanup
        try {
          localStorage.setItem(key, value);
          console.log(`Successfully saved ${key} to localStorage after cleanup`);
          return true;
        } catch (retryError) {
          console.error('Still failed after cleanup:', retryError);
          return false;
        }
      }
      console.error('Storage error:', error);
      return false;
    }
  }, []);

  const writeChangesToFiles = useCallback(async () => {
    console.log('Writing changes to project files:', projectData);
    
    let successCount = 0;
    let totalAttempts = 0;
    
    // For image replacements, store them persistently
    if (Object.keys(projectData.imageReplacements || {}).length > 0) {
      totalAttempts++;
      const imageOverrides = JSON.stringify(projectData.imageReplacements, null, 2);
      console.log('Image overrides to apply:', imageOverrides);
      
      if (safeSetItem(`imageOverrides_${projectId}`, imageOverrides)) {
        successCount++;
        console.log('Successfully saved image overrides');
      } else {
        throw new Error('Failed to save image changes due to storage limitations');
      }
    }

    // For text content, store them persistently
    if (Object.keys(projectData.textContent || {}).length > 0) {
      totalAttempts++;
      const textOverrides = JSON.stringify(projectData.textContent, null, 2);
      console.log('Text overrides to apply:', textOverrides);
      
      if (safeSetItem(`textOverrides_${projectId}`, textOverrides)) {
        successCount++;
        console.log('Successfully saved text overrides');
      } else {
        throw new Error('Failed to save text changes due to storage limitations');
      }
    }

    // For content blocks, store them persistently
    if (Object.keys(projectData.contentBlocks || {}).length > 0) {
      totalAttempts++;
      const blockOverrides = JSON.stringify(projectData.contentBlocks, null, 2);
      console.log('Content block overrides to apply:', blockOverrides);
      
      if (safeSetItem(`contentBlockOverrides_${projectId}`, blockOverrides)) {
        successCount++;
        console.log('Successfully saved content block overrides');
      } else {
        throw new Error('Failed to save content block changes due to storage limitations');
      }
    }

    if (successCount === totalAttempts && totalAttempts > 0) {
      // Clear the temporary dev mode data since it's now "published"
      clearProjectData();
      
      // Dispatch events to notify all components immediately
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { projectId, published: true }
      }));
      
      window.dispatchEvent(new StorageEvent('storage', {
        key: `imageOverrides_${projectId}`,
        newValue: JSON.stringify(projectData.imageReplacements || {}),
        url: window.location.href
      }));
      
      return true;
    } else if (totalAttempts === 0) {
      throw new Error('No changes found to publish');
    } else {
      throw new Error(`Only ${successCount} out of ${totalAttempts} changes could be saved`);
    }
  }, [projectData, projectId, clearProjectData, safeSetItem]);

  const syncChangesToFiles = useCallback(async () => {
    setIsSyncing(true);
    
    try {
      if (!hasChangesToSync) {
        toast.info("No changes to sync", {
          description: "No dev mode changes found to publish."
        });
        setIsSyncing(false);
        return;
      }

      console.log('Publishing changes to files:', projectData);

      // Write changes to files
      await writeChangesToFiles();
      
      toast.success("Changes published successfully!", {
        description: "Your changes have been applied and are now visible.",
        duration: 3000,
      });

      // Force immediate refresh of all components
      setTimeout(() => {
        console.log('Forcing page refresh to ensure changes are visible');
        window.location.reload();
      }, 500);
      
    } catch (error) {
      console.error('Error syncing changes:', error);
      toast.error("Failed to publish changes", {
        description: error instanceof Error ? error.message : "There was an error applying your changes to the project files."
      });
    } finally {
      setIsSyncing(false);
    }
  }, [projectData, hasChangesToSync, writeChangesToFiles, projectId]);

  return {
    syncChangesToFiles,
    isSyncing,
    hasChangesToSync
  };
};
