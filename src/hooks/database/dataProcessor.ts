
import { ProjectData } from '../persistence/types';

export const processChangesData = (rawChanges: any[]): ProjectData => {
  const processedData: ProjectData = {
    textContent: {},
    imageReplacements: {},
    imageCaptions: {},
    contentBlocks: {}
  };

  rawChanges.forEach(change => {
    const { change_type, change_key, change_value } = change;
    
    try {
      if (change_type === 'text') {
        processedData.textContent[change_key] = change_value;
      } else if (change_type === 'image') {
        processedData.imageReplacements[change_key] = change_value;
      } else if (change_type === 'image_caption') {
        processedData.imageCaptions[change_key] = change_value;
      } else if (change_type === 'content_block') {
        const blocks = typeof change_value === 'string' ? JSON.parse(change_value) : change_value;
        processedData.contentBlocks[change_key] = blocks;
      }
    } catch (error) {
      console.error('❌ Error processing change:', change, error);
    }
  });

  console.log('📊 Processed changes data:', {
    textKeys: Object.keys(processedData.textContent).length,
    imageKeys: Object.keys(processedData.imageReplacements).length,
    imageCaptionKeys: Object.keys(processedData.imageCaptions).length,
    contentBlockKeys: Object.keys(processedData.contentBlocks).length
  });

  return processedData;
};
