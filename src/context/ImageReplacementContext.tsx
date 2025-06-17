
import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';

interface ImageReplacementState {
  [originalSrc: string]: string;
}

interface ImageReplacementContextType {
  imageReplacements: ImageReplacementState;
  replaceImage: (originalSrc: string, newSrc: string, projectId: string) => void;
  getReplacedSrc: (originalSrc: string) => string;
  isReplacing: boolean;
}

const ImageReplacementContext = createContext<ImageReplacementContextType | undefined>(undefined);

export const ImageReplacementProvider: React.FC<{ children: React.ReactNode; projectId: string }> = ({ 
  children, 
  projectId 
}) => {
  const [imageReplacements, setImageReplacements] = useState<ImageReplacementState>({});
  const [isReplacing, setIsReplacing] = useState(false);
  const { saveChange, getChanges } = useDevModeDatabase(projectId);
  const loadedRef = useRef(false);

  // Load existing replacements on mount
  useEffect(() => {
    if (!projectId || loadedRef.current) return;
    
    const loadReplacements = async () => {
      try {
        const changes = await getChanges();
        if (changes.imageReplacements) {
          console.log('🖼️ ImageReplacementContext: Loaded existing replacements:', Object.keys(changes.imageReplacements).length);
          setImageReplacements(changes.imageReplacements);
        }
        loadedRef.current = true;
      } catch (error) {
        console.error('❌ Error loading image replacements:', error);
      }
    };

    loadReplacements();
  }, [projectId, getChanges]);

  // Listen for real-time updates
  useEffect(() => {
    const handleImageUpdate = (e: CustomEvent) => {
      const detail = e.detail || {};
      
      if (detail.immediate && detail.src && detail.newSrc && detail.changeType === 'image') {
        console.log('⚡ ImageReplacementContext: Immediate update received:', {
          src: detail.src.substring(0, 30) + '...',
          newSrc: detail.newSrc.substring(0, 30) + '...'
        });
        
        setImageReplacements(prev => ({
          ...prev,
          [detail.src]: detail.newSrc
        }));
      }
    };

    window.addEventListener('projectDataUpdated', handleImageUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleImageUpdate as EventListener);
    };
  }, []);

  const replaceImage = useCallback(async (originalSrc: string, newSrc: string, targetProjectId: string) => {
    console.log('🔄 ImageReplacementContext: Replacing image:', {
      originalSrc: originalSrc.substring(0, 30) + '...',
      newSrc: newSrc.substring(0, 30) + '...',
      projectId: targetProjectId
    });

    // Immediate UI update
    setImageReplacements(prev => ({
      ...prev,
      [originalSrc]: newSrc
    }));

    setIsReplacing(true);

    try {
      // Save to database
      await saveChange('image', originalSrc, newSrc);
      
      // Broadcast immediate update event
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: {
          projectId: targetProjectId,
          src: originalSrc,
          newSrc: newSrc,
          immediate: true,
          changeType: 'image',
          timestamp: Date.now(),
          source: 'ImageReplacementContext'
        }
      }));

      console.log('✅ ImageReplacementContext: Image replacement completed successfully');
    } catch (error) {
      console.error('❌ ImageReplacementContext: Error saving image replacement:', error);
      // Revert on error
      setImageReplacements(prev => {
        const updated = { ...prev };
        delete updated[originalSrc];
        return updated;
      });
    } finally {
      setIsReplacing(false);
    }
  }, [saveChange]);

  const getReplacedSrc = useCallback((originalSrc: string) => {
    return imageReplacements[originalSrc] || originalSrc;
  }, [imageReplacements]);

  return (
    <ImageReplacementContext.Provider value={{
      imageReplacements,
      replaceImage,
      getReplacedSrc,
      isReplacing
    }}>
      {children}
    </ImageReplacementContext.Provider>
  );
};

export const useImageReplacement = () => {
  const context = useContext(ImageReplacementContext);
  if (!context) {
    throw new Error('useImageReplacement must be used within an ImageReplacementProvider');
  }
  return context;
};
