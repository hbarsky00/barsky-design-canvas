
import { ProjectData } from '../persistence/types';

interface DatabaseChange {
  change_type: string;
  change_key: string;
  change_value: string;
}

export const processChangesData = (rawChanges: DatabaseChange[]): ProjectData => {
  const processedData: ProjectData = {
    textContent: {},
    imageReplacements: {},
    contentBlocks: {}
  };

  rawChanges.forEach(change => {
    try {
      switch (change.change_type) {
        case 'text':
          processedData.textContent[change.change_key] = change.change_value;
          break;
        
        case 'image':
          processedData.imageReplacements[change.change_key] = change.change_value;
          break;
        
        case 'content_block':
          try {
            processedData.contentBlocks[change.change_key] = JSON.parse(change.change_value);
          } catch (parseError) {
            console.warn('⚠️ Failed to parse content block JSON:', change.change_key, parseError);
            processedData.contentBlocks[change.change_key] = [];
          }
          break;
        
        default:
          console.warn('⚠️ Unknown change type:', change.change_type);
      }
    } catch (error) {
      console.error('❌ Error processing change:', change, error);
    }
  });

  console.log('✅ Processed changes data:', {
    textCount: Object.keys(processedData.textContent).length,
    imageCount: Object.keys(processedData.imageReplacements).length,
    contentCount: Object.keys(processedData.contentBlocks).length
  });

  return processedData;
};

export const normalizeImageReplacements = (imageReplacements: any): Record<string, string> => {
  if (!imageReplacements || typeof imageReplacements !== 'object') {
    return {};
  }

  const normalized: Record<string, string> = {};
  
  Object.entries(imageReplacements).forEach(([key, value]) => {
    if (typeof key === 'string' && typeof value === 'string') {
      normalized[key] = value;
    }
  });

  return normalized;
};
