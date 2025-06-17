
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { GitBranch, CheckCircle } from 'lucide-react';

const DevModeStatus: React.FC = () => {
  const { isDevMode, isLovableEnvironment, useExternalDeployment } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();

  // Don't render anything if not in Lovable environment or dev mode is off
  if (!isLovableEnvironment || !isDevMode || !projectId) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Badge 
        variant="secondary"
        className="shadow-lg backdrop-blur-sm"
      >
        {useExternalDeployment ? (
          <>
            <GitBranch className="h-3 w-3 mr-1" />
            Auto-sync to GitHub
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
