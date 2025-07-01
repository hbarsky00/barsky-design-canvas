
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import ImageTextGallery from "../../sections/ImageTextGallery";

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
  const { handleSectionContentSave } = useSimplifiedContentEditor({
    projectId
  });

  const handleImageRemove = (index: number) => {
    console.log('🗑️ Removing image from challenge section at index:', index);
    // For now, just log the removal - you can implement actual removal logic if needed
    // This could involve updating the project details or triggering a refresh
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

      {/* Challenge Gallery Content */}
      {details.challengeGalleryContent && details.challengeGalleryContent.length > 0 && (
        <div className="mt-12">
          <ImageTextGallery
            items={details.challengeGalleryContent}
            imageCaptions={imageCaptions}
            projectId={projectId}
            sectionName="challenge"
            onTextSave={(textKey, content) => {
              console.log('💾 Saving challenge text:', textKey, content);
              // Convert textKey to match the expected type union
              const type = textKey.includes('text') ? 'text' as const : 'content' as const;
              handleSectionContentSave('challenge', type, content);
            }}
            onImageRemove={handleImageRemove}
            className="space-y-8"
          />
        </div>
      )}
    </motion.section>
  );
};

export default ModernProjectChallengeSection;
