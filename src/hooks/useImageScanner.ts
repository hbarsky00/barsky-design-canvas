
import { useCallback, useRef } from 'react';
import { getImageCaption } from '@/data/imageCaptions';
import { projectsData } from '@/data/projects/projectsList';
import { investorLoanAppDetails } from '@/data/project-details/investorLoanApp';

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
          projectId: 'investor-loan-app', // Focus on investor project
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

    // Specifically scan investor loan app project data
    if (investorLoanAppDetails.availableImages) {
      console.log('🎯 Scanning investor loan app specific images...');
      investorLoanAppDetails.availableImages.forEach((imagePath, index) => {
        const staticCaption = getImageCaption(imagePath);
        const isGeneric = !staticCaption || 
                         staticCaption === "Professional project showcase demonstrating innovative solutions and user-centered design" ||
                         staticCaption.includes('Professional design showcase') ||
                         staticCaption.includes('newly added') ||
                         staticCaption.length < 20;
        
        if (isGeneric) {
          const issue: CaptionIssue = {
            imageSrc: imagePath,
            projectId: 'investor-loan-app',
            currentCaption: staticCaption || 'No caption',
            issueType: (!staticCaption || staticCaption.length < 10) ? 'missing' : 'generic',
            priority: (!staticCaption || staticCaption.length < 10) ? 1 : 2
          };
          
          issues.push(issue);
          console.log(`⚠️ Found investor project caption issue ${index + 1}: ${issue.issueType} for ${imagePath.substring(0, 30)}...`);
        }
      });
    }

    // Also scan general project data
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
    
    // Remove duplicates and sort by priority
    const uniqueIssues = issues.filter((issue, index, self) => 
      index === self.findIndex(i => i.imageSrc === issue.imageSrc)
    );
    
    const sortedIssues = uniqueIssues.sort((a, b) => a.priority - b.priority);
    
    console.log(`🔍 ImageScanner: Found ${sortedIssues.length} unique caption issues to fix`);
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
