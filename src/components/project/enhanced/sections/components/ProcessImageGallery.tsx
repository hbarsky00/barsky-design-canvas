
import React from "react";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import SpittimeResearchContent from "./SpittimeResearchContent";
import HerbalinkResearchContent from "./HerbalinkResearchContent";

interface ProcessImageGalleryProps {
  processImages: string[];
  projectId: string;
  imageCaptions: Record<string, string>;
  isSpittimeProject: boolean;
  isHerbalinkProject: boolean;
  onImageReplace: (originalSrc: string, newSrc: string) => void;
  onImageRemove: (index: number) => void;
}

const ProcessImageGallery: React.FC<ProcessImageGalleryProps> = ({
  processImages,
  projectId,
  imageCaptions,
  isSpittimeProject,
  isHerbalinkProject,
  onImageReplace,
  onImageRemove
}) => {
  if (!processImages || processImages.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 space-y-8">
      {processImages.map((image, index) => (
        <React.Fragment key={index}>
          {/* Each Image */}
          <div className="glass-card p-4 layered-depth">
            <EnhancedContentEditor
              content=""
              contentType="section"
              onSave={() => {}}
              images={[image]}
              onImageAdd={(imageSrc) => {
                console.log('➕ Adding image to process section:', imageSrc);
              }}
              onImageReplace={(imgIndex, newSrc) => {
                console.log('🔄 Replacing process image:', image, '->', newSrc);
                onImageReplace(image, newSrc);
              }}
              onImageRemove={() => onImageRemove(index)}
              maxImages={1}
              projectId={projectId}
              imageCaptions={imageCaptions}
              className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
            />
          </div>
          
          {/* Show project-specific content after first image */}
          {index === 0 && isSpittimeProject && <SpittimeResearchContent />}
          {index === 0 && isHerbalinkProject && (
            <HerbalinkResearchContent 
              projectId={projectId}
              imageCaptions={imageCaptions}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProcessImageGallery;
