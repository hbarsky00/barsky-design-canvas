
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import ProcessImageGallery from "./components/ProcessImageGallery";

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
  const {
    handleSectionContentSave,
    handleSectionImageUpdate
  } = useSimplifiedContentEditor({
    projectId
  });

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

  // Check if this is the splittime or herbalink project
  const isSpittimeProject = projectId === 'splittime';
  const isHerbalinkProject = projectId === 'herbalink';
  const isInvestorProject = projectId === 'investor-loan-app';

  const handleImageRemove = (imageIndex: number) => {
    console.log('🗑️ Removing process image at index:', imageIndex);
    const imageToRemove = processImages[imageIndex];
    if (imageToRemove) {
      console.log('🗑️ Removing image:', imageToRemove);
      handleSectionImageUpdate('process', imageToRemove, '');
    }
  };

  const handleImageReplace = (originalSrc: string, newSrc: string) => {
    handleSectionImageUpdate('process', originalSrc, newSrc);
  };

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
        className="mb-8"
        projectId={projectId}
      />

      <ProcessImageGallery
        processImages={processImages}
        projectId={projectId}
        imageCaptions={imageCaptions}
        isSpittimeProject={isSpittimeProject}
        isHerbalinkProject={isHerbalinkProject}
        onImageReplace={handleImageReplace}
        onImageRemove={handleImageRemove}
      />

      {/* Show Key UX Enhancements after first image for investor project */}
      {isInvestorProject && processImages.length > 0 && (
        <div className="mt-8 p-6 bg-blue-50/50 rounded-lg border border-blue-100">
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            <h3 className="text-xl font-semibold text-gray-900 mb-4"><strong>Key UX Enhancements</strong></h3>
            <p className="text-sm text-gray-700 mb-4">
              The user experience improvements focused on five critical areas that transformed how banking professionals interact with the platform. I reduced cognitive load by creating a simplified interface that focuses on essential information, allowing users to process complex financial data without overwhelming visual clutter. Error prevention became a cornerstone of the design through built-in validation and confirmation dialogs that catch mistakes before they impact compliance or financial accuracy. Throughout the application, contextual help provides tooltips and guidance, ensuring users never feel lost in complex workflows.
            </p>
            <p className="text-sm text-gray-700 mb-4 last:mb-0">
              The platform's responsive design optimization ensures seamless functionality across both desktop and tablet environments, accommodating the varied work styles of modern banking professionals. Most importantly, the entire system maintains WCAG 2.1 AA compliance standards, ensuring accessibility for all users regardless of their abilities or assistive technology needs. These enhancements collectively created an interface that not only meets strict banking requirements but actually makes daily tasks more intuitive and efficient for end users.
            </p>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default ModernProjectProcessSection;
