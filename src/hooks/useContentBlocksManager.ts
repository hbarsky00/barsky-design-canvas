
import { useState, useEffect, useCallback } from 'react';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';

export const useContentBlocksManager = (projectId: string, sectionKey: string) => {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getChanges, saveChange } = useDevModeDatabase(projectId);

  // Load content blocks from both dev mode and published data
  useEffect(() => {
    const loadContentBlocks = async () => {
      console.log('🔄 useContentBlocksManager: Loading content blocks for section:', sectionKey);
      setIsLoading(true);
      
      try {
        // First check for dev mode changes
        const changes = await getChanges();
        const devBlocks = changes.contentBlocks[sectionKey] || [];
        
        if (devBlocks.length > 0) {
          console.log('📦 useContentBlocksManager: Using dev mode blocks for', sectionKey, ':', devBlocks);
          setContentBlocks(devBlocks);
        } else {
          // Fallback to published data if no dev mode changes
          const publishedData = await PublishingService.loadPublishedData(projectId);
          const publishedBlocks = publishedData?.content_blocks?.[sectionKey] || [];
          console.log('📖 useContentBlocksManager: Using published blocks for', sectionKey, ':', publishedBlocks);
          setContentBlocks(publishedBlocks);
        }
      } catch (error) {
        console.error('❌ useContentBlocksManager: Error loading content blocks:', error);
        setContentBlocks([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      loadContentBlocks();
    }
  }, [projectId, sectionKey, getChanges]);

  // Listen for live content block updates and published updates
  useEffect(() => {
    const handleLiveContentBlockUpdate = (event: CustomEvent) => {
      if (event.detail?.sectionKey === sectionKey) {
        console.log('📦 useContentBlocksManager: Received live content block update for:', sectionKey, event.detail.blocks);
        setContentBlocks(event.detail.blocks || []);
      }
    };

    const handleProjectDataUpdate = async (event: any) => {
      const detail = event.detail || {};
      console.log('🔄 useContentBlocksManager: Project data update received:', detail);
      
      if (detail.published && detail.contentBlocks) {
        // Update with published content blocks
        const publishedBlocks = detail.contentBlocks[sectionKey] || [];
        console.log('📖 useContentBlocksManager: Updating with published blocks for', sectionKey, ':', publishedBlocks);
        setContentBlocks(publishedBlocks);
      } else if (detail.contentBlocksChanged || detail.immediate) {
        // Reload from database for other changes
        console.log('🔄 useContentBlocksManager: Reloading content blocks from database');
        try {
          const changes = await getChanges();
          const savedBlocks = changes.contentBlocks[sectionKey] || [];
          console.log('📦 useContentBlocksManager: Reloaded content blocks for', sectionKey, ':', savedBlocks);
          setContentBlocks(savedBlocks);
        } catch (error) {
          console.error('❌ useContentBlocksManager: Error reloading content blocks:', error);
        }
      }
    };

    window.addEventListener('liveContentBlockUpdate', handleLiveContentBlockUpdate as EventListener);
    window.addEventListener('projectDataUpdated', handleProjectDataUpdate);
    
    return () => {
      window.removeEventListener('liveContentBlockUpdate', handleLiveContentBlockUpdate as EventListener);
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate);
    };
  }, [projectId, sectionKey, getChanges]);

  const saveContentBlocks = useCallback(async (blocks: ContentBlock[]) => {
    console.log('💾 useContentBlocksManager: Saving content blocks for section:', sectionKey, blocks);
    try {
      const success = await saveChange('content_block', sectionKey, blocks);
      if (success) {
        console.log('✅ useContentBlocksManager: Successfully saved content blocks to database');
        // Dispatch event to notify other components
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { projectId, contentBlocksChanged: true, immediate: true }
        }));
      } else {
        console.error('❌ useContentBlocksManager: Failed to save content blocks to database');
      }
    } catch (error) {
      console.error('❌ useContentBlocksManager: Error saving content blocks:', error);
    }
  }, [saveChange, sectionKey, projectId]);

  return {
    contentBlocks,
    setContentBlocks,
    isLoading,
    saveContentBlocks
  };
};
