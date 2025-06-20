
import React, { useEffect, useRef } from 'react';
import { useEnhancedAiImageCaptions } from '@/hooks/useEnhancedAiImageCaptions';
import { useSimpleCaptions } from '@/hooks/useSimpleCaptions';
import { toast } from 'sonner';
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

const AutoCaptionScanner: React.FC = () => {
  const { generateSingleCaption } = useEnhancedAiImageCaptions();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
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

    // Check for very generic captions
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
      // Create a fresh instance of the hook for each project
      const captionHook = useSimpleCaptions(project.id);
      await captionHook.loadCaptions();
      const captions = captionHook.captions;

      // Scan main project image
      if (project.image) {
        const caption = captions[`img_caption_${project.image}`];
        const issue = analyzeCaption(caption, project.image);
        if (issue) {
          issues.push({
            ...issue,
            projectId: project.id,
            projectTitle: project.title
          });
        }
      }

      // Scan project detail images
      try {
        const projectDetailModule = await import(`@/data/project-details/${project.id}.ts`).catch(() => null);
        if (projectDetailModule?.default) {
          const details = projectDetailModule.default;
          
          // Extract all image URLs from project content
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
            const caption = captions[`img_caption_${imageSrc}`];
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

  const performBackgroundScan = async () => {
    if (isProcessingRef.current) {
      console.log('🔄 Background scan already in progress, skipping...');
      return;
    }

    const now = Date.now();
    if (now - lastScanRef.current < 25000) { // Minimum 25 seconds between scans
      return;
    }

    isProcessingRef.current = true;
    lastScanRef.current = now;
    
    console.log('🔍 Background Caption Scanner: Starting silent scan...');

    try {
      const allIssues: ImageIssue[] = [];

      // Scan all projects
      for (const project of projectsData) {
        const projectIssues = await scanProjectImages(project);
        allIssues.push(...projectIssues);
      }

      // Sort by priority
      const sortedIssues = allIssues.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

      console.log(`🔍 Background scan complete: Found ${sortedIssues.length} issues`);

      // Auto-fix high priority issues automatically
      const highPriorityIssues = sortedIssues.filter(issue => issue.priority === 'high');
      
      if (highPriorityIssues.length > 0) {
        console.log(`🔧 Auto-fixing ${highPriorityIssues.length} high priority issues...`);
        
        let fixedCount = 0;
        for (const issue of highPriorityIssues.slice(0, 3)) { // Limit to 3 per scan to avoid overwhelming
          try {
            const newCaption = await generateSingleCaption(issue.imageSrc, 'descriptive', 'project');
            
            // Save the caption using the isolated caption system
            const captionKey = `img_caption_${issue.imageSrc}`;
            const storageKey = `image_captions_${issue.projectId}`;
            const existingCaptions = JSON.parse(localStorage.getItem(storageKey) || '{}');
            existingCaptions[captionKey] = newCaption;
            localStorage.setItem(storageKey, JSON.stringify(existingCaptions));
            
            console.log(`✅ Auto-fixed caption for ${issue.imageSrc.substring(0, 30)}...`);
            fixedCount++;
            
            // Small delay between fixes
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (error) {
            console.error(`❌ Failed to auto-fix caption for ${issue.imageSrc}:`, error);
          }
        }

        if (fixedCount > 0) {
          toast.success(`Auto-fixed ${fixedCount} caption issues`, {
            description: 'Missing and poor quality captions have been updated',
            duration: 3000
          });
          
          // Trigger a refresh for updated content
          window.dispatchEvent(new CustomEvent('captionsUpdated', {
            detail: { fixedCount, timestamp: Date.now() }
          }));
        }
      }

    } catch (error) {
      console.error('❌ Background scan error:', error);
    } finally {
      isProcessingRef.current = false;
    }
  };

  // Set up background monitoring
  useEffect(() => {
    console.log('🚀 Background Caption Scanner: Initialized');
    
    // Initial scan after a short delay
    const initialTimeout = setTimeout(() => {
      performBackgroundScan();
    }, 5000);

    // Set up interval for continuous monitoring
    intervalRef.current = setInterval(() => {
      performBackgroundScan();
    }, 30000); // Scan every 30 seconds

    return () => {
      if (initialTimeout) clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      console.log('🔇 Background Caption Scanner: Stopped');
    };
  }, []);

  // This component renders nothing - it's completely invisible
  return null;
};

export default AutoCaptionScanner;
