
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import ModernProjectHero from "./ModernProjectHero";
import ProjectNavigation from "@/components/ProjectNavigation";
import { getEmbedUrl } from "@/utils/videoUtils";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";
import { removeDuplicateImages } from "@/utils/imageUtils";

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
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            The Challenge
          </h2>
          <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
            {details.challenge.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Challenge Images */}
          {details.challengeGalleryImages && details.challengeGalleryImages.length > 0 && (
            <div className="mt-8">
              <ProjectMultiImageGallery 
                images={removeDuplicateImages(details.challengeGalleryImages)}
                captions={imageCaptions}
              />
            </div>
          )}
        </motion.section>

        {/* What I Did Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card-elevated p-8 space-y-8 layered-depth floating-element"
        >
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            What I Did
          </h2>
          <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
            {details.process.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Process Image */}
          {details.processImage && (
            <div className="mt-8">
              <div className="glass-card p-4 layered-depth floating-element">
                <img
                  src={details.processImage}
                  alt={imageCaptions[details.processImage] || "Design process"}
                  className="w-full h-auto object-cover rounded-lg shadow-elevated"
                />
              </div>
              {imageCaptions[details.processImage] && (
                <p className="text-sm text-gray-500 text-center mt-3">
                  {imageCaptions[details.processImage]}
                </p>
              )}
            </div>
          )}
        </motion.section>

        {/* The Result Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card-elevated p-8 space-y-8 layered-depth floating-element"
        >
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            The Result
          </h2>
          <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
            {details.result.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Result Images */}
          {details.resultGalleryImages && details.resultGalleryImages.length > 0 && (
            <div className="mt-8">
              <ProjectMultiImageGallery 
                images={removeDuplicateImages(details.resultGalleryImages)}
                captions={imageCaptions}
              />
            </div>
          )}
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
