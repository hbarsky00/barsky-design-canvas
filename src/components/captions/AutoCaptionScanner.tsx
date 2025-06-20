
import React, { useEffect, useRef } from 'react';
import { useImageScanner } from '@/hooks/useImageScanner';
import { useAutoFixer } from '@/hooks/useAutoFixer';

const AutoCaptionScanner: React.FC = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasRunInitialScan = useRef<boolean>(false);
  const { scanAllProjects, canScan, markScanStart, markScanEnd } = useImageScanner();
  const { autoFixIssues } = useAutoFixer();

  const performBackgroundScan = async () => {
    if (!canScan()) {
      console.log('🔄 Background scan already in progress or too soon, skipping...');
      return;
    }

    markScanStart();
    console.log('🔍 Global Caption Scanner: Starting automated scan...');

    try {
      const sortedIssues = await scanAllProjects();
      console.log(`🔍 Global scan complete: Found ${sortedIssues.length} caption issues`);

      if (sortedIssues.length > 0) {
        console.log(`🚀 Starting to fix ${sortedIssues.length} caption issues...`);
        const fixedCount = await autoFixIssues(sortedIssues);

        if (fixedCount > 0) {
          console.log(`🎉 Auto-fixed ${fixedCount} caption issues automatically`);
          
          // Force immediate UI refresh
          window.dispatchEvent(new CustomEvent('captionsUpdated', {
            detail: { fixedCount, timestamp: Date.now() }
          }));

          // Multiple refresh events to ensure UI updates
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('forceComponentRefresh', {
              detail: { captionsUpdated: true, timestamp: Date.now() }
            }));
          }, 500);

          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('aiCaptionBatchComplete', {
              detail: { fixedCount, timestamp: Date.now() }
            }));
          }, 1000);
        }
      } else {
        console.log('✅ All captions are already up to date!');
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
      }, 1000); // Start scanning after 1 second
    }

    // Then run periodically
    intervalRef.current = setInterval(() => {
      performBackgroundScan();
    }, 120000); // Scan every 2 minutes (more frequent)

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
