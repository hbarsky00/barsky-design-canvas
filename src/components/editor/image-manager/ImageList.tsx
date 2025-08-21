
import React from 'react';
import MaximizableImage from '../../project/MaximizableImage';

interface ImageListProps {
  images: string[];
  imageCaptions: Record<string, string>;
  projectId?: string;
  showEditingControls: boolean;
  componentKey: number;
  onImageReplace: (index: number, newSrc: string) => void;
  onImageRemove: (index: number) => void;
}

const ImageList: React.FC<ImageListProps> = ({
  images,
  imageCaptions,
  projectId,
  showEditingControls,
  componentKey,
  onImageReplace,
  onImageRemove
}) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6" key={`image-list-${componentKey}`}>
      {images.map((image, index) => (
        <MaximizableImage
          key={`${image}-${index}-${componentKey}`}
          src={image}
          alt={`Image ${index + 1}`}
          caption={imageCaptions[image]}
          imageList={images}
          currentIndex={index}
          className="shadow-elevated w-full glass-card layered-depth image-drop-shadow"
          projectId={projectId}
          hideEditButton={!showEditingControls}
          allowRemove={showEditingControls}
          onImageReplace={(newSrc) => onImageReplace(index, newSrc)}
          onImageRemove={() => onImageRemove(index)}
        />
      ))}
    </div>
  );
};

export default ImageList;
