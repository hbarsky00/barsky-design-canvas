
import { useCallback } from 'react';
import { toast } from 'sonner';
import { debugCache } from '@/utils/debugUtils';

export const useStuckDetection = (
  isProcessingRef: React.MutableRefObject<boolean>,
  projectId: string,
  stuckTimeout: number
) => {
  const handleStuckDetection = useCallback(() => {
    debugCache.log('⚠️ SyncOperations: Resetting stuck sync (preserving dev work)');
    
    // Clear processing flags
    isProcessingRef.current = false;
    
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

  const startStuckDetection = useCallback((stuckTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>) => {
    if (stuckTimeoutRef.current) clearTimeout(stuckTimeoutRef.current);
    
    stuckTimeoutRef.current = setTimeout(() => {
      debugCache.log('🚨 Stuck timeout triggered');
      handleStuckDetection();
    }, stuckTimeout);
  }, [handleStuckDetection, stuckTimeout]);

  return { handleStuckDetection, startStuckDetection };
};
