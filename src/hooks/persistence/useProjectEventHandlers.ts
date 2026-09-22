
import { useEffect } from 'react';

export const useProjectEventHandlers = (
  projectId: string,
  loadFreshDataFromDatabase: () => Promise<void>,
  setRefreshTrigger: (updater: (prev: number) => number) => void
) => {
  // Listen for project data updates with strict project isolation
  useEffect(() => {
    if (!projectId) {
      console.warn('⚠️ No projectId provided for event handlers');
      return;
    }

    const handleProjectDataUpdate = async (e: CustomEvent) => {
      // CRITICAL: Only respond to events for THIS specific project
      if (e.detail?.projectId && e.detail.projectId !== projectId) {
        console.log('🚫 Ignoring update event for different project:', e.detail.projectId, 'current:', projectId);
        return;
      }

      if (e.detail?.projectId === projectId || e.detail?.immediate) {
        console.log('🔄 Project data updated event received for project:', projectId);
        await loadFreshDataFromDatabase();
        setRefreshTrigger(prev => prev + 1);
      }
    };

    const handleForceRefresh = async (e: CustomEvent) => {
      // CRITICAL: Only respond to events for THIS specific project
      if (e.detail?.projectId && e.detail.projectId !== projectId) {
        console.log('🚫 Ignoring force refresh for different project:', e.detail.projectId, 'current:', projectId);
        return;
      }

      console.log('🔄 Force refresh triggered for project:', projectId);
      await loadFreshDataFromDatabase();
      setRefreshTrigger(prev => prev + 1);
    };

    console.log('🔗 Setting up event handlers for project:', projectId);
    window.addEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    window.addEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    
    return () => {
      console.log('🔌 Cleaning up event handlers for project:', projectId);
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
      window.removeEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    };
  }, [projectId, loadFreshDataFromDatabase, setRefreshTrigger]);
};
