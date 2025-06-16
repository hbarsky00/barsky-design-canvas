
import React from 'react';
import MaximizableImage from '../MaximizableImage';
import EditImageButton from '@/components/dev/EditImageButton';

interface SectionImagesProps {
  sectionImages: string[];
  imageCaptions: Record<string, string>;
  title: string;
  sectionKey: string;
  projectId: string;
  getReplacedImageSrc: (originalSrc: string) => string;
  handleImageReplace: (imageSrc: string, newSrc: string) => void;
}

const SectionImages: React.FC<SectionImagesProps> = ({
  sectionImages,
  imageCaptions,
  title,
  sectionKey,
  projectId,
  getReplacedImageSrc,
  handleImageReplace
}) => {
  if (sectionImages.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {sectionImages.map((imageSrc, index) => {
        const replacedSrc = getReplacedImageSrc(imageSrc);
        const caption = imageCaptions[imageSrc] || imageCaptions[replacedSrc] || `${title} illustration ${index + 1}`;
        
        return (
          <div key={`${sectionKey}-image-${index}`} className="glass-card p-4 layered-depth relative group">
            <EditImageButton
              src={replacedSrc}
              onImageReplace={(newSrc) => handleImageReplace(imageSrc, newSrc)}
              projectId={projectId}
            />
            <MaximizableImage
              src={replacedSrc}
              alt={caption}
              caption={caption}
              imageList={sectionImages.map(getReplacedImageSrc)}
              currentIndex={index}
              className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
              onImageReplace={(newSrc) => handleImageReplace(imageSrc, newSrc)}
              projectId={projectId}
              hideEditButton={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SectionImages;
