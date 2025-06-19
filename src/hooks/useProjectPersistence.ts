
import { useCallback } from 'react';
import { useDevModeDatabase } from './useDevModeDatabase';
import { useOptimizedSync } from './useOptimizedSync';
import { ProjectPersistenceHooks, ProjectData } from './persistence/types';
import { useDataLoader } from './persistence/useDataLoader';
import { useProjectUpdates } from './persistence/useProjectUpdates';
import { useSaveOperations } from './persistence/useSaveOperations';

export const useProjectPersistence = (projectId: string): ProjectPersistenceHooks => {
  const { getChanges, isLoading } = useDevModeDatabase(projectId);
  const { queueChange } = useOptimizedSync(projectId);

  const normalizeImageReplacements = useCallback((imageReplacements: any): Record<string, string> => {
    const normalized: Record<string, string> = {};
    
    Object.entries(imageReplacements || {}).forEach(([key, value]) => {
      if (typeof key === 'string' && value) {
        const stringValue = typeof value === 'string' ? value : null;
            
        if (stringValue && typeof stringValue === 'string') {
          if (!key.startsWith('blob:') && !stringValue.startsWith('blob:') && 
              (stringValue.startsWith('data:') || stringValue.startsWith('/') || stringValue.startsWith('http'))) {
            normalized[key] = stringValue;
          }
        }
      }
    });
    
    return normalized;
  }, []);

  const { cachedData, updateCachedData } = useDataLoader(projectId, getChanges, normalizeImageReplacements);
  
  useProjectUpdates(projectId, getChanges, normalizeImageReplacements, cachedData, updateCachedData);
  
  const { saveTextContent, saveImageReplacement, saveContentBlocks, lastSaved } = useSaveOperations(
    queueChange,
    updateCachedData
  );

  const getProjectData = useCallback((): ProjectData => {
    return cachedData;
  }, [cachedData]);

  const getTextContent = useCallback((key: string, fallback: string = '') => {
    return cachedData.textContent[key] || fallback;
  }, [cachedData.textContent]);

  const getImageSrc = useCallback((originalSrc: string) => {
    const replacement = cachedData.imageReplacements[originalSrc];
    console.log('🖼️ getImageSrc:', originalSrc.substring(0, 30) + '...', replacement ? '-> ' + replacement.substring(0, 30) + '...' : '(no replacement)');
    return replacement || originalSrc;
  }, [cachedData.imageReplacements]);

  const clearProjectData = useCallback(() => {
    updateCachedData(() => ({
      textContent: {},
      imageReplacements: {},
      contentBlocks: {}
    }));
    console.log('🗑️ useProjectPersistence: Cleared project data');
  }, [updateCachedData]);

  return {
    saveTextContent,
    saveImageReplacement,
    saveContentBlocks,
    getProjectData,
    getTextContent,
    getImageSrc,
    clearProjectData,
    isSaving: isLoading,
    lastSaved
  };
};
