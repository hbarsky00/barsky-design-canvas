
import { useEnhancedAiImageCaptions } from '@/hooks/useEnhancedAiImageCaptions';

interface ImageIssue {
  imageSrc: string;
  projectId: string;
  projectTitle: string;
  issueType: 'missing' | 'poor_quality' | 'generic' | 'needs_update';
  currentCaption?: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export const useAutoFixer = () => {
  const { generateSingleCaption } = useEnhancedAiImageCaptions();

  const autoFixIssues = async (issues: ImageIssue[]): Promise<number> => {
    const highPriorityIssues = issues.filter(issue => issue.priority === 'high');
    
    if (highPriorityIssues.length === 0) {
      return 0;
    }

    console.log(`🔧 Auto-fixing ${highPriorityIssues.length} high priority caption issues...`);
    
    let fixedCount = 0;
    for (const issue of highPriorityIssues.slice(0, 2)) {
      try {
        const newCaption = await generateSingleCaption(issue.imageSrc, 'descriptive', 'project');
        
        const captionKey = `img_caption_${issue.imageSrc}`;
        const storageKey = `image_captions_${issue.projectId}`;
        const existingCaptions = JSON.parse(localStorage.getItem(storageKey) || '{}');
        existingCaptions[captionKey] = newCaption;
        localStorage.setItem(storageKey, JSON.stringify(existingCaptions));
        
        console.log(`✅ Auto-fixed caption for ${issue.imageSrc.substring(0, 30)}...`);
        fixedCount++;
        
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`❌ Failed to auto-fix caption for ${issue.imageSrc}:`, error);
      }
    }

    return fixedCount;
  };

  return { autoFixIssues };
};
