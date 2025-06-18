
import { useCallback, useRef } from 'react';
import { useDevModeDatabase } from '../useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';
import { toast } from 'sonner';
import { ChangeQueue, SyncConfig } from './types';

export const useSyncOperations = (
  projectId: string,
  config: SyncConfig,
  isProcessingRef: React.MutableRefObject<boolean>,
  mountedRef: React.MutableRefObject<boolean>,
  stuckTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
) => {
  const { hasChanges, saveChange } = useDevModeDatabase(projectId);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const throttleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect and handle stuck sync operations
  const handleStuckDetection = useCallback(() => {
    console.warn('⚠️ SyncOperations: Stuck state detected, forcing reset');
    
    // Clear all processing flags
    isProcessingRef.current = false;
    
    // Clear all timers
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (throttleTimerRef.current) clearTimeout(throttleTimerRef.current);
    
    toast.error('Sync got stuck and was reset', {
      description: 'Please try your changes again'
    });
  }, [isProcessingRef]);

  // Start stuck detection timer
  const startStuckDetection = useCallback(() => {
    if (stuckTimeoutRef.current) clearTimeout(stuckTimeoutRef.current);
    
    stuckTimeoutRef.current = setTimeout(handleStuckDetection, config.STUCK_TIMEOUT);
  }, [handleStuckDetection, config.STUCK_TIMEOUT, stuckTimeoutRef]);

  // Batch processing of queued changes
  const processQueuedChanges = useCallback(async (
    getBatch: (size: number) => ChangeQueue[],
    getQueueSize: () => number,
    updateSyncState: (updates: any) => void,
    resetStuckState: () => void
  ): Promise<boolean> => {
    if (!projectId || isProcessingRef.current || !mountedRef.current || getQueueSize() === 0) {
      return false;
    }

    isProcessingRef.current = true;
    console.log('🚀 SyncOperations: Processing batch of', getQueueSize(), 'changes');

    // Start stuck detection
    startStuckDetection();

    try {
      // Take a batch of changes
      const batch = getBatch(config.BATCH_SIZE);
      
      updateSyncState({
        isSyncing: true,
        pendingChanges: getQueueSize()
      });

      // Process batch with individual error handling
      const results = await Promise.allSettled(
        batch.map(change => 
          saveChange(change.type, change.key, change.value)
            .catch(error => {
              console.error('❌ SyncOperations: Failed to save change:', change, error);
              return false;
            })
        )
      );

      const successCount = results.filter(r => r.status === 'fulfilled' && r.value === true).length;
      const failCount = batch.length - successCount;

      if (failCount > 0) {
        console.warn(`⚠️ SyncOperations: ${failCount} changes failed to save`);
        toast.warning(`${failCount} changes failed to save`, {
          description: 'Some changes may not be synced properly'
        });
      }

      console.log(`✅ SyncOperations: Batch processed - ${successCount} successful, ${failCount} failed`);

      // Continue processing if more changes exist
      if (getQueueSize() > 0 && mountedRef.current) {
        setTimeout(() => processQueuedChanges(getBatch, getQueueSize, updateSyncState, resetStuckState), 100);
      }

      return successCount > 0;
    } catch (error) {
      console.error('❌ SyncOperations: Error processing batch:', error);
      toast.error('Sync error', {
        description: 'Failed to process changes batch'
      });
      return false;
    } finally {
      isProcessingRef.current = false;
      resetStuckState();
      
      if (mountedRef.current) {
        updateSyncState({
          isSyncing: getQueueSize() > 0,
          hasQueuedChanges: getQueueSize() > 0,
          pendingChanges: getQueueSize(),
          lastSyncTime: getQueueSize() === 0 ? Date.now() : undefined
        });
      }
    }
  }, [projectId, saveChange, startStuckDetection, config.BATCH_SIZE, isProcessingRef, mountedRef]);

  // Manual sync trigger with conflict resolution
  const triggerManualSync = useCallback(async (
    getQueueSize: () => number,
    processQueuedChanges: any,
    updateSyncState: (updates: any) => void,
    resetStuckState: () => void,
    syncState: any,
    forceReset: () => void
  ) => {
    if (!projectId) return;
    
    // If stuck, force reset first
    if (syncState.isStuck || (syncState.isSyncing && getQueueSize() === 0)) {
      forceReset();
      return;
    }
    
    if (syncState.isSyncing) {
      console.log('⏳ SyncOperations: Sync already in progress');
      return;
    }

    console.log('🖱️ SyncOperations: Manual sync triggered');
    
    try {
      updateSyncState({ isSyncing: true });
      startStuckDetection();

      // Process any pending changes first
      if (getQueueSize() > 0) {
        await processQueuedChanges();
      }

      // Check for changes in database
      const hasDbChanges = await hasChanges();
      if (!hasDbChanges) {
        console.log('ℹ️ SyncOperations: No changes to publish');
        toast.info('No changes to sync');
        return;
      }

      // Publish to live
      console.log('📤 SyncOperations: Publishing to live mode');
      await PublishingService.publishProject(projectId);
      
      toast.success('Changes synced successfully!', {
        description: 'All updates are now live',
        duration: 3000
      });

    } catch (error) {
      console.error('❌ SyncOperations: Manual sync failed:', error);
      toast.error('Sync failed', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
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

  // Debounced and throttled scheduling
  const scheduleProcessing = useCallback((
    processQueuedChanges: any,
    syncState: any
  ) => {
    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce: wait for changes to stop
    debounceTimerRef.current = setTimeout(() => {
      if (!mountedRef.current) return;

      const now = Date.now();
      const timeSinceLastSync = now - syncState.lastSyncTime;

      // Throttle: ensure minimum time between syncs
      if (timeSinceLastSync < config.THROTTLE_INTERVAL) {
        const remainingThrottleTime = config.THROTTLE_INTERVAL - timeSinceLastSync;
        console.log(`⏳ SyncOperations: Throttling sync for ${remainingThrottleTime}ms`);
        
        throttleTimerRef.current = setTimeout(() => {
          if (mountedRef.current) processQueuedChanges();
        }, remainingThrottleTime);
      } else {
        processQueuedChanges();
      }
    }, config.DEBOUNCE_DELAY);
  }, [config.DEBOUNCE_DELAY, config.THROTTLE_INTERVAL, mountedRef]);

  const clearTimers = useCallback(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (throttleTimerRef.current) clearTimeout(throttleTimerRef.current);
    if (stuckTimeoutRef.current) clearTimeout(stuckTimeoutRef.current);
  }, [stuckTimeoutRef]);

  return {
    processQueuedChanges,
    triggerManualSync,
    scheduleProcessing,
    clearTimers
  };
};
