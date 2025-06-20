
import React, { useState, useCallback } from 'react';
import { useDevModeDatabase } from './useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';
import { useCaptionNotifications } from '@/hooks/useCaptionNotifications';
import { toast } from 'sonner';

export const useEnhancedSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { hasChanges } = useDevModeDatabase(projectId);
  const { getUnpublishedCount, markAsPublished } = useCaptionNotifications();
  
  const unpublishedCaptions = getUnpublishedCount(projectId);
  const hasChangesToSync = hasChanges || unpublishedCaptions > 0;

  const syncToLive = useCallback(async () => {
    if (!projectId || isSyncing) {
      return;
    }

    setIsSyncing(true);
    
    try {
      console.log('🚀 EnhancedSync: Starting sync to live');
      
      // Check for unpublished captions
      if (unpublishedCaptions > 0) {
        toast.loading(`Publishing ${unpublishedCaptions} AI-generated captions...`, { 
          id: 'sync-captions' 
        });
      }
      
      // Publish everything including captions
      await PublishingService.publishProject(projectId, true);
      
      // Mark captions as published
      if (unpublishedCaptions > 0) {
        markAsPublished(projectId);
      }
      
      toast.success('Successfully synced to live!', {
        id: 'sync-captions',
        description: unpublishedCaptions > 0 
          ? `${unpublishedCaptions} AI captions published`
          : 'All changes published'
      });
      
    } catch (error) {
      console.error('❌ EnhancedSync: Sync failed', error);
      toast.error('Failed to sync to live', {
        id: 'sync-captions',
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsSyncing(false);
    }
  }, [projectId, isSyncing, unpublishedCaptions, markAsPublished]);

  // Listen for manual sync triggers from notifications
  React.useEffect(() => {
    const handleManualSync = (e: CustomEvent) => {
      if (e.detail?.projectId === projectId && e.detail?.source === 'caption_notification') {
        syncToLive();
      }
    };

    window.addEventListener('triggerManualSync', handleManualSync as EventListener);
    
    return () => {
      window.removeEventListener('triggerManualSync', handleManualSync as EventListener);
    };
  }, [projectId, syncToLive]);

  return {
    syncToLive,
    isSyncing,
    hasChangesToSync,
    unpublishedCaptions
  };
};
