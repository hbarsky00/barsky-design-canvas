
import { useCallback, useRef } from 'react';
import { useDevModeDatabase } from '../useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';
import { toast } from 'sonner';
import { ChangeQueue, SyncConfig } from './types';
import { debugCache } from '@/utils/debugUtils';

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
  const lastProcessTimeRef = useRef<number>(0);

  // Enhanced stuck detection with cache clearing
  const handleStuckDetection = useCallback(() => {
    debugCache.log('⚠️ SyncOperations: Stuck state detected, forcing complete reset');
    
    // Clear all processing flags
    isProcessingRef.current = false;
    
    // Clear all timers
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (throttleTimerRef.current) clearTimeout(throttleTimerRef.current);
    
    // Clear caches to prevent state persistence
    debugCache.clearAllCaches();
    
    toast.error('Sync got stuck and was reset', {
      description: 'All caches cleared. Please try your changes again'
    });
    
    // Force a hard refresh of the sync state
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { projectId, forceReset: true, timestamp: Date.now() }
      }));
    }, 100);
  }, [isProcessingRef, projectId]);

  // Start stuck detection timer with better logging
  const startStuckDetection = useCallback(() => {
    if (stuckTimeoutRef.current) clearTimeout(stuckTimeoutRef.current);
    
    const startTime = Date.now();
    debugCache.log('⏰ Starting stuck detection timer', { timeout: config.STUCK_TIMEOUT });
    
    stuckTimeoutRef.current = setTimeout(() => {
      const elapsed = Date.now() - startTime;
      debugCache.log('🚨 Stuck timeout triggered', { elapsed, expected: config.STUCK_TIMEOUT });
      handleStuckDetection();
    }, config.STUCK_TIMEOUT);
  }, [handleStuckDetection, config.STUCK_TIMEOUT, stuckTimeoutRef]);

  // Enhanced batch processing with better error handling and loop prevention
  const processQueuedChanges = useCallback(async (
    getBatch: (size: number) => ChangeQueue[],
    getQueueSize: () => number,
    updateSyncState: (updates: any) => void,
    resetStuckState: () => void
  ): Promise<boolean> => {
    const currentTime = Date.now();
    
    // Prevent rapid-fire processing that could cause loops
    if (currentTime - lastProcessTimeRef.current < 500) {
      debugCache.log('⏳ Skipping rapid-fire processing attempt');
      return false;
    }
    lastProcessTimeRef.current = currentTime;

    if (!projectId || isProcessingRef.current || !mountedRef.current || getQueueSize() === 0) {
      debugCache.log('⏭️ Skipping processing', {
        hasProjectId: !!projectId,
        isProcessing: isProcessingRef.current,
        isMounted: mountedRef.current,
        queueSize: getQueueSize()
      });
      return false;
    }

    isProcessingRef.current = true;
    debugCache.log('🚀 SyncOperations: Starting batch processing', { queueSize: getQueueSize() });

    // Start stuck detection
    startStuckDetection();

    try {
      // Take a batch of changes
      const batch = getBatch(config.BATCH_SIZE);
      debugCache.log('📦 Processing batch', { batchSize: batch.length });
      
      updateSyncState({
        isSyncing: true,
        pendingChanges: getQueueSize()
      });

      // Process batch with individual error handling
      const results = await Promise.allSettled(
        batch.map(change => 
          saveChange(change.type, change.key, change.value)
            .catch(error => {
              debugCache.log('❌ Individual change failed', { change, error });
              return false;
            })
        )
      );

      const successCount = results.filter(r => r.status === 'fulfilled' && r.value === true).length;
      const failCount = batch.length - successCount;

      if (failCount > 0) {
        debugCache.log(`⚠️ Batch processing had failures`, { successCount, failCount });
        toast.warning(`${failCount} changes failed to save`, {
          description: 'Some changes may not be synced properly'
        });
      }

      debugCache.log(`✅ Batch processed successfully`, { successCount, failCount });

      // Continue processing if more changes exist (with safety check)
      const remainingChanges = getQueueSize();
      if (remainingChanges > 0 && mountedRef.current) {
        debugCache.log('🔄 More changes detected, scheduling next batch', { remaining: remainingChanges });
        setTimeout(() => {
          if (mountedRef.current && !isProcessingRef.current) {
            processQueuedChanges(getBatch, getQueueSize, updateSyncState, resetStuckState);
          }
        }, 100);
      }

      return successCount > 0;
    } catch (error) {
      debugCache.log('❌ Batch processing error', error);
      toast.error('Sync error', {
        description: 'Failed to process changes batch'
      });
      return false;
    } finally {
      isProcessingRef.current = false;
      resetStuckState();
      
      if (mountedRef.current) {
        const finalQueueSize = getQueueSize();
        updateSyncState({
          isSyncing: finalQueueSize > 0,
          hasQueuedChanges: finalQueueSize > 0,
          pendingChanges: finalQueueSize,
          lastSyncTime: finalQueueSize === 0 ? Date.now() : undefined
        });
        
        debugCache.log('🏁 Batch processing completed', { finalQueueSize });
      }
    }
  }, [projectId, saveChange, startStuckDetection, config.BATCH_SIZE, isProcessingRef, mountedRef]);

  // Enhanced manual sync with better state management
  const triggerManualSync = useCallback(async (
    getQueueSize: () => number,
    processQueuedChanges: any,
    updateSyncState: (updates: any) => void,
    resetStuckState: () => void,
    syncState: any,
    forceReset: () => void
  ) => {
    if (!projectId) {
      debugCache.log('❌ No projectId for manual sync');
      return;
    }
    
    debugCache.log('🖱️ Manual sync triggered', { 
      queueSize: getQueueSize(),
      isStuck: syncState.isStuck,
      isSyncing: syncState.isSyncing 
    });
    
    // If stuck, force reset first
    if (syncState.isStuck || (syncState.isSyncing && getQueueSize() === 0)) {
      debugCache.log('🔄 Forcing reset due to stuck state');
      forceReset();
      return;
    }
    
    if (syncState.isSyncing) {
      debugCache.log('⏳ Sync already in progress, skipping');
      return;
    }

    try {
      updateSyncState({ isSyncing: true });
      startStuckDetection();

      // Process any pending changes first
      const initialQueueSize = getQueueSize();
      if (initialQueueSize > 0) {
        debugCache.log('📤 Processing queued changes first', { count: initialQueueSize });
        await processQueuedChanges();
      }

      // Check for changes in database
      const hasDbChanges = await hasChanges();
      debugCache.log('🔍 Database changes check', { hasChanges: hasDbChanges });
      
      if (!hasDbChanges) {
        debugCache.log('ℹ️ No changes to publish');
        toast.info('No changes to sync');
        return;
      }

      // Publish to live
      debugCache.log('📤 Publishing to live mode');
      await PublishingService.publishProject(projectId);
      
      toast.success('Changes synced successfully!', {
        description: 'All updates are now live',
        duration: 3000
      });

    } catch (error) {
      debugCache.log('❌ Manual sync failed', error);
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

  // Enhanced scheduling with loop prevention
  const scheduleProcessing = useCallback((
    processQueuedChanges: any,
    syncState: any
  ) => {
    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debugCache.log('⏰ Scheduling processing', { 
      debounceDelay: config.DEBOUNCE_DELAY,
      lastSyncTime: syncState.lastSyncTime 
    });

    // Debounce: wait for changes to stop
    debounceTimerRef.current = setTimeout(() => {
      if (!mountedRef.current) return;

      const now = Date.now();
      const timeSinceLastSync = now - syncState.lastSyncTime;

      // Throttle: ensure minimum time between syncs
      if (timeSinceLastSync < config.THROTTLE_INTERVAL) {
        const remainingThrottleTime = config.THROTTLE_INTERVAL - timeSinceLastSync;
        debugCache.log(`⏳ Throttling sync`, { remaining: remainingThrottleTime });
        
        throttleTimerRef.current = setTimeout(() => {
          if (mountedRef.current) {
            debugCache.log('🚀 Executing throttled sync');
            processQueuedChanges();
          }
        }, remainingThrottleTime);
      } else {
        debugCache.log('🚀 Executing immediate sync');
        processQueuedChanges();
      }
    }, config.DEBOUNCE_DELAY);
  }, [config.DEBOUNCE_DELAY, config.THROTTLE_INTERVAL, mountedRef]);

  const clearTimers = useCallback(() => {
    debugCache.log('🧹 Clearing all sync timers');
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
