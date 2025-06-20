
import { useCallback, useRef } from 'react';
import { getImageCaption } from '@/data/imageCaptions';
import { projectsData } from '@/data/projects/projectsList';

export interface CaptionIssue {
  imageSrc: string;
  projectId: string;
  currentCaption: string;
  issueType: 'missing' | 'generic' | 'poor_quality';
  priority: number;
}

export const useImageScanner = () => {
  const lastScanTime = useRef<number>(0);
  const isScanning = useRef<boolean>(false);
  const SCAN_COOLDOWN = 10000; // 10 seconds between scans

  const canScan = useCallback(() => {
    const now = Date.now();
    const timeSinceLastScan = now - lastScanTime.current;
    return !isScanning.current && timeSinceLastScan >= SCAN_COOLDOWN;
  }, []);

  const markScanStart = useCallback(() => {
    isScanning.current = true;
    lastScanTime.current = Date.now();
  }, []);

  const markScanEnd = useCallback(() => {
    isScanning.current = false;
  }, []);

  const scanAllProjects = useCallback(async (): Promise<CaptionIssue[]> => {
    console.log('🔍 ImageScanner: Starting comprehensive scan for caption issues...');
    
    const issues: CaptionIssue[] = [];
    
    // Get all image elements from the current page
    const imageElements = document.querySelectorAll('img[src*="/lovable-uploads/"]');
    console.log(`🔍 Found ${imageElements.length} images on page to scan`);
    
    imageElements.forEach((img, index) => {
      const imageSrc = (img as HTMLImageElement).src;
      const staticCaption = getImageCaption(imageSrc);
      
      console.log(`📋 Scanning image ${index + 1}: ${imageSrc.substring(0, 50)}...`);
      console.log(`📋 Current caption: "${staticCaption}"`);
      
      // Check if this is a generic or poor quality caption that needs AI improvement
      const isGeneric = !staticCaption || 
                       staticCaption === "Professional project showcase demonstrating innovative solutions and user-centered design" ||
                       staticCaption.includes('Professional design showcase') ||
                       staticCaption.includes('newly added') ||
                       staticCaption.includes('Image content analysis unavailable') ||
                       staticCaption.length < 20;
      
      if (isGeneric) {
        const issue: CaptionIssue = {
          imageSrc,
          projectId: 'global', // Default project ID for now
          currentCaption: staticCaption || 'No caption',
          issueType: (!staticCaption || staticCaption.length < 10) ? 'missing' : 'generic',
          priority: (!staticCaption || staticCaption.length < 10) ? 1 : 2
        };
        
        issues.push(issue);
        console.log(`⚠️ Found caption issue for image ${index + 1}: ${issue.issueType}`);
      } else {
        console.log(`✅ Image ${index + 1} has good caption`);
      }
    });

    // Also scan project data for additional images
    projectsData.forEach((project) => {
      if (project.image) {
        const staticCaption = getImageCaption(project.image);
        const isGeneric = !staticCaption || 
                         staticCaption === "Professional project showcase demonstrating innovative solutions and user-centered design" ||
                         staticCaption.includes('Professional design showcase') ||
                         staticCaption.includes('newly added') ||
                         staticCaption.length < 20;
        
        if (isGeneric) {
          issues.push({
            imageSrc: project.image,
            projectId: project.id,
            currentCaption: staticCaption || 'No caption',
            issueType: (!staticCaption || staticCaption.length < 10) ? 'missing' : 'generic',
            priority: (!staticCaption || staticCaption.length < 10) ? 1 : 2
          });
        }
      }
    });
    
    // Sort by priority (missing captions first)
    const sortedIssues = issues.sort((a, b) => a.priority - b.priority);
    
    console.log(`🔍 ImageScanner: Found ${sortedIssues.length} caption issues to fix`);
    console.log(`📊 Breakdown: ${sortedIssues.filter(i => i.issueType === 'missing').length} missing, ${sortedIssues.filter(i => i.issueType === 'generic').length} generic`);
    
    return sortedIssues;
  }, []);

  return {
    scanAllProjects,
    canScan,
    markScanStart,
    markScanEnd
  };
};
