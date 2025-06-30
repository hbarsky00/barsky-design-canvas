
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import ImageTextGallery from "@/components/project/sections/ImageTextGallery";

interface ModernProjectChallengeSectionProps {
  details: ProjectDetails;
  projectId: string;
  componentKey: string;
  imageCaptions: Record<string, string>;
}

const ModernProjectChallengeSection: React.FC<ModernProjectChallengeSectionProps> = ({
  details,
  projectId,
  componentKey,
  imageCaptions
}) => {
  const { handleSectionContentSave, handleSectionImageUpdate } = useSimplifiedContentEditor({ projectId });

  const handleTextSave = (textKey: string, content: string) => {
    handleSectionContentSave('challenge', 'text', content, textKey);
  };

  return (
    <motion.section
      key={`challenge-${componentKey}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card-elevated p-4 sm:p-8 layered-depth"
    >
      <EnhancedContentEditor
        content="The Challenge"
        contentType="header"
        onSave={(content) => handleSectionContentSave('challenge', 'title', content)}
        className="mb-6 lg:mb-8"
        projectId={projectId}
      />
      
      <EnhancedContentEditor
        content={details.challenge}
        contentType="section"
        onSave={(content) => handleSectionContentSave('challenge', 'content', content)}
        className="mb-8"
        projectId={projectId}
      />

      {/* Challenge Images Gallery with text positioned between images */}
      {details.challengeGalleryImages && details.challengeGalleryImages.length > 0 && (
        <div className="mt-12 space-y-8">
          {details.challengeGalleryImages.map((image, index) => (
            <React.Fragment key={index}>
              {/* Each Image */}
              <div className="glass-card p-4 layered-depth">
                <EnhancedContentEditor
                  content=""
                  contentType="section"
                  onSave={() => {}}
                  images={[image]}
                  onImageAdd={(imageSrc) => {
                    console.log('➕ Adding image to challenge section:', imageSrc);
                  }}
                  onImageReplace={(imgIndex, newSrc) => {
                    console.log('🔄 Replacing challenge image:', image, '->', newSrc);
                    handleSectionImageUpdate('challenge', image, newSrc);
                  }}
                  onImageRemove={(imgIndex) => console.log('🗑️ Removing image from challenge:', imgIndex)}
                  maxImages={1}
                  projectId={projectId}
                  imageCaptions={imageCaptions}
                  className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
                />
              </div>
              
              {/* Show additional text ONLY after first image (index 0) */}
              {index === 0 && details.challengeAdditionalText && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    {details.challengeAdditionalText.split('\n\n').map((paragraph, paragraphIndex) => (
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

      {/* Enhanced gallery with text sections */}
      {details.challengeGalleryContent && details.challengeGalleryContent.length > 0 && (
        <ImageTextGallery
          items={details.challengeGalleryContent}
          imageCaptions={imageCaptions}
          projectId={projectId}
          sectionName="Challenge"
          onTextSave={handleTextSave}
        />
      )}
    </motion.section>
  );
};

export default ModernProjectChallengeSection;
