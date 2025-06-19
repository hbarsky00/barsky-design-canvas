
import { useCallback, useRef } from 'react';
import { useDevModeDatabase } from '../useDevModeDatabase';
import { SyncConfig } from './types';
import { useStuckDetection } from './useStuckDetection';
import { useQueueProcessor } from './useQueueProcessor';
import { useManualSync } from './useManualSync';

export const useSyncOperations = (
  projectId: string,
  config: SyncConfig,
  isProcessingRef: React.MutableRefObject<boolean>,
  mountedRef: React.MutableRefObject<boolean>,
  stuckTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
) => {
  const { hasChanges, saveChange } = useDevModeDatabase(projectId);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { startStuckDetection } = useStuckDetection(
    isProcessingRef,
    projectId,
    config.STUCK_TIMEOUT
  );

  const { processQueuedChanges } = useQueueProcessor(
    projectId,
    config,
    isProcessingRef,
    mountedRef,
    saveChange,
    startStuckDetection
  );

  const { triggerManualSync } = useManualSync(
    projectId,
    hasChanges,
    startStuckDetection,
    mountedRef
  );

  // Enhanced processQueuedChanges with state management
  const enhancedProcessQueuedChanges = useCallback(async (
    getBatch: (size: number) => any[],
    getQueueSize: () => number,
    updateSyncState: (updates: any) => void,
    resetStuckState: () => void
  ): Promise<boolean> => {
    return processQueuedChanges(
      getBatch,
      getQueueSize,
      updateSyncState,
      resetStuckState,
      stuckTimeoutRef
    );
  }, [processQueuedChanges, stuckTimeoutRef]);

  // Enhanced triggerManualSync
  const enhancedTriggerManualSync = useCallback(async (
    getQueueSize: () => number,
    processQueuedChanges: any,
    updateSyncState: (updates: any) => void,
    resetStuckState: () => void,
    syncState: any,
    forceReset: () => void
  ) => {
    return triggerManualSync(
      getQueueSize,
      processQueuedChanges,
      updateSyncState,
      resetStuckState,
      syncState,
      forceReset,
      stuckTimeoutRef
    );
  }, [triggerManualSync, stuckTimeoutRef]);

  // SIMPLIFIED: Scheduling without complex throttling
  const scheduleProcessing = useCallback((
    processQueuedChanges: any,
    syncState: any
  ) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (mountedRef.current) {
        processQueuedChanges();
      }
    }, config.DEBOUNCE_DELAY);
  }, [config.DEBOUNCE_DELAY, mountedRef]);

  const clearTimers = useCallback(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (stuckTimeoutRef.current) clearTimeout(stuckTimeoutRef.current);
  }, [stuckTimeoutRef]);

  return {
    processQueuedChanges: enhancedProcessQueuedChanges,
    triggerManualSync: enhancedTriggerManualSync,
    scheduleProcessing,
    clearTimers
  };
};
