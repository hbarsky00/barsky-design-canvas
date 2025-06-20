
import { useCallback, useRef } from 'react';
import { useSimpleCaptions } from './useSimpleCaptions';
import { getImageCaption } from '@/data/imageCaptions';

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
  const SCAN_COOLDOWN = 30000; // 30 seconds between scans

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
    
    imageElements.forEach((img) => {
      const imageSrc = (img as HTMLImageElement).src;
      const staticCaption = getImageCaption(imageSrc);
      
      // Check if this is a generic or poor quality caption that needs AI improvement
      const isGeneric = staticCaption === "Professional project showcase demonstrating innovative solutions and user-centered design" ||
                       staticCaption.includes('Professional design showcase') ||
                       staticCaption.includes('newly added') ||
                       staticCaption.length < 20;
      
      if (isGeneric) {
        issues.push({
          imageSrc,
          projectId: 'global', // Default project ID for now
          currentCaption: staticCaption,
          issueType: staticCaption.length < 10 ? 'missing' : 'generic',
          priority: staticCaption.length < 10 ? 1 : 2
        });
      }
    });
    
    // Sort by priority (missing captions first)
    const sortedIssues = issues.sort((a, b) => a.priority - b.priority);
    
    console.log(`🔍 ImageScanner: Found ${sortedIssues.length} caption issues to fix`);
    return sortedIssues;
  }, []);

  return {
    scanAllProjects,
    canScan,
    markScanStart,
    markScanEnd
  };
};
