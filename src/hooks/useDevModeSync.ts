
import { useState, useCallback, useEffect } from 'react';
import { useDevModeDatabase } from './useDevModeDatabase';
import { toast } from 'sonner';

export const useDevModeSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasChangesToSync, setHasChangesToSync] = useState(false);
  const { getChanges, clearChanges, hasChanges: checkHasChanges } = useDevModeDatabase(projectId);

  // Check for changes in the database
  useEffect(() => {
    if (!projectId) {
      setHasChangesToSync(false);
      return;
    }
    
    const checkChanges = async () => {
      try {
        const result = await checkHasChanges();
        console.log('🔍 Database changes check result:', result);
        setHasChangesToSync(result);
      } catch (error) {
        console.error('Error checking for changes:', error);
        setHasChangesToSync(false);
      }
    };
    
    checkChanges();
    
    // Set up periodic checking
    const interval = setInterval(checkChanges, 2000);
    
    return () => clearInterval(interval);
  }, [projectId, checkHasChanges]);

  const cleanupOldStorage = useCallback(() => {
    console.log('🧹 Cleaning up old localStorage data to free space');
    
    const keysToRemove = [];
    const currentTime = Date.now();
    const oneWeekAgo = currentTime - (7 * 24 * 60 * 60 * 1000); // 7 days
    
    // Remove old project data and overrides (except current project)
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key !== `imageOverrides_${projectId}` && key !== `textOverrides_${projectId}` && key !== `contentBlockOverrides_${projectId}`) {
        if (
          key.startsWith('project_') || 
          key.startsWith('imageOverrides_') ||
          key.startsWith('textOverrides_') ||
          key.startsWith('contentBlockOverrides_')
        ) {
          keysToRemove.push(key);
        }
      }
    }
    
    // Remove old keys
    keysToRemove.forEach(key => {
      try {
        localStorage.removeItem(key);
        console.log(`🗑️ Removed old storage key: ${key}`);
      } catch (e) {
        console.warn('Failed to remove key:', key);
      }
    });
    
    console.log(`🧹 Cleaned up ${keysToRemove.length} old storage items`);
  }, [projectId]);

  const compressImageData = useCallback((imageData: Record<string, string>): Record<string, string> => {
    const compressed: Record<string, string> = {};
    
    Object.entries(imageData).forEach(([key, value]) => {
      // Only store data URLs, skip blob URLs and external URLs
      if (value && value.startsWith('data:image/')) {
        // For very large images, we might want to skip them or compress them
        if (value.length > 500000) { // 500KB limit
          console.warn(`⚠️ Skipping large image (${value.length} bytes) for key: ${key}`);
          return;
        }
        compressed[key] = value;
      }
    });
    
    return compressed;
  }, []);

  const safeSetItem = useCallback((key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
      console.log(`✅ Successfully saved ${key} to localStorage`);
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn(`⚠️ Storage quota exceeded for ${key}, attempting cleanup...`);
        
        // First cleanup attempt
        cleanupOldStorage();
        
        try {
          localStorage.setItem(key, value);
          console.log(`✅ Successfully saved ${key} to localStorage after cleanup`);
          return true;
        } catch (retryError) {
          console.error('❌ Still failed after cleanup, trying compression:', retryError);
          
          // If it's image data, try to compress it
          if (key.includes('imageOverrides_')) {
            try {
              const parsedValue = JSON.parse(value);
              const compressedData = compressImageData(parsedValue);
              const compressedValue = JSON.stringify(compressedData, null, 2);
              
              localStorage.setItem(key, compressedValue);
              console.log(`✅ Successfully saved compressed ${key} to localStorage`);
              return true;
            } catch (compressionError) {
              console.error('❌ Compression failed:', compressionError);
            }
          }
          
          return false;
        }
      }
      console.error('❌ Storage error:', error);
      return false;
    }
  }, [cleanupOldStorage, compressImageData]);

  const writeChangesToFiles = useCallback(async () => {
    console.log('📤 Publishing changes from database to localStorage overrides');
    
    try {
      const projectData = await getChanges();
      console.log('📊 Retrieved changes from database:', projectData);
      
      let successCount = 0;
      let totalAttempts = 0;
      let publishedImages: Record<string, string> = {};
      
      // For image replacements, store them persistently if there are any
      const imageReplacements = projectData.imageReplacements || {};
      if (Object.keys(imageReplacements).length > 0) {
        totalAttempts++;
        
        // Compress image data before saving
        const compressedImages = compressImageData(imageReplacements);
        publishedImages = compressedImages;
        const imageOverrides = JSON.stringify(compressedImages, null, 2);
        console.log('🖼️ Publishing compressed image overrides:', Object.keys(compressedImages).length, 'images');
        
        if (safeSetItem(`imageOverrides_${projectId}`, imageOverrides)) {
          successCount++;
          console.log('✅ Successfully published image overrides');
        } else {
          throw new Error('Failed to publish image changes due to storage limitations. Try removing some old images or clearing browser data.');
        }
      }

      // For text content, store them persistently if there are any
      const textContent = projectData.textContent || {};
      if (Object.keys(textContent).length > 0) {
        totalAttempts++;
        const textOverrides = JSON.stringify(textContent, null, 2);
        console.log('📝 Publishing text overrides:', textOverrides);
        
        if (safeSetItem(`textOverrides_${projectId}`, textOverrides)) {
          successCount++;
          console.log('✅ Successfully published text overrides');
        } else {
          throw new Error('Failed to publish text changes due to storage limitations');
        }
      }

      // For content blocks, store them persistently if there are any
      const contentBlocks = projectData.contentBlocks || {};
      if (Object.keys(contentBlocks).length > 0) {
        totalAttempts++;
        const blockOverrides = JSON.stringify(contentBlocks, null, 2);
        console.log('📦 Publishing content block overrides:', blockOverrides);
        
        if (safeSetItem(`contentBlockOverrides_${projectId}`, blockOverrides)) {
          successCount++;
          console.log('✅ Successfully published content block overrides');
        } else {
          throw new Error('Failed to publish content block changes due to storage limitations');
        }
      }

      if (successCount === totalAttempts && totalAttempts > 0) {
        // Clear the database dev mode data since it's now "published"
        await clearChanges();
        
        // Dispatch events to notify all components immediately
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { projectId, published: true }
        }));
        
        window.dispatchEvent(new StorageEvent('storage', {
          key: `imageOverrides_${projectId}`,
          newValue: JSON.stringify(publishedImages),
          url: window.location.href
        }));
        
        return true;
      } else if (totalAttempts === 0) {
        throw new Error('No changes found to publish');
      } else {
        throw new Error(`Only ${successCount} out of ${totalAttempts} changes could be published`);
      }
    } catch (error) {
      console.error('❌ Error in writeChangesToFiles:', error);
      throw error;
    }
  }, [getChanges, projectId, clearChanges, safeSetItem, compressImageData]);

  const syncChangesToFiles = useCallback(async () => {
    console.log('🚀 syncChangesToFiles called, checking database for changes');
    
    setIsSyncing(true);
    
    try {
      const hasDbChanges = await checkHasChanges();
      console.log('🔍 Database has changes:', hasDbChanges);
      
      if (!hasDbChanges) {
        console.log('❌ No changes detected in database');
        toast.info("No changes to publish", {
          description: "No dev mode changes found to publish."
        });
        setIsSyncing(false);
        return;
      }

      console.log('📤 Publishing changes from database to files');

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
  }, [checkHasChanges, writeChangesToFiles, projectId]);

  return {
    syncChangesToFiles,
    isSyncing,
    hasChangesToSync
  };
};
