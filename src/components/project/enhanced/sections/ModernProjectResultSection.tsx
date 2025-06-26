
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";

interface ModernProjectResultSectionProps {
  details: ProjectDetails;
  projectId: string;
  componentKey: string;
  imageCaptions: Record<string, string>;
}

const ModernProjectResultSection: React.FC<ModernProjectResultSectionProps> = ({
  details,
  projectId,
  componentKey,
  imageCaptions
}) => {
  const { handleSectionContentSave, handleSectionImageUpdate } = useSimplifiedContentEditor({ projectId });

  return (
    <motion.section
      key={`result-${componentKey}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="glass-card-elevated p-4 sm:p-8 layered-depth"
    >
      <EnhancedContentEditor
        content="The Result"
        contentType="header"
        onSave={(content) => handleSectionContentSave('result', 'title', content)}
        className="mb-6 lg:mb-8"
        projectId={projectId}
      />
      
      <EnhancedContentEditor
        content={details.result}
        contentType="section"
        onSave={(content) => handleSectionContentSave('result', 'content', content)}
        images={details.resultGalleryImages || []}
        onImageAdd={(imageSrc) => {
          console.log('➕ Adding image to result section:', imageSrc);
        }}
        onImageReplace={(index, newSrc) => {
          const originalSrc = details.resultGalleryImages?.[index];
          if (originalSrc) {
            console.log('🔄 Replacing result image:', originalSrc, '->', newSrc);
            handleSectionImageUpdate('result', originalSrc, newSrc);
          }
        }}
        onImageRemove={(index) => console.log('🗑️ Removing image from result:', index)}
        maxImages={4}
        projectId={projectId}
        imageCaptions={imageCaptions}
      />
    </motion.section>
  );
};

export default ModernProjectResultSection;
