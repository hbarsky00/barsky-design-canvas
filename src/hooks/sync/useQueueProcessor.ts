
import { useCallback, useRef } from 'react';
import { debugCache } from '@/utils/debugUtils';
import { toast } from 'sonner';
import { SyncConfig } from './types';

export const useQueueProcessor = (
  projectId: string,
  config: SyncConfig,
  isProcessingRef: React.MutableRefObject<boolean>,
  mountedRef: React.MutableRefObject<boolean>,
  saveChange: (type: string, key: string, value: any) => Promise<boolean>,
  startStuckDetection: (stuckTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>) => void
) => {
  const lastProcessTimeRef = useRef<number>(0);

  const processQueuedChanges = useCallback(async (
    getBatch: (size: number) => any[],
    getQueueSize: () => number,
    updateSyncState: (updates: any) => void,
    resetStuckState: () => void,
    stuckTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
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

    startStuckDetection(stuckTimeoutRef);

    try {
      const batch = getBatch(config.BATCH_SIZE);
      
      updateSyncState({
        isSyncing: true,
        pendingChanges: getQueueSize()
      });

      // Process changes individually and save to database
      const results = await Promise.allSettled(
        batch.map(change => {
          debugCache.log('💾 Processing queued change:', { type: change.type, key: change.key });
          return saveChange(change.type, change.key, change.value);
        })
      );

      const successCount = results.filter(r => r.status === 'fulfilled').length;
      
      debugCache.log(`✅ Batch processed and saved to database`, { successCount, total: batch.length });

      // Continue if more changes exist
      const remainingChanges = getQueueSize();
      if (remainingChanges > 0 && mountedRef.current) {
        setTimeout(() => {
          if (mountedRef.current && !isProcessingRef.current) {
            processQueuedChanges(getBatch, getQueueSize, updateSyncState, resetStuckState, stuckTimeoutRef);
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

  return { processQueuedChanges };
};
