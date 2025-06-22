
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import SimpleProjectHero from "./sections/SimpleProjectHero";
import SimpleContentSection from "./sections/SimpleContentSection";
import ProjectCallToAction from "./ProjectCallToAction";
import ProjectNavigation from "@/components/ProjectNavigation";

interface CleanProjectDetailProps {
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

const CleanProjectDetail: React.FC<CleanProjectDetailProps> = ({
  project,
  details,
  projectId,
  projectsData,
  imageCaptions = {}
}) => {
  console.log('🎬 CleanProjectDetail: Rendering simplified project detail for:', project.title);

  // Extract process images for proper display order
  const processBeforeHeaderImage = details.imageConfig?.process?.beforeHeader;
  const processRegularImage = details.processImage;
  
  // Create process images array with correct order, removing duplicates
  const processImages = React.useMemo(() => {
    const images: string[] = [];
    const seenImages = new Set<string>();
    
    // Add images in order, checking for duplicates
    if (processBeforeHeaderImage && !seenImages.has(processBeforeHeaderImage)) {
      images.push(processBeforeHeaderImage);
      seenImages.add(processBeforeHeaderImage);
    }
    
    if (processRegularImage && !seenImages.has(processRegularImage)) {
      images.push(processRegularImage);
      seenImages.add(processRegularImage);
    }
    
    // Add servicesGalleryImages to the process section, avoiding duplicates
    if (details.servicesGalleryImages) {
      details.servicesGalleryImages.forEach(imageSrc => {
        if (!seenImages.has(imageSrc)) {
          images.push(imageSrc);
          seenImages.add(imageSrc);
        }
      });
    }
    
    return images;
  }, [processBeforeHeaderImage, processRegularImage, details.servicesGalleryImages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <SimpleProjectHero
        project={project}
        details={details}
        imageCaptions={imageCaptions}
        projectId={projectId}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Challenge Section */}
        <SimpleContentSection
          title="The Challenge"
          content={details.challenge}
          images={details.challengeGalleryImages || []}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        {/* Process Section */}
        <SimpleContentSection
          title="What I Did"
          content={details.process}
          images={processImages}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        {/* Result Section */}
        <SimpleContentSection
          title="The Result"
          content={details.result}
          images={details.resultGalleryImages || []}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

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

export default CleanProjectDetail;
