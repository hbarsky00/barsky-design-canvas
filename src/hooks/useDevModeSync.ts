
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
    
    const totalChanges = hasTextChanges || hasImageChanges || hasContentBlockChanges;
    
    console.log('Changes detected:', {
      textChanges: hasTextChanges,
      imageChanges: hasImageChanges,
      contentBlockChanges: hasContentBlockChanges,
      totalChanges,
      textContentKeys: textKeys,
      imageReplacementKeys: imageKeys,
      contentBlockKeys: blockKeys,
      projectData
    });
    
    return totalChanges;
  }, [projectData]);

  const writeChangesToFiles = useCallback(async () => {
    console.log('Writing changes to project files:', projectData);
    
    // For image replacements, store them persistently
    if (Object.keys(projectData.imageReplacements || {}).length > 0) {
      const imageOverrides = JSON.stringify(projectData.imageReplacements, null, 2);
      console.log('Image overrides to apply:', imageOverrides);
      localStorage.setItem(`imageOverrides_${projectId}`, imageOverrides);
    }

    // For text content, store them persistently
    if (Object.keys(projectData.textContent || {}).length > 0) {
      const textOverrides = JSON.stringify(projectData.textContent, null, 2);
      console.log('Text overrides to apply:', textOverrides);
      localStorage.setItem(`textOverrides_${projectId}`, textOverrides);
    }

    // For content blocks, store them persistently
    if (Object.keys(projectData.contentBlocks || {}).length > 0) {
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
        setIsSyncing(false);
        return;
      }

      console.log('Publishing changes to files:', projectData);

      // Write changes to files
      await writeChangesToFiles();
      
      toast.success("Changes published successfully!", {
        description: "Your changes have been saved. Use the main Publish button (top right) to deploy your site.",
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
