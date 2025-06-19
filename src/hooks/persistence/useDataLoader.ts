
import { useState, useEffect, useRef, useCallback } from 'react';
import { PublishingService } from '@/services/publishingService';
import { ProjectData } from './types';

export const useDataLoader = (
  projectId: string,
  getChanges: () => Promise<any>,
  normalizeImageReplacements: (imageReplacements: any) => Record<string, string>
) => {
  const [cachedData, setCachedData] = useState<ProjectData>(() => ({
    textContent: {},
    imageReplacements: {},
    contentBlocks: {}
  }));
  const [forceUpdate, setForceUpdate] = useState(0);
  const initializedRef = useRef(false);

  // Load data with DEV CHANGES ALWAYS TAKING PRIORITY
  useEffect(() => {
    if (!projectId) return;
    
    const loadData = async () => {
      try {
        console.log('🔄 DataLoader: Loading data with DEV CHANGES PRIORITY approach for project:', projectId);
        
        // Load published data first as the base
        let publishedData = null;
        try {
          publishedData = await PublishingService.loadPublishedData(projectId);
          console.log('📦 Published data loaded as base:', {
            textCount: Object.keys(publishedData?.text_content || {}).length,
            imageCount: Object.keys(publishedData?.image_replacements || {}).length,
            contentCount: Object.keys(publishedData?.content_blocks || {}).length
          });
        } catch (error) {
          console.warn('⚠️ Could not load published data, using empty base:', error);
        }
        
        // Load dev changes - THESE ALWAYS WIN
        const devChanges = await getChanges();
        console.log('🔧 Dev mode changes loaded (PRIORITY):', {
          textCount: Object.keys(devChanges.textContent).length,
          imageCount: Object.keys(devChanges.imageReplacements).length,
          contentCount: Object.keys(devChanges.contentBlocks).length,
          devTextChanges: devChanges.textContent
        });
        
        // CRITICAL: Dev changes ALWAYS override published data
        const finalData = {
          textContent: {
            ...(publishedData?.text_content || {}),
            ...devChanges.textContent  // DEV CHANGES ALWAYS WIN
          },
          imageReplacements: normalizeImageReplacements({
            ...(publishedData?.image_replacements || {}),
            ...devChanges.imageReplacements  // DEV CHANGES ALWAYS WIN
          }),
          contentBlocks: {
            ...(publishedData?.content_blocks || {}),
            ...devChanges.contentBlocks  // DEV CHANGES ALWAYS WIN
          }
        };
        
        console.log('✅ Final data with DEV PRIORITY:', {
          textKeys: Object.keys(finalData.textContent),
          imageKeys: Object.keys(finalData.imageReplacements),
          contentKeys: Object.keys(finalData.contentBlocks),
          finalTextContent: finalData.textContent
        });
        
        setCachedData(finalData);
        initializedRef.current = true;
      } catch (error) {
        console.error('❌ DataLoader: Error loading data:', error);
      }
    };

    loadData();
  }, [projectId, getChanges, normalizeImageReplacements]);

  const updateCachedData = useCallback((updater: (prev: ProjectData) => ProjectData) => {
    setCachedData(updater);
    setForceUpdate(prev => prev + 1);
  }, []);

  return {
    cachedData,
    setCachedData,
    updateCachedData,
    forceUpdate
  };
};
