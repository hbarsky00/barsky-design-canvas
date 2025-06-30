
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";

interface ChallengeSectionProps {
  challenge: string;
  challengeAdditionalText?: string;
  challengeImage?: string;
  challengeBottomImage?: string;
  challengeGalleryImages?: string[];
  imageCaptions?: Record<string, string>;
  projectId?: string;
}

const ChallengeSection: React.FC<ChallengeSectionProps> = ({
  challenge,
  challengeAdditionalText,
  challengeGalleryImages = [],
  imageCaptions = {}
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
      </div>

      {challengeGalleryImages && challengeGalleryImages.length > 0 && (
        <div className="mt-12 space-y-8">
          {challengeGalleryImages.map((image, index) => (
            <React.Fragment key={index}>
              {/* Each Image */}
              <div className="glass-card p-4 layered-depth">
                <MaximizableImage
                  src={image}
                  alt={imageCaptions[image] || `Challenge image ${index + 1}`}
                  caption={imageCaptions[image] || `Challenge image ${index + 1}`}
                  imageList={challengeGalleryImages}
                  currentIndex={index}
                  className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
                />
              </div>
              
              {/* Show additional text ONLY after first image (index 0) */}
              {index === 0 && challengeAdditionalText && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    {challengeAdditionalText.split('\n\n').map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default ChallengeSection;
