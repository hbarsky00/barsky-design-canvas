
import React, { useEffect, useRef } from 'react';
import { useImageScanner } from '@/hooks/useImageScanner';
import { useAutoFixer } from '@/hooks/useAutoFixer';

const AutoCaptionScanner: React.FC = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasRunInitialScan = useRef<boolean>(false);
  const { scanAllProjects, canScan, markScanStart, markScanEnd } = useImageScanner();
  const { autoFixIssues } = useAutoFixer();

  const publishCaptionsToLive = async (projectId: string) => {
    try {
      console.log('📤 Auto-publishing caption updates to live mode...');
      const { PublishingService } = await import('@/services/publishingService');
      await PublishingService.publishProject(projectId, true); // Preserve dev changes
      console.log('✅ Caption updates published to live mode successfully');
    } catch (error) {
      console.error('❌ Failed to publish caption updates to live mode:', error);
    }
  };

  const performBackgroundScan = async () => {
    if (!canScan()) {
      console.log('🔄 Background scan already in progress or too soon, skipping...');
      return;
    }

    markScanStart();
    console.log('🔍 Global Caption Scanner: Starting automated scan...');

    // Dispatch scan start event
    window.dispatchEvent(new CustomEvent('captionScanStart'));

    try {
      const sortedIssues = await scanAllProjects();
      console.log(`🔍 Global scan complete: Found ${sortedIssues.length} caption issues`);

      // Dispatch scan complete event
      window.dispatchEvent(new CustomEvent('captionScanComplete', {
        detail: { totalIssues: sortedIssues.length }
      }));

      if (sortedIssues.length > 0) {
        console.log(`🚀 Starting to fix ${sortedIssues.length} caption issues...`);
        const fixedCount = await autoFixIssues(sortedIssues);

        if (fixedCount > 0) {
          console.log(`🎉 Auto-fixed ${fixedCount} caption issues automatically`);
          
          // Single consolidated update event instead of multiple
          window.dispatchEvent(new CustomEvent('captionsUpdated', {
            detail: { fixedCount, timestamp: Date.now() }
          }));

          // Auto-publish caption updates to live mode
          await publishCaptionsToLive('investor-loan-app');
        }
      } else {
        console.log('✅ All captions are already up to date!');
        
        // Dispatch completion event even when no issues found
        window.dispatchEvent(new CustomEvent('captionsUpdated', {
          detail: { fixedCount: 0, timestamp: Date.now() }
        }));
      }

    } catch (error) {
      console.error('❌ Global caption scan error:', error);
    } finally {
      markScanEnd();
    }
  };

  useEffect(() => {
    console.log('🚀 Global Caption Scanner: Initialized and running automatically');
    
    // Run immediately on first load
    if (!hasRunInitialScan.current) {
      hasRunInitialScan.current = true;
      const immediateTimeout = setTimeout(() => {
        performBackgroundScan();
      }, 2000); // Start scanning after 2 seconds
    }

    // Then run periodically - increased to 5 minutes to reduce frequency
    intervalRef.current = setInterval(() => {
      performBackgroundScan();
    }, 300000); // Scan every 5 minutes

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      console.log('🔇 Global Caption Scanner: Stopped');
    };
  }, []);

  return null;
};

export default AutoCaptionScanner;
