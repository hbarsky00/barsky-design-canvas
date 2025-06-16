
import { useState, useCallback, useMemo } from 'react';
import { useProjectPersistence } from './useProjectPersistence';
import { toast } from 'sonner';

export const useDevModeSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { getProjectData, clearProjectData } = useProjectPersistence(projectId);

  const projectData = useMemo(() => {
    if (!projectId) return { textContent: {}, imageReplacements: {}, contentBlocks: {} };
    const data = getProjectData();
    console.log('🔍 useDevModeSync: Current project data:', data);
    console.log('🔍 Text content keys:', Object.keys(data.textContent || {}));
    console.log('🔍 Image replacement keys:', Object.keys(data.imageReplacements || {}));
    console.log('🔍 Content block keys:', Object.keys(data.contentBlocks || {}));
    return data;
  }, [getProjectData, projectId]);

  const hasChangesToSync = useMemo(() => {
    if (!projectId) {
      console.log('❌ No projectId, no changes to sync');
      return false;
    }
    
    console.log('🔍 Checking for changes to sync:', projectData);
    
    // Check for text content changes
    const textContent = projectData.textContent || {};
    const textKeys = Object.keys(textContent);
    const hasTextChanges = textKeys.length > 0;
    console.log('📝 Text changes:', { hasTextChanges, textKeys, textContent });
    
    // Check for image replacement changes
    const imageReplacements = projectData.imageReplacements || {};
    const imageKeys = Object.keys(imageReplacements);
    const hasImageChanges = imageKeys.length > 0;
    console.log('🖼️ Image changes:', { hasImageChanges, imageKeys, imageReplacements });
    
    // Check for content block changes
    const contentBlocks = projectData.contentBlocks || {};
    const blockKeys = Object.keys(contentBlocks);
    const hasContentBlockChanges = blockKeys.length > 0;
    console.log('📦 Content block changes:', { hasContentBlockChanges, blockKeys, contentBlocks });
    
    const totalChanges = hasTextChanges || hasImageChanges || hasContentBlockChanges;
    
    console.log('🎯 Final change detection:', {
      textChanges: hasTextChanges,
      imageChanges: hasImageChanges,
      contentBlockChanges: hasContentBlockChanges,
      totalChanges,
      projectId
    });
    
    return totalChanges;
  }, [projectData, projectId]);

  const safeSetItem = useCallback((key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
      console.log(`✅ Successfully saved ${key} to localStorage`);
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn(`⚠️ Storage quota exceeded for ${key}, attempting cleanup...`);
        
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
          console.log(`✅ Successfully saved ${key} to localStorage after cleanup`);
          return true;
        } catch (retryError) {
          console.error('❌ Still failed after cleanup:', retryError);
          return false;
        }
      }
      console.error('❌ Storage error:', error);
      return false;
    }
  }, []);

  const writeChangesToFiles = useCallback(async () => {
    console.log('📤 Writing changes to project files:', projectData);
    
    let successCount = 0;
    let totalAttempts = 0;
    
    // For image replacements, store them persistently if there are any
    const imageReplacements = projectData.imageReplacements || {};
    if (Object.keys(imageReplacements).length > 0) {
      totalAttempts++;
      const imageOverrides = JSON.stringify(imageReplacements, null, 2);
      console.log('🖼️ Image overrides to apply:', imageOverrides);
      
      if (safeSetItem(`imageOverrides_${projectId}`, imageOverrides)) {
        successCount++;
        console.log('✅ Successfully saved image overrides');
      } else {
        throw new Error('Failed to save image changes due to storage limitations');
      }
    }

    // For text content, store them persistently if there are any
    const textContent = projectData.textContent || {};
    if (Object.keys(textContent).length > 0) {
      totalAttempts++;
      const textOverrides = JSON.stringify(textContent, null, 2);
      console.log('📝 Text overrides to apply:', textOverrides);
      
      if (safeSetItem(`textOverrides_${projectId}`, textOverrides)) {
        successCount++;
        console.log('✅ Successfully saved text overrides');
      } else {
        throw new Error('Failed to save text changes due to storage limitations');
      }
    }

    // For content blocks, store them persistently if there are any
    const contentBlocks = projectData.contentBlocks || {};
    if (Object.keys(contentBlocks).length > 0) {
      totalAttempts++;
      const blockOverrides = JSON.stringify(contentBlocks, null, 2);
      console.log('📦 Content block overrides to apply:', blockOverrides);
      
      if (safeSetItem(`contentBlockOverrides_${projectId}`, blockOverrides)) {
        successCount++;
        console.log('✅ Successfully saved content block overrides');
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
        newValue: JSON.stringify(imageReplacements),
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
    console.log('🚀 syncChangesToFiles called, hasChangesToSync:', hasChangesToSync);
    console.log('📊 Current project data:', projectData);
    
    setIsSyncing(true);
    
    try {
      if (!hasChangesToSync) {
        console.log('❌ No changes detected for sync');
        toast.info("No changes to sync", {
          description: "No dev mode changes found to publish."
        });
        setIsSyncing(false);
        return;
      }

      console.log('📤 Publishing changes to files:', projectData);

      // Write changes to files
      await writeChangesToFiles();
      
      toast.success("Changes published successfully!", {
        description: "Your changes have been applied and are now visible.",
        duration: 3000,
      });

      // Force immediate refresh of all components
      setTimeout(() => {
        console.log('🔄 Forcing page refresh to ensure changes are visible');
        window.location.reload();
      }, 500);
      
    } catch (error) {
      console.error('❌ Error syncing changes:', error);
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
