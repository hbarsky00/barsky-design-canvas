
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedDataManager } from "@/hooks/useSimplifiedDataManager";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import ModernProjectHeader from "./ModernProjectHeader";
import ModernProjectImage from "./ModernProjectImage";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import ProjectCallToAction from "../ProjectCallToAction";
import ProjectNavigation from "@/components/ProjectNavigation";

interface ModernProjectDetailProps {
  project: ProjectProps;
  details: ProjectDetails;
  projectId: string;
  projectsData: Array<{
    id: string;
    title: string;
    image: string;
  }>;
  imageCaptions?: Record<string, string>;
}

const ModernProjectDetail: React.FC<ModernProjectDetailProps> = ({
  project,
  details,
  projectId,
  projectsData,
  imageCaptions = {}
}) => {
  console.log('🎬 ModernProjectDetail: Rendering with projectId:', projectId);
  console.log('🎬 ModernProjectDetail: Projects data received:', projectsData.length, 'projects');
  
  const { updatedProject, updatedDetails, componentKey } = useSimplifiedDataManager(projectId, project, details);
  const { handleSectionContentSave, handleSectionImageUpdate } = useSimplifiedContentEditor({ projectId });
  
  // Use manual captions from details, merged with any saved captions from database
  const finalCaptions = {
    ...details.imageCaptions,
    ...imageCaptions
  };

  console.log('🔄 ModernProjectDetail: Component key:', componentKey);
  console.log('🔄 ModernProjectDetail: Updated project data:', {
    title: updatedProject.title,
    description: updatedProject.description.substring(0, 50) + '...'
  });
  console.log('📝 ModernProjectDetail: Using manual captions:', Object.keys(finalCaptions).length, 'captions available');

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
    <div key={`project-detail-${componentKey}`} className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      
      {/* Header Section - At the very top */}
      <ModernProjectHeader
        project={updatedProject}
        details={updatedDetails}
        projectId={projectId}
      />

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 py-8 lg:py-16 space-y-8 lg:space-y-16 max-w-6xl mx-auto">
        
        {/* Challenge Section - First content section */}
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
            content={updatedDetails.challenge}
            contentType="section"
            onSave={(content) => handleSectionContentSave('challenge', 'content', content)}
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
            imageCaptions={finalCaptions}
          />
        </motion.section>

        {/* Hero Image Section - After challenge */}
        <ModernProjectImage
          project={updatedProject}
          imageCaptions={finalCaptions}
          projectId={projectId}
        />

        {/* Process Section */}
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
            content={updatedDetails.process}
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
            imageCaptions={finalCaptions}
          />
        </motion.section>

        {/* Result Section */}
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
            content={updatedDetails.result}
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
            imageCaptions={finalCaptions}
          />
        </motion.section>

        {/* Call to Action */}
        <ProjectCallToAction />

        {/* Project Navigation */}
        <section className="mt-8 lg:mt-16">
          <ProjectNavigation
            currentProjectId={projectId}
            projectsData={projectsData}
          />
        </section>
      </div>
    </div>
  );
};

export default ModernProjectDetail;
