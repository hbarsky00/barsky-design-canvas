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
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const publishTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentCaption = getCaption(imageSrc, fallbackCaption);

  const publishCaptionToLive = async () => {
    try {
      console.log('📤 SimpleCaptionEditor: Auto-publishing individual caption update to live mode...');
      const { PublishingService } = await import('@/services/publishingService');
      await PublishingService.publishProject(projectId, true); // Preserve dev changes
      console.log('✅ Individual caption update published to live mode');
    } catch (error) {
      console.error('❌ Failed to publish individual caption update to live mode:', error);
    }
  };

  // Debounced update handler to prevent rapid re-renders
  const handleCaptionUpdate = (event: CustomEvent) => {
    const { imageSrc: updatedImageSrc, caption: newCaption, autoPublish = false } = event.detail;
    
    if (updatedImageSrc === imageSrc && newCaption !== lastCaptionRef.current) {
      console.log('🔄 SimpleCaptionEditor: Received AI caption update for:', imageSrc.substring(0, 30) + '...', newCaption.substring(0, 50) + '...');
      
      // Clear any existing timeout
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      
      // Debounce the update to prevent rapid changes
      updateTimeoutRef.current = setTimeout(() => {
        setCaption(imageSrc, newCaption);
        lastCaptionRef.current = newCaption;
        
        // Auto-publish if this was an automated caption fix
        if (autoPublish) {
          // Clear any existing publish timeout
          if (publishTimeoutRef.current) {
            clearTimeout(publishTimeoutRef.current);
          }
          
          // Debounce publishing to avoid too many publish calls
          publishTimeoutRef.current = setTimeout(() => {
            publishCaptionToLive();
          }, 1000); // 1 second delay before publishing
        }
      }, 300); // 300ms debounce
    }
  };

  // Listen for AI caption updates with debouncing
  useEffect(() => {
    const handleBatchComplete = () => {
      console.log('🔄 SimpleCaptionEditor: Batch complete for:', imageSrc.substring(0, 30) + '...');
      // Just log, don't force re-render
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
      if (publishTimeoutRef.current) {
        clearTimeout(publishTimeoutRef.current);
      }
    };
  }, [imageSrc, setCaption, projectId]);

  // Update ref when caption changes naturally
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
