
import React, { useState } from 'react';
import ContentTextEditor from './ContentTextEditor';
import ContentImageManager from './ContentImageManager';

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
  content,
  contentType,
  onSave,
  images = [],
  onImageAdd,
  onImageReplace,
  onImageRemove,
  maxImages = 3,
  className = "",
  projectId,
  imageCaptions = {}
}) => {
  const [localImages, setLocalImages] = useState<string[]>(images);

  const handleImageAdd = (imageSrc: string) => {
    const newImages = [...localImages, imageSrc];
    setLocalImages(newImages);
    if (onImageAdd) {
      onImageAdd(imageSrc);
    }
  };

  const handleImageReplace = (index: number, newSrc: string) => {
    const newImages = localImages.map((src, i) => i === index ? newSrc : src);
    setLocalImages(newImages);
    if (onImageReplace) {
      onImageReplace(index, newSrc);
    }
  };

  const handleImageRemove = (index: number) => {
    const newImages = localImages.filter((_, i) => i !== index);
    setLocalImages(newImages);
    if (onImageRemove) {
      onImageRemove(index);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <ContentTextEditor
        content={content}
        contentType={contentType}
        onSave={onSave}
      />

      <ContentImageManager
        images={localImages}
        onImageAdd={onImageAdd ? handleImageAdd : undefined}
        onImageReplace={onImageReplace ? handleImageReplace : undefined}
        onImageRemove={onImageRemove ? handleImageRemove : undefined}
        maxImages={maxImages}
        projectId={projectId}
        imageCaptions={imageCaptions}
      />
    </div>
  );
};

export default EnhancedContentEditor;
