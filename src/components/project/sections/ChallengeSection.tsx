import React from "react";
import { FileText } from "lucide-react";
import ProjectSection from "../ProjectSection";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";

interface ChallengeSectionProps {
  challenge: string;
  challengeImage?: string;
  challengeBottomImage?: string;
  challengeGalleryImages?: string[];
  imageCaptions: Record<string, string>;
}

const ChallengeSection: React.FC<ChallengeSectionProps> = ({
  challenge,
  challengeImage,
  challengeBottomImage,
  challengeGalleryImages = [],
  imageCaptions
}) => {
  // Remove duplicates by converting to Set and back to array
  const uniqueChallengeGalleryImages = Array.from(new Set(challengeGalleryImages));
  
  return (
    <>
      <ProjectSection
        title="The Challenge"
        icon={FileText}
        content={challenge}
        image={challengeImage}
        imageCaption={challengeImage && imageCaptions[challengeImage]}
        bottomImage={challengeBottomImage}
        bottomImageCaption={challengeBottomImage && imageCaptions[challengeBottomImage]}
      />
      
      {challengeGalleryImages && challengeGalleryImages.length > 0 && (
        <div className="mb-8">
          <ProjectMultiImageGallery 
            images={uniqueChallengeGalleryImages}
            captions={imageCaptions}
          />
        </div>
      )}
    </>
  );
};

export default ChallengeSection;
