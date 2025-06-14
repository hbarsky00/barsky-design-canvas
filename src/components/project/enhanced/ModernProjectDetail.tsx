
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import ModernProjectHero from "./ModernProjectHero";
import ProjectNavigation from "@/components/ProjectNavigation";
import { getEmbedUrl } from "@/utils/videoUtils";
import { removeDuplicateImages } from "@/utils/imageUtils";
import MaximizableImage from "../MaximizableImage";

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
  // Helper function to get images for each section
  const getChallengeImages = () => {
    const beforeHeader = details.challengeGalleryImages?.[0] || details.challengeImage;
    const afterHeader = details.challengeBottomImage || details.challengeGalleryImages?.[1] || details.challengeImage;
    return { beforeHeader, afterHeader };
  };

  const getProcessImages = () => {
    const beforeHeader = details.processImage;
    const afterHeader = details.processBottomImage;
    return { beforeHeader, afterHeader };
  };

  const getResultImages = () => {
    const beforeHeader = details.resultGalleryImages?.[0] || details.resultImage;
    const afterHeader = details.resultGalleryImages?.[1] || details.resultImage;
    return { beforeHeader, afterHeader };
  };

  const challengeImages = getChallengeImages();
  const processImages = getProcessImages();
  const resultImages = getResultImages();

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
        
        {/* YouTube Video Section - Only for medication app */}
        {projectId === "medication-app" && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="glass-card-elevated p-8 layered-depth">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Project Demo Video
              </h2>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-elevated-lg glass-card p-2">
                <iframe
                  src={getEmbedUrl("https://youtu.be/iDbqHuz6d2A?si=d7YH6RWXhH7gIoqA")}
                  title="Medication App Demo Video"
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* The Challenge Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card-elevated p-8 space-y-8 layered-depth floating-element"
        >
          {/* Image Before Header */}
          {challengeImages.beforeHeader && (
            <div className="glass-card p-4 layered-depth floating-element">
              <MaximizableImage
                src={challengeImages.beforeHeader}
                alt="Challenge overview"
                caption={imageCaptions[challengeImages.beforeHeader]}
                className="w-full"
              />
            </div>
          )}

          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            The Challenge
          </h2>

          {/* Image After Header */}
          {challengeImages.afterHeader && challengeImages.afterHeader !== challengeImages.beforeHeader && (
            <div className="glass-card p-4 layered-depth floating-element">
              <MaximizableImage
                src={challengeImages.afterHeader}
                alt="Challenge details"
                caption={imageCaptions[challengeImages.afterHeader]}
                className="w-full"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
            {details.challenge.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.section>

        {/* What I Did Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card-elevated p-8 space-y-8 layered-depth floating-element"
        >
          {/* Image Before Header */}
          {processImages.beforeHeader && (
            <div className="glass-card p-4 layered-depth floating-element">
              <MaximizableImage
                src={processImages.beforeHeader}
                alt="Process overview"
                caption={imageCaptions[processImages.beforeHeader]}
                className="w-full"
              />
            </div>
          )}

          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            What I Did
          </h2>

          {/* Image After Header */}
          {processImages.afterHeader && processImages.afterHeader !== processImages.beforeHeader && (
            <div className="glass-card p-4 layered-depth floating-element">
              <MaximizableImage
                src={processImages.afterHeader}
                alt="Process details"
                caption={imageCaptions[processImages.afterHeader]}
                className="w-full"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
            {details.process.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.section>

        {/* The Result Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card-elevated p-8 space-y-8 layered-depth floating-element"
        >
          {/* Image Before Header */}
          {resultImages.beforeHeader && (
            <div className="glass-card p-4 layered-depth floating-element">
              <MaximizableImage
                src={resultImages.beforeHeader}
                alt="Result overview"
                caption={imageCaptions[resultImages.beforeHeader]}
                className="w-full"
              />
            </div>
          )}

          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            The Result
          </h2>

          {/* Image After Header */}
          {resultImages.afterHeader && resultImages.afterHeader !== resultImages.beforeHeader && (
            <div className="glass-card p-4 layered-depth floating-element">
              <MaximizableImage
                src={resultImages.afterHeader}
                alt="Result details"
                caption={imageCaptions[resultImages.afterHeader]}
                className="w-full"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
            {details.result.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.section>

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
