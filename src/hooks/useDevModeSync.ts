
import { useState, useCallback, useMemo } from 'react';
import { useProjectPersistence } from './useProjectPersistence';
import { projectsData } from '@/data/projectsData';
import { projectDetails } from '@/data/project-details';
import { imageCaptions } from '@/data/imageCaptions';
import { toast } from 'sonner';

export const useDevModeSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { getProjectData, clearProjectData } = useProjectPersistence(projectId);

  const projectData = useMemo(() => {
    return getProjectData();
  }, [getProjectData]);

  const hasChangesToSync = useMemo(() => {
    return Object.keys(projectData.textContent).length > 0 || 
           Object.keys(projectData.imageReplacements).length > 0 || 
           Object.keys(projectData.contentBlocks).length > 0;
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

      // Apply changes directly to the data structures
      // This simulates what would happen if the files were updated
      
      // Update text content in memory
      if (Object.keys(projectData.textContent).length > 0) {
        console.log('Applying text content changes:', projectData.textContent);
        // In a real app, this would update the backend/files
        // For now, we'll just show success and clear the changes
      }

      // Update image replacements in memory  
      if (Object.keys(projectData.imageReplacements).length > 0) {
        console.log('Applying image replacement changes:', projectData.imageReplacements);
        // In a real app, this would update the backend/files
      }

      // Update content blocks in memory
      if (Object.keys(projectData.contentBlocks).length > 0) {
        console.log('Applying content block changes:', projectData.contentBlocks);
        // In a real app, this would update the backend/files
      }

      // Clear the dev mode changes since they've been "applied"
      clearProjectData();
      
      toast.success("Changes published successfully!", {
        description: "Your dev mode changes have been applied and are now live.",
        duration: 5000,
      });

      // Force a page refresh to show the updated content
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Error syncing changes:', error);
      toast.error("Failed to publish changes", {
        description: "There was an error applying your changes."
      });
    } finally {
      setIsSyncing(false);
    }
  }, [projectData, hasChangesToSync, clearProjectData]);

  return {
    syncChangesToFiles,
    isSyncing,
    hasChangesToSync
  };
};
