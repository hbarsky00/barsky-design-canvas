
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Edit, CheckCircle } from 'lucide-react';
import { useDevModeSync } from '@/hooks/useDevModeSync';

const DevModeStatus: React.FC = () => {
  const { isDevMode, isLovableEnvironment } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { hasChangesToSync } = useDevModeSync(projectId || '');

  // Don't render anything if not in Lovable environment or dev mode is off
  if (!isLovableEnvironment || !isDevMode || !projectId) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Badge 
        variant={hasChangesToSync ? "destructive" : "secondary"}
        className="shadow-lg backdrop-blur-sm"
      >
        {hasChangesToSync ? (
          <>
            <Edit className="h-3 w-3 mr-1" />
            Unsaved Changes
          </>
        ) : (
          <>
            <CheckCircle className="h-3 w-3 mr-1" />
            All Saved
          </>
        )}
      </Badge>
    </div>
  );
};

export default DevModeStatus;
