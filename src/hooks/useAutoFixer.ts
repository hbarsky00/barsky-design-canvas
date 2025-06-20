
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
    const maxIssues = Math.min(issues.length, 15); // Increased to 15 at a time
    
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
          // Dispatch multiple events to ensure UI updates
          window.dispatchEvent(new CustomEvent('aiCaptionGenerated', {
            detail: {
              imageSrc: issue.imageSrc,
              caption: newCaption,
              projectId: issue.projectId,
              timestamp: Date.now()
            }
          }));
          
          window.dispatchEvent(new CustomEvent('aiCaptionUpdated', {
            detail: {
              imageSrc: issue.imageSrc,
              caption: newCaption,
              projectId: issue.projectId,
              timestamp: Date.now()
            }
          }));
          
          // Also dispatch to SimpleCaptionEditor specifically
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('forceComponentRefresh', {
              detail: { captionsUpdated: true, timestamp: Date.now() }
            }));
          }, 200);
          
          fixedCount++;
          console.log(`✅ AutoFixer: Fixed caption ${i + 1}/${maxIssues} - "${newCaption.substring(0, 50)}..."`);
          
          // Reduced delay to process faster
          if (i < maxIssues - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
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
