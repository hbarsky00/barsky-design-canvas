
import { useCallback, useRef } from 'react';
import { getImageCaption } from '@/data/imageCaptions';
import { projectsData } from '@/data/projectsData';


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
  const SCAN_COOLDOWN = 5000; // 5 seconds between scans (more frequent)

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
    console.log('🔍 ImageScanner: Starting comprehensive scan for caption issues across ALL PROJECTS...');
    
    const issues: CaptionIssue[] = [];
    
    // Get all image elements from the current page
    const imageElements = document.querySelectorAll('img[src*="/lovable-uploads/"]');
    console.log(`🔍 Found ${imageElements.length} images on current page to scan`);
    
    imageElements.forEach((img, index) => {
      const imageSrc = (img as HTMLImageElement).src;
      const staticCaption = getImageCaption(imageSrc);
      
      console.log(`📋 Scanning page image ${index + 1}: ${imageSrc.substring(0, 50)}...`);
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
          projectId: 'general', // General project for page images
          currentCaption: staticCaption || 'No caption',
          issueType: (!staticCaption || staticCaption.length < 10) ? 'missing' : 'generic',
          priority: (!staticCaption || staticCaption.length < 10) ? 1 : 2
        };
        
        issues.push(issue);
        console.log(`⚠️ Found caption issue for page image ${index + 1}: ${issue.issueType}`);
      } else {
        console.log(`✅ Page image ${index + 1} has good caption`);
      }
    });

    // Scan ALL projects in the projectsData array
    console.log('🎯 Scanning ALL project data for caption issues...');
    projectsData.forEach((project, projectIndex) => {
      console.log(`📁 Scanning project ${projectIndex + 1}: ${project.title} (${project.id})`);
      
      // Scan main project image
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
          console.log(`⚠️ Found caption issue for ${project.title} main image: ${(!staticCaption || staticCaption.length < 10) ? 'missing' : 'generic'}`);
        } else {
          console.log(`✅ ${project.title} main image has good caption`);
        }
      }
    });

    // Note: Updated to use main projectsData source for consistency
    
    // Remove duplicates and sort by priority
    const uniqueIssues = issues.filter((issue, index, self) => 
      index === self.findIndex(i => i.imageSrc === issue.imageSrc)
    );
    
    const sortedIssues = uniqueIssues.sort((a, b) => a.priority - b.priority);
    
    console.log(`🔍 ImageScanner: Found ${sortedIssues.length} unique caption issues across ALL PROJECTS`);
    console.log(`📊 Breakdown: ${sortedIssues.filter(i => i.issueType === 'missing').length} missing, ${sortedIssues.filter(i => i.issueType === 'generic').length} generic`);
    
    // Log project distribution
    const projectCounts = sortedIssues.reduce((acc, issue) => {
      acc[issue.projectId] = (acc[issue.projectId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    console.log('📊 Issues by project:', projectCounts);
    
    return sortedIssues;
  }, []);

  return {
    scanAllProjects,
    canScan,
    markScanStart,
    markScanEnd
  };
};
