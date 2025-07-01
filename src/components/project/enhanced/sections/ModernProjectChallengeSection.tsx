
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

  // Check if this is the splittime project
  const isSpittimeProject = projectId === 'splittime';

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
        <div className="mt-12 space-y-8">
          {details.challengeGalleryContent.map((item, index) => (
            <React.Fragment key={index}>
              {/* Each Image */}
              {item.type === 'image' && (
                <div className="glass-card p-4 layered-depth">
                  <EnhancedContentEditor
                    content=""
                    contentType="section"
                    onSave={() => {}}
                    images={[item.content]}
                    onImageAdd={(imageSrc) => {
                      console.log('➕ Adding image to challenge section:', imageSrc);
                    }}
                    onImageReplace={(imgIndex, newSrc) => {
                      console.log('🔄 Replacing challenge image:', item.content, '->', newSrc);
                    }}
                    onImageRemove={() => handleImageRemove(index)}
                    maxImages={1}
                    projectId={projectId}
                    imageCaptions={imageCaptions}
                    className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
                  />
                </div>
              )}
              
              {/* Show custom text after first image for Splittime project */}
              {index === 0 && isSpittimeProject && (
                <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <p className="text-sm text-gray-700 mb-4 last:mb-0">
                      Key challenges include emotional triggers in messaging, scheduling chaos from lack of centralized systems, financial disputes over child expenses, documentation issues causing information loss, and children caught in parental conflicts.
                    </p>
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

export default ModernProjectChallengeSection;
