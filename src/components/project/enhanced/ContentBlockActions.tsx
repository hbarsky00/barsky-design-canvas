
import React from 'react';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';
import { useAiImageCaptions } from '@/hooks/useAiImageCaptions';

interface ContentBlockActionsProps {
  onAdd: (type: 'text' | 'image' | 'header' | 'video' | 'pdf', position?: number) => void;
  onUpdate: (index: number, newValue: string) => void;
  onDelete: (index: number) => void;
  onImageReplace: (index: number, newSrc: string) => void;
  onVideoUrlUpdate?: (index: number, newUrl: string) => void;
}

export const useContentBlockActions = (
  contentBlocks: ContentBlock[],
  setContentBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>,
  saveContentBlocks: (blocks: ContentBlock[]) => Promise<void>
) => {
  const { generateCaption, updateGenericCaptions, isGenerating } = useAiImageCaptions();

  // Function to update a caption for a specific block
  const updateBlockCaption = async (index: number, newCaption: string) => {
    const updatedBlocks = contentBlocks.map((block, i) => 
      i === index && (block.type === 'image' || block.type === 'video' || block.type === 'pdf')
        ? { ...block, caption: newCaption }
        : block
    );
    setContentBlocks(updatedBlocks);
    await saveContentBlocks(updatedBlocks);
  };

  // Auto-update generic captions on component mount or when blocks change
  React.useEffect(() => {
    const hasGenericCaptions = contentBlocks.some(block => 
      (block.type === 'image' || block.type === 'video' || block.type === 'pdf') && 
      block.src &&
      (block.caption === 'A newly added image.' || 
       block.caption === 'This is a new image. Click to edit me.' ||
       !block.caption || 
       block.caption.includes('newly added'))
    );

    if (hasGenericCaptions && !isGenerating) {
      console.log('🚀 Auto-updating generic captions...');
      updateGenericCaptions(contentBlocks, updateBlockCaption);
    }
  }, [contentBlocks.length]); // Only run when blocks are added/removed

  const createNewBlock = async (type: 'text' | 'image' | 'header' | 'video' | 'pdf'): Promise<ContentBlock> => {
    console.log('🆕 ContentBlockActions: Creating new block of type:', type);
    
    switch (type) {
      case 'text':
        console.log('📝 Creating text block');
        return Promise.resolve({ type: 'text', value: 'This is a new paragraph. Click to edit me.' });
      case 'image': {
        console.log('🖼️ Creating image block');
        const defaultImageSrc = '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png';
        // Generate AI caption for the default image
        const aiCaption = await generateCaption(defaultImageSrc);
        return { 
          type: 'image', 
          src: defaultImageSrc,
          caption: aiCaption.caption
        };
      }
      case 'header':
        console.log('📋 Creating header block');
        return Promise.resolve({ type: 'header', value: 'New Header', level: 2 });
      case 'video': {
        console.log('🎥 Creating video block');
        return Promise.resolve({ 
          type: 'video', 
          embedUrl: 'placeholder',
          caption: 'Embedded video content'
        });
      }
      case 'pdf': {
        console.log('📄 Creating PDF block');
        const defaultPdfSrc = '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png';
        const aiCaption = await generateCaption(defaultPdfSrc);
        return { 
          type: 'pdf', 
          src: defaultPdfSrc,
          caption: aiCaption.caption || 'Comprehensive documentation outlining project specifications and technical requirements'
        };
      }
      default:
        console.log('❓ Creating default text block');
        return Promise.resolve({ type: 'text', value: 'This is a new paragraph. Click to edit me.' });
    }
  };

  const handleAddContent = async (type: 'text' | 'image' | 'header' | 'video' | 'pdf', position?: number) => {
    console.log('➕ ContentBlockActions: Adding new content of type:', type, 'at position:', position);
    
    try {
      const newBlock = await createNewBlock(type);
      console.log('📦 ContentBlockActions: New block created:', newBlock);
      
      let updatedBlocks: ContentBlock[];
      
      if (position !== undefined) {
        // Insert at specific position
        updatedBlocks = [...contentBlocks];
        updatedBlocks.splice(position, 0, newBlock);
      } else {
        // Add at end
        updatedBlocks = [...contentBlocks, newBlock];
      }
      
      console.log('📋 ContentBlockActions: Updated blocks list:', updatedBlocks);
      
      // Update state immediately for instant UI feedback
      setContentBlocks(updatedBlocks);
      
      // Save content blocks to database
      await saveContentBlocks(updatedBlocks);
      
      console.log('✅ ContentBlockActions: Content blocks updated and saved');
    } catch (error) {
      console.error('❌ ContentBlockActions: Error adding content:', error);
    }
  };

  const handleUpdateContent = async (index: number, newValue: string) => {
    console.log('✏️ ContentBlockActions: Updating content at index:', index, 'with value:', newValue);
    const updatedBlocks = contentBlocks.map((block, i) => 
      i === index && (block.type === 'text' || block.type === 'header') 
        ? { ...block, value: newValue }
        : block
    );
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    await saveContentBlocks(updatedBlocks);
  };

  const handleDeleteContent = async (index: number) => {
    console.log('🗑️ ContentBlockActions: Deleting content at index:', index);
    const updatedBlocks = contentBlocks.filter((_, i) => i !== index);
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    await saveContentBlocks(updatedBlocks);
  };

  const handleContentImageReplace = async (index: number, newSrc: string, projectId: string, saveImageReplacement: (oldSrc: string, newSrc: string) => void, updateImageInProjectData: (projectId: string, oldSrc: string, newSrc: string) => void) => {
    console.log('🔄 ContentBlockActions: Replacing content image at index', index, 'with', newSrc, 'for project', projectId);
    
    const oldBlock = contentBlocks[index];
    
    // Generate AI caption for the new image
    const aiCaption = await generateCaption(newSrc);
    
    const updatedBlocks = contentBlocks.map((block, i) => 
      i === index && block.type === 'image'
        ? { ...block, src: newSrc, caption: aiCaption.caption }
        : block
    );
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    await saveContentBlocks(updatedBlocks);
    
    if (projectId && oldBlock && oldBlock.type === 'image' && oldBlock.src) {
      saveImageReplacement(oldBlock.src, newSrc);
      updateImageInProjectData(projectId, oldBlock.src, newSrc);
    }
  };

  const handleVideoUrlUpdate = async (index: number, newUrl: string) => {
    console.log('🎥 ContentBlockActions: Updating video URL at index', index, 'with', newUrl);
    
    const updatedBlocks = contentBlocks.map((block, i) => 
      i === index && block.type === 'video'
        ? { ...block, embedUrl: newUrl }
        : block
    );
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    await saveContentBlocks(updatedBlocks);
  };

  return {
    handleAddContent,
    handleUpdateContent,
    handleDeleteContent,
    handleContentImageReplace,
    handleVideoUrlUpdate,
    updateGenericCaptions: () => updateGenericCaptions(contentBlocks, updateBlockCaption),
    isGeneratingCaption: isGenerating
  };
};
