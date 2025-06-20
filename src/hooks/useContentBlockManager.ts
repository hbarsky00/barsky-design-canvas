
import React from 'react';
import { useProjectPersistence } from '@/hooks/useProjectPersistence';
import { useAiImageCaptions } from '@/hooks/useAiImageCaptions';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

export const useContentBlockManager = (projectId: string, sectionKey: string) => {
  const { saveContentBlocks, getProjectData } = useProjectPersistence(projectId);
  const { generateCaption, updateGenericCaptions } = useAiImageCaptions();
  
  const [contentBlocks, setContentBlocks] = React.useState<ContentBlock[]>(() => {
    const savedData = getProjectData();
    return savedData.contentBlocks[sectionKey] || [];
  });

  React.useEffect(() => {
    const updateBlockCaption = async (index: number, newCaption: string) => {
      const updatedBlocks = contentBlocks.map((block, i) => 
        i === index && (block.type === 'image' || block.type === 'video' || block.type === 'pdf')
          ? { ...block, caption: newCaption }
          : block
      );
      setContentBlocks(updatedBlocks);
      await saveContentBlocks(sectionKey, updatedBlocks);
    };

    const hasGenericCaptions = contentBlocks.some(block => 
      (block.type === 'image' || block.type === 'video' || block.type === 'pdf') && 
      block.src &&
      (block.caption === 'A newly added image.' || 
       block.caption === 'This is a new image. Click to edit me.' ||
       !block.caption || 
       block.caption.includes('newly added'))
    );

    if (hasGenericCaptions && contentBlocks.length > 0) {
      console.log(`🚀 Auto-updating generic captions in ${sectionKey} section...`);
      updateGenericCaptions(contentBlocks, updateBlockCaption);
    }
  }, [contentBlocks.length, sectionKey, saveContentBlocks, updateGenericCaptions]);

  React.useEffect(() => {
    const handleProjectDataUpdate = () => {
      console.log(`${sectionKey}: Project data updated, reloading content blocks`);
      const savedData = getProjectData();
      setContentBlocks(savedData.contentBlocks[sectionKey] || []);
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate);
    };
  }, [getProjectData, sectionKey]);

  const createNewBlock = async (type: 'text' | 'image' | 'header' | 'video' | 'pdf'): Promise<ContentBlock> => {
    switch (type) {
      case 'text':
        return { type: 'text', value: 'This is a new paragraph. Click to edit me.' };
      case 'image': {
        const defaultImageSrc = '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png';
        const aiCaption = await generateCaption(defaultImageSrc);
        return { 
          type: 'image', 
          src: defaultImageSrc, 
          caption: aiCaption.caption
        };
      }
      case 'header':
        return { type: 'header', value: 'New Header', level: 2 };
      case 'video': {
        return { 
          type: 'video', 
          embedUrl: 'placeholder', 
          caption: 'Embedded video content'
        };
      }
      case 'pdf': {
        const defaultPdfSrc = '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png';
        const aiCaption = await generateCaption(defaultPdfSrc);
        return { 
          type: 'pdf', 
          src: defaultPdfSrc, 
          caption: aiCaption.caption || 'Comprehensive project documentation and technical specifications'
        };
      }
      default:
        return { type: 'text', value: 'This is a new paragraph. Click to edit me.' };
    }
  };

  return {
    contentBlocks,
    setContentBlocks,
    createNewBlock,
    saveContentBlocks: (blocks: ContentBlock[]) => saveContentBlocks(sectionKey, blocks)
  };
};
