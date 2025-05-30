
import React from "react";
import { FileText } from "lucide-react";
import ProjectSection from "../ProjectSection";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";
import { removeDuplicateImages } from "@/utils/imageUtils";

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
            images={removeDuplicateImages(challengeGalleryImages)}
            captions={imageCaptions}
          />
        </div>
      )}
    </>
  );
};

export default ChallengeSection;
