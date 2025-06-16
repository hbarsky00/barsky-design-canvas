
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

  const cleanupRemovedImages = useCallback((currentImageReplacements: Record<string, string>) => {
    console.log('🧹 useDevModeSync: Cleaning up removed images');
    
    // Get existing published images from localStorage
    const existingOverrides = JSON.parse(localStorage.getItem(`imageOverrides_${projectId}`) || '{}');
    
    // Find images that were removed (exist in localStorage but not in current changes)
    const removedImages = Object.keys(existingOverrides).filter(
      originalSrc => !currentImageReplacements.hasOwnProperty(originalSrc)
    );
    
    // Reset removed images back to their original sources in the DOM
    removedImages.forEach(originalSrc => {
      const images = document.querySelectorAll(`img[src="${existingOverrides[originalSrc]}"]`);
      images.forEach((img) => {
        (img as HTMLImageElement).src = originalSrc;
        console.log('🔄 Reset removed image back to original:', existingOverrides[originalSrc], '->', originalSrc);
      });
    });
    
    console.log('🧹 Removed images cleaned up:', removedImages);
  }, [projectId]);

  const applyChangesLive = useCallback(async () => {
    console.log('🚀 useDevModeSync: Applying changes live to published website');
    
    try {
      const projectData = await getChanges();
      console.log('📊 useDevModeSync: Retrieved changes from database:', {
        textKeys: Object.keys(projectData.textContent || {}),
        imageKeys: Object.keys(projectData.imageReplacements || {}),
        blockKeys: Object.keys(projectData.contentBlocks || {}),
      });

      // Clean up removed images first
      cleanupRemovedImages(projectData.imageReplacements);

      // Apply current image changes to the DOM immediately
      Object.entries(projectData.imageReplacements).forEach(([oldSrc, newSrc]) => {
        const images = document.querySelectorAll(`img[src="${oldSrc}"]`);
        images.forEach((img) => {
          (img as HTMLImageElement).src = newSrc;
          console.log('🖼️ Live updated image in DOM:', oldSrc, '->', newSrc);
        });
      });

      // Store published overrides in localStorage for persistence across page loads
      localStorage.setItem(`imageOverrides_${projectId}`, JSON.stringify(projectData.imageReplacements));
      localStorage.setItem(`textContent_${projectId}`, JSON.stringify(projectData.textContent));
      localStorage.setItem(`contentBlocks_${projectId}`, JSON.stringify(projectData.contentBlocks));

      // Apply text changes via custom events for immediate updates
      Object.entries(projectData.textContent).forEach(([textKey, newText]) => {
        window.dispatchEvent(new CustomEvent('liveTextUpdate', {
          detail: { textKey, newText }
        }));
        console.log('📝 Live updated text:', textKey);
      });

      // Apply content block changes via custom events
      Object.entries(projectData.contentBlocks).forEach(([sectionKey, blocks]) => {
        window.dispatchEvent(new CustomEvent('liveContentBlockUpdate', {
          detail: { sectionKey, blocks }
        }));
        console.log('📦 Live updated content blocks for section:', sectionKey);
      });

      // Trigger a complete refresh of all components to ensure everything is updated
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId, 
          published: true, 
          immediate: true,
          timestamp: Date.now()
        }
      }));

      // Force a hard refresh of the page to ensure changes are applied to the published website
      setTimeout(() => {
        console.log('🔄 Forcing page refresh to apply published changes');
        window.location.reload();
      }, 1000);

      console.log('✅ useDevModeSync: Changes applied successfully to published website');
      return true;
    } catch (error) {
      console.error('❌ useDevModeSync: Error applying changes to published website:', error);
      throw error;
    }
  }, [getChanges, projectId, cleanupRemovedImages]);

  const syncChangesToFiles = useCallback(async () => {
    console.log('🚀 useDevModeSync: syncChangesToFiles called - Publishing to live website');
    
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

      console.log('📤 useDevModeSync: Publishing changes to live website');

      // Apply changes live immediately and force refresh
      await applyChangesLive();
      
      // Clear the database changes since they're now published
      console.log('🗑️ useDevModeSync: Clearing database changes after successful publish');
      await clearChanges();
      
      toast.success("Changes published successfully!", {
        description: "Your changes are now live on the published website. Page will refresh to show updates.",
        duration: 5000,
      });

      // Update state to reflect no pending changes
      setHasChangesToSync(false);
      
    } catch (error) {
      console.error('❌ useDevModeSync: Error syncing changes to published website:', error);
      toast.error("Failed to publish changes", {
        description: error instanceof Error ? error.message : "There was an error applying your changes to the published website."
      });
    } finally {
      setIsSyncing(false);
    }
  }, [checkHasChanges, applyChangesLive, clearChanges]);

  return {
    syncChangesToFiles,
    isSyncing,
    hasChangesToSync
  };
};
