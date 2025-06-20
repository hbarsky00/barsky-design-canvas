
import { useEffect } from 'react';

interface UseProjectDataSyncProps {
  projectId: string;
  onRefresh: () => void;
}

export const useProjectDataSync = ({ projectId, onRefresh }: UseProjectDataSyncProps) => {
  // Enhanced sync that forces fresh data loading
  useEffect(() => {
    const handleProjectUpdate = async (e: Event) => {
      console.log('🔄 useProjectDataSync: Project data updated, triggering fresh data load');
      onRefresh();
      
      // Dispatch a force refresh event to ensure all components reload
      window.dispatchEvent(new CustomEvent('forceComponentRefresh', {
        detail: { projectId, timestamp: Date.now() }
      }));
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.includes(`imageOverrides_${projectId}`) || 
          e.key?.includes(`textOverrides_${projectId}`) ||
          e.key?.includes(`project_${projectId}`)) {
        console.log('🔄 useProjectDataSync: Storage changed, triggering refresh');
        onRefresh();
      }
    };

    const handleCacheCleared = (e: Event) => {
      console.log('🔄 useProjectDataSync: Cache cleared, triggering refresh');
      onRefresh();
    };

    const handleForceRefresh = (e: Event) => {
      console.log('🔄 useProjectDataSync: Force refresh requested');
      onRefresh();
    };

    // Listen for multiple event types
    window.addEventListener('projectDataUpdated', handleProjectUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('projectCacheCleared', handleCacheCleared);
    window.addEventListener('forceComponentRefresh', handleForceRefresh);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('projectCacheCleared', handleCacheCleared);
      window.removeEventListener('forceComponentRefresh', handleForceRefresh);
    };
  }, [projectId, onRefresh]);
};
