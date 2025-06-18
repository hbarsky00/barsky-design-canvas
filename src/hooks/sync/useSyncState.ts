
import { useState, useCallback, useRef } from 'react';
import { SyncState } from './types';

export const useSyncState = () => {
  const [syncState, setSyncState] = useState<SyncState>({
    isSyncing: false,
    hasQueuedChanges: false,
    lastSyncTime: 0,
    pendingChanges: 0,
    isStuck: false
  });

  const isProcessingRef = useRef<boolean>(false);
  const mountedRef = useRef(true);
  const stuckTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateSyncState = useCallback((updates: Partial<SyncState>) => {
    if (mountedRef.current) {
      setSyncState(prev => ({ ...prev, ...updates }));
    }
  }, []);

  const resetStuckState = useCallback(() => {
    if (stuckTimeoutRef.current) {
      clearTimeout(stuckTimeoutRef.current);
      stuckTimeoutRef.current = null;
    }
    
    setSyncState(prev => prev.isStuck ? { ...prev, isStuck: false } : prev);
  }, []);

  const forceReset = useCallback(() => {
    console.log('🔄 SyncState: Force reset triggered');
    
    // Clear all state
    isProcessingRef.current = false;
    
    // Clear all timers
    if (stuckTimeoutRef.current) clearTimeout(stuckTimeoutRef.current);
    
    setSyncState({
      isSyncing: false,
      hasQueuedChanges: false,
      lastSyncTime: Date.now(),
      pendingChanges: 0,
      isStuck: false
    });
  }, []);

  return {
    syncState,
    updateSyncState,
    resetStuckState,
    forceReset,
    isProcessingRef,
    mountedRef,
    stuckTimeoutRef
  };
};
