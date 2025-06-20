
import React, { useEffect, useRef } from 'react';
import { useImageScanner } from '@/hooks/useImageScanner';
import { useEnhancedAutoFixer } from '@/hooks/useEnhancedAutoFixer';
import { useCaptionNotifications } from '@/hooks/useCaptionNotifications';

const EnhancedAutoCaptionScanner: React.FC = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { scanAllProjects, canScan, markScanStart, markScanEnd } = useImageScanner();
  const { autoFixIssues } = useEnhancedAutoFixer();
  const { cleanupOldNotifications } = useCaptionNotifications();

  const performBackgroundScan = async () => {
    if (!canScan()) {
      console.log('🔄 Background scan already in progress or too soon, skipping...');
      return;
    }

    markScanStart();
    console.log('🔍 Enhanced Caption Scanner: Starting automated scan...');

    try {
      const sortedIssues = await scanAllProjects();
      console.log(`🔍 Enhanced scan complete: Found ${sortedIssues.length} caption issues`);

      const fixedCount = await autoFixIssues(sortedIssues);

      if (fixedCount > 0) {
        console.log(`🎉 Auto-fixed ${fixedCount} caption issues with notifications`);
        
        // Trigger a global event for any sync systems listening
        window.dispatchEvent(new CustomEvent('captionsUpdated', {
          detail: { 
            fixedCount, 
            timestamp: Date.now(),
            hasNotifications: true
          }
        }));
      }

      // Cleanup old notifications periodically
      cleanupOldNotifications();

    } catch (error) {
      console.error('❌ Enhanced caption scan error:', error);
    } finally {
      markScanEnd();
    }
  };

  useEffect(() => {
    console.log('🚀 Enhanced Caption Scanner: Initialized with notification system');
    
    const initialTimeout = setTimeout(() => {
      performBackgroundScan();
    }, 10000);

    intervalRef.current = setInterval(() => {
      performBackgroundScan();
    }, 45000);

    return () => {
      if (initialTimeout) clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      console.log('🔇 Enhanced Caption Scanner: Stopped');
    };
  }, []);

  return null;
};

export default EnhancedAutoCaptionScanner;
