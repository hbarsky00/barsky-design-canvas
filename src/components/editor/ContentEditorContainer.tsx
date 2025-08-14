
import React from 'react';
import { ContentTextEditor } from './ContentTextEditor';
import ContentImageManager from './ContentImageManager';
import { useContentEditorState } from './useContentEditorState';

interface ContentEditorContainerProps {
  content: string;
  contentType: 'paragraph' | 'header' | 'section';
  onSave: (content: string) => void;
  images?: string[];
  onImageAdd?: (imageSrc: string) => void;
  onImageReplace?: (index: number, newSrc: string) => void;
  onImageRemove?: (index: number) => void;
  maxImages?: number;
  projectId?: string;
  imageCaptions?: Record<string, string>;
}

const ContentEditorContainer: React.FC<ContentEditorContainerProps> = ({
  content,
  contentType,
  onSave,
  images = [],
  onImageAdd,
  onImageReplace,
  onImageRemove,
  maxImages = 3,
  projectId,
  imageCaptions = {}
}) => {
  // Always call the hook, but pass undefined handlers if not provided
  const {
    localImages,
    handleImageAdd,
    handleImageReplace,
    handleImageRemove
  } = useContentEditorState({
    images,
    onImageAdd,
    onImageReplace,
    onImageRemove
  });

  // Only show image manager if we have image-related functionality
  const showImageManager = onImageAdd || onImageReplace || onImageRemove || images.length > 0;

  return (
    <>
      <ContentTextEditor
        content={content}
        contentType={contentType}
        onSave={onSave}
      />

      {showImageManager && (
        <ContentImageManager
          images={localImages}
          onImageAdd={onImageAdd ? handleImageAdd : undefined}
          onImageReplace={onImageReplace ? handleImageReplace : undefined}
          onImageRemove={onImageRemove ? handleImageRemove : undefined}
          maxImages={maxImages}
          projectId={projectId}
          imageCaptions={imageCaptions}
        />
      )}
    </>
  );
};

export default ContentEditorContainer;
