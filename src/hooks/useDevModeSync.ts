
import { useState, useCallback, useEffect, useRef } from 'react';
import { useDevModeDatabase } from './useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';
import { toast } from 'sonner';

export const useDevModeSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasChangesToSync, setHasChangesToSync] = useState(false);
  const { hasChanges: checkHasChanges } = useDevModeDatabase(projectId);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isCheckingRef = useRef(false);
  const mountedRef = useRef(true);
  const lastSyncRef = useRef<number>(0);

  // Check for changes more frequently and reliably
  const checkChanges = useCallback(async () => {
    if (!projectId || isCheckingRef.current || !mountedRef.current) {
      return;
    }
    
    isCheckingRef.current = true;
    
    try {
      const result = await checkHasChanges();
      
      if (mountedRef.current) {
        setHasChangesToSync(result);
        
        // If we have changes, auto-sync immediately
        if (result && !isSyncing) {
          console.log('🚀 useDevModeSync: Auto-triggering sync for detected changes');
          setTimeout(() => {
            syncChangesToFiles();
          }, 1000); // 1 second delay for immediate sync
        }
      }
    } catch (error) {
      console.error('❌ useDevModeSync: Error checking for changes:', error);
      if (mountedRef.current) {
        setHasChangesToSync(false);
      }
    } finally {
      isCheckingRef.current = false;
    }
  }, [projectId, checkHasChanges, isSyncing]);

  // Set up rapid change detection
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
    
    // Check every 2 seconds for changes
    intervalRef.current = setInterval(checkChanges, 2000);
    
    // Listen for immediate project updates
    const handleProjectDataUpdate = (e: CustomEvent) => {
      const detail = e.detail || {};
      
      if (detail.published) {
        setHasChangesToSync(false);
        return;
      }
      
      // For any dev mode change, check immediately
      if (detail.projectId === projectId || detail.immediate || detail.textChanged || detail.imageReplaced) {
        console.log('🔄 useDevModeSync: Immediate change detected, checking and syncing');
        setTimeout(() => {
          checkChanges();
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

    // Prevent too rapid syncs but allow reasonable frequency
    const now = Date.now();
    if (now - lastSyncRef.current < 3000) {
      console.log('⏳ useDevModeSync: Throttling sync request (3s cooldown)');
      return;
    }

    console.log('🚀 useDevModeSync: Starting sync to live mode for project:', projectId);
    
    setIsSyncing(true);
    lastSyncRef.current = now;
    
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
        duration: 4000
      });

      setHasChangesToSync(false);
      
    } catch (error) {
      console.error('❌ useDevModeSync: Error syncing to live:', error);
      toast.error("Sync failed", {
        description: "Could not sync changes to live mode. Please try again."
      });
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
