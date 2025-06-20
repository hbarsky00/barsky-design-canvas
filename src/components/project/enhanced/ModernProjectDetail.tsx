
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { useProjectDataManager } from "@/hooks/useProjectDataManager";
import { useContentEditor } from "@/hooks/useContentEditor";
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
  const { updatedProject, updatedDetails } = useProjectDataManager(projectId, project, details);
  const { handleSectionContentSave, handleSectionImageUpdate } = useContentEditor({ projectId });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <ModernProjectHero
        project={updatedProject}
        details={updatedDetails}
        imageCaptions={imageCaptions}
        projectId={projectId}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Challenge Section */}
        <motion.section
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
            onImageAdd={(imageSrc) => console.log('Adding image to challenge:', imageSrc)}
            onImageReplace={(index, newSrc) => {
              const originalSrc = details.challengeGalleryImages?.[index];
              if (originalSrc) {
                handleSectionImageUpdate('challenge', originalSrc, newSrc);
              }
            }}
            onImageRemove={(index) => console.log('Removing image from challenge:', index)}
            maxImages={3}
            projectId={projectId}
            imageCaptions={imageCaptions}
          />
        </motion.section>

        {/* Process Section */}
        <motion.section
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
            images={details.processImage ? [details.processImage] : []}
            onImageAdd={(imageSrc) => console.log('Adding image to process:', imageSrc)}
            onImageReplace={(index, newSrc) => {
              const originalSrc = details.processImage;
              if (originalSrc && index === 0) {
                handleSectionImageUpdate('process', originalSrc, newSrc);
              }
            }}
            onImageRemove={(index) => console.log('Removing image from process:', index)}
            maxImages={2}
            projectId={projectId}
            imageCaptions={imageCaptions}
          />
        </motion.section>

        {/* Result Section */}
        <motion.section
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
            onImageAdd={(imageSrc) => console.log('Adding image to result:', imageSrc)}
            onImageReplace={(index, newSrc) => {
              const originalSrc = details.resultGalleryImages?.[index];
              if (originalSrc) {
                handleSectionImageUpdate('result', originalSrc, newSrc);
              }
            }}
            onImageRemove={(index) => console.log('Removing image from result:', index)}
            maxImages={4}
            projectId={projectId}
            imageCaptions={imageCaptions}
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
