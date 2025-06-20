
import React from 'react';
import ContentTextEditor from './ContentTextEditor';
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

  return (
    <>
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
    </>
  );
};

export default ContentEditorContainer;
