
import React from "react";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";
import EditableText from "@/components/dev/EditableText";

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
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card-elevated p-8 space-y-8 layered-depth floating-element"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <EditableText initialText="The Challenge">
            {(text) => (
              <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                {text}
              </h2>
            )}
          </EditableText>
        </div>

        <EditableText initialText={challenge} multiline>
          {(text) => (
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                {text}
              </p>
            </div>
          )}
        </EditableText>

        {challengeImage && (
          <div className="glass-card p-4 layered-depth floating-element">
            <MaximizableImage
              src={challengeImage}
              alt={imageCaptions[challengeImage] || "Challenge overview"}
              caption={imageCaptions[challengeImage]}
              className="rounded-lg shadow-elevated w-full"
            />
          </div>
        )}

        {challengeBottomImage && (
          <div className="glass-card p-4 layered-depth floating-element">
            <MaximizableImage
              src={challengeBottomImage}
              alt={imageCaptions[challengeBottomImage] || "Additional challenge details"}
              caption={imageCaptions[challengeBottomImage]}
              className="rounded-lg shadow-elevated w-full"
            />
          </div>
        )}
      </motion.section>
      
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
