
import { useState, useCallback, useRef } from 'react';
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
  const initializedRef = useRef(false);

  console.log('🎯 useDevModeDatabase: Initialized for project:', projectId);

  // Ensure we only initialize once to prevent React state issues
  if (!initializedRef.current) {
    initializedRef.current = true;
  }

  const saveChange = useCallback(async (changeType: ChangeType, changeKey: string, changeValue: any): Promise<boolean> => {
    if (!projectId) {
      console.error('❌ useDevModeDatabase: No projectId provided for saveChange');
      return false;
    }

    console.log('💾 useDevModeDatabase: Saving change:', { projectId, changeType, changeKey, changeValue });
    
    setIsLoading(true);
    setError(null);

    try {
      const success = await saveChangeToDatabase(projectId, changeType, changeKey, changeValue);
      if (success) {
        console.log('✅ useDevModeDatabase: Successfully saved change to database');
        
        // Dispatch immediate update event
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId, 
            changeType, 
            changeKey, 
            immediate: true,
            timestamp: Date.now()
          }
        }));
      } else {
        console.error('❌ useDevModeDatabase: Failed to save change to database');
        setError('Failed to save change');
      }
      return success;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ useDevModeDatabase: Error saving change:', errorMessage);
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
        projectId,
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
    if (!projectId) {
      console.log('⚠️ useDevModeDatabase: No projectId for hasChanges check');
      return false;
    }
    
    try {
      const result = await checkHasChangesInDatabase(projectId);
      console.log('🔍 useDevModeDatabase: hasChanges result for', projectId, ':', result);
      return result;
    } catch (error) {
      console.error('❌ useDevModeDatabase: Error checking for changes:', error);
      return false;
    }
  }, [projectId]);

  const clearChanges = useCallback(async (): Promise<boolean> => {
    if (!projectId) {
      console.log('⚠️ useDevModeDatabase: No projectId for clearChanges');
      return false;
    }
    
    try {
      const result = await clearChangesFromDatabase(projectId);
      console.log('🗑️ useDevModeDatabase: clearChanges result for', projectId, ':', result);
      return result;
    } catch (error) {
      console.error('❌ useDevModeDatabase: Error clearing changes:', error);
      return false;
    }
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
