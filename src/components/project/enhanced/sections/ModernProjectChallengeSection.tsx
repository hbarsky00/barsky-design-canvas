
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

      {/* Enhanced gallery with text sections */}
      {details.challengeGalleryContent && details.challengeGalleryContent.length > 0 ? (
        <ImageTextGallery
          items={details.challengeGalleryContent}
          imageCaptions={imageCaptions}
          projectId={projectId}
          sectionName="Challenge"
          onTextSave={handleTextSave}
        />
      ) : details.challengeGalleryImages && details.challengeGalleryImages.length > 0 ? (
        <EnhancedContentEditor
          content=""
          contentType="section"
          onSave={() => {}}
          images={details.challengeGalleryImages || []}
          onImageAdd={(imageSrc) => {
            console.log('➕ Adding image to challenge section:', imageSrc);
          }}
          onImageReplace={(index, newSrc) => {
            const originalSrc = details.challengeGalleryImages?.[index];
            if (originalSrc) {
              console.log('🔄 Replacing challenge image:', originalSrc, '->', newSrc);
              handleSectionImageUpdate('challenge', originalSrc, newSrc);
            }
          }}
          onImageRemove={(index) => console.log('🗑️ Removing image from challenge:', index)}
          maxImages={3}
          projectId={projectId}
          imageCaptions={imageCaptions}
        />
      ) : null}
    </motion.section>
  );
};

export default ModernProjectChallengeSection;
