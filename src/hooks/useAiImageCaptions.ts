
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
      console.log('🔍 Analyzing image content for:', imageSrc.substring(0, 50) + '...');
      
      const response = await fetch('/api/generate-image-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageSrc }),
      });

      if (!response.ok) {
        throw new Error(`Failed to analyze image: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ AI image analysis complete:', data.caption);
      
      return { caption: data.caption };
    } catch (error) {
      console.error('❌ Error analyzing image content:', error);
      return { 
        caption: 'Unable to analyze image content - please add a custom description',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    } finally {
      setIsGenerating(false);
    }
  };

  const updateGenericCaptions = async (contentBlocks: any[], updateCallback: (index: number, newCaption: string) => void) => {
    console.log('🔍 Scanning for images that need AI analysis...');
    
    const blocksToUpdate = contentBlocks
      .map((block, index) => ({ block, index }))
      .filter(({ block }) => 
        (block.type === 'image' || block.type === 'video' || block.type === 'pdf') && 
        block.src && 
        (block.caption === 'A newly added image.' || 
         block.caption === 'This is a new image. Click to edit me.' ||
         block.caption?.includes('newly added') ||
         block.caption?.includes('Professional design showcase') ||
         !block.caption || 
         block.caption.length < 10)
      );

    if (blocksToUpdate.length === 0) {
      console.log('✅ No images found that need AI analysis');
      return;
    }

    console.log(`🚀 Starting AI analysis for ${blocksToUpdate.length} images...`);
    
    for (const { block, index } of blocksToUpdate) {
      try {
        console.log(`🖼️ Analyzing image ${index + 1}/${blocksToUpdate.length}:`, block.src.substring(0, 50) + '...');
        
        const aiCaption = await generateCaption(block.src);
        
        if (aiCaption.caption && !aiCaption.error) {
          console.log(`📝 Updating caption for image ${index}:`, aiCaption.caption);
          updateCallback(index, aiCaption.caption);
        } else {
          console.warn(`⚠️ Skipping update for image ${index} due to analysis error`);
        }
        
        // Add delay to avoid overwhelming the API
        if (blocksToUpdate.length > 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`❌ Failed to analyze image at index ${index}:`, error);
      }
    }
    
    console.log('✅ AI image analysis batch complete');
  };

  return {
    generateCaption,
    updateGenericCaptions,
    isGenerating
  };
};
