
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

export const isValidContentBlock = (obj: any): obj is ContentBlock => {
  return obj && 
         typeof obj === 'object' && 
         typeof obj.type === 'string' && 
         ['text', 'image', 'header', 'video', 'pdf'].includes(obj.type);
};

export const validateAndFilterContentBlocks = (changeValue: any[]): ContentBlock[] => {
  if (!Array.isArray(changeValue)) {
    console.warn('⚠️ validateAndFilterContentBlocks: Expected array, got:', typeof changeValue);
    return [];
  }

  const validBlocks = changeValue.filter(isValidContentBlock);
  
  if (validBlocks.length !== changeValue.length) {
    console.warn('⚠️ validateAndFilterContentBlocks: Invalid content blocks found, filtering out invalid ones');
  }

  // Convert from unknown to ContentBlock[] safely
  return validBlocks.map(block => block as ContentBlock);
};
