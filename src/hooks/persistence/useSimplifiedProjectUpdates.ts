
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

    const handleStorageChange = async (e: StorageEvent) => {
      if (e.key?.includes(projectId)) {
        console.log('💾 SimplifiedProjectUpdates: Storage changed, refreshing data');
        await loadDataFromDatabase();
      }
    };

    const handlePageFocus = async () => {
      console.log('👁️ SimplifiedProjectUpdates: Page focused, refreshing data');
      await loadDataFromDatabase();
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    window.addEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    window.addEventListener('storage', handleStorageChange as EventListener);
    window.addEventListener('focus', handlePageFocus);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
      window.removeEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
      window.removeEventListener('storage', handleStorageChange as EventListener);
      window.removeEventListener('focus', handlePageFocus);
    };
  }, [projectId, updateCachedData, loadDataFromDatabase]);
};
