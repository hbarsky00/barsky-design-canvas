
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import EnhancedProjectHeader from "./enhanced/EnhancedProjectHeader";
import ProjectImageGallery from "./enhanced/ProjectImageGallery";
import ProjectProcessSection from "./enhanced/ProjectProcessSection";
import ProjectTechnicalSection from "./enhanced/ProjectTechnicalSection";
import ProjectNavigation from "@/components/ProjectNavigation";

interface EnhancedProjectDetailProps {
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

const EnhancedProjectDetail: React.FC<EnhancedProjectDetailProps> = ({
  project,
  details,
  projectId,
  projectsData,
  imageCaptions = {}
}) => {
  
  // Organize images by category for better structure
  const organizedImages = {
    hero: project.image,
    gallery: [
      ...(details.challengeGalleryImages || []),
      ...(details.resultGalleryImages || []),
      ...(details.galleryImages || []),
      ...(details.extraImages || [])
    ].filter(Boolean),
    process: [
      ...(details.processImage ? [details.processImage] : []),
      ...(details.processBottomImage ? [details.processBottomImage] : []),
      ...(details.challengeImage ? [details.challengeImage] : []),
      ...(details.challengeBottomImage ? [details.challengeBottomImage] : [])
    ].filter(Boolean),
    technical: [
      ...(details.servicesGalleryImages || [])
    ].filter(Boolean)
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Enhanced Hero Section */}
      <EnhancedProjectHeader
        project={project}
        details={details}
        imageCaptions={imageCaptions}
      />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Project Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">The Challenge</h3>
                <p className="text-gray-600 mb-6">{details.challenge}</p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-4">The Solution</h3>
                <p className="text-gray-600 mb-6">{details.result}</p>
              </div>
            </motion.div>
          </div>
          
          {/* Project Metadata Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg p-6 shadow-sm sticky top-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Duration</span>
                  <p className="text-gray-900">{details.duration}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Client</span>
                  <p className="text-gray-900">{details.client}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Role</span>
                  <p className="text-gray-900">{details.role}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Technologies</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {details.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Image Gallery Section */}
        {organizedImages.gallery.length > 0 && (
          <ProjectImageGallery
            images={organizedImages.gallery}
            imageCaptions={imageCaptions}
            title="Project Gallery"
          />
        )}

        {/* Process Documentation */}
        {organizedImages.process.length > 0 && (
          <ProjectProcessSection
            images={organizedImages.process}
            processDescription={details.process}
            imageCaptions={imageCaptions}
          />
        )}

        {/* Technical Implementation */}
        {organizedImages.technical.length > 0 && (
          <ProjectTechnicalSection
            images={organizedImages.technical}
            imageCaptions={imageCaptions}
            projectLink={details.projectLink}
          />
        )}

        {/* Project Navigation */}
        <div className="mt-16">
          <ProjectNavigation
            currentProjectId={projectId}
            projectsData={projectsData}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedProjectDetail;
