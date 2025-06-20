
import { useState } from 'react';

interface UseContentEditorStateProps {
  images: string[];
  onImageAdd?: (imageSrc: string) => void;
  onImageReplace?: (index: number, newSrc: string) => void;
  onImageRemove?: (index: number) => void;
}

export const useContentEditorState = ({
  images,
  onImageAdd,
  onImageReplace,
  onImageRemove
}: UseContentEditorStateProps) => {
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

  return {
    localImages,
    handleImageAdd,
    handleImageReplace,
    handleImageRemove
  };
};
