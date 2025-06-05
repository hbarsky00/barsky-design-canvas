
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
import { getEmbedUrl } from "@/utils/videoUtils";

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

        {/* YouTube Video Section - Only for medication app */}
        {projectId === "medication-app" && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Project Demo Video
              </h2>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={getEmbedUrl("https://youtu.be/iDbqHuz6d2A?si=d7YH6RWXhH7gIoqA")}
                  title="Medication App Demo Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.section>
        )}

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
