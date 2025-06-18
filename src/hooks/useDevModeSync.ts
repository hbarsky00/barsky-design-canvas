
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

  // Change detection with faster intervals for real-time feel
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
    
    // Set up new interval with faster checking
    intervalRef.current = setInterval(checkChanges, 1000); // Check every second for responsive feel
    
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
        console.log('🔄 useDevModeSync: Relevant update detected, checking changes');
        // Use setTimeout to prevent blocking the event
        setTimeout(() => checkChanges(), 100);
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
      return;
    }

    // Prevent rapid successive syncs
    const now = Date.now();
    if (now - lastSyncRef.current < 3000) {
      console.log('⏳ useDevModeSync: Throttling sync request');
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
      
      // Subtle success indication without intrusive toast
      console.log('✅ useDevModeSync: Auto-sync completed successfully');

      // Update state to reflect no pending changes
      if (mountedRef.current) {
        setHasChangesToSync(false);
      }
      
    } catch (error) {
      console.error('❌ useDevModeSync: Error auto-syncing project:', error);
      // Only show error toasts, not success ones
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
