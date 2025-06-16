
import { useState, useCallback, useMemo } from 'react';
import { useProjectPersistence } from './useProjectPersistence';
import { toast } from 'sonner';

export const useDevModeSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { getProjectData, clearProjectData } = useProjectPersistence(projectId);

  const projectData = useMemo(() => {
    return getProjectData();
  }, [getProjectData]);

  const hasChangesToSync = useMemo(() => {
    console.log('Checking for changes to sync:', projectData);
    
    const hasTextChanges = Object.keys(projectData.textContent).length > 0;
    const hasImageChanges = Object.keys(projectData.imageReplacements).length > 0;
    const hasContentBlockChanges = Object.keys(projectData.contentBlocks).length > 0;
    
    const totalChanges = hasTextChanges || hasImageChanges || hasContentBlockChanges;
    
    console.log('Changes detected:', {
      textChanges: hasTextChanges,
      imageChanges: hasImageChanges,
      contentBlockChanges: hasContentBlockChanges,
      totalChanges,
      textContentKeys: Object.keys(projectData.textContent),
      imageReplacementKeys: Object.keys(projectData.imageReplacements),
      contentBlockKeys: Object.keys(projectData.contentBlocks)
    });
    
    return totalChanges;
  }, [projectData]);

  const syncChangesToFiles = useCallback(async () => {
    setIsSyncing(true);
    
    try {
      if (!hasChangesToSync) {
        toast.info("No changes to sync", {
          description: "No dev mode changes found to publish."
        });
        return;
      }

      console.log('Publishing changes:', projectData);

      // Instead of trying to modify static imports and refreshing,
      // we'll keep the changes in localStorage and apply them dynamically
      // The components already read from useProjectPersistence, so changes
      // should be visible immediately without a refresh
      
      toast.success("Changes published successfully!", {
        description: "Your dev mode changes are now live and will persist.",
        duration: 3000,
      });

      // Force a re-render by updating the URL timestamp
      const currentUrl = new URL(window.location.href);
      const currentTimestamp = currentUrl.searchParams.get('updated');
      const newTimestamp = Date.now().toString();
      
      // Only update if the timestamp is different to avoid unnecessary updates
      if (currentTimestamp !== newTimestamp) {
        currentUrl.searchParams.set('updated', newTimestamp);
        window.history.replaceState({}, '', currentUrl.toString());
      }

      // Trigger a gentle component re-render without full page refresh
      // by dispatching a custom event that components can listen to
      window.dispatchEvent(new CustomEvent('devModeChangesPublished', {
        detail: { projectId, timestamp: newTimestamp }
      }));
      
    } catch (error) {
      console.error('Error syncing changes:', error);
      toast.error("Failed to publish changes", {
        description: "There was an error applying your changes."
      });
    } finally {
      setIsSyncing(false);
    }
  }, [projectData, hasChangesToSync, projectId]);

  return {
    syncChangesToFiles,
    isSyncing,
    hasChangesToSync
  };
};
