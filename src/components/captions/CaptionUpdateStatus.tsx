
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { AnimatedProgress } from '@/components/ui/animated-progress';
import { Loader2, CheckCircle } from 'lucide-react';

interface UpdateStatus {
  isScanning: boolean;
  isFixing: boolean;
  totalIssues: number;
  fixedCount: number;
  lastUpdateTime: number;
}

const CaptionUpdateStatus: React.FC = () => {
  const [status, setStatus] = useState<UpdateStatus>({
    isScanning: false,
    isFixing: false,
    totalIssues: 0,
    fixedCount: 0,
    lastUpdateTime: 0
  });

  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const handleScanStart = () => {
      setStatus(prev => ({ ...prev, isScanning: true, isFixing: false }));
      setShowStatus(true);
    };

    const handleScanComplete = (event: CustomEvent) => {
      const { detail } = event;
      setStatus(prev => ({ 
        ...prev, 
        isScanning: false, 
        totalIssues: detail.totalIssues || 0,
        fixedCount: 0,
        isFixing: detail.totalIssues > 0
      }));
    };

    const handleCaptionGenerated = () => {
      setStatus(prev => ({ ...prev, fixedCount: prev.fixedCount + 1 }));
    };

    const handleUpdatesComplete = (event: CustomEvent) => {
      const { detail } = event;
      setStatus(prev => ({ 
        ...prev, 
        isFixing: false, 
        lastUpdateTime: detail.timestamp || Date.now()
      }));
      
      // Hide status after 3 seconds when complete
      setTimeout(() => setShowStatus(false), 3000);
    };

    // Listen for custom events from the scanning system
    window.addEventListener('captionScanStart', handleScanStart as EventListener);
    window.addEventListener('captionScanComplete', handleScanComplete as EventListener);
    window.addEventListener('aiCaptionGenerated', handleCaptionGenerated as EventListener);
    window.addEventListener('captionsUpdated', handleUpdatesComplete as EventListener);

    return () => {
      window.removeEventListener('captionScanStart', handleScanStart as EventListener);
      window.removeEventListener('captionScanComplete', handleScanComplete as EventListener);
      window.removeEventListener('aiCaptionGenerated', handleCaptionGenerated as EventListener);
      window.removeEventListener('captionsUpdated', handleUpdatesComplete as EventListener);
    };
  }, []);

  if (!showStatus) return null;

  const getStatusText = () => {
    if (status.isScanning) return 'Scanning for caption issues...';
    if (status.isFixing) return `Updating captions (${status.fixedCount}/${status.totalIssues})`;
    return 'Caption updates complete!';
  };

  const getProgress = () => {
    if (status.isScanning) return 0;
    if (status.totalIssues === 0) return 100;
    return Math.round((status.fixedCount / status.totalIssues) * 100);
  };

  const getVariant = () => {
    if (status.isScanning || status.isFixing) return 'default';
    return 'success';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 space-y-3">
        <div className="flex items-center gap-2">
          {(status.isScanning || status.isFixing) ? (
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          ) : (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
          
          <Badge variant={getVariant() as "default" | "secondary" | "destructive" | "outline"}>
            {getStatusText()}
          </Badge>
        </div>
        
        {(status.isFixing || (!status.isScanning && status.totalIssues > 0)) && (
          <div className="space-y-1">
            <AnimatedProgress
              value={getProgress()}
              maxValue={100}
              variant={getVariant() as "default" | "success" | "warning" | "danger"}
              className="h-2"
              animate={true}
            />
            <div className="text-xs text-gray-500 text-right">
              {status.fixedCount}/{status.totalIssues} updated
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptionUpdateStatus;
