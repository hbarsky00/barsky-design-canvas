
import { useState, useCallback, useRef } from 'react';
import { DatabaseChanges, ChangeType } from './database/types';
import { processChangesData } from './database/dataProcessor';
import { 
  saveChangeToDatabase, 
  fetchChangesFromDatabase, 
  checkHasChangesInDatabase, 
  clearChangesFromDatabase 
} from './database/operations';
import { toast } from 'sonner';

export const useDevModeDatabase = (projectId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initializedRef = useRef(false);

  console.log('🎯 useDevModeDatabase: Initialized for project:', projectId);

  const saveChange = useCallback(async (changeType: ChangeType, changeKey: string, changeValue: any): Promise<boolean> => {
    if (!projectId) {
      console.error('❌ useDevModeDatabase: No projectId provided for saveChange');
      toast.error('Cannot save: No project ID');
      return false;
    }

    if (!changeKey) {
      console.error('❌ useDevModeDatabase: No changeKey provided for saveChange');
      toast.error('Cannot save: Missing change key');
      return false;
    }

    console.log('💾 useDevModeDatabase: Starting save operation:', { 
      projectId, 
      changeType, 
      changeKey, 
      changeValueType: typeof changeValue,
      changeValuePreview: typeof changeValue === 'string' ? changeValue.substring(0, 50) + '...' : changeValue
    });
    
    setIsLoading(true);
    setError(null);

    try {
      const success = await saveChangeToDatabase(projectId, changeType, changeKey, changeValue);
      
      if (success) {
        console.log('✅ useDevModeDatabase: Successfully saved change to database');
        
        // Dispatch immediate update event with more details
        const updateEvent = new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId, 
            changeType, 
            changeKey, 
            immediate: true,
            timestamp: Date.now(),
            action: 'save'
          }
        });
        
        console.log('📡 useDevModeDatabase: Dispatching project update event');
        window.dispatchEvent(updateEvent);
        
        return true;
      } else {
        console.error('❌ useDevModeDatabase: Failed to save change to database');
        setError('Failed to save change to database');
        toast.error('Failed to save change');
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('❌ useDevModeDatabase: Error saving change:', errorMessage);
      setError(errorMessage);
      toast.error(`Save error: ${errorMessage}`);
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
      console.log('📤 useDevModeDatabase: Fetching changes for project:', projectId);
      const data = await fetchChangesFromDatabase(projectId);
      const processedData = processChangesData(data);

      console.log('📋 useDevModeDatabase: Retrieved changes:', {
        projectId,
        textCount: Object.keys(processedData.textContent).length,
        imageCount: Object.keys(processedData.imageReplacements).length,
        contentBlockSections: Object.keys(processedData.contentBlocks).length
      });

      return processedData;
    } catch (error) {
      console.error('❌ useDevModeDatabase: Error in getChanges:', error);
      setError(error instanceof Error ? error.message : 'Failed to get changes');
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
      setError(error instanceof Error ? error.message : 'Failed to check changes');
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
      
      if (result) {
        // Dispatch event to notify components that changes were cleared
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId, 
            cleared: true, 
            immediate: true,
            timestamp: Date.now()
          }
        }));
      }
      
      return result;
    } catch (error) {
      console.error('❌ useDevModeDatabase: Error clearing changes:', error);
      setError(error instanceof Error ? error.message : 'Failed to clear changes');
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
