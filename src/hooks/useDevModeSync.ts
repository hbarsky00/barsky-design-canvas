
import { useState, useCallback, useEffect, useRef } from 'react';
import { useDevModeDatabase } from './useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';
import { toast } from 'sonner';

export const useDevModeSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasChangesToSync, setHasChangesToSync] = useState(false);
  const [lastChecked, setLastChecked] = useState<number>(0);
  const { hasChanges: checkHasChanges } = useDevModeDatabase(projectId);
  
  // Prevent multiple instances and intervals
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isCheckingRef = useRef(false);
  const mountedRef = useRef(true);
  const lastSyncRef = useRef<number>(0);

  // Stable change detection function
  const checkChanges = useCallback(async () => {
    if (!projectId || isCheckingRef.current || !mountedRef.current) {
      return;
    }
    
    isCheckingRef.current = true;
    
    try {
      const result = await checkHasChanges();
      
      if (mountedRef.current) {
        setHasChangesToSync(result);
        setLastChecked(Date.now());
      }
    } catch (error) {
      console.error('❌ useDevModeSync: Error checking for changes:', error);
      if (mountedRef.current) {
        setHasChangesToSync(false);
      }
    } finally {
      isCheckingRef.current = false;
    }
  }, [projectId, checkHasChanges]);

  // Change detection with much faster intervals for immediate dev mode to live sync
  useEffect(() => {
    if (!projectId) {
      setHasChangesToSync(false);
      return;
    }
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Initial check
    checkChanges();
    
    // Set up new interval with very fast checking for immediate sync
    intervalRef.current = setInterval(checkChanges, 500); // Check every 500ms for near-instant sync
    
    // Listen for project data updates
    const handleProjectDataUpdate = (e: CustomEvent) => {
      // If this is a publish event, don't check for changes immediately
      if (e.detail?.published) {
        console.log('🚀 useDevModeSync: Published event detected, marking no changes to sync');
        if (mountedRef.current) {
          setHasChangesToSync(false);
        }
        return;
      }
      
      if (e.detail?.projectId === projectId || e.detail?.immediate) {
        console.log('🔄 useDevModeSync: Relevant update detected, triggering immediate sync check');
        // Use immediate timeout to prevent blocking the event
        setTimeout(() => {
          checkChanges();
          // Trigger sync if changes are detected
          setTimeout(() => {
            if (mountedRef.current && hasChangesToSync) {
              syncChangesToFiles();
            }
          }, 200);
        }, 50);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    };
  }, [projectId, checkChanges, hasChangesToSync]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Enhanced auto-sync that triggers faster for immediate dev-to-live updates
  useEffect(() => {
    if (hasChangesToSync && !isSyncing && projectId) {
      console.log('🚀 useDevModeSync: Changes detected, starting immediate auto-sync');
      const timeoutId = setTimeout(() => {
        syncChangesToFiles();
      }, 1000); // Reduced delay to 1 second for faster sync

      return () => clearTimeout(timeoutId);
    }
  }, [hasChangesToSync, isSyncing, projectId]);

  const syncChangesToFiles = useCallback(async () => {
    if (!projectId || isSyncing) {
      return;
    }

    // Prevent rapid successive syncs but allow more frequent syncs
    const now = Date.now();
    if (now - lastSyncRef.current < 2000) {
      console.log('⏳ useDevModeSync: Throttling sync request (2s cooldown)');
      return;
    }

    console.log('🚀 useDevModeSync: Auto-syncing changes for project:', projectId);
    
    // Store current state to prevent any unwanted navigation
    const currentUrl = window.location.href;
    
    setIsSyncing(true);
    lastSyncRef.current = now;
    
    try {
      // Double-check we have changes before publishing
      const hasDbChanges = await checkHasChanges();
      
      if (!hasDbChanges) {
        console.log('ℹ️ useDevModeSync: No changes detected in database at sync time');
        return;
      }

      console.log('📤 useDevModeSync: Auto-publishing changes using PublishingService');
      await PublishingService.publishProject(projectId);
      
      // Ensure we stayed on the same page after publishing
      if (window.location.href !== currentUrl) {
        console.log('🔒 useDevModeSync: Restoring original URL after auto-sync');
        window.history.replaceState(null, '', currentUrl);
      }
      
      // Show subtle success indication
      console.log('✅ useDevModeSync: Auto-sync completed successfully');
      toast.success("Changes synced to live!", {
        description: "Your dev mode changes are now live",
        duration: 3000
      });

      // Update state to reflect no pending changes
      if (mountedRef.current) {
        setHasChangesToSync(false);
      }
      
    } catch (error) {
      console.error('❌ useDevModeSync: Error auto-syncing project:', error);
      toast.error("Auto-sync failed", {
        description: "Changes couldn't be synced automatically. Please try manually refreshing."
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
    hasChangesToSync,
    lastChecked
  };
};
