
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

const DevModeToggle: React.FC = () => {
  const { isDevMode, toggleDevMode } = useDevMode();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleDevMode}
        variant={isDevMode ? 'default' : 'outline'}
        size="icon"
        className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
      >
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DevModeToggle;
