
import React from 'react';
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
  const { getCaption } = useSimpleCaptions(projectId);
  
  const currentCaption = getCaption(imageSrc, fallbackCaption);
  
  // Generate a unique visual identifier for this specific image
  const imageIdentifier = React.useMemo(() => {
    const shortHash = imageSrc.split('/').pop()?.substring(0, 8) || Math.random().toString(36).substr(2, 8);
    return `IMG-${shortHash}`;
  }, [imageSrc]);

  // Simple display only - no editing functionality
  return (
    <div className="relative group">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-0 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-mono">
        {imageIdentifier} • AI Generated
      </div>
      
      <div>
        {children(currentCaption)}
      </div>
    </div>
  );
};

export default SimpleCaptionEditor;
