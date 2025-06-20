
import React from 'react';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

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
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generateAiCaption = async (imageSrc: string): Promise<string> => {
    try {
      console.log('🤖 ContentBlockActions: Generating AI caption for:', imageSrc.substring(0, 30) + '...');
      setIsGenerating(true);
      
      const response = await fetch('/functions/v1/generate-image-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ 
          imageSrc,
          contextType: 'project'
        }),
      });

      if (!response.ok) {
        throw new Error(`AI caption generation failed: ${response.status}`);
      }

      const data = await response.json();
      const caption = data.caption || 'Professional project showcase demonstrating innovative solutions and user-centered design';
      
      console.log('✅ ContentBlockActions: AI caption generated:', caption.substring(0, 50) + '...');
      return caption;
    } catch (error) {
      console.warn('⚠️ ContentBlockActions: AI caption generation failed, using fallback:', error);
      return 'Professional project showcase demonstrating innovative solutions and user-centered design';
    } finally {
      setIsGenerating(false);
    }
  };

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

  const createNewBlock = async (type: 'text' | 'image' | 'header' | 'video' | 'pdf'): Promise<ContentBlock> => {
    console.log('🆕 ContentBlockActions: Creating new block of type:', type);
    
    switch (type) {
      case 'text':
        console.log('📝 Creating text block');
        return Promise.resolve({ type: 'text', value: 'This is a new paragraph. Click to edit me.' });
      case 'image': {
        console.log('🖼️ Creating image block with AI caption generation');
        const defaultImageSrc = '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png';
        // Generate AI caption for the default image
        const aiCaption = await generateAiCaption(defaultImageSrc);
        return { 
          type: 'image', 
          src: defaultImageSrc,
          caption: aiCaption
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
          caption: 'Embedded video content showcasing project features and functionality'
        });
      }
      case 'pdf': {
        console.log('📄 Creating PDF block with AI caption generation');
        const defaultPdfSrc = '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png';
        const aiCaption = await generateAiCaption(defaultPdfSrc);
        return { 
          type: 'pdf', 
          src: defaultPdfSrc,
          caption: aiCaption || 'Comprehensive documentation outlining project specifications and technical requirements'
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
    const aiCaption = await generateAiCaption(newSrc);
    
    const updatedBlocks = contentBlocks.map((block, i) => 
      i === index && block.type === 'image'
        ? { ...block, src: newSrc, caption: aiCaption }
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

  const updateGenericCaptions = async (blocks: ContentBlock[], updateCallback: (index: number, newCaption: string) => void) => {
    console.log('🔍 Scanning for images that need AI caption generation...');
    
    const blocksToUpdate = blocks
      .map((block, index) => ({ block, index }))
      .filter(({ block }) => 
        (block.type === 'image' || block.type === 'pdf') && 
        block.src && 
        (block.caption === 'A newly added image.' || 
         block.caption === 'This is a new image. Click to edit me.' ||
         block.caption?.includes('newly added') ||
         !block.caption || 
         block.caption.length < 10)
      );

    if (blocksToUpdate.length === 0) {
      console.log('✅ No images found that need AI caption generation');
      return;
    }

    console.log(`🚀 Starting AI caption generation for ${blocksToUpdate.length} images...`);
    
    for (const { block, index } of blocksToUpdate) {
      try {
        console.log(`🖼️ Generating caption for image ${index + 1}/${blocksToUpdate.length}:`, block.src.substring(0, 50) + '...');
        
        const aiCaption = await generateAiCaption(block.src);
        
        console.log(`📝 Updating caption for image ${index}:`, aiCaption);
        updateCallback(index, aiCaption);
        
        // Add delay to avoid overwhelming the API
        if (blocksToUpdate.length > 1) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      } catch (error) {
        console.error(`❌ Failed to generate caption for image at index ${index}:`, error);
      }
    }
    
    console.log('✅ AI caption generation batch complete');
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
