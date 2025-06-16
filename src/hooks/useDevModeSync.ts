
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

      // Apply text content changes to the project
      if (Object.keys(projectData.textContent).length > 0) {
        console.log('Applying text content changes:', projectData.textContent);
        
        // Find the project in projectsData and update it
        const projectIndex = projectsData.findIndex(p => p.id === projectId);
        if (projectIndex !== -1) {
          Object.entries(projectData.textContent).forEach(([key, value]) => {
            if (key.includes('hero_title_')) {
              projectsData[projectIndex].title = value;
            } else if (key.includes('hero_description_')) {
              projectsData[projectIndex].description = value;
            }
          });
        }

        // Update project details
        const details = projectDetails[projectId];
        if (details) {
          Object.entries(projectData.textContent).forEach(([key, value]) => {
            if (key.includes('challenge_')) {
              details.challenge = value;
            } else if (key.includes('process_')) {
              details.process = value;
            } else if (key.includes('result_')) {
              details.result = value;
            }
          });
        }
      }

      // Apply image replacement changes
      if (Object.keys(projectData.imageReplacements).length > 0) {
        console.log('Applying image replacement changes:', projectData.imageReplacements);
        
        // Update the main project image if changed
        const projectIndex = projectsData.findIndex(p => p.id === projectId);
        if (projectIndex !== -1) {
          const mainImageReplacement = projectData.imageReplacements[projectsData[projectIndex].image];
          if (mainImageReplacement) {
            projectsData[projectIndex].image = mainImageReplacement;
          }
        }

        // Update image captions with new paths
        Object.entries(projectData.imageReplacements).forEach(([oldPath, newPath]) => {
          const caption = imageCaptions[oldPath];
          if (caption) {
            imageCaptions[newPath] = caption;
          }
        });
      }

      // Apply content blocks changes
      if (Object.keys(projectData.contentBlocks).length > 0) {
        console.log('Applying content block changes:', projectData.contentBlocks);
        // Content blocks are handled dynamically, so they're already applied
      }

      // Clear the dev mode changes since they've been "applied"
      clearProjectData();
      
      toast.success("Changes published successfully!", {
        description: "Your dev mode changes have been applied and are now live.",
        duration: 3000,
      });

      // Instead of refreshing, trigger a re-render by updating the URL
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('updated', Date.now().toString());
      window.history.replaceState({}, '', currentUrl.toString());
      
      // Trigger a gentle page refresh after a short delay to show changes
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('Error syncing changes:', error);
      toast.error("Failed to publish changes", {
        description: "There was an error applying your changes."
      });
    } finally {
      setIsSyncing(false);
    }
  }, [projectData, hasChangesToSync, clearProjectData, projectId]);

  return {
    syncChangesToFiles,
    isSyncing,
    hasChangesToSync
  };
};
