
import { useState, useCallback } from 'react';
import { DatabaseChanges, ChangeType } from './database/types';
import { processChangesData } from './database/dataProcessor';
import { 
  saveChangeToDatabase, 
  fetchChangesFromDatabase, 
  checkHasChangesInDatabase, 
  clearChangesFromDatabase 
} from './database/operations';

export const useDevModeDatabase = (projectId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('🎯 useDevModeDatabase: Initialized for project:', projectId);

  const saveChange = useCallback(async (changeType: ChangeType, changeKey: string, changeValue: any): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await saveChangeToDatabase(projectId, changeType, changeKey, changeValue);
      if (!success) {
        setError('Failed to save change');
      }
      return success;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  const getChanges = useCallback(async (): Promise<DatabaseChanges> => {
    if (!projectId) {
      console.log('⚠️ useDevModeDatabase: No projectId, returning empty data');
      return {
        textContent: {},
        imageReplacements: {},
        contentBlocks: {}
      };
    }

    try {
      const data = await fetchChangesFromDatabase(projectId);
      const processedData = processChangesData(data);

      console.log('📋 useDevModeDatabase: Processed changes:', {
        textCount: Object.keys(processedData.textContent).length,
        imageCount: Object.keys(processedData.imageReplacements).length,
        contentBlockSections: Object.keys(processedData.contentBlocks).length,
        contentBlocks: processedData.contentBlocks
      });

      return processedData;
    } catch (error) {
      console.error('❌ useDevModeDatabase: Error in getChanges:', error);
      return {
        textContent: {},
        imageReplacements: {},
        contentBlocks: {}
      };
    }
  }, [projectId]);

  const hasChanges = useCallback(async (): Promise<boolean> => {
    return await checkHasChangesInDatabase(projectId);
  }, [projectId]);

  const clearChanges = useCallback(async (): Promise<boolean> => {
    return await clearChangesFromDatabase(projectId);
  }, [projectId]);

  return {
    saveChange,
    getChanges,
    hasChanges,
    clearChanges,
    isLoading,
    error
  };
};
