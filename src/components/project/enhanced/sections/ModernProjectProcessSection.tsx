
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";

interface ModernProjectProcessSectionProps {
  details: ProjectDetails;
  projectId: string;
  componentKey: string;
  imageCaptions: Record<string, string>;
}

const ModernProjectProcessSection: React.FC<ModernProjectProcessSectionProps> = ({
  details,
  projectId,
  componentKey,
  imageCaptions
}) => {
  const { handleSectionContentSave, handleSectionImageUpdate } = useSimplifiedContentEditor({ projectId });

  // Extract process images for proper display order
  const processBeforeHeaderImage = details.imageConfig?.process?.beforeHeader;
  const processRegularImage = details.processImage;
  
  // Create process images array with correct order
  const processImages = React.useMemo(() => {
    const images: string[] = [];
    if (processBeforeHeaderImage) {
      images.push(processBeforeHeaderImage);
    }
    if (processRegularImage) {
      images.push(processRegularImage);
    }
    return images;
  }, [processBeforeHeaderImage, processRegularImage]);

  return (
    <motion.section
      key={`process-${componentKey}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="glass-card-elevated p-4 sm:p-8 layered-depth"
    >
      <EnhancedContentEditor
        content="What I Did"
        contentType="header"
        onSave={(content) => handleSectionContentSave('process', 'title', content)}
        className="mb-6 lg:mb-8"
        projectId={projectId}
      />
      
      <EnhancedContentEditor
        content={details.process}
        contentType="section"
        onSave={(content) => handleSectionContentSave('process', 'content', content)}
        images={processImages}
        onImageAdd={(imageSrc) => {
          console.log('➕ Adding image to process section:', imageSrc);
        }}
        onImageReplace={(index, newSrc) => {
          const originalSrc = processImages[index];
          if (originalSrc) {
            console.log('🔄 Replacing process image:', originalSrc, '->', newSrc);
            handleSectionImageUpdate('process', originalSrc, newSrc);
          }
        }}
        onImageRemove={(index) => console.log('🗑️ Removing image from process:', index)}
        maxImages={2}
        projectId={projectId}
        imageCaptions={imageCaptions}
      />
    </motion.section>
  );
};

export default ModernProjectProcessSection;
