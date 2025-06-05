
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import ModernProjectHero from "./ModernProjectHero";
import ModernProjectOverview from "./ModernProjectOverview";
import ModernProjectChallenge from "./ModernProjectChallenge";
import ModernProjectProcess from "./ModernProjectProcess";
import ModernProjectResults from "./ModernProjectResults";
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
      className="min-h-screen bg-white"
    >
      {/* Hero Section */}
      <ModernProjectHero
        project={project}
        details={details}
        imageCaptions={imageCaptions}
      />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        
        {/* Project Overview */}
        <ModernProjectOverview
          details={details}
          tags={project.tags}
        />

        {/* Challenge Section */}
        <ModernProjectChallenge
          challenge={details.challenge}
          challengeGalleryImages={details.challengeGalleryImages}
          imageCaptions={imageCaptions}
        />

        {/* Process Section */}
        <ModernProjectProcess
          process={details.process}
          processImage={details.processImage}
          imageCaptions={imageCaptions}
        />

        {/* Results Section */}
        <ModernProjectResults
          result={details.result}
          resultGalleryImages={details.resultGalleryImages}
          imageCaptions={imageCaptions}
        />

        {/* Project Navigation */}
        <ProjectNavigation
          currentProjectId={projectId}
          projectsData={projectsData}
        />
      </div>
    </motion.div>
  );
};

export default ModernProjectDetail;
