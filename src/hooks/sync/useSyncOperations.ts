
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
  const lastProcessTimeRef = useRef<number>(0);

  // SIMPLIFIED: Reset sync state without aggressive cache clearing
  const handleStuckDetection = useCallback(() => {
    debugCache.log('⚠️ SyncOperations: Resetting stuck sync (preserving dev work)');
    
    // Clear processing flags
    isProcessingRef.current = false;
    
    // Clear timers
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    
    // MINIMAL cache clearing - only published cache
    debugCache.clearOnlyPublishedCache();
    
    toast.error('Sync reset - your dev work is safe', {
      description: 'Sync system reset. All your dev mode work is preserved.'
    });
    
    // Gentle refresh that preserves dev work
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId, 
          syncReset: true, 
          preserveDevWork: true,
          minimal: true,
          timestamp: Date.now() 
        }
      }));
    }, 100);
  }, [isProcessingRef, projectId]);

  const startStuckDetection = useCallback(() => {
    if (stuckTimeoutRef.current) clearTimeout(stuckTimeoutRef.current);
    
    stuckTimeoutRef.current = setTimeout(() => {
      debugCache.log('🚨 Stuck timeout triggered');
      handleStuckDetection();
    }, config.STUCK_TIMEOUT);
  }, [handleStuckDetection, config.STUCK_TIMEOUT, stuckTimeoutRef]);

  // SIMPLIFIED: Process changes without aggressive clearing
  const processQueuedChanges = useCallback(async (
    getBatch: (size: number) => ChangeQueue[],
    getQueueSize: () => number,
    updateSyncState: (updates: any) => void,
    resetStuckState: () => void
  ): Promise<boolean> => {
    const currentTime = Date.now();
    
    // Prevent rapid processing
    if (currentTime - lastProcessTimeRef.current < 500) {
      return false;
    }
    lastProcessTimeRef.current = currentTime;

    if (!projectId || isProcessingRef.current || !mountedRef.current || getQueueSize() === 0) {
      return false;
    }

    isProcessingRef.current = true;
    debugCache.log('🚀 Starting batch processing', { queueSize: getQueueSize() });

    startStuckDetection();

    try {
      const batch = getBatch(config.BATCH_SIZE);
      
      updateSyncState({
        isSyncing: true,
        pendingChanges: getQueueSize()
      });

      // Process changes individually
      const results = await Promise.allSettled(
        batch.map(change => saveChange(change.type, change.key, change.value))
      );

      const successCount = results.filter(r => r.status === 'fulfilled').length;
      
      debugCache.log(`✅ Batch processed`, { successCount, total: batch.length });

      // Continue if more changes exist
      const remainingChanges = getQueueSize();
      if (remainingChanges > 0 && mountedRef.current) {
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
        description: 'Failed to process changes. Your work is still saved locally.'
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
      }
    }
  }, [projectId, saveChange, startStuckDetection, config.BATCH_SIZE, isProcessingRef, mountedRef]);

  // SIMPLIFIED: Manual sync with better error handling
  const triggerManualSync = useCallback(async (
    getQueueSize: () => number,
    processQueuedChanges: any,
    updateSyncState: (updates: any) => void,
    resetStuckState: () => void,
    syncState: any,
    forceReset: () => void
  ) => {
    if (!projectId) {
      toast.error('No project selected');
      return;
    }
    
    debugCache.log('🖱️ Manual sync triggered', { 
      queueSize: getQueueSize(),
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
      startStuckDetection();

      // Process queued changes first
      const initialQueueSize = getQueueSize();
      if (initialQueueSize > 0) {
        debugCache.log('📤 Processing queued changes', { count: initialQueueSize });
        await processQueuedChanges();
      }

      // Check for database changes
      const hasDbChanges = await hasChanges();
      
      if (!hasDbChanges) {
        toast.info('No changes to sync to live');
        return;
      }

      // Publish to live
      debugCache.log('📤 Publishing to live mode');
      await PublishingService.publishProject(projectId);
      
      toast.success('Successfully synced to live!', {
        description: 'All your changes are now live',
        duration: 3000
      });

    } catch (error) {
      debugCache.log('❌ Manual sync failed', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error('Failed to sync to live', {
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
    processQueuedChanges,
    triggerManualSync,
    scheduleProcessing,
    clearTimers
  };
};
