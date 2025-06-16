
import { useState, useCallback } from 'react';
import { useProjectPersistence } from './useProjectPersistence';
import { projectsData } from '@/data/projectsData';
import { projectDetails } from '@/data/project-details';
import { imageCaptions } from '@/data/imageCaptions';
import { toast } from 'sonner';

export const useDevModeSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { getProjectData } = useProjectPersistence(projectId);

  const generateUpdatedProjectsData = useCallback((changes: any) => {
    const updatedData = [...projectsData];
    const projectIndex = updatedData.findIndex(p => p.id === projectId);
    
    if (projectIndex !== -1 && changes.textContent) {
      // Update project title and description if changed
      const titleKey = `hero_title_${projectId}`;
      const descKey = `hero_description_${projectId}`;
      
      if (changes.textContent[titleKey]) {
        updatedData[projectIndex] = {
          ...updatedData[projectIndex],
          title: changes.textContent[titleKey]
        };
      }
      
      if (changes.textContent[descKey]) {
        updatedData[projectIndex] = {
          ...updatedData[projectIndex],
          description: changes.textContent[descKey]
        };
      }
    }
    
    return updatedData;
  }, [projectId]);

  const generateUpdatedProjectDetails = useCallback((changes: any) => {
    const currentDetails = projectDetails[projectId];
    if (!currentDetails) return null;

    let updatedDetails = { ...currentDetails };
    
    if (changes.textContent) {
      // Update section content
      const challengeKey = `challenge_content_${projectId}`;
      const processKey = `process_content_${projectId}`;
      const resultKey = `result_content_${projectId}`;
      
      if (changes.textContent[challengeKey]) {
        updatedDetails.challenge = changes.textContent[challengeKey];
      }
      
      if (changes.textContent[processKey]) {
        updatedDetails.process = changes.textContent[processKey];
      }
      
      if (changes.textContent[resultKey]) {
        updatedDetails.result = changes.textContent[resultKey];
      }
    }
    
    return updatedDetails;
  }, [projectId]);

  const generateUpdatedImageCaptions = useCallback((changes: any) => {
    let updatedCaptions = { ...imageCaptions };
    
    if (changes.imageReplacements) {
      // Update captions for replaced images
      Object.entries(changes.imageReplacements).forEach(([oldSrc, newSrc]) => {
        if (updatedCaptions[oldSrc as string]) {
          const caption = updatedCaptions[oldSrc as string];
          delete updatedCaptions[oldSrc as string];
          updatedCaptions[newSrc as string] = caption;
        }
      });
    }
    
    return updatedCaptions;
  }, []);

  const generateFileUpdates = useCallback((changes: any) => {
    const files: { path: string; content: string }[] = [];
    
    // Update projectsData.ts
    const updatedProjectsData = generateUpdatedProjectsData(changes);
    const projectsDataContent = `import { ProjectProps } from "@/components/ProjectCard";
import { imageCaptions } from "./imageCaptions";

export const projectsData: ProjectProps[] = ${JSON.stringify(updatedProjectsData, null, 2)};

// Export image captions for use across the application
export { imageCaptions };

// Export project details - import from the project-details index
export { projectDetails } from "./project-details";
export type { ProjectDetails } from "./types/project";
`;
    
    files.push({
      path: 'src/data/projectsData.ts',
      content: projectsDataContent
    });

    // Update project details if changed
    const updatedDetails = generateUpdatedProjectDetails(changes);
    if (updatedDetails) {
      const detailsContent = `import { ProjectDetails } from "../types/project";

export const ${projectId}: ProjectDetails = ${JSON.stringify(updatedDetails, null, 2)};
`;
      
      files.push({
        path: `src/data/project-details/${projectId}.ts`,
        content: detailsContent
      });
    }

    // Update image captions
    const updatedCaptions = generateUpdatedImageCaptions(changes);
    const captionsContent = `// Comprehensive image captions for all projects
export const imageCaptions: Record<string, string> = ${JSON.stringify(updatedCaptions, null, 2)};

// Helper function to get caption for an image
export const getImageCaption = (imageSrc: string, fallback?: string): string => {
  return imageCaptions[imageSrc] || fallback || "Project showcase image";
};

// Helper function to get all captions for a project
export const getProjectImageCaptions = (projectId: string): Record<string, string> => {
  // This could be expanded to filter by project if needed
  return imageCaptions;
};
`;
    
    files.push({
      path: 'src/data/imageCaptions.ts',
      content: captionsContent
    });

    return files;
  }, [generateUpdatedProjectsData, generateUpdatedProjectDetails, generateUpdatedImageCaptions]);

  const syncChangesToFiles = useCallback(async () => {
    setIsSyncing(true);
    
    try {
      const changes = getProjectData();
      
      if (!changes.textContent && !changes.imageReplacements && !changes.contentBlocks) {
        toast.info("No changes to sync", {
          description: "No dev mode changes found to publish to the live site."
        });
        return;
      }

      const fileUpdates = generateFileUpdates(changes);
      
      // Copy the file contents to clipboard for manual application
      const clipboardContent = fileUpdates.map(file => 
        `// File: ${file.path}\n${file.content}`
      ).join('\n\n---\n\n');
      
      await navigator.clipboard.writeText(clipboardContent);
      
      toast.success("Changes ready to publish!", {
        description: `Updated code for ${fileUpdates.length} files has been copied to your clipboard. Paste into our chat to apply the changes.`,
        duration: 8000,
      });

      console.log('Generated file updates:', fileUpdates);
      
    } catch (error) {
      console.error('Error syncing changes:', error);
      toast.error("Failed to sync changes", {
        description: "There was an error preparing your changes for sync."
      });
    } finally {
      setIsSyncing(false);
    }
  }, [getProjectData, generateFileUpdates]);

  const hasChangesToSync = useCallback(() => {
    const changes = getProjectData();
    return Object.keys(changes.textContent).length > 0 || 
           Object.keys(changes.imageReplacements).length > 0 || 
           Object.keys(changes.contentBlocks).length > 0;
  }, [getProjectData]);

  return {
    syncChangesToFiles,
    isSyncing,
    hasChangesToSync: hasChangesToSync()
  };
};
