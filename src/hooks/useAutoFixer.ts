
import { useCallback } from 'react';
import { useEnhancedAiImageCaptions } from './useEnhancedAiImageCaptions';

interface CaptionIssue {
  imageSrc: string;
  projectId: string;
  currentCaption: string;
  issueType: 'missing' | 'generic' | 'poor_quality';
  priority: number;
}

export const useAutoFixer = () => {
  const { generateSingleCaption } = useEnhancedAiImageCaptions();

  const autoFixIssues = useCallback(async (issues: CaptionIssue[]): Promise<number> => {
    console.log(`🔧 AutoFixer: Starting to fix ${issues.length} caption issues...`);
    
    let fixedCount = 0;
    const maxIssues = Math.min(issues.length, 10); // Reduced to 10 at a time to prevent overwhelming
    
    for (let i = 0; i < maxIssues; i++) {
      const issue = issues[i];
      
      try {
        console.log(`🔄 AutoFixer: Fixing caption ${i + 1}/${maxIssues} for:`, issue.imageSrc.substring(0, 30) + '...');
        
        // Generate AI caption
        const newCaption = await generateSingleCaption(
          issue.imageSrc, 
          'descriptive', 
          'project'
        );
        
        if (newCaption && newCaption.length > 10) {
          // Single event dispatch for immediate UI update
          window.dispatchEvent(new CustomEvent('aiCaptionGenerated', {
            detail: {
              imageSrc: issue.imageSrc,
              caption: newCaption,
              projectId: issue.projectId,
              timestamp: Date.now(),
              autoPublish: true // Flag to indicate this should be auto-published
            }
          }));
          
          fixedCount++;
          console.log(`✅ AutoFixer: Fixed caption ${i + 1}/${maxIssues} - "${newCaption.substring(0, 50)}..."`);
          
          // Increased delay to prevent rapid updates
          if (i < maxIssues - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
          }
        } else {
          console.warn(`⚠️ AutoFixer: Generated caption was too short or empty for:`, issue.imageSrc.substring(0, 30) + '...');
        }
        
      } catch (error) {
        console.error(`❌ AutoFixer: Failed to fix caption for:`, issue.imageSrc.substring(0, 30) + '...', error);
      }
    }
    
    console.log(`✅ AutoFixer: Completed fixing ${fixedCount}/${maxIssues} caption issues`);
    
    if (issues.length > maxIssues) {
      console.log(`📋 AutoFixer: ${issues.length - maxIssues} more issues will be processed in the next scan cycle`);
    }
    
    return fixedCount;
  }, [generateSingleCaption]);

  return {
    autoFixIssues
  };
};
