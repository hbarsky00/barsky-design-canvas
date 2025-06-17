
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';

const DevModeSyncButton: React.FC = () => {
  const { isDevMode, isLovableEnvironment, useExternalDeployment } = useDevMode();

  // Don't render the button if using external deployment (GitHub → Vercel)
  if (!isLovableEnvironment || useExternalDeployment) {
    console.log('❌ DevModeSyncButton: Hidden - using external deployment workflow');
    return null;
  }

  // Show the button if we're in dev mode (only for projects not using external deployment)
  if (!isDevMode) {
    console.log('❌ DevModeSyncButton: Not showing - not in dev mode');
    return null;
  }

  // This component is now effectively disabled for external deployment workflows
  return null;
};

export default DevModeSyncButton;
