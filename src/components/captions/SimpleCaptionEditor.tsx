
import React, { useEffect, useRef, useState } from 'react';
import { useSimpleCaptions } from '@/hooks/useSimpleCaptions';

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
  const { getCaption, setCaption } = useSimpleCaptions(projectId);
  const lastCaptionRef = useRef<string>('');
  const [forceRefresh, setForceRefresh] = useState(0);
  
  const currentCaption = getCaption(imageSrc, fallbackCaption);

  // Listen for AI caption updates with more aggressive refresh handling
  useEffect(() => {
    const handleCaptionUpdate = (event: CustomEvent) => {
      const { imageSrc: updatedImageSrc, caption: newCaption } = event.detail;
      
      if (updatedImageSrc === imageSrc && newCaption !== lastCaptionRef.current) {
        console.log('🔄 SimpleCaptionEditor: Received AI caption update for:', imageSrc.substring(0, 30) + '...', newCaption.substring(0, 50) + '...');
        setCaption(imageSrc, newCaption);
        lastCaptionRef.current = newCaption;
        setForceRefresh(prev => prev + 1); // Force component re-render
      }
    };

    const handleBatchComplete = () => {
      console.log('🔄 SimpleCaptionEditor: Batch complete, forcing refresh for:', imageSrc.substring(0, 30) + '...');
      setForceRefresh(prev => prev + 1);
    };

    window.addEventListener('aiCaptionGenerated', handleCaptionUpdate as EventListener);
    window.addEventListener('aiCaptionUpdated', handleCaptionUpdate as EventListener);
    window.addEventListener('captionsUpdated', handleBatchComplete as EventListener);
    window.addEventListener('aiCaptionBatchComplete', handleBatchComplete as EventListener);
    window.addEventListener('forceComponentRefresh', handleBatchComplete as EventListener);
    
    return () => {
      window.removeEventListener('aiCaptionGenerated', handleCaptionUpdate as EventListener);
      window.removeEventListener('aiCaptionUpdated', handleCaptionUpdate as EventListener);
      window.removeEventListener('captionsUpdated', handleBatchComplete as EventListener);
      window.removeEventListener('aiCaptionBatchComplete', handleBatchComplete as EventListener);
      window.removeEventListener('forceComponentRefresh', handleBatchComplete as EventListener);
    };
  }, [imageSrc, setCaption]);

  // Update ref when caption changes
  useEffect(() => {
    if (currentCaption !== lastCaptionRef.current) {
      lastCaptionRef.current = currentCaption;
    }
  }, [currentCaption, forceRefresh]);

  // Simple display only - no editing functionality and no hover overlay
  return (
    <div key={`${imageSrc}-${forceRefresh}`}>
      {children(currentCaption)}
    </div>
  );
};

export default SimpleCaptionEditor;
