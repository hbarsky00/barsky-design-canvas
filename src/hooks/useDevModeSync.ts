
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

  const applyChangesLive = useCallback(async () => {
    console.log('🚀 useDevModeSync: Applying changes live from database');
    
    try {
      const projectData = await getChanges();
      console.log('📊 useDevModeSync: Retrieved changes from database:', {
        textKeys: Object.keys(projectData.textContent || {}),
        imageKeys: Object.keys(projectData.imageReplacements || {}),
        blockKeys: Object.keys(projectData.contentBlocks || {}),
        projectData
      });
      
      // Apply image replacements live
      const imageReplacements = projectData.imageReplacements || {};
      Object.entries(imageReplacements).forEach(([oldSrc, newSrc]) => {
        // Find all img elements with the old src and update them
        const images = document.querySelectorAll(`img[src="${oldSrc}"]`);
        images.forEach((img) => {
          (img as HTMLImageElement).src = newSrc;
          console.log('🖼️ Live updated image:', oldSrc, '->', newSrc);
        });
      });

      // Apply text content changes live
      const textContent = projectData.textContent || {};
      Object.entries(textContent).forEach(([textKey, newText]) => {
        // Dispatch a custom event that EditableText components can listen to
        window.dispatchEvent(new CustomEvent('liveTextUpdate', {
          detail: { textKey, newText }
        }));
        console.log('📝 Live updated text:', textKey, '->', newText.substring(0, 50) + '...');
      });

      // Trigger a complete refresh of all components
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { projectId, liveUpdate: true, immediate: true }
      }));

      console.log('✅ useDevModeSync: Live changes applied successfully');
      return true;
    } catch (error) {
      console.error('❌ useDevModeSync: Error applying live changes:', error);
      throw error;
    }
  }, [getChanges, projectId]);

  const syncChangesToFiles = useCallback(async () => {
    console.log('🚀 useDevModeSync: syncChangesToFiles called, applying changes live');
    
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

      console.log('📤 useDevModeSync: Applying changes live');

      // Apply changes live instead of using localStorage
      await applyChangesLive();
      
      // Clear the database changes since they're now "published"
      console.log('🗑️ useDevModeSync: Clearing database changes after successful publish');
      await clearChanges();
      
      toast.success("Changes published successfully!", {
        description: "Your changes are now live and visible.",
        duration: 3000,
      });

      // Force a complete page refresh to ensure all components are updated
      setTimeout(() => {
        console.log('🔄 useDevModeSync: Forcing page refresh to ensure changes are visible');
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('❌ useDevModeSync: Error syncing changes:', error);
      toast.error("Failed to publish changes", {
        description: error instanceof Error ? error.message : "There was an error applying your changes."
      });
    } finally {
      setIsSyncing(false);
    }
  }, [checkHasChanges, applyChangesLive, clearChanges, projectId]);

  return {
    syncChangesToFiles,
    isSyncing,
    hasChangesToSync
  };
};
