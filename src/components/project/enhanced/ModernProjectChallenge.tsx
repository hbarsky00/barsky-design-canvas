
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";
import { getImageForListItem } from "@/utils/listItemImageMapping";

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
        <h2 className="text-3xl font-bold text-gray-900 mb-6 pt-2.5">
          The Challenge
        </h2>
        <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
          {challenge.split('\n\n').map((paragraph, index) => {
            // Check if this is a main header (like "User Pain Points:")
            if (paragraph.includes(':') && !paragraph.includes('•') && paragraph.length < 80) {
              return (
                <h3 key={index} className="text-xl font-semibold text-gray-900 mt-8 mb-4 first:mt-0">
                  {paragraph.replace(':', '')}
                </h3>
              );
            }
            
            // Check if this is a subheader (like "Research Findings:")
            if (paragraph.endsWith(':') && paragraph.length < 150) {
              return (
                <h4 key={index} className="text-lg font-medium text-gray-800 mt-6 mb-3">
                  {paragraph}
                </h4>
              );
            }
            
            // Check if this contains bullet points - create two columns for better layout
            if (paragraph.includes('•')) {
              const items = paragraph.split('\n').filter(line => line.trim().startsWith('•'));
              if (items.length > 0) {
                return (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {items.map((item, itemIndex) => {
                      const itemText = item.replace('•', '').trim();
                      const itemImage = getImageForListItem(itemText);
                      
                      return (
                        <div key={itemIndex} className="flex flex-col bg-blue-50/30 p-3 rounded-lg border border-blue-100/50">
                          <div className="flex items-start mb-3">
                            <span className="text-primary mr-3 mt-1 font-bold">•</span>
                            <span className="text-gray-700 text-sm leading-relaxed">{itemText}</span>
                          </div>
                          {itemImage && (
                            <div className="mt-2">
                              <MaximizableImage 
                                src={itemImage} 
                                alt={`Illustration for: ${itemText}`}
                                className="w-full h-32 object-cover rounded-md cursor-pointer"
                                projectId="herbalink"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              }
            }
            
            // Regular paragraph
            return (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>

      {/* Challenge Images Gallery */}
      {challengeGalleryImages && challengeGalleryImages.length > 0 && (
        <div className="mt-16 space-y-12">
          {challengeGalleryImages.map((image, index) => (
            <React.Fragment key={index}>
              {/* Each Image */}
              <MaximizableImage
                src={image}
                alt={imageCaptions[image] || `Challenge image ${index + 1}`}
                caption={imageCaptions[image] || `Challenge image ${index + 1}`}
                imageList={challengeGalleryImages}
                currentIndex={index}
                className="shadow-elevated-lg w-full glass-card layered-depth"
              />
              
              {/* Show additional text ONLY after first image (index 0) */}
              {index === 0 && challengeAdditionalText && (
                <div className="p-6 bg-blue-50/50 border border-blue-100">
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

export default ModernProjectChallenge;
