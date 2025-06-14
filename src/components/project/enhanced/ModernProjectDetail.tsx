
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import ModernProjectHero from "./ModernProjectHero";
import ModernProjectVideoSection from "./ModernProjectVideoSection";
import ModernProjectContentSection from "./ModernProjectContentSection";
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
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen relative"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-white/50 to-purple-50/10" />
      
      {/* Hero Section */}
      <ModernProjectHero
        project={project}
        details={details}
        imageCaptions={imageCaptions}
      />

      {/* Main Content - Single Column Layout with Glass Effects */}
      <div className="relative max-w-4xl mx-auto px-6 py-16 space-y-16 z-10">
        
        {/* YouTube Video Section */}
        <ModernProjectVideoSection projectId={projectId} />

        {/* The Challenge Section */}
        <ModernProjectContentSection
          title="The Challenge"
          content={details.challenge}
          sectionKey="challenge"
          imageConfig={details.imageConfig}
          imageCaptions={imageCaptions}
        />

        {/* What I Did Section */}
        <ModernProjectContentSection
          title="What I Did"
          content={details.process}
          sectionKey="process"
          imageConfig={details.imageConfig}
          imageCaptions={imageCaptions}
        />

        {/* The Result Section */}
        <ModernProjectContentSection
          title="The Result"
          content={details.result}
          sectionKey="result"
          imageConfig={details.imageConfig}
          imageCaptions={imageCaptions}
        />

        {/* Project Navigation */}
        <div className="glass-card p-6 layered-depth">
          <ProjectNavigation
            currentProjectId={projectId}
            projectsData={projectsData}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ModernProjectDetail;
