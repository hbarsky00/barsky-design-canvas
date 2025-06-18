
import { useState, useCallback, useEffect, useRef } from 'react';
import { useDevModeDatabase } from './useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';
import { toast } from 'sonner';

interface ChangeQueue {
  id: string;
  type: 'text' | 'image' | 'content_block';
  key: string;
  value: any;
  timestamp: number;
}

interface SyncState {
  isSyncing: boolean;
  hasQueuedChanges: boolean;
  lastSyncTime: number;
  pendingChanges: number;
  isStuck: boolean;
}

export const useOptimizedSync = (projectId: string) => {
  const [syncState, setSyncState] = useState<SyncState>({
    isSyncing: false,
    hasQueuedChanges: false,
    lastSyncTime: 0,
    pendingChanges: 0,
    isStuck: false
  });

  const { hasChanges, saveChange } = useDevModeDatabase(projectId);
  
  // Refs for managing state without re-renders
  const changeQueueRef = useRef<ChangeQueue[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const throttleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastChangeTimeRef = useRef<number>(0);
  const isProcessingRef = useRef<boolean>(false);
  const mountedRef = useRef(true);
  const stuckTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Configuration
  const DEBOUNCE_DELAY = 2500;
  const THROTTLE_INTERVAL = 5000;
  const BATCH_SIZE = 10;
  const MAX_QUEUE_SIZE = 50;
  const STUCK_TIMEOUT = 15000; // 15 seconds to detect stuck state

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (throttleTimerRef.current) clearTimeout(throttleTimerRef.current);
      if (stuckTimeoutRef.current) clearTimeout(stuckTimeoutRef.current);
    };
  }, []);

  // Reset stuck state when sync completes or queue becomes empty
  const resetStuckState = useCallback(() => {
    if (stuckTimeoutRef.current) {
      clearTimeout(stuckTimeoutRef.current);
      stuckTimeoutRef.current = null;
    }
    
    setSyncState(prev => prev.isStuck ? { ...prev, isStuck: false } : prev);
  }, []);

  // Detect and handle stuck sync operations
  const handleStuckDetection = useCallback(() => {
    console.warn('⚠️ OptimizedSync: Stuck state detected, forcing reset');
    
    // Clear all processing flags
    isProcessingRef.current = false;
    changeQueueRef.current = [];
    
    // Clear all timers
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (throttleTimerRef.current) clearTimeout(throttleTimerRef.current);
    
    setSyncState({
      isSyncing: false,
      hasQueuedChanges: false,
      lastSyncTime: Date.now(),
      pendingChanges: 0,
      isStuck: true
    });
    
    toast.error('Sync got stuck and was reset', {
      description: 'Please try your changes again'
    });
    
    // Reset stuck flag after showing the message
    setTimeout(() => {
      setSyncState(prev => ({ ...prev, isStuck: false }));
    }, 3000);
  }, []);

  // Start stuck detection timer
  const startStuckDetection = useCallback(() => {
    if (stuckTimeoutRef.current) clearTimeout(stuckTimeoutRef.current);
    
    stuckTimeoutRef.current = setTimeout(handleStuckDetection, STUCK_TIMEOUT);
  }, [handleStuckDetection]);

  // Smart change detection - only meaningful changes
  const isMeaningfulChange = useCallback((newChange: ChangeQueue, existingChanges: ChangeQueue[]): boolean => {
    const existing = existingChanges.find(c => c.type === newChange.type && c.key === newChange.key);
    
    if (!existing) return true;
    
    // For text, ignore minimal changes
    if (newChange.type === 'text') {
      const oldText = existing.value || '';
      const newText = newChange.value || '';
      
      // Ignore changes less than 3 characters or less than 10% change
      const lengthDiff = Math.abs(newText.length - oldText.length);
      const changeRatio = lengthDiff / Math.max(oldText.length, 1);
      
      return lengthDiff >= 3 || changeRatio >= 0.1;
    }
    
    return existing.value !== newChange.value;
  }, []);

  // Queue change with smart detection
  const queueChange = useCallback((type: 'text' | 'image' | 'content_block', key: string, value: any) => {
    if (!projectId || !mountedRef.current) return;

    const newChange: ChangeQueue = {
      id: `${type}_${key}_${Date.now()}`,
      type,
      key,
      value,
      timestamp: Date.now()
    };

    console.log('🔄 OptimizedSync: Evaluating change for queue:', { type, key, valuePreview: typeof value === 'string' ? value.substring(0, 30) + '...' : value });

    // Smart change detection
    if (!isMeaningfulChange(newChange, changeQueueRef.current)) {
      console.log('⏭️ OptimizedSync: Skipping non-meaningful change');
      return;
    }

    // Add to queue, replacing any existing change with same type/key
    changeQueueRef.current = [
      ...changeQueueRef.current.filter(c => !(c.type === type && c.key === key)),
      newChange
    ];

    // Prevent queue from growing too large
    if (changeQueueRef.current.length > MAX_QUEUE_SIZE) {
      changeQueueRef.current = changeQueueRef.current.slice(-MAX_QUEUE_SIZE);
      console.warn('⚠️ OptimizedSync: Queue size limit reached, truncating old changes');
    }

    lastChangeTimeRef.current = Date.now();

    // Update state
    setSyncState(prev => ({
      ...prev,
      hasQueuedChanges: true,
      pendingChanges: changeQueueRef.current.length,
      isStuck: false
    }));

    console.log('📝 OptimizedSync: Change queued, total pending:', changeQueueRef.current.length);

    // Start debounced processing
    scheduleProcessing();
  }, [projectId, isMeaningfulChange]);

  // Batch processing of queued changes
  const processQueuedChanges = useCallback(async (): Promise<boolean> => {
    if (!projectId || isProcessingRef.current || !mountedRef.current || changeQueueRef.current.length === 0) {
      return false;
    }

    isProcessingRef.current = true;
    console.log('🚀 OptimizedSync: Processing batch of', changeQueueRef.current.length, 'changes');

    // Start stuck detection
    startStuckDetection();

    try {
      // Take a batch of changes
      const batch = changeQueueRef.current.splice(0, BATCH_SIZE);
      
      setSyncState(prev => ({
        ...prev,
        isSyncing: true,
        pendingChanges: changeQueueRef.current.length
      }));

      // Process batch with individual error handling
      const results = await Promise.allSettled(
        batch.map(change => 
          saveChange(change.type, change.key, change.value)
            .catch(error => {
              console.error('❌ OptimizedSync: Failed to save change:', change, error);
              return false;
            })
        )
      );

      const successCount = results.filter(r => r.status === 'fulfilled' && r.value === true).length;
      const failCount = batch.length - successCount;

      if (failCount > 0) {
        console.warn(`⚠️ OptimizedSync: ${failCount} changes failed to save`);
        toast.warning(`${failCount} changes failed to save`, {
          description: 'Some changes may not be synced properly'
        });
      }

      console.log(`✅ OptimizedSync: Batch processed - ${successCount} successful, ${failCount} failed`);

      // Continue processing if more changes exist
      if (changeQueueRef.current.length > 0 && mountedRef.current) {
        setTimeout(() => processQueuedChanges(), 100);
      }

      return successCount > 0;
    } catch (error) {
      console.error('❌ OptimizedSync: Error processing batch:', error);
      toast.error('Sync error', {
        description: 'Failed to process changes batch'
      });
      return false;
    } finally {
      isProcessingRef.current = false;
      resetStuckState();
      
      if (mountedRef.current) {
        setSyncState(prev => ({
          ...prev,
          isSyncing: changeQueueRef.current.length > 0,
          hasQueuedChanges: changeQueueRef.current.length > 0,
          pendingChanges: changeQueueRef.current.length,
          lastSyncTime: changeQueueRef.current.length === 0 ? Date.now() : prev.lastSyncTime
        }));
      }
    }
  }, [projectId, saveChange, startStuckDetection, resetStuckState]);

  // Debounced and throttled scheduling
  const scheduleProcessing = useCallback(() => {
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
      if (timeSinceLastSync < THROTTLE_INTERVAL) {
        const remainingThrottleTime = THROTTLE_INTERVAL - timeSinceLastSync;
        console.log(`⏳ OptimizedSync: Throttling sync for ${remainingThrottleTime}ms`);
        
        throttleTimerRef.current = setTimeout(() => {
          if (mountedRef.current) processQueuedChanges();
        }, remainingThrottleTime);
      } else {
        processQueuedChanges();
      }
    }, DEBOUNCE_DELAY);
  }, [processQueuedChanges, syncState.lastSyncTime]);

  // Force reset function for manual recovery
  const forceReset = useCallback(() => {
    console.log('🔄 OptimizedSync: Force reset triggered');
    
    // Clear all state
    isProcessingRef.current = false;
    changeQueueRef.current = [];
    
    // Clear all timers
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (throttleTimerRef.current) clearTimeout(throttleTimerRef.current);
    if (stuckTimeoutRef.current) clearTimeout(stuckTimeoutRef.current);
    
    setSyncState({
      isSyncing: false,
      hasQueuedChanges: false,
      lastSyncTime: Date.now(),
      pendingChanges: 0,
      isStuck: false
    });
    
    toast.success('Sync system reset');
  }, []);

  // Manual sync trigger with conflict resolution
  const triggerManualSync = useCallback(async () => {
    if (!projectId) return;
    
    // If stuck, force reset first
    if (syncState.isStuck || (syncState.isSyncing && changeQueueRef.current.length === 0)) {
      forceReset();
      return;
    }
    
    if (syncState.isSyncing) {
      console.log('⏳ OptimizedSync: Sync already in progress');
      return;
    }

    console.log('🖱️ OptimizedSync: Manual sync triggered');
    
    try {
      setSyncState(prev => ({ ...prev, isSyncing: true }));
      startStuckDetection();

      // Process any pending changes first
      if (changeQueueRef.current.length > 0) {
        await processQueuedChanges();
      }

      // Check for changes in database
      const hasDbChanges = await hasChanges();
      if (!hasDbChanges) {
        console.log('ℹ️ OptimizedSync: No changes to publish');
        toast.info('No changes to sync');
        return;
      }

      // Publish to live
      console.log('📤 OptimizedSync: Publishing to live mode');
      await PublishingService.publishProject(projectId);
      
      toast.success('Changes synced successfully!', {
        description: 'All updates are now live',
        duration: 3000
      });

    } catch (error) {
      console.error('❌ OptimizedSync: Manual sync failed:', error);
      toast.error('Sync failed', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      resetStuckState();
      if (mountedRef.current) {
        setSyncState(prev => ({ 
          ...prev, 
          isSyncing: false,
          lastSyncTime: Date.now()
        }));
      }
    }
  }, [projectId, syncState.isSyncing, syncState.isStuck, processQueuedChanges, hasChanges, forceReset, startStuckDetection, resetStuckState]);

  return {
    queueChange,
    triggerManualSync,
    forceReset,
    syncState,
    clearQueue: () => {
      changeQueueRef.current = [];
      setSyncState(prev => ({
        ...prev,
        hasQueuedChanges: false,
        pendingChanges: 0
      }));
    }
  };
};
