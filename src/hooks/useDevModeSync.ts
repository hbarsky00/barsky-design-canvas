
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

  // Stable change detection function
  const checkChanges = useCallback(async () => {
    if (!projectId || isCheckingRef.current || !mountedRef.current) {
      return;
    }
    
    isCheckingRef.current = true;
    
    try {
      console.log('🔍 useDevModeSync: Checking for changes at', new Date().toISOString());
      const result = await checkHasChanges();
      console.log('🔍 useDevModeSync: Database changes check result for', projectId, ':', result);
      
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

  // Change detection with proper cleanup
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
    
    // Set up new interval
    intervalRef.current = setInterval(checkChanges, 3000); // Increased interval to reduce load
    
    // Listen for project data updates
    const handleProjectDataUpdate = (e: CustomEvent) => {
      console.log('🔄 useDevModeSync: Project data updated event received:', e.detail);
      
      // If this is a publish event, don't check for changes immediately
      if (e.detail?.published) {
        console.log('🚀 useDevModeSync: Published event detected, marking no changes to sync');
        if (mountedRef.current) {
          setHasChangesToSync(false);
        }
        return;
      }
      
      if (e.detail?.projectId === projectId || e.detail?.immediate) {
        console.log('🔄 useDevModeSync: Relevant update detected, checking changes');
        // Use setTimeout to prevent blocking the event
        setTimeout(() => checkChanges(), 300);
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
  }, [projectId, checkChanges]);

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

  const syncChangesToFiles = useCallback(async () => {
    if (!projectId || isSyncing) {
      toast.error("No project ID available or already syncing");
      return;
    }

    console.log('🚀 useDevModeSync: Starting publish process for project:', projectId);
    
    // Store current state to prevent any unwanted navigation
    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
    
    setIsSyncing(true);
    
    try {
      // Double-check we have changes before publishing
      const hasDbChanges = await checkHasChanges();
      console.log('🔍 useDevModeSync: Final changes check before publish:', hasDbChanges);
      
      if (!hasDbChanges) {
        console.log('❌ useDevModeSync: No changes detected in database at publish time');
        toast.info("No changes to publish", {
          description: "No dev mode changes found to publish."
        });
        return;
      }

      console.log('📤 useDevModeSync: Publishing changes using PublishingService');
      await PublishingService.publishProject(projectId);
      
      // Ensure we stayed on the same page after publishing
      if (window.location.href !== currentUrl) {
        console.log('🔒 useDevModeSync: Restoring original URL after publish');
        window.history.replaceState(null, '', currentUrl);
      }
      
      toast.success("Changes published successfully!", {
        description: "Your changes are now live and preserved on this page!",
        duration: 4000,
      });

      // Update state to reflect no pending changes
      if (mountedRef.current) {
        setHasChangesToSync(false);
      }
      
    } catch (error) {
      console.error('❌ useDevModeSync: Error publishing project:', error);
      const errorMessage = error instanceof Error ? error.message : "There was an error publishing your changes.";
      toast.error("Failed to publish changes", {
        description: errorMessage
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
