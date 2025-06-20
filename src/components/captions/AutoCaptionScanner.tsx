
import React, { useEffect, useRef } from 'react';
import { useImageScanner } from '@/hooks/useImageScanner';
import { useAutoFixer } from '@/hooks/useAutoFixer';
import { useDevMode } from '@/context/DevModeContext';

const AutoCaptionScanner: React.FC = () => {
  const { isLovableEnvironment } = useDevMode();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasRunInitialScan = useRef<boolean>(false);
  const { scanAllProjects, canScan, markScanStart, markScanEnd } = useImageScanner();
  const { autoFixIssues } = useAutoFixer();

  // Only run caption scanning in Lovable environment, not on live site
  if (!isLovableEnvironment) {
    return null;
  }

  const performBackgroundScan = async () => {
    if (!canScan()) {
      console.log('🔄 Background scan already in progress or too soon, skipping...');
      return;
    }

    markScanStart();
    console.log('🔍 Global Caption Scanner: Starting automated scan across ALL PROJECTS (DEV MODE ONLY)...');

    // Dispatch scan start event
    window.dispatchEvent(new CustomEvent('captionScanStart'));

    try {
      const sortedIssues = await scanAllProjects();
      console.log(`🔍 Global scan complete: Found ${sortedIssues.length} caption issues across all projects`);

      // Dispatch scan complete event
      window.dispatchEvent(new CustomEvent('captionScanComplete', {
        detail: { totalIssues: sortedIssues.length }
      }));

      if (sortedIssues.length > 0) {
        console.log(`🚀 Starting to fix ${sortedIssues.length} caption issues across all projects (DEV MODE ONLY)...`);
        const fixedCount = await autoFixIssues(sortedIssues);

        if (fixedCount > 0) {
          console.log(`🎉 Auto-fixed ${fixedCount} caption issues automatically across all projects (DEV MODE ONLY)`);
          
          // Single consolidated update event instead of multiple
          window.dispatchEvent(new CustomEvent('captionsUpdated', {
            detail: { fixedCount, timestamp: Date.now() }
          }));

          console.log('💾 Caption updates saved to dev mode only - will not auto-publish to live');
        }
      } else {
        console.log('✅ All captions are already up to date across all projects!');
        
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
    console.log('🚀 Global Caption Scanner: Initialized for DEV MODE ONLY - will not run on live site');
    
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
