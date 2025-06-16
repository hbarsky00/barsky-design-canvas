
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Edit, CheckCircle } from 'lucide-react';
import { useDevModeSync } from '@/hooks/useDevModeSync';

const DevModeStatus: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { hasChangesToSync } = useDevModeSync(projectId || '');

  if (!isDevMode || !projectId) {
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
