
import { useCallback } from 'react';
import { toast } from 'sonner';
import { debugCache } from '@/utils/debugUtils';
import { PublishingService } from '@/services/publishingService';

export const useManualSync = (
  projectId: string,
  hasChanges: () => Promise<boolean>,
  startStuckDetection: (stuckTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>) => void,
  mountedRef: React.MutableRefObject<boolean>
) => {
  const triggerManualSync = useCallback(async (
    getQueueSize: () => number,
    processQueuedChanges: any,
    updateSyncState: (updates: any) => void,
    resetStuckState: () => void,
    syncState: any,
    forceReset: () => void,
    stuckTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    if (!projectId) {
      toast.error('No project selected');
      return;
    }
    
    const queueSize = getQueueSize();
    debugCache.log('🖱️ Manual sync triggered', { 
      queueSize,
      isStuck: syncState.isStuck 
    });
    
    // If stuck, force reset
    if (syncState.isStuck) {
      debugCache.log('🔄 Forcing reset due to stuck state');
      forceReset();
      return;
    }
    
    if (syncState.isSyncing) {
      toast.info('Sync already in progress');
      return;
    }

    try {
      updateSyncState({ isSyncing: true });
      startStuckDetection(stuckTimeoutRef);

      // First, process any queued changes
      if (queueSize > 0) {
        debugCache.log('📤 Processing queued changes first', { count: queueSize });
        toast.info(`Processing ${queueSize} queued changes...`);
        await processQueuedChanges();
        
        // Wait a moment for database to update
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Now check for database changes (including the ones we just saved)
      const hasDbChanges = await hasChanges();
      
      if (!hasDbChanges) {
        // Check if there are still queued changes after processing
        const remainingQueue = getQueueSize();
        if (remainingQueue === 0) {
          toast.info('No changes to sync to live');
          return;
        } else {
          debugCache.log('⏳ Still processing changes, will check again');
          toast.info('Still processing changes, please wait...');
          return;
        }
      }

      // Publish to live
      debugCache.log('📤 Publishing to live mode');
      toast.loading('Publishing to live...', { id: 'publish-sync' });
      
      await PublishingService.publishProject(projectId);
      
      toast.success('Successfully synced to live!', {
        id: 'publish-sync',
        description: 'All your changes are now live',
        duration: 3000
      });

    } catch (error) {
      debugCache.log('❌ Manual sync failed', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error('Failed to sync to live', {
        id: 'publish-sync',
        description: errorMessage
      });
    } finally {
      resetStuckState();
      if (mountedRef.current) {
        updateSyncState({ 
          isSyncing: false,
          lastSyncTime: Date.now()
        });
      }
    }
  }, [projectId, hasChanges, startStuckDetection, mountedRef]);

  return { triggerManualSync };
};
