
import { useState, useCallback } from 'react';
import { useDevModeDatabase } from './useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';
import { toast } from 'sonner';

export const useSimplifiedSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { hasChanges } = useDevModeDatabase(projectId);
  const [queueSize, setQueueSize] = useState(0);

  // Simple sync function that publishes current state
  const syncToLive = useCallback(async () => {
    if (!projectId || isSyncing) {
      return;
    }

    setIsSyncing(true);
    
    try {
      console.log('🚀 SimplifiedSync: Starting sync to live');
      
      // Get current caption count for UI
      const imageCaptionStorageKey = `image_captions_${projectId}`;
      const imageCaptions = JSON.parse(localStorage.getItem(imageCaptionStorageKey) || '{}');
      const captionCount = Object.keys(imageCaptions).length;
      
      setQueueSize(captionCount);
      
      if (captionCount > 0) {
        toast.loading(`Syncing ${captionCount} captions to live...`, { id: 'sync-captions' });
      }
      
      // Publish everything at once - let the publishing service handle it properly
      await PublishingService.publishProject(projectId, true);
      
      toast.success('Successfully synced to live!', {
        id: 'sync-captions',
        description: captionCount > 0 ? `${captionCount} captions published` : 'All changes published'
      });
      
      setQueueSize(0);
      
    } catch (error) {
      console.error('❌ SimplifiedSync: Sync failed', error);
      toast.error('Failed to sync to live', {
        id: 'sync-captions',
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsSyncing(false);
    }
  }, [projectId, isSyncing]);

  return {
    syncToLive,
    isSyncing,
    hasChanges,
    queueSize
  };
};
