
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Sparkles } from 'lucide-react';

const DevModeStatus: React.FC = () => {
  const { isDevMode, isLovableEnvironment, useExternalDeployment } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();

  // Don't render anything if not in Lovable environment or dev mode is off
  if (!isLovableEnvironment || !isDevMode || !projectId) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 bg-green-100/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-green-200">
      <div className="text-xs font-medium text-green-700 mb-2 flex items-center gap-2">
        <Zap className="h-3 w-3" />
        Dev Mode Active
        {useExternalDeployment && (
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            External Deploy
          </Badge>
        )}
      </div>
      
      <div className="text-xs text-green-600 space-y-1">
        <div>Environment: {isLovableEnvironment ? 'Lovable' : 'Published'}</div>
        <div>Sync: Auto-enabled</div>
        <div>External: {useExternalDeployment ? 'Yes' : 'No'}</div>
      </div>

      {/* Quick Access Tools */}
      <div className="mt-3 pt-2 border-t border-green-200">
        <div className="text-xs font-medium text-green-700 mb-2">Quick Tools</div>
        <div className="flex flex-wrap gap-1">
          <Link 
            to="/dev/captions"
            className="inline-block"
          >
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs h-6 px-2 bg-white/80 hover:bg-white border-green-300 text-green-700 hover:text-green-800"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              AI Captions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DevModeStatus;
