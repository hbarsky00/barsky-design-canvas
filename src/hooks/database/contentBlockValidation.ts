
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

const MAX_CONTENT_BLOCK_SIZE_KB = 500; // 500KB limit for content blocks
const MAX_TOTAL_CONTENT_SIZE_KB = 2000; // 2MB total limit for all content blocks

export const validateContentBlockSize = (blocks: ContentBlock[]): { isValid: boolean; error?: string } => {
  try {
    const serialized = JSON.stringify(blocks);
    const sizeInKB = new Blob([serialized]).size / 1024;
    
    console.log(`📏 Content blocks size validation: ${sizeInKB.toFixed(2)}KB`);
    
    if (sizeInKB > MAX_TOTAL_CONTENT_SIZE_KB) {
      return {
        isValid: false,
        error: `Content blocks are too large (${sizeInKB.toFixed(2)}KB). Maximum allowed size is ${MAX_TOTAL_CONTENT_SIZE_KB}KB. Please reduce content or use image uploads for large images.`
      };
    }
    
    // Check individual blocks for very large content
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const blockSize = new Blob([JSON.stringify(block)]).size / 1024;
      
      if (blockSize > MAX_CONTENT_BLOCK_SIZE_KB) {
        return {
          isValid: false,
          error: `Content block ${i + 1} is too large (${blockSize.toFixed(2)}KB). Maximum allowed size per block is ${MAX_CONTENT_BLOCK_SIZE_KB}KB.`
        };
      }
      
      // Check for base64 images in content blocks
      if (block.type === 'image' && block.src && block.src.startsWith('data:')) {
        return {
          isValid: false,
          error: `Content block ${i + 1} contains base64 image data. Please use the image upload functionality to store images in cloud storage.`
        };
      }
    }
    
    return { isValid: true };
  } catch (error) {
    console.error('❌ Error validating content block size:', error);
    return {
      isValid: false,
      error: 'Failed to validate content block size. Please try again.'
    };
  }
};

export const sanitizeContentBlocks = (blocks: ContentBlock[]): ContentBlock[] => {
  return blocks.map(block => {
    // Remove any base64 images and replace with placeholder
    if (block.type === 'image' && block.src && block.src.startsWith('data:')) {
      console.log('⚠️ Removing base64 image from content block, replacing with placeholder');
      return {
        ...block,
        src: '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png', // Placeholder image
        caption: block.caption || 'Image upload required'
      };
    }
    
    // Truncate very long text content
    if ((block.type === 'text' || block.type === 'header') && block.value && block.value.length > 10000) {
      console.log('⚠️ Truncating very long text content in content block');
      return {
        ...block,
        value: block.value.substring(0, 10000) + '... (content truncated)'
      };
    }
    
    return block;
  });
};
