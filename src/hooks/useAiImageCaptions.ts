
import { useState } from 'react';

interface AiCaptionResponse {
  caption: string;
  error?: string;
}

export const useAiImageCaptions = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCaption = async (imageSrc: string): Promise<AiCaptionResponse> => {
    setIsGenerating(true);
    
    try {
      console.log('🤖 Requesting AI caption for:', imageSrc);
      
      const response = await fetch('/api/generate-image-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageSrc }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate caption');
      }

      const data = await response.json();
      console.log('✅ AI caption received:', data.caption);
      
      return { caption: data.caption };
    } catch (error) {
      console.error('❌ Error generating AI caption:', error);
      return { 
        caption: 'Professional design showcase demonstrating innovative solutions and user-centered approach',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    } finally {
      setIsGenerating(false);
    }
  };

  const updateGenericCaptions = async (contentBlocks: any[], updateCallback: (index: number, newCaption: string) => void) => {
    console.log('🔍 Checking for generic captions to update...');
    
    for (let i = 0; i < contentBlocks.length; i++) {
      const block = contentBlocks[i];
      
      // Check if this block has a generic caption that needs updating
      if (block.type === 'image' && block.src && 
          (block.caption === 'A newly added image.' || 
           block.caption === 'This is a new image. Click to edit me.' ||
           !block.caption || 
           block.caption.includes('newly added'))) {
        
        console.log(`🖼️ Updating generic caption for image block ${i}:`, block.src);
        
        try {
          const aiCaption = await generateCaption(block.src);
          updateCallback(i, aiCaption.caption);
          
          // Add a small delay to avoid overwhelming the API
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.error(`❌ Failed to update caption for block ${i}:`, error);
        }
      }
    }
  };

  return {
    generateCaption,
    updateGenericCaptions,
    isGenerating
  };
};
