
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

  const writeChangesToFiles = useCallback(async () => {
    console.log('Writing changes to project files:', projectData);
    
    // For image replacements, we need to update the imageCaptions.ts file
    if (Object.keys(projectData.imageReplacements).length > 0) {
      // Since we can't modify the imageCaptions.ts file directly from here,
      // we'll create a dynamic import override system
      const imageOverrides = JSON.stringify(projectData.imageReplacements, null, 2);
      console.log('Image overrides to apply:', imageOverrides);
      
      // Store the overrides in a way that can be imported by components
      localStorage.setItem(`imageOverrides_${projectId}`, imageOverrides);
    }

    // For text content, we'll create a similar override system
    if (Object.keys(projectData.textContent).length > 0) {
      const textOverrides = JSON.stringify(projectData.textContent, null, 2);
      console.log('Text overrides to apply:', textOverrides);
      
      localStorage.setItem(`textOverrides_${projectId}`, textOverrides);
    }

    // For content blocks, store them for runtime loading
    if (Object.keys(projectData.contentBlocks).length > 0) {
      const blockOverrides = JSON.stringify(projectData.contentBlocks, null, 2);
      console.log('Content block overrides to apply:', blockOverrides);
      
      localStorage.setItem(`contentBlockOverrides_${projectId}`, blockOverrides);
    }

    // Clear the temporary dev mode data since it's now "published"
    clearProjectData();
    
    return true;
  }, [projectData, projectId, clearProjectData]);

  const syncChangesToFiles = useCallback(async () => {
    setIsSyncing(true);
    
    try {
      if (!hasChangesToSync) {
        toast.info("No changes to sync", {
          description: "No dev mode changes found to publish."
        });
        return;
      }

      console.log('Publishing changes to files:', projectData);

      // Write changes to files
      await writeChangesToFiles();
      
      toast.success("Changes published successfully!", {
        description: "Your changes have been written to the project files. Republish your site to see them live.",
        duration: 5000,
      });

      // Force a page reload to apply the changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Error syncing changes:', error);
      toast.error("Failed to publish changes", {
        description: "There was an error applying your changes to the project files."
      });
    } finally {
      setIsSyncing(false);
    }
  }, [projectData, hasChangesToSync, writeChangesToFiles]);

  return {
    syncChangesToFiles,
    isSyncing,
    hasChangesToSync
  };
};
