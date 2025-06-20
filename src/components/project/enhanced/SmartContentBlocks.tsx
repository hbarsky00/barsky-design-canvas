
import React, { useEffect } from 'react';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';
import { useEnhancedAiImageCaptions } from '@/hooks/useEnhancedAiImageCaptions';
import { toast } from 'sonner';

interface SmartContentBlocksProps {
  contentBlocks: ContentBlock[];
  setContentBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>;
  saveContentBlocks: (blocks: ContentBlock[]) => Promise<void>;
  projectId: string;
}

export const SmartContentBlocks: React.FC<SmartContentBlocksProps> = ({
  contentBlocks,
  setContentBlocks,
  saveContentBlocks,
  projectId
}) => {
  const { generateSingleCaption } = useEnhancedAiImageCaptions();

  // Smart caption updates - detect when images change and auto-regenerate
  const updateImageCaption = async (index: number, imageSrc: string, forceUpdate = false) => {
    const block = contentBlocks[index];
    
    if (block.type !== 'image') return;
    
    // Check if caption needs updating
    const needsUpdate = forceUpdate || 
      !block.caption || 
      block.caption === 'A newly added image.' ||
      block.caption === 'This is a new image. Click to edit me.' ||
      block.caption.includes('newly added') ||
      block.caption.length < 10;

    if (!needsUpdate) return;

    try {
      console.log('🔄 SmartContentBlocks: Auto-updating caption for changed image:', imageSrc.substring(0, 30) + '...');
      
      const newCaption = await generateSingleCaption(imageSrc, 'descriptive', 'project');
      
      const updatedBlocks = contentBlocks.map((b, i) => 
        i === index && b.type === 'image'
          ? { ...b, caption: newCaption }
          : b
      );
      
      setContentBlocks(updatedBlocks);
      await saveContentBlocks(updatedBlocks);
      
      console.log('✅ SmartContentBlocks: Auto-updated caption successfully');
    } catch (error) {
      console.error('❌ SmartContentBlocks: Failed to auto-update caption:', error);
    }
  };

  // Detect image changes and trigger smart updates
  useEffect(() => {
    const handleImageChange = (event: CustomEvent) => {
      const { oldSrc, newSrc, immediate } = event.detail;
      
      if (!immediate) return; // Only handle immediate updates
      
      console.log('🔄 SmartContentBlocks: Detected image change, updating captions...');
      
      // Find all content blocks with the old image source
      contentBlocks.forEach((block, index) => {
        if (block.type === 'image' && block.src === oldSrc) {
          // Update the image source first
          const updatedBlocks = contentBlocks.map((b, i) => 
            i === index && b.type === 'image'
              ? { ...b, src: newSrc }
              : b
          );
          setContentBlocks(updatedBlocks);
          
          // Then update the caption
          setTimeout(() => {
            updateImageCaption(index, newSrc, true);
          }, 500);
        }
      });
    };

    window.addEventListener('projectDataUpdated', handleImageChange as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleImageChange as EventListener);
    };
  }, [contentBlocks, setContentBlocks, saveContentBlocks]);

  // Auto-enhance generic captions on mount
  useEffect(() => {
    const enhanceGenericCaptions = async () => {
      const blocksNeedingCaptions = contentBlocks
        .map((block, index) => ({ block, index }))
        .filter(({ block }) => 
          block.type === 'image' && 
          block.src &&
          (!block.caption || 
           block.caption === 'A newly added image.' ||
           block.caption === 'This is a new image. Click to edit me.' ||
           block.caption.includes('newly added') ||
           block.caption.length < 10)
        );

      if (blocksNeedingCaptions.length === 0) return;

      console.log(`🚀 SmartContentBlocks: Auto-enhancing ${blocksNeedingCaptions.length} generic captions...`);
      
      let updatedCount = 0;
      
      for (const { block, index } of blocksNeedingCaptions) {
        try {
          if (block.type === 'image' && block.src) {
            await updateImageCaption(index, block.src, true);
            updatedCount++;
            
            // Add delay to avoid overwhelming the API
            if (blocksNeedingCaptions.length > 1) {
              await new Promise(resolve => setTimeout(resolve, 1500));
            }
          }
        } catch (error) {
          console.error(`❌ SmartContentBlocks: Failed to enhance caption for block ${index}:`, error);
        }
      }
      
      if (updatedCount > 0) {
        toast.success(`Enhanced ${updatedCount} image captions with AI`, {
          description: 'Captions were automatically improved for better accessibility and SEO.'
        });
      }
    };

    // Only run if there are generic captions to enhance
    const hasGenericCaptions = contentBlocks.some(block => 
      block.type === 'image' && 
      block.src &&
      (!block.caption || 
       block.caption === 'A newly added image.' ||
       block.caption.includes('newly added'))
    );

    if (hasGenericCaptions) {
      // Delay the enhancement to avoid running on every render
      const timeoutId = setTimeout(enhanceGenericCaptions, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [contentBlocks.length]); // Only run when blocks are added/removed

  return null; // This is a smart component that handles logic only
};

export default SmartContentBlocks;
