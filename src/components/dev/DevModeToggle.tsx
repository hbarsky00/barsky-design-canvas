
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Settings, Eye } from 'lucide-react';

const DevModeToggle: React.FC = () => {
  const { isDevMode, toggleDevMode } = useDevMode();

  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        onClick={toggleDevMode}
        variant={isDevMode ? "default" : "outline"}
        size="sm"
        className="shadow-lg backdrop-blur-sm"
      >
        {isDevMode ? (
          <>
            <Eye className="h-4 w-4 mr-2" />
            Exit Dev Mode
          </>
        ) : (
          <>
            <Settings className="h-4 w-4 mr-2" />
            Dev Mode
          </>
        )}
      </Button>
    </div>
  );
};

export default DevModeToggle;
