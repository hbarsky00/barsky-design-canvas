
import React, { useEffect, useRef } from 'react';
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
  
  const currentCaption = getCaption(imageSrc, fallbackCaption);

  // Listen for AI caption updates
  useEffect(() => {
    const handleCaptionUpdate = (event: CustomEvent) => {
      const { imageSrc: updatedImageSrc, caption: newCaption } = event.detail;
      
      if (updatedImageSrc === imageSrc && newCaption !== lastCaptionRef.current) {
        console.log('🔄 SimpleCaptionEditor: Received AI caption update for:', imageSrc.substring(0, 30) + '...', newCaption.substring(0, 50) + '...');
        setCaption(imageSrc, newCaption);
        lastCaptionRef.current = newCaption;
      }
    };

    window.addEventListener('aiCaptionGenerated', handleCaptionUpdate as EventListener);
    window.addEventListener('aiCaptionUpdated', handleCaptionUpdate as EventListener);
    
    return () => {
      window.removeEventListener('aiCaptionGenerated', handleCaptionUpdate as EventListener);
      window.removeEventListener('aiCaptionUpdated', handleCaptionUpdate as EventListener);
    };
  }, [imageSrc, setCaption]);

  // Update ref when caption changes
  useEffect(() => {
    if (currentCaption !== lastCaptionRef.current) {
      lastCaptionRef.current = currentCaption;
    }
  }, [currentCaption]);

  // Simple display only - no editing functionality and no hover overlay
  return (
    <div>
      {children(currentCaption)}
    </div>
  );
};

export default SimpleCaptionEditor;
