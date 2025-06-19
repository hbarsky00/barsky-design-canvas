
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

  // Load published data FIRST, then overlay dev changes
  useEffect(() => {
    if (!projectId) return;
    
    const loadData = async () => {
      try {
        console.log('🔄 DataLoader: Loading data with PUBLISHED FIRST approach for project:', projectId);
        
        // Load published data FIRST as the base
        let publishedData = null;
        try {
          publishedData = await PublishingService.loadPublishedData(projectId);
          console.log('📦 Published data loaded as base:', {
            textCount: Object.keys(publishedData?.text_content || {}).length,
            imageCount: Object.keys(publishedData?.image_replacements || {}).length,
            contentCount: Object.keys(publishedData?.content_blocks || {}).length,
            textKeys: Object.keys(publishedData?.text_content || {})
          });
        } catch (error) {
          console.warn('⚠️ Could not load published data, using empty base:', error);
        }
        
        // Load dev changes as overlays on top of published data
        const devChanges = await getChanges();
        console.log('🔧 Dev mode overlays loaded:', {
          textCount: Object.keys(devChanges.textContent).length,
          imageCount: Object.keys(devChanges.imageReplacements).length,
          contentCount: Object.keys(devChanges.contentBlocks).length,
          textKeys: Object.keys(devChanges.textContent)
        });
        
        // PUBLISHED DATA AS BASE, dev changes as overlay
        const finalData = {
          textContent: {
            ...(publishedData?.text_content || {}),
            ...devChanges.textContent  // Dev changes overlay on published
          },
          imageReplacements: normalizeImageReplacements({
            ...(publishedData?.image_replacements || {}),
            ...devChanges.imageReplacements  // Dev changes overlay on published
          }),
          contentBlocks: {
            ...(publishedData?.content_blocks || {}),
            ...devChanges.contentBlocks  // Dev changes overlay on published
          }
        };
        
        console.log('✅ Final data with published base + dev overlays:', {
          textKeys: Object.keys(finalData.textContent),
          imageKeys: Object.keys(finalData.imageReplacements),
          contentKeys: Object.keys(finalData.contentBlocks),
          sampleTextContent: Object.keys(finalData.textContent).slice(0, 3).map(key => 
            `${key}: ${finalData.textContent[key].substring(0, 30)}...`
          )
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
