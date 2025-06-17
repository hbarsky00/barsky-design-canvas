
import { useState, useEffect, useCallback } from 'react';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';
import { validateContentBlockSize } from '@/hooks/database/contentBlockValidation';
import { toast } from 'sonner';

export const useContentBlocksManager = (projectId: string, sectionKey: string) => {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastLoadedState, setLastLoadedState] = useState<'dev' | 'published' | 'empty'>('empty');
  const { getChanges, saveChange } = useDevModeDatabase(projectId);

  // Load content blocks with proper state management
  useEffect(() => {
    const loadContentBlocks = async () => {
      console.log('🔄 useContentBlocksManager: Loading content blocks for section:', sectionKey);
      setIsLoading(true);
      
      try {
        // Check dev mode changes first
        const changes = await getChanges();
        const devBlocks = changes.contentBlocks[sectionKey] || [];
        
        if (devBlocks.length > 0) {
          console.log('📦 useContentBlocksManager: Using dev mode blocks for', sectionKey, ':', devBlocks);
          setContentBlocks(devBlocks);
          setLastLoadedState('dev');
        } else {
          // Check published data
          const publishedData = await PublishingService.loadPublishedData(projectId);
          const publishedBlocks = publishedData?.content_blocks?.[sectionKey] || [];
          
          if (publishedBlocks.length > 0) {
            console.log('📖 useContentBlocksManager: Using published blocks for', sectionKey, ':', publishedBlocks);
            setContentBlocks(publishedBlocks);
            setLastLoadedState('published');
          } else {
            console.log('📄 useContentBlocksManager: No blocks found for', sectionKey);
            setContentBlocks([]);
            setLastLoadedState('empty');
          }
        }
      } catch (error) {
        console.error('❌ useContentBlocksManager: Error loading content blocks:', error);
        setContentBlocks([]);
        setLastLoadedState('empty');
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      loadContentBlocks();
    }
  }, [projectId, sectionKey, getChanges]);

  // Listen for updates with proper state transition handling
  useEffect(() => {
    const handleLiveContentBlockUpdate = (event: CustomEvent) => {
      if (event.detail?.sectionKey === sectionKey) {
        console.log('📦 useContentBlocksManager: Received live content block update for:', sectionKey, event.detail.blocks);
        setContentBlocks(event.detail.blocks || []);
        setLastLoadedState('published');
      }
    };

    const handleProjectDataUpdate = async (event: any) => {
      const detail = event.detail || {};
      console.log('🔄 useContentBlocksManager: Project data update received:', detail);
      
      // Handle published changes immediately
      if (detail.published && detail.contentBlocks && detail.contentBlocks[sectionKey]) {
        const publishedBlocks = detail.contentBlocks[sectionKey] || [];
        console.log('📖 useContentBlocksManager: Applying published blocks for', sectionKey, ':', publishedBlocks);
        setContentBlocks(publishedBlocks);
        setLastLoadedState('published');
        return;
      }
      
      // Handle dev mode changes
      if (detail.contentBlocksChanged || (detail.immediate && lastLoadedState === 'dev')) {
        console.log('🔄 useContentBlocksManager: Reloading from dev mode');
        try {
          const changes = await getChanges();
          const savedBlocks = changes.contentBlocks[sectionKey] || [];
          console.log('📦 useContentBlocksManager: Reloaded dev blocks for', sectionKey, ':', savedBlocks);
          setContentBlocks(savedBlocks);
          setLastLoadedState('dev');
        } catch (error) {
          console.error('❌ useContentBlocksManager: Error reloading content blocks:', error);
        }
      }
      
      // Handle clearing of changes
      if (detail.cleared) {
        console.log('🗑️ useContentBlocksManager: Changes cleared, loading published state');
        try {
          const publishedData = await PublishingService.loadPublishedData(projectId);
          const publishedBlocks = publishedData?.content_blocks?.[sectionKey] || [];
          setContentBlocks(publishedBlocks);
          setLastLoadedState(publishedBlocks.length > 0 ? 'published' : 'empty');
        } catch (error) {
          console.error('❌ useContentBlocksManager: Error loading published state after clear:', error);
        }
      }
    };

    window.addEventListener('liveContentBlockUpdate', handleLiveContentBlockUpdate as EventListener);
    window.addEventListener('projectDataUpdated', handleProjectDataUpdate);
    
    return () => {
      window.removeEventListener('liveContentBlockUpdate', handleLiveContentBlockUpdate as EventListener);
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate);
    };
  }, [projectId, sectionKey, getChanges, lastLoadedState]);

  const saveContentBlocks = useCallback(async (blocks: ContentBlock[]) => {
    console.log('💾 useContentBlocksManager: Saving content blocks for section:', sectionKey, blocks);
    
    try {
      // Validate content blocks before saving
      const validation = validateContentBlockSize(blocks);
      if (!validation.isValid) {
        console.error('❌ Content blocks validation failed:', validation.error);
        toast.error('Content too large', {
          description: validation.error
        });
        return;
      }
      
      const success = await saveChange('content_block', sectionKey, blocks);
      if (success) {
        console.log('✅ useContentBlocksManager: Successfully saved content blocks to database');
        setLastLoadedState('dev');
        
        // Dispatch event to notify other components
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { projectId, contentBlocksChanged: true, immediate: true }
        }));
        
        toast.success('Content saved successfully');
      } else {
        console.error('❌ useContentBlocksManager: Failed to save content blocks to database');
        toast.error('Failed to save content');
      }
    } catch (error) {
      console.error('❌ useContentBlocksManager: Error saving content blocks:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save content blocks';
      toast.error('Save failed', {
        description: errorMessage
      });
    }
  }, [saveChange, sectionKey, projectId]);

  return {
    contentBlocks,
    setContentBlocks,
    isLoading,
    saveContentBlocks,
    currentState: lastLoadedState
  };
};
