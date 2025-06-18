
import { useState, useCallback, useEffect, useRef } from 'react';
import { useDevModeDatabase } from './useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';
import { toast } from 'sonner';

export const useDevModeSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasChangesToSync, setHasChangesToSync] = useState(false);
  const { hasChanges: checkHasChanges } = useDevModeDatabase(projectId);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const syncQueueRef = useRef<boolean>(false);
  const mountedRef = useRef(true);
  const lastCheckRef = useRef<number>(0);

  // Aggressive change detection - check every second
  const checkChanges = useCallback(async () => {
    if (!projectId || !mountedRef.current) {
      return;
    }
    
    const now = Date.now();
    if (now - lastCheckRef.current < 500) {
      return; // Throttle to max 2 checks per second
    }
    lastCheckRef.current = now;
    
    try {
      const result = await checkHasChanges();
      
      if (mountedRef.current) {
        setHasChangesToSync(result);
        
        // Auto-sync immediately when changes detected
        if (result && !isSyncing && !syncQueueRef.current) {
          console.log('🚀 useDevModeSync: Changes detected, queuing immediate sync');
          syncQueueRef.current = true;
          
          // Sync after very short delay to batch rapid changes
          setTimeout(() => {
            if (mountedRef.current && syncQueueRef.current) {
              syncChangesToFiles();
            }
          }, 500);
        }
      }
    } catch (error) {
      console.error('❌ useDevModeSync: Error checking for changes:', error);
    }
  }, [projectId, checkHasChanges, isSyncing]);

  // Set up aggressive monitoring
  useEffect(() => {
    if (!projectId) {
      setHasChangesToSync(false);
      return;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Initial check
    checkChanges();
    
    // Check every second for changes
    intervalRef.current = setInterval(checkChanges, 1000);
    
    // Listen for any project updates and sync immediately
    const handleProjectDataUpdate = (e: CustomEvent) => {
      const detail = e.detail || {};
      
      console.log('🔄 useDevModeSync: Project update detected:', detail);
      
      // Don't sync if this was already a published change
      if (detail.published) {
        setHasChangesToSync(false);
        syncQueueRef.current = false;
        return;
      }
      
      // For any dev mode change, trigger immediate check and sync
      if (detail.projectId === projectId || detail.immediate || detail.textChanged || detail.imageReplaced) {
        console.log('⚡ useDevModeSync: Immediate sync triggered by update');
        
        // Force immediate check and sync
        setTimeout(() => {
          if (mountedRef.current) {
            checkChanges();
          }
        }, 100);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    };
  }, [projectId, checkChanges]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const syncChangesToFiles = useCallback(async () => {
    if (!projectId || isSyncing) {
      return;
    }

    console.log('🚀 useDevModeSync: Starting immediate sync to live mode for project:', projectId);
    
    setIsSyncing(true);
    syncQueueRef.current = false;
    
    try {
      // Verify we have changes before publishing
      const hasDbChanges = await checkHasChanges();
      
      if (!hasDbChanges) {
        console.log('ℹ️ useDevModeSync: No changes detected in database');
        setHasChangesToSync(false);
        return;
      }

      console.log('📤 useDevModeSync: Publishing all changes to live mode');
      await PublishingService.publishProject(projectId);
      
      console.log('✅ useDevModeSync: Successfully synced to live mode');
      toast.success("Changes synced to live!", {
        description: "Your updates are now visible in live mode",
        duration: 3000
      });

      setHasChangesToSync(false);
      
    } catch (error) {
      console.error('❌ useDevModeSync: Error syncing to live:', error);
      toast.error("Sync failed", {
        description: "Could not sync changes to live mode. Please try again."
      });
      
      // Reset sync queue on error to allow retry
      syncQueueRef.current = false;
    } finally {
      if (mountedRef.current) {
        setIsSyncing(false);
      }
    }
  }, [checkHasChanges, projectId, isSyncing]);

  return {
    syncChangesToFiles,
    isSyncing,
    hasChangesToSync
  };
};
