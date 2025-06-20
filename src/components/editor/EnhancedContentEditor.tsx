
import React from 'react';
import ContentEditorContainer from './ContentEditorContainer';

interface EnhancedContentEditorProps {
  content: string;
  contentType: 'paragraph' | 'header' | 'section';
  onSave: (content: string) => void;
  images?: string[];
  onImageAdd?: (imageSrc: string) => void;
  onImageReplace?: (index: number, newSrc: string) => void;
  onImageRemove?: (index: number) => void;
  maxImages?: number;
  className?: string;
  projectId?: string;
  imageCaptions?: Record<string, string>;
}

const EnhancedContentEditor: React.FC<EnhancedContentEditorProps> = ({
  className = "",
  ...props
}) => {
  return (
    <div className={`relative group ${className}`}>
      <ContentEditorContainer {...props} />
    </div>
  );
};

export default EnhancedContentEditor;
