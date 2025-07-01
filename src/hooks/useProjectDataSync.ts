
import { useEffect } from 'react';

interface UseProjectDataSyncProps {
  projectId: string;
  onRefresh: () => void;
}

export const useProjectDataSync = ({ projectId, onRefresh }: UseProjectDataSyncProps) => {
  // Enhanced sync with strict project isolation
  useEffect(() => {
    if (!projectId) {
      console.warn('⚠️ No projectId provided for data sync');
      return;
    }

    const handleProjectUpdate = async (e: Event) => {
      const customEvent = e as CustomEvent;
      
      // CRITICAL: Only respond to events for THIS specific project
      if (customEvent.detail?.projectId && customEvent.detail.projectId !== projectId) {
        console.log('🚫 Ignoring update for different project:', customEvent.detail.projectId, 'current:', projectId);
        return;
      }

      console.log('🔄 useProjectDataSync: Project data updated for project:', projectId);
      onRefresh();
      
      // Dispatch a force refresh event scoped to this project
      window.dispatchEvent(new CustomEvent('forceComponentRefresh', {
        detail: { projectId, timestamp: Date.now() }
      }));
    };

    const handleStorageChange = (e: StorageEvent) => {
      // Only respond to storage changes for this specific project
      if (e.key?.includes(`imageOverrides_${projectId}`) || 
          e.key?.includes(`textOverrides_${projectId}`) ||
          e.key?.includes(`project_${projectId}`) ||
          e.key?.includes(`image_captions_${projectId}`)) {
        console.log('🔄 useProjectDataSync: Storage changed for project:', projectId);
        onRefresh();
      }
    };

    const handleCacheCleared = (e: Event) => {
      const customEvent = e as CustomEvent;
      
      // Only respond if it's for this project or global
      if (!customEvent.detail?.projectId || customEvent.detail.projectId === projectId) {
        console.log('🔄 useProjectDataSync: Cache cleared for project:', projectId);
        onRefresh();
      }
    };

    const handleForceRefresh = (e: Event) => {
      const customEvent = e as CustomEvent;
      
      // CRITICAL: Only respond to events for THIS specific project
      if (customEvent.detail?.projectId && customEvent.detail.projectId !== projectId) {
        return;
      }

      console.log('🔄 useProjectDataSync: Force refresh requested for project:', projectId);
      onRefresh();
    };

    console.log('🔗 Setting up data sync for project:', projectId);
    
    // Listen for multiple event types with project isolation
    window.addEventListener('projectDataUpdated', handleProjectUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('projectCacheCleared', handleCacheCleared);
    window.addEventListener('forceComponentRefresh', handleForceRefresh);
    
    return () => {
      console.log('🔌 Cleaning up data sync for project:', projectId);
      window.removeEventListener('projectDataUpdated', handleProjectUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('projectCacheCleared', handleCacheCleared);
      window.removeEventListener('forceComponentRefresh', handleForceRefresh);
    };
  }, [projectId, onRefresh]);
};
