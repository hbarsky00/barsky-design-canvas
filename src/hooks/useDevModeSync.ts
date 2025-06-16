
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
        console.log('🔍 useDevModeSync: Database changes check result:', result);
        setHasChangesToSync(result);
      } catch (error) {
        console.error('❌ useDevModeSync: Error checking for changes:', error);
        setHasChangesToSync(false);
      }
    };
    
    checkChanges();
    
    // Set up periodic checking
    const interval = setInterval(checkChanges, 2000);
    
    return () => clearInterval(interval);
  }, [projectId, checkHasChanges]);

  const publishChangesToLive = useCallback(async () => {
    console.log('🚀 useDevModeSync: Publishing changes to live mode');
    
    try {
      const projectData = await getChanges();
      console.log('📊 useDevModeSync: Retrieved changes from database:', {
        textKeys: Object.keys(projectData.textContent || {}),
        imageKeys: Object.keys(projectData.imageReplacements || {}),
        blockKeys: Object.keys(projectData.contentBlocks || {}),
        projectData
      });
      
      // Store changes in localStorage as published overrides
      if (Object.keys(projectData.imageReplacements).length > 0) {
        localStorage.setItem(`imageOverrides_${projectId}`, JSON.stringify(projectData.imageReplacements));
        console.log('💾 Saved image overrides to localStorage');
      }
      
      if (Object.keys(projectData.textContent).length > 0) {
        localStorage.setItem(`textOverrides_${projectId}`, JSON.stringify(projectData.textContent));
        console.log('💾 Saved text overrides to localStorage');
      }
      
      if (Object.keys(projectData.contentBlocks).length > 0) {
        localStorage.setItem(`contentBlockOverrides_${projectId}`, JSON.stringify(projectData.contentBlocks));
        console.log('💾 Saved content block overrides to localStorage');
      }

      // Apply changes immediately to the current page
      // Update images
      Object.entries(projectData.imageReplacements).forEach(([oldSrc, newSrc]) => {
        const images = document.querySelectorAll(`img[src="${oldSrc}"]`);
        images.forEach((img) => {
          (img as HTMLImageElement).src = newSrc;
          console.log('🖼️ Live updated image:', oldSrc, '->', newSrc);
        });
      });

      // Update text content via custom events
      Object.entries(projectData.textContent).forEach(([textKey, newText]) => {
        window.dispatchEvent(new CustomEvent('liveTextUpdate', {
          detail: { textKey, newText }
        }));
        console.log('📝 Live updated text:', textKey, '->', newText.substring(0, 50) + '...');
      });

      // Trigger a complete refresh of all components with published flag
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { projectId, published: true, immediate: true }
      }));

      console.log('✅ useDevModeSync: Changes published successfully');
      return true;
    } catch (error) {
      console.error('❌ useDevModeSync: Error publishing changes:', error);
      throw error;
    }
  }, [getChanges, projectId]);

  const syncChangesToFiles = useCallback(async () => {
    console.log('🚀 useDevModeSync: syncChangesToFiles called');
    
    setIsSyncing(true);
    
    try {
      const hasDbChanges = await checkHasChanges();
      console.log('🔍 useDevModeSync: Database has changes:', hasDbChanges);
      
      if (!hasDbChanges) {
        console.log('❌ useDevModeSync: No changes detected in database');
        toast.info("No changes to publish", {
          description: "No dev mode changes found to publish."
        });
        setIsSyncing(false);
        return;
      }

      console.log('📤 useDevModeSync: Publishing changes');

      // Publish changes to live mode
      await publishChangesToLive();
      
      // Clear the database changes since they're now published
      console.log('🗑️ useDevModeSync: Clearing database changes after successful publish');
      await clearChanges();
      
      toast.success("Changes published successfully!", {
        description: "Your changes are now live and visible.",
        duration: 3000,
      });

      // Update state to reflect no pending changes
      setHasChangesToSync(false);
      
    } catch (error) {
      console.error('❌ useDevModeSync: Error syncing changes:', error);
      toast.error("Failed to publish changes", {
        description: error instanceof Error ? error.message : "There was an error applying your changes."
      });
    } finally {
      setIsSyncing(false);
    }
  }, [checkHasChanges, publishChangesToLive, clearChanges]);

  return {
    syncChangesToFiles,
    isSyncing,
    hasChangesToSync
  };
};
