
import React, { useEffect, useRef, useState } from 'react';
import { useSimpleCaptions } from '@/hooks/useSimpleCaptions';
import { useDevMode } from '@/context/DevModeContext';

interface SimpleCaptionEditorProps {
  imageSrc: string;
  projectId: string;
  children: (caption: string) => React.ReactNode;
  fallbackCaption?: string;
}

const SimpleCaptionEditor: React.FC<SimpleCaptionEditorProps> = ({
  imageSrc,
  projectId,
  children,
  fallbackCaption
}) => {
  const { isLovableEnvironment } = useDevMode();
  const { getCaption, setCaption } = useSimpleCaptions(projectId);
  const lastCaptionRef = useRef<string>('');
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentCaption, setCurrentCaption] = useState<string>('');
  
  // Initialize caption immediately to prevent resets
  useEffect(() => {
    const initialCaption = getCaption(imageSrc, fallbackCaption);
    setCurrentCaption(initialCaption);
    lastCaptionRef.current = initialCaption;
  }, [imageSrc, getCaption, fallbackCaption]);

  // Debounced update handler to prevent rapid re-renders
  const handleCaptionUpdate = (event: CustomEvent) => {
    const { imageSrc: updatedImageSrc, caption: newCaption, autoPublish = false } = event.detail;
    
    if (updatedImageSrc === imageSrc && newCaption !== lastCaptionRef.current) {
      console.log('🔄 SimpleCaptionEditor: Received AI caption update for:', imageSrc.substring(0, 30) + '...', newCaption.substring(0, 50) + '...');
      
      // Clear any existing timeout
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      
      // Immediately update the displayed caption to prevent resets
      setCurrentCaption(newCaption);
      
      // Debounce the storage update to prevent rapid changes
      updateTimeoutRef.current = setTimeout(() => {
        setCaption(imageSrc, newCaption);
        lastCaptionRef.current = newCaption;
        
        // Only auto-publish if we're in Lovable environment and autoPublish is explicitly requested
        if (autoPublish && isLovableEnvironment) {
          console.log('📝 Caption saved to dev mode only - will not auto-publish to live site');
        }
      }, 100); // Reduced to 100ms for faster response
    }
  };

  // Listen for AI caption updates with debouncing
  useEffect(() => {
    const handleBatchComplete = () => {
      console.log('🔄 SimpleCaptionEditor: Batch complete for:', imageSrc.substring(0, 30) + '...');
      // Update from storage to ensure we have the latest
      const latestCaption = getCaption(imageSrc, fallbackCaption);
      if (latestCaption !== currentCaption) {
        setCurrentCaption(latestCaption);
      }
    };

    window.addEventListener('aiCaptionGenerated', handleCaptionUpdate as EventListener);
    window.addEventListener('aiCaptionUpdated', handleCaptionUpdate as EventListener);
    window.addEventListener('captionsUpdated', handleBatchComplete as EventListener);
    
    return () => {
      window.removeEventListener('aiCaptionGenerated', handleCaptionUpdate as EventListener);
      window.removeEventListener('aiCaptionUpdated', handleCaptionUpdate as EventListener);
      window.removeEventListener('captionsUpdated', handleBatchComplete as EventListener);
      
      // Clean up timeouts
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [imageSrc, setCaption, projectId, isLovableEnvironment, getCaption, fallbackCaption, currentCaption]);

  // Simple display only - no editing functionality and no hover overlay
  return (
    <div>
      {children(currentCaption)}
    </div>
  );
};

export default SimpleCaptionEditor;
