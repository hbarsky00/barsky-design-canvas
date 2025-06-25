
import { useEffect } from 'react';
import { ProjectData } from './types';

export const useSimplifiedProjectUpdates = (
  projectId: string,
  updateCachedData: (updater: (prev: ProjectData) => ProjectData) => void,
  loadDataFromDatabase: () => Promise<void>
) => {
  useEffect(() => {
    const handleProjectUpdate = async (e: CustomEvent) => {
      if (e.detail?.projectId === projectId || e.detail?.immediate) {
        console.log('🔄 SimplifiedProjectUpdates: Update detected for project:', projectId);
        await loadDataFromDatabase();
      }
    };

    const handleForceRefresh = async (e: CustomEvent) => {
      console.log('🔄 SimplifiedProjectUpdates: Force refresh triggered');
      await loadDataFromDatabase();
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    window.addEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
      window.removeEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    };
  }, [projectId, updateCachedData, loadDataFromDatabase]);
};
