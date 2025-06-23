
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedDataManager } from "@/hooks/useSimplifiedDataManager";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import { useProjectAiCaptions } from "@/hooks/useProjectAiCaptions";
import ModernProjectHero from "./ModernProjectHero";
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
  
  const { updatedProject, updatedDetails, componentKey } = useSimplifiedDataManager(projectId, project, details);
  const { handleSectionContentSave, handleSectionImageUpdate } = useSimplifiedContentEditor({ projectId });
  
  // Use AI captions if enabled for this project
  const { finalCaptions, isGenerating } = useProjectAiCaptions(
    updatedProject,
    updatedDetails,
    projectId,
    imageCaptions
  );

  console.log('🔄 ModernProjectDetail: Component key:', componentKey);
  console.log('🔄 ModernProjectDetail: Updated project data:', {
    title: updatedProject.title,
    description: updatedProject.description.substring(0, 50) + '...'
  });
  console.log('🤖 ModernProjectDetail: Using AI captions:', Object.keys(finalCaptions).length, 'captions available');

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

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating AI captions for images...</p>
        </div>
      </div>
    );
  }

  return (
    <div key={`project-detail-${componentKey}`} className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <ModernProjectHero
        project={updatedProject}
        details={updatedDetails}
        imageCaptions={finalCaptions}
        projectId={projectId}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Challenge Section */}
        <motion.section
          key={`challenge-${componentKey}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card-elevated p-8 layered-depth"
        >
          <EnhancedContentEditor
            content="The Challenge"
            contentType="header"
            onSave={(content) => handleSectionContentSave('challenge', 'title', content)}
            className="mb-8"
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

        {/* Process Section */}
        <motion.section
          key={`process-${componentKey}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card-elevated p-8 layered-depth"
        >
          <EnhancedContentEditor
            content="What I Did"
            contentType="header"
            onSave={(content) => handleSectionContentSave('process', 'title', content)}
            className="mb-8"
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
          className="glass-card-elevated p-8 layered-depth"
        >
          <EnhancedContentEditor
            content="The Result"
            contentType="header"
            onSave={(content) => handleSectionContentSave('result', 'title', content)}
            className="mb-8"
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
        <section className="mt-16">
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
