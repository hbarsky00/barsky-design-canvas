
import { useEffect, useCallback } from 'react';
import { PublishingService } from '@/services/publishingService';
import { ProjectData } from './types';

export const useProjectUpdates = (
  projectId: string,
  getChanges: () => Promise<any>,
  normalizeImageReplacements: (imageReplacements: any) => Record<string, string>,
  cachedData: ProjectData,
  updateCachedData: (updater: (prev: ProjectData) => ProjectData) => void
) => {
  // Handle project updates with proper published/dev state management
  useEffect(() => {
    const handleProjectUpdate = async (e: CustomEvent) => {
      if (e.detail?.projectId === projectId || e.detail?.immediate) {
        console.log('🔄 ProjectUpdates: Update detected:', e.detail);
        
        try {
          // If this is a publish event, reload published data first
          let publishedData = cachedData;
          if (e.detail?.published) {
            console.log('📤 This is a publish event - reloading published data');
            try {
              const freshPublished = await PublishingService.loadPublishedData(projectId);
              if (freshPublished) {
                publishedData = {
                  textContent: freshPublished.text_content || {},
                  imageReplacements: normalizeImageReplacements(freshPublished.image_replacements || {}),
                  imageCaptions: freshPublished.image_captions || {},
                  contentBlocks: freshPublished.content_blocks || {}
                };
                console.log('✅ Fresh published data loaded:', {
                  texts: Object.keys(publishedData.textContent).length,
                  images: Object.keys(publishedData.imageReplacements).length,
                  textKeys: Object.keys(publishedData.textContent)
                });
              }
            } catch (error) {
              console.warn('⚠️ Could not reload published data, keeping current');
            }
          }
          
          // Load current dev changes (may be empty after publish)
          const devChanges = await getChanges();
          console.log('🔧 Current dev changes after update:', {
            texts: Object.keys(devChanges.textContent).length,
            images: Object.keys(devChanges.imageReplacements).length
          });
          
          // Combine published base + dev overlays
          const updatedData = {
            textContent: {
              ...publishedData.textContent,
              ...devChanges.textContent
            },
            imageReplacements: normalizeImageReplacements({
              ...publishedData.imageReplacements,
              ...devChanges.imageReplacements
            }),
            imageCaptions: {
              ...publishedData.imageCaptions,
              ...devChanges.imageCaptions
            },
            contentBlocks: {
              ...publishedData.contentBlocks,
              ...devChanges.contentBlocks
            }
          };
          
          console.log('✅ Data updated - final content:', {
            textCount: Object.keys(updatedData.textContent).length,
            imageCount: Object.keys(updatedData.imageReplacements).length
          });

          updateCachedData(() => updatedData);
        } catch (error) {
          console.error('❌ ProjectUpdates: Error reloading data:', error);
        }
      }
    };

    const handleForceRefresh = (e: CustomEvent) => {
      console.log('🔄 ProjectUpdates: Force refresh triggered:', e.detail);
      updateCachedData(prev => ({ ...prev }));
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    window.addEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
      window.removeEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    };
  }, [projectId, getChanges, normalizeImageReplacements, cachedData, updateCachedData]);
};
