
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import ModernProjectHero from "./ModernProjectHero";
import ProjectNavigation from "@/components/ProjectNavigation";
import { getEmbedUrl } from "@/utils/videoUtils";
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
          {/* First Image - Before Header */}
          {details.challengeImage && (
            <div className="glass-card p-4 layered-depth floating-element">
              <MaximizableImage
                src={details.challengeImage}
                alt={imageCaptions[details.challengeImage] || "Challenge overview"}
                caption={imageCaptions[details.challengeImage]}
                className="rounded-lg shadow-elevated w-full"
              />
            </div>
          )}

          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            The Challenge
          </h2>

          {/* Second Image - After Header */}
          {details.challengeGalleryImages && details.challengeGalleryImages[0] && (
            <div className="glass-card p-4 layered-depth floating-element">
              <MaximizableImage
                src={details.challengeGalleryImages[0]}
                alt={imageCaptions[details.challengeGalleryImages[0]] || "Challenge details"}
                caption={imageCaptions[details.challengeGalleryImages[0]]}
                className="rounded-lg shadow-elevated w-full"
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
          {/* First Image - Before Header */}
          {details.processImage && (
            <div className="glass-card p-4 layered-depth floating-element">
              <MaximizableImage
                src={details.processImage}
                alt={imageCaptions[details.processImage] || "Design process"}
                caption={imageCaptions[details.processImage]}
                className="rounded-lg shadow-elevated w-full"
              />
            </div>
          )}

          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            What I Did
          </h2>

          {/* Second Image - After Header */}
          {details.processBottomImage && (
            <div className="glass-card p-4 layered-depth floating-element">
              <MaximizableImage
                src={details.processBottomImage}
                alt={imageCaptions[details.processBottomImage] || "Process details"}
                caption={imageCaptions[details.processBottomImage]}
                className="rounded-lg shadow-elevated w-full"
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
          {/* First Image - Before Header */}
          {details.resultImage && (
            <div className="glass-card p-4 layered-depth floating-element">
              <MaximizableImage
                src={details.resultImage}
                alt={imageCaptions[details.resultImage] || "Final result"}
                caption={imageCaptions[details.resultImage]}
                className="rounded-lg shadow-elevated w-full"
              />
            </div>
          )}

          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            The Result
          </h2>

          {/* Second Image - After Header */}
          {details.resultGalleryImages && details.resultGalleryImages[0] && (
            <div className="glass-card p-4 layered-depth floating-element">
              <MaximizableImage
                src={details.resultGalleryImages[0]}
                alt={imageCaptions[details.resultGalleryImages[0]] || "Result showcase"}
                caption={imageCaptions[details.resultGalleryImages[0]]}
                className="rounded-lg shadow-elevated w-full"
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
