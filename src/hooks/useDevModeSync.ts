
import { useState, useCallback, useEffect } from 'react';
import { useDevModeDatabase } from './useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';
import { toast } from 'sonner';

export const useDevModeSync = (projectId: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasChangesToSync, setHasChangesToSync] = useState(false);
  const { hasChanges: checkHasChanges } = useDevModeDatabase(projectId);

  // Check for changes in the database
  useEffect(() => {
    if (!projectId) {
      setHasChangesToSync(false);
      return;
    }
    
    const checkChanges = async () => {
      try {
        const result = await checkHasChanges();
        console.log('🔍 useDevModeSync: Database changes check result:', result);
        setHasChangesToSync(result);
      } catch (error) {
        console.error('❌ useDevModeSync: Error checking for changes:', error);
        setHasChangesToSync(false);
      }
    };
    
    checkChanges();
    
    // Set up periodic checking
    const interval = setInterval(checkChanges, 2000);
    
    return () => clearInterval(interval);
  }, [projectId, checkHasChanges]);

  const syncChangesToFiles = useCallback(async () => {
    console.log('🚀 useDevModeSync: Publishing project with new publishing service');
    
    setIsSyncing(true);
    
    try {
      const hasDbChanges = await checkHasChanges();
      console.log('🔍 useDevModeSync: Database has changes:', hasDbChanges);
      
      if (!hasDbChanges) {
        console.log('❌ useDevModeSync: No changes detected in database');
        toast.info("No changes to publish", {
          description: "No dev mode changes found to publish."
        });
        setIsSyncing(false);
        return;
      }

      console.log('📤 useDevModeSync: Publishing changes using new service');

      const success = await PublishingService.publishProject(projectId);
      
      if (success) {
        toast.success("Changes published successfully!", {
          description: "Your changes are now permanently saved and visible. Page will refresh to show updates.",
          duration: 5000,
        });

        // Update state to reflect no pending changes
        setHasChangesToSync(false);
        
        // Force a page refresh after a short delay to ensure all changes are visible
        setTimeout(() => {
          console.log('🔄 Forcing page refresh to show published changes');
          window.location.reload();
        }, 2000);
      } else {
        throw new Error('Publishing service failed');
      }
      
    } catch (error) {
      console.error('❌ useDevModeSync: Error publishing project:', error);
      toast.error("Failed to publish changes", {
        description: error instanceof Error ? error.message : "There was an error publishing your changes."
      });
    } finally {
      setIsSyncing(false);
    }
  }, [checkHasChanges, projectId]);

  return {
    syncChangesToFiles,
    isSyncing,
    hasChangesToSync
  };
};
