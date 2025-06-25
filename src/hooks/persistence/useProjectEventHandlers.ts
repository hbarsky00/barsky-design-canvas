
import { useEffect } from 'react';
import { ProjectData } from './types';

export const useProjectEventHandlers = (
  projectId: string,
  loadFreshDataFromDatabase: () => Promise<void>,
  setRefreshTrigger: (updater: (prev: number) => number) => void
) => {
  // Listen for project data updates and force refresh from database
  useEffect(() => {
    const handleProjectDataUpdate = async (e: CustomEvent) => {
      if (e.detail?.projectId === projectId || e.detail?.immediate) {
        console.log('🔄 Project data updated event received, reloading from database');
        await loadFreshDataFromDatabase();
        setRefreshTrigger(prev => prev + 1);
      }
    };

    const handleForceRefresh = async (e: CustomEvent) => {
      console.log('🔄 Force refresh triggered, reloading from database');
      await loadFreshDataFromDatabase();
      setRefreshTrigger(prev => prev + 1);
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    window.addEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
      window.removeEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    };
  }, [projectId, loadFreshDataFromDatabase, setRefreshTrigger]);
};
