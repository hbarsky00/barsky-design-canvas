
import { useEffect } from 'react';

interface UseProjectDataSyncProps {
  projectId: string;
  onRefresh: () => void;
}

export const useProjectDataSync = ({ projectId, onRefresh }: UseProjectDataSyncProps) => {
  // Listen for all types of project data updates
  useEffect(() => {
    const handleProjectUpdate = (e: Event) => {
      console.log('useProjectDataSync: Project data updated, refreshing');
      onRefresh();
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.includes(`imageOverrides_${projectId}`) || 
          e.key?.includes(`textOverrides_${projectId}`) ||
          e.key?.includes(`project_${projectId}`)) {
        console.log('useProjectDataSync: Storage changed, refreshing');
        onRefresh();
      }
    };

    const handleCacheCleared = (e: Event) => {
      console.log('useProjectDataSync: Cache cleared, refreshing');
      onRefresh();
    };

    // Listen for multiple event types
    window.addEventListener('projectDataUpdated', handleProjectUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('projectCacheCleared', handleCacheCleared);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('projectCacheCleared', handleCacheCleared);
    };
  }, [projectId, onRefresh]);
};
