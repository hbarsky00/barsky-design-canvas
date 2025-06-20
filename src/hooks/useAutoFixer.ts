
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
    
    for (const issue of issues) {
      try {
        console.log(`🔄 AutoFixer: Fixing caption for:`, issue.imageSrc.substring(0, 30) + '...');
        
        // Generate AI caption
        const newCaption = await generateSingleCaption(
          issue.imageSrc, 
          'descriptive', 
          'project'
        );
        
        if (newCaption && newCaption.length > 10) {
          // Dispatch event to update the caption in the UI
          window.dispatchEvent(new CustomEvent('aiCaptionGenerated', {
            detail: {
              imageSrc: issue.imageSrc,
              caption: newCaption,
              projectId: issue.projectId,
              timestamp: Date.now()
            }
          }));
          
          fixedCount++;
          console.log(`✅ AutoFixer: Fixed caption for image ${fixedCount}/${issues.length}`);
          
          // Add delay to avoid overwhelming the API
          if (issues.length > 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } else {
          console.warn(`⚠️ AutoFixer: Generated caption was too short or empty for:`, issue.imageSrc.substring(0, 30) + '...');
        }
        
      } catch (error) {
        console.error(`❌ AutoFixer: Failed to fix caption for:`, issue.imageSrc.substring(0, 30) + '...', error);
      }
    }
    
    console.log(`✅ AutoFixer: Completed fixing ${fixedCount}/${issues.length} caption issues`);
    return fixedCount;
  }, [generateSingleCaption]);

  return {
    autoFixIssues
  };
};
