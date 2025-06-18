
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useChangeQueue } from './sync/useChangeQueue';
import { useSyncState } from './sync/useSyncState';
import { useSyncOperations } from './sync/useSyncOperations';
import { DEFAULT_SYNC_CONFIG } from './sync/types';

export const useOptimizedSync = (projectId: string) => {
  const config = DEFAULT_SYNC_CONFIG;
  
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

  // Enhanced triggerManualSync with state management
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

  // Enhanced queueChange with state updates and scheduling
  const enhancedQueueChange = useCallback((type: 'text' | 'image' | 'content_block', key: string, value: any) => {
    if (!projectId || !mountedRef.current) return;

    const wasQueued = queueChange(type, key, value);
    
    if (wasQueued) {
      // Update state
      updateSyncState({
        hasQueuedChanges: true,
        pendingChanges: getQueueSize(),
        isStuck: false
      });

      // Start debounced processing
      scheduleProcessing(processQueuedChanges, syncState);
    }
  }, [projectId, queueChange, getQueueSize, updateSyncState, scheduleProcessing, processQueuedChanges, syncState, mountedRef]);

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
