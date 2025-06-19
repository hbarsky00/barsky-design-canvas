
import { useCallback, useState, useRef, useEffect } from 'react';
import { useDevModeDatabase } from './useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';
import { toast } from 'sonner';

export const useSimplifiedSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { saveChange, hasChanges: checkHasChanges } = useDevModeDatabase(projectId);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  // Simple change queue - just store the latest change for each key
  const changeQueueRef = useRef<Map<string, { type: string; key: string; value: any }>>(new Map());

  // Check for changes periodically
  useEffect(() => {
    if (!projectId) return;

    const checkInterval = setInterval(async () => {
      if (!mountedRef.current) return;
      
      try {
        const result = await checkHasChanges();
        setHasChanges(result);
      } catch (error) {
        console.error('Error checking for changes:', error);
      }
    }, 3000);

    return () => clearInterval(checkInterval);
  }, [projectId, checkHasChanges]);

  // Simple queue change - just replace any existing change for the same key
  const queueChange = useCallback((type: 'text' | 'image' | 'content_block', key: string, value: any) => {
    if (!projectId || !mountedRef.current) return;

    const changeId = `${type}_${key}`;
    changeQueueRef.current.set(changeId, { type, key, value });

    console.log('📝 Simple queue: Change added:', { type, key, queueSize: changeQueueRef.current.size });

    // Debounce processing
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      processQueue();
    }, 2000);
  }, [projectId]);

  // Simple queue processor - save all changes to database
  const processQueue = useCallback(async () => {
    if (!projectId || !mountedRef.current || changeQueueRef.current.size === 0) {
      return;
    }

    console.log('🚀 Processing queue:', changeQueueRef.current.size, 'changes');

    const changes = Array.from(changeQueueRef.current.values());
    changeQueueRef.current.clear();

    // Save each change to database
    for (const change of changes) {
      try {
        await saveChange(change.type as any, change.key, change.value);
        console.log('✅ Saved change:', change.type, change.key);
      } catch (error) {
        console.error('❌ Failed to save change:', error);
        toast.error('Failed to save change');
      }
    }

    console.log('✅ Queue processing complete');
  }, [projectId, saveChange]);

  // Manual sync to live
  const syncToLive = useCallback(async () => {
    if (!projectId || isSyncing) {
      return;
    }

    setIsSyncing(true);
    console.log('🚀 Starting manual sync to live');

    try {
      // First, process any remaining queue
      await processQueue();
      
      // Wait a moment for database to update
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if we actually have changes to publish
      const hasDbChanges = await checkHasChanges();
      
      if (!hasDbChanges) {
        toast.info('No changes to sync to live');
        return;
      }

      // Publish to live
      toast.loading('Publishing to live...', { id: 'sync-live' });
      await PublishingService.publishProject(projectId);
      
      toast.success('Successfully synced to live!', {
        id: 'sync-live',
        description: 'Your changes are now live'
      });

      setHasChanges(false);

    } catch (error) {
      console.error('❌ Sync to live failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error('Failed to sync to live', {
        id: 'sync-live',
        description: errorMessage
      });
    } finally {
      if (mountedRef.current) {
        setIsSyncing(false);
      }
    }
  }, [projectId, isSyncing, processQueue, checkHasChanges]);

  // Cleanup
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    queueChange,
    syncToLive,
    isSyncing,
    hasChanges,
    queueSize: changeQueueRef.current.size
  };
};
