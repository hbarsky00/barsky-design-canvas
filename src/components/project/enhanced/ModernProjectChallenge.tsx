
import React from "react";
import { motion } from "framer-motion";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";

interface ModernProjectChallengeProps {
  challenge: string;
  challengeAdditionalText?: string;
  challengeGalleryImages?: string[];
  imageCaptions: Record<string, string>;
}

const ModernProjectChallenge: React.FC<ModernProjectChallengeProps> = ({
  challenge,
  challengeAdditionalText,
  challengeGalleryImages = [],
  imageCaptions
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          The Challenge
        </h2>
        <div className="prose prose-lg text-gray-600 leading-relaxed">
          {challenge.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Additional text section - appears after challenge description */}
        {challengeAdditionalText && (
          <div className="mt-8 p-6 bg-blue-50/50 rounded-lg border border-blue-100">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              {challengeAdditionalText.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Challenge Images */}
      {challengeGalleryImages && challengeGalleryImages.length > 0 && (
        <div className="mt-12">
          <ProjectMultiImageGallery 
            images={challengeGalleryImages}
            imageCaptions={imageCaptions}
          />
        </div>
      )}
    </motion.section>
  );
};

export default ModernProjectChallenge;
