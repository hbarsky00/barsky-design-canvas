
import { useCallback } from 'react';
import { useDevModeDatabase } from './useDevModeDatabase';
import { useSimplifiedSync } from './useSimplifiedSync';
import { ProjectPersistenceHooks, ProjectData } from './persistence/types';
import { useDataLoader } from './persistence/useDataLoader';
import { useProjectUpdates } from './persistence/useProjectUpdates';

export const useProjectPersistence = (projectId: string): ProjectPersistenceHooks => {
  const { getChanges, isLoading } = useDevModeDatabase(projectId);
  const { queueChange } = useSimplifiedSync(projectId);

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

  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 SaveOperations: Queuing text content:', key);
    queueChange('text', key, content);
    
    // Update cached data immediately for UI responsiveness
    updateCachedData(prev => ({
      ...prev,
      textContent: { ...prev.textContent, [key]: content }
    }));
    console.log('✅ Text content queued and cached');
  }, [queueChange, updateCachedData]);

  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('💾 SaveOperations: Queuing image replacement:', originalSrc.substring(0, 30) + '...', '->', newSrc.substring(0, 30) + '...');
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('⚠️ Skipping blob URL replacement save');
      return;
    }
    
    queueChange('image', originalSrc, newSrc);
    
    // Update cached data immediately for UI responsiveness
    updateCachedData(prev => ({
      ...prev,
      imageReplacements: { ...prev.imageReplacements, [originalSrc]: newSrc }
    }));
    console.log('✅ Image replacement queued and cached');
  }, [queueChange, updateCachedData]);

  const saveContentBlocks = useCallback(async (sectionKey: string, blocks: any[]) => {
    console.log('💾 SaveOperations: Queuing content blocks:', sectionKey);
    
    queueChange('content_block', sectionKey, blocks);
    
    updateCachedData(prev => ({
      ...prev,
      contentBlocks: { ...prev.contentBlocks, [sectionKey]: blocks }
    }));
    console.log('✅ Content blocks queued successfully');
  }, [queueChange, updateCachedData]);

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
    lastSaved: null
  };
};
