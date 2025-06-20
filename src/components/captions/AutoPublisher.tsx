
import React, { useEffect } from 'react';
import { PublishingService } from '@/services/publishingService';
import { useDevMode } from '@/context/DevModeContext';
import { toast } from 'sonner';

const AutoPublisher: React.FC = () => {
  const { isLovableEnvironment } = useDevMode();

  useEffect(() => {
    const publishCaptionUpdates = async () => {
      if (!isLovableEnvironment) return;

      console.log('🚀 AutoPublisher: Publishing caption updates...');
      
      try {
        // Get all project IDs that need publishing
        const projectIds = [
          'medication-app',
          'investor-loan-app', 
          'dae-search',
          'splittime',
          'herbalink',
          'gold2crypto',
          'barskyjoint',
          'spectrum'
        ];

        // Publish each project with updated captions
        for (const projectId of projectIds) {
          console.log(`📤 Publishing captions for ${projectId}...`);
          await PublishingService.publishProject(projectId, false);
          
          // Small delay between publishes
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        console.log('✅ All caption updates published successfully');
        toast.success('Caption updates published to live site!');
        
      } catch (error) {
        console.error('❌ Error publishing caption updates:', error);
        toast.error('Failed to publish caption updates');
      }
    };

    // Trigger publishing after a short delay
    const timeout = setTimeout(() => {
      publishCaptionUpdates();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isLovableEnvironment]);

  return null;
};

export default AutoPublisher;
