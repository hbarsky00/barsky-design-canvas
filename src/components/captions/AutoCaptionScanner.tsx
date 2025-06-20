
import React, { useEffect, useRef } from 'react';
import { useImageScanner } from '@/hooks/useImageScanner';
import { useAutoFixer } from '@/hooks/useAutoFixer';

const AutoCaptionScanner: React.FC = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
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

      const fixedCount = await autoFixIssues(sortedIssues);

      if (fixedCount > 0) {
        console.log(`🎉 Auto-fixed ${fixedCount} caption issues automatically`);
        
        // Dispatch event to update captions in the UI
        window.dispatchEvent(new CustomEvent('captionsUpdated', {
          detail: { fixedCount, timestamp: Date.now() }
        }));

        // Trigger a gentle refresh to show updated captions
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('forceComponentRefresh', {
            detail: { captionsUpdated: true, timestamp: Date.now() }
          }));
        }, 1000);
      }

    } catch (error) {
      console.error('❌ Global caption scan error:', error);
    } finally {
      markScanEnd();
    }
  };

  useEffect(() => {
    console.log('🚀 Global Caption Scanner: Initialized and running automatically');
    
    const initialTimeout = setTimeout(() => {
      performBackgroundScan();
    }, 15000); // Increased delay to avoid conflicts

    intervalRef.current = setInterval(() => {
      performBackgroundScan();
    }, 60000); // Increased interval to reduce conflicts

    return () => {
      if (initialTimeout) clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      console.log('🔇 Global Caption Scanner: Stopped');
    };
  }, []);

  return null;
};

export default AutoCaptionScanner;
