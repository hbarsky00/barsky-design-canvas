
import { useRef } from 'react';
import { projectsData } from '@/data/projects/projectsList';

interface ImageIssue {
  imageSrc: string;
  projectId: string;
  projectTitle: string;
  issueType: 'missing' | 'poor_quality' | 'generic' | 'needs_update';
  currentCaption?: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export const useImageScanner = () => {
  const isProcessingRef = useRef(false);
  const lastScanRef = useRef<number>(0);

  const analyzeCaption = (caption: string, imageSrc: string): ImageIssue | null => {
    if (!caption || caption === 'Click to add a caption...') {
      return {
        imageSrc,
        projectId: '',
        projectTitle: '',
        issueType: 'missing',
        reason: 'No caption provided',
        priority: 'high'
      };
    }

    if (caption.length < 10) {
      return {
        imageSrc,
        projectId: '',
        projectTitle: '',
        issueType: 'poor_quality',
        currentCaption: caption,
        reason: 'Caption too short (less than 10 characters)',
        priority: 'high'
      };
    }

    if (caption.includes('newly added') || caption.includes('This is a new image')) {
      return {
        imageSrc,
        projectId: '',
        projectTitle: '',
        issueType: 'generic',
        currentCaption: caption,
        reason: 'Generic placeholder caption',
        priority: 'medium'
      };
    }

    const genericPhrases = ['image', 'picture', 'photo', 'screenshot'];
    if (genericPhrases.some(phrase => caption.toLowerCase().includes(phrase)) && caption.length < 30) {
      return {
        imageSrc,
        projectId: '',
        projectTitle: '',
        issueType: 'poor_quality',
        currentCaption: caption,
        reason: 'Too generic - needs more descriptive content',
        priority: 'medium'
      };
    }

    return null;
  };

  const scanProjectImages = async (project: any): Promise<ImageIssue[]> => {
    const issues: ImageIssue[] = [];
    
    try {
      const storageKey = `image_captions_${project.id}`;
      const savedCaptions = JSON.parse(localStorage.getItem(storageKey) || '{}');

      if (project.image) {
        const captionKey = `img_caption_${project.image}`;
        const caption = savedCaptions[captionKey];
        const issue = analyzeCaption(caption, project.image);
        if (issue) {
          issues.push({
            ...issue,
            projectId: project.id,
            projectTitle: project.title
          });
        }
      }

      try {
        const projectDetailModule = await import(`@/data/project-details/${project.id}.ts`).catch(() => null);
        if (projectDetailModule?.default) {
          const details = projectDetailModule.default;
          
          const imageRegex = /\/lovable-uploads\/[a-f0-9-]+\.png/g;
          const allContent = [
            details.challenge || '',
            details.process || '',
            details.result || '',
            JSON.stringify(details.imageConfig || {}),
            JSON.stringify(details.galleryImages || [])
          ].join(' ');

          const matches = allContent.match(imageRegex) || [];
          const uniqueImages = [...new Set(matches)];

          for (const imageSrc of uniqueImages) {
            const captionKey = `img_caption_${imageSrc}`;
            const caption = savedCaptions[captionKey];
            const issue = analyzeCaption(caption, imageSrc);
            if (issue) {
              issues.push({
                ...issue,
                projectId: project.id,
                projectTitle: project.title
              });
            }
          }
        }
      } catch (error) {
        console.warn(`Could not scan detailed images for project ${project.id}:`, error);
      }

    } catch (error) {
      console.error(`Error scanning project ${project.title}:`, error);
    }

    return issues;
  };

  const scanAllProjects = async (): Promise<ImageIssue[]> => {
    const allIssues: ImageIssue[] = [];
    
    for (const project of projectsData) {
      const projectIssues = await scanProjectImages(project);
      allIssues.push(...projectIssues);
    }

    return allIssues.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const canScan = (): boolean => {
    if (isProcessingRef.current) {
      return false;
    }

    const now = Date.now();
    return now - lastScanRef.current >= 30000;
  };

  const markScanStart = () => {
    isProcessingRef.current = true;
    lastScanRef.current = Date.now();
  };

  const markScanEnd = () => {
    isProcessingRef.current = false;
  };

  return {
    scanAllProjects,
    canScan,
    markScanStart,
    markScanEnd
  };
};
