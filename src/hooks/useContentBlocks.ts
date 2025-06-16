
import { useState } from 'react';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';
import { ProjectImageConfig } from '@/data/types/project';

interface UseContentBlocksProps {
  content: string | ContentBlock[];
  sectionKey: keyof ProjectImageConfig;
  imageConfig?: ProjectImageConfig;
  imageCaptions: Record<string, string>;
}

export const useContentBlocks = ({
  content,
  sectionKey,
  imageConfig,
  imageCaptions
}: UseContentBlocksProps) => {
  // Convert string content to array format and include images from imageConfig
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(() => {
    const blocks: ContentBlock[] = [];
    
    // Add text content
    if (typeof content === 'string') {
      blocks.push({ type: 'text', value: content });
    } else {
      blocks.push(...content);
    }
    
    // Add images from imageConfig if they exist
    const sectionImages = imageConfig?.[sectionKey];
    if (sectionImages?.beforeHeader) {
      blocks.push({ 
        type: 'image', 
        src: sectionImages.beforeHeader, 
        caption: imageCaptions[sectionImages.beforeHeader] 
      });
    }
    if (sectionImages?.afterHeader) {
      blocks.push({ 
        type: 'image', 
        src: sectionImages.afterHeader, 
        caption: imageCaptions[sectionImages.afterHeader] 
      });
    }
    
    return blocks;
  });

  const [beforeHeaderBlocks, setBeforeHeaderBlocks] = useState<ContentBlock[]>([]);
  const [afterHeaderBlocks, setAfterHeaderBlocks] = useState<ContentBlock[]>([]);

  const createNewBlock = (type: 'text' | 'image' | 'header' | 'video' | 'pdf'): ContentBlock => {
    switch (type) {
      case 'text':
        return { type: 'text', value: 'This is a new paragraph. Click to edit me.' };
      case 'image':
        return { type: 'image', src: '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png', caption: 'A newly added image.' };
      case 'header':
        return { type: 'header', value: 'New Header', level: 2 };
      case 'video':
        return { type: 'video', src: '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png', caption: 'A newly added video.' };
      case 'pdf':
        return { type: 'pdf', src: '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png', caption: 'A newly added PDF document.' };
      default:
        return { type: 'text', value: 'This is a new paragraph. Click to edit me.' };
    }
  };

  return {
    contentBlocks,
    setContentBlocks,
    beforeHeaderBlocks,
    setBeforeHeaderBlocks,
    afterHeaderBlocks,
    setAfterHeaderBlocks,
    createNewBlock
  };
};
