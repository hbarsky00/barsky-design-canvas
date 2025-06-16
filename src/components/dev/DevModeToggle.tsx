
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';

const isLovableEditor = () => {
  if (typeof window === 'undefined') return false;
  // Show dev mode in Lovable editor, localhost, or development environment
  return window.location.hostname.includes('lovableproject.com') || 
         window.location.hostname === 'localhost' ||
         window.location.hostname.includes('127.0.0.1') ||
         import.meta.env.DEV;
};

const DevModeToggle: React.FC = () => {
  const { isDevMode, toggleDevMode } = useDevMode();

  if (!isLovableEditor()) {
    return null;
  }

  const handleToggle = () => {
    console.log('DevModeToggle: Current dev mode state:', isDevMode);
    toggleDevMode();
    console.log('DevModeToggle: Toggle called');
    
    // Show toast notification
    if (!isDevMode) {
      toast.success("Dev Mode Enabled", {
        description: "Click on text to edit, hover over images to replace them, and use the + buttons to add content.",
        duration: 5000,
      });
    } else {
      toast.info("Dev Mode Disabled", {
        description: "Editing features are now hidden.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleToggle}
        variant={isDevMode ? 'default' : 'outline'}
        size="icon"
        className={`rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 ${
          isDevMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
            : 'bg-background/80 hover:bg-background border-2 border-blue-300 hover:border-blue-500'
        }`}
        title={isDevMode ? 'Disable Dev Mode' : 'Enable Dev Mode'}
      >
        <Edit className={`h-4 w-4 ${isDevMode ? 'text-white' : 'text-blue-600'}`} />
      </Button>
    </div>
  );
};

export default DevModeToggle;
