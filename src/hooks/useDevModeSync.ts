
import { useState, useCallback, useEffect } from 'react';
import { useDevModeDatabase } from './useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';
import { toast } from 'sonner';

export const useDevModeSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasChangesToSync, setHasChangesToSync] = useState(false);
  const [lastChecked, setLastChecked] = useState<number>(0);
  const { hasChanges: checkHasChanges } = useDevModeDatabase(projectId);

  // Change detection
  useEffect(() => {
    if (!projectId) {
      setHasChangesToSync(false);
      return;
    }
    
    const checkChanges = async () => {
      try {
        console.log('🔍 useDevModeSync: Checking for changes at', new Date().toISOString());
        const result = await checkHasChanges();
        console.log('🔍 useDevModeSync: Database changes check result for', projectId, ':', result);
        setHasChangesToSync(result);
        setLastChecked(Date.now());
      } catch (error) {
        console.error('❌ useDevModeSync: Error checking for changes:', error);
        setHasChangesToSync(false);
      }
    };
    
    // Initial check
    checkChanges();
    
    // Periodic checking
    const interval = setInterval(checkChanges, 1000);
    
    // Listen for project data updates
    const handleProjectDataUpdate = (e: CustomEvent) => {
      console.log('🔄 useDevModeSync: Project data updated event received:', e.detail);
      
      if (e.detail?.projectId === projectId || e.detail?.immediate) {
        console.log('🔄 useDevModeSync: Relevant update detected, checking changes immediately');
        setTimeout(checkChanges, 50);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    };
  }, [projectId, checkHasChanges]);

  const syncChangesToFiles = useCallback(async () => {
    if (!projectId) {
      toast.error("No project ID available");
      return;
    }

    console.log('🚀 useDevModeSync: Starting publish process for project:', projectId);
    
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
      
      toast.success("Changes published successfully!", {
        description: "Your changes are now live and visible!",
        duration: 4000,
      });

      // Update state to reflect no pending changes
      setHasChangesToSync(false);
      
      // Trigger component updates WITHOUT navigation
      console.log('🔄 useDevModeSync: Dispatching update events to refresh components');
      
      // Prevent any potential navigation by explicitly staying on current page
      const currentPath = window.location.pathname;
      
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId, 
          published: true, 
          immediate: true,
          timestamp: Date.now(),
          stayOnPage: true,
          currentPath: currentPath
        }
      }));
      
      // Ensure we stay on the current page
      if (window.location.pathname !== currentPath) {
        console.log('🔒 Preventing unwanted navigation, staying on:', currentPath);
        window.history.pushState(null, '', currentPath);
      }
      
    } catch (error) {
      console.error('❌ useDevModeSync: Error publishing project:', error);
      const errorMessage = error instanceof Error ? error.message : "There was an error publishing your changes.";
      toast.error("Failed to publish changes", {
        description: errorMessage
      });
    } finally {
      setIsSyncing(false);
    }
  }, [checkHasChanges, projectId]);

  return {
    syncChangesToFiles,
    isSyncing,
    hasChangesToSync,
    lastChecked
  };
};
