
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useChangeQueue } from './sync/useChangeQueue';
import { useSyncState } from './sync/useSyncState';
import { useSyncOperations } from './sync/useSyncOperations';
import { DEFAULT_SYNC_CONFIG } from './sync/types';

export const useOptimizedSync = (projectId: string) => {
  const config = {
    ...DEFAULT_SYNC_CONFIG,
    DEBOUNCE_DELAY: 1500, // Faster auto-sync
    AUTO_SYNC_ENABLED: true
  };
  
  const {
    syncState,
    updateSyncState,
    resetStuckState,
    forceReset,
    isProcessingRef,
    mountedRef,
    stuckTimeoutRef
  } = useSyncState();

  const {
    queueChange,
    clearQueue,
    getQueueSize,
    getBatch,
    changeQueueRef,
    lastChangeTimeRef
  } = useChangeQueue(config);

  const {
    processQueuedChanges: baseProcessQueuedChanges,
    triggerManualSync: baseTriggerManualSync,
    scheduleProcessing,
    clearTimers
  } = useSyncOperations(projectId, config, isProcessingRef, mountedRef, stuckTimeoutRef);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      clearTimers();
    };
  }, [clearTimers, mountedRef]);

  // Enhanced processQueuedChanges with state management
  const processQueuedChanges = useCallback(async (): Promise<boolean> => {
    return baseProcessQueuedChanges(
      getBatch,
      getQueueSize,
      updateSyncState,
      resetStuckState
    );
  }, [baseProcessQueuedChanges, getBatch, getQueueSize, updateSyncState, resetStuckState]);

  // Auto-sync functionality - triggers sync to live automatically
  const triggerAutoSync = useCallback(async () => {
    if (!projectId || syncState.isSyncing) return;
    
    console.log('🤖 Auto-sync triggered');
    
    try {
      updateSyncState({ isSyncing: true });
      
      // Process queued changes first
      if (getQueueSize() > 0) {
        console.log('📤 Auto-sync: Processing queued changes first');
        await processQueuedChanges();
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Auto-publish to live without clearing dev changes
      console.log('📤 Auto-sync: Publishing to live (preserving dev work)');
      const { PublishingService } = await import('@/services/publishingService');
      await PublishingService.publishProject(projectId);
      
      console.log('✅ Auto-sync completed successfully');
      
    } catch (error) {
      console.error('❌ Auto-sync failed:', error);
    } finally {
      if (mountedRef.current) {
        updateSyncState({ 
          isSyncing: false,
          lastSyncTime: Date.now()
        });
      }
    }
  }, [projectId, syncState.isSyncing, getQueueSize, processQueuedChanges, updateSyncState, mountedRef]);

  // Enhanced triggerManualSync
  const triggerManualSync = useCallback(async () => {
    return baseTriggerManualSync(
      getQueueSize,
      processQueuedChanges,
      updateSyncState,
      resetStuckState,
      syncState,
      forceReset
    );
  }, [baseTriggerManualSync, getQueueSize, processQueuedChanges, updateSyncState, resetStuckState, syncState, forceReset]);

  // Enhanced queueChange with auto-sync scheduling
  const enhancedQueueChange = useCallback((type: 'text' | 'image' | 'content_block', key: string, value: any) => {
    if (!projectId || !mountedRef.current) return;

    const wasQueued = queueChange(type, key, value);
    
    if (wasQueued) {
      console.log('📝 Change queued, scheduling auto-sync:', { type, key });
      
      // Update state
      updateSyncState({
        hasQueuedChanges: true,
        pendingChanges: getQueueSize(),
        isStuck: false
      });

      // Schedule auto-sync instead of just processing
      if (config.AUTO_SYNC_ENABLED) {
        scheduleProcessing(triggerAutoSync, syncState);
      } else {
        scheduleProcessing(processQueuedChanges, syncState);
      }
    }
  }, [projectId, queueChange, getQueueSize, updateSyncState, scheduleProcessing, triggerAutoSync, processQueuedChanges, syncState, mountedRef, config.AUTO_SYNC_ENABLED]);

  // Enhanced forceReset with queue clearing
  const enhancedForceReset = useCallback(() => {
    clearQueue();
    clearTimers();
    forceReset();
    
    toast.success('Sync system reset');
  }, [clearQueue, clearTimers, forceReset]);

  // Enhanced clearQueue with state updates
  const enhancedClearQueue = useCallback(() => {
    clearQueue();
    updateSyncState({
      hasQueuedChanges: false,
      pendingChanges: 0
    });
  }, [clearQueue, updateSyncState]);

  return {
    queueChange: enhancedQueueChange,
    triggerManualSync,
    forceReset: enhancedForceReset,
    syncState,
    clearQueue: enhancedClearQueue
  };
};
