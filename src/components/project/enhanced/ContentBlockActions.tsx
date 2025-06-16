
import React from 'react';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

interface ContentBlockActionsProps {
  onAdd: (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => void;
  onUpdate: (index: number, newValue: string) => void;
  onDelete: (index: number) => void;
  onImageReplace: (index: number, newSrc: string) => void;
}

export const useContentBlockActions = (
  contentBlocks: ContentBlock[],
  setContentBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>,
  saveContentBlocks: (blocks: ContentBlock[]) => Promise<void>
) => {
  const createNewBlock = (type: 'text' | 'image' | 'header' | 'video' | 'pdf'): ContentBlock => {
    console.log('🆕 ContentBlockActions: Creating new block of type:', type);
    
    switch (type) {
      case 'text':
        return { type: 'text', value: 'This is a new paragraph. Click to edit me.' };
      case 'image':
        return { type: 'image', caption: 'A newly added image.' };
      case 'header':
        return { type: 'header', value: 'New Header', level: 2 };
      case 'video':
        return { type: 'video', caption: 'A newly added video.' };
      case 'pdf':
        return { type: 'pdf', caption: 'A newly added PDF document.' };
      default:
        return { type: 'text', value: 'This is a new paragraph. Click to edit me.' };
    }
  };

  const handleAddContent = async (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => {
    console.log('➕ ContentBlockActions: Adding new content of type:', type);
    const newBlock = createNewBlock(type);
    console.log('📦 ContentBlockActions: New block created:', newBlock);
    
    const updatedBlocks = [...contentBlocks, newBlock];
    console.log('📋 ContentBlockActions: Updated blocks list:', updatedBlocks);
    
    // Update state immediately for instant UI feedback
    setContentBlocks(updatedBlocks);
    
    // Save content blocks to database
    await saveContentBlocks(updatedBlocks);
    
    console.log('✅ ContentBlockActions: Content blocks updated and saved');
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
    const updatedBlocks = contentBlocks.map((block, i) => 
      i === index && block.type === 'image'
        ? { ...block, src: newSrc }
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

  return {
    handleAddContent,
    handleUpdateContent,
    handleDeleteContent,
    handleContentImageReplace
  };
};
