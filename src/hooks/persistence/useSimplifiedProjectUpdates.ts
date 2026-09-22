
import { useEffect } from 'react';
import { ProjectData } from './types';

export const useSimplifiedProjectUpdates = (
  projectId: string,
  updateCachedData: (updater: (prev: ProjectData) => ProjectData) => void,
  loadDataFromDatabase: () => Promise<void>
) => {
  useEffect(() => {
    const handleProjectUpdate = async (e: CustomEvent) => {
      if (e.detail?.projectId === projectId) {
        console.log('🔄 SimplifiedProjectUpdates: Update detected for project:', projectId);
        await loadDataFromDatabase();
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    };
  }, [projectId, loadDataFromDatabase]);
};
