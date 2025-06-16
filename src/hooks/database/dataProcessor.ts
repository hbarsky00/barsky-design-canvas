
import { DatabaseChanges, DevModeChange } from './types';
import { validateAndFilterContentBlocks } from './validation';

export const processChangesData = (data: DevModeChange[] | null): DatabaseChanges => {
  const result: DatabaseChanges = {
    textContent: {},
    imageReplacements: {},
    contentBlocks: {}
  };

  if (!data || data.length === 0) {
    return result;
  }

  data.forEach(change => {
    console.log('🔍 processChangesData: Processing change:', {
      type: change.change_type,
      key: change.change_key,
      value: change.change_value
    });

    switch (change.change_type) {
      case 'text':
        if (typeof change.change_value === 'string') {
          result.textContent[change.change_key] = change.change_value;
        }
        break;
      case 'image':
        if (typeof change.change_value === 'string') {
          result.imageReplacements[change.change_key] = change.change_value;
        }
        break;
      case 'content_block':
        if (Array.isArray(change.change_value)) {
          const validBlocks = validateAndFilterContentBlocks(change.change_value);
          result.contentBlocks[change.change_key] = validBlocks;
        }
        break;
      default:
        console.warn('⚠️ processChangesData: Unknown change type:', change.change_type);
    }
  });

  return result;
};
