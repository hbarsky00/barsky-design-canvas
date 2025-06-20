
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { useProjectDataManager } from "@/hooks/useProjectDataManager";
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

  const handleContentSave = (sectionKey: string, content: string) => {
    console.log(`Saving ${sectionKey} content:`, content);
    // In a real implementation, this would save to your backend or state management
  };

  const handleImageAdd = (sectionKey: string, imageSrc: string) => {
    console.log(`Adding image to ${sectionKey}:`, imageSrc);
    // Implementation for adding images to sections
  };

  const handleImageReplace = (sectionKey: string, index: number, newSrc: string) => {
    console.log(`Replacing image in ${sectionKey} at index ${index}:`, newSrc);
    // Implementation for replacing images in sections
  };

  const handleImageRemove = (sectionKey: string, index: number) => {
    console.log(`Removing image from ${sectionKey} at index ${index}`);
    // Implementation for removing images from sections
  };

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
            onSave={(content) => handleContentSave('challenge_title', content)}
            className="mb-8"
          />
          
          <EnhancedContentEditor
            content={updatedDetails.challenge}
            contentType="section"
            onSave={(content) => handleContentSave('challenge_content', content)}
            images={details.challengeGalleryImages || []}
            onImageAdd={(imageSrc) => handleImageAdd('challenge', imageSrc)}
            onImageReplace={(index, newSrc) => handleImageReplace('challenge', index, newSrc)}
            onImageRemove={(index) => handleImageRemove('challenge', index)}
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
            onSave={(content) => handleContentSave('process_title', content)}
            className="mb-8"
          />
          
          <EnhancedContentEditor
            content={updatedDetails.process}
            contentType="section"
            onSave={(content) => handleContentSave('process_content', content)}
            images={details.processImage ? [details.processImage] : []}
            onImageAdd={(imageSrc) => handleImageAdd('process', imageSrc)}
            onImageReplace={(index, newSrc) => handleImageReplace('process', index, newSrc)}
            onImageRemove={(index) => handleImageRemove('process', index)}
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
            onSave={(content) => handleContentSave('result_title', content)}
            className="mb-8"
          />
          
          <EnhancedContentEditor
            content={updatedDetails.result}
            contentType="section"
            onSave={(content) => handleContentSave('result_content', content)}
            images={details.resultGalleryImages || []}
            onImageAdd={(imageSrc) => handleImageAdd('result', imageSrc)}
            onImageReplace={(index, newSrc) => handleImageReplace('result', index, newSrc)}
            onImageRemove={(index) => handleImageRemove('result', index)}
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
