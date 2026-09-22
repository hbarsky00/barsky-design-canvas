
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import CaseStudyHero from "./enhanced/CaseStudyHero";
import ProcessTimeline from "./enhanced/ProcessTimeline";
import ProjectNavigation from "@/components/ProjectNavigation";
import ProjectCallToAction from "./ProjectCallToAction";
import ChallengeSolutionSection from "./enhanced/ChallengeSolutionSection";
import TechnicalImplementationSection from "./enhanced/TechnicalImplementationSection";
import { organizeProjectImages } from "./enhanced/ImageOrganizer";
import { generateProcessSteps } from "./enhanced/ProcessStepsGenerator";
import { generateKeyMetrics } from "./enhanced/KeyMetricsGenerator";
import { useProjectPersistence } from "@/hooks/useProjectPersistence";

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
  const { getProjectData } = useProjectPersistence(projectId);
  
  // Get published image replacements
  const getReplacedImageSrc = React.useCallback((originalSrc: string) => {
    const savedData = getProjectData();
    return savedData.imageReplacements[originalSrc] || originalSrc;
  }, [getProjectData]);

  // Apply image replacements to project data
  const updatedProject = React.useMemo(() => ({
    ...project,
    image: getReplacedImageSrc(project.image)
  }), [project, getReplacedImageSrc]);
  
  // Organize images by category for better structure with replacements applied
  const organizedImages = organizeProjectImages({ 
    project: updatedProject, 
    details: {
      ...details,
      challengeImage: details.challengeImage ? getReplacedImageSrc(details.challengeImage) : undefined,
      processImage: details.processImage ? getReplacedImageSrc(details.processImage) : undefined,
      resultImage: details.resultImage ? getReplacedImageSrc(details.resultImage) : undefined,
      challengeGalleryImages: details.challengeGalleryImages?.map(getReplacedImageSrc),
      resultGalleryImages: details.resultGalleryImages?.map(getReplacedImageSrc),
      galleryImages: details.galleryImages?.map(getReplacedImageSrc)
    }
  });

  // Generate key metrics and process steps
  const keyMetrics = generateKeyMetrics();
  const processSteps = generateProcessSteps({ details });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-neutral-50"
    >
      {/* Enhanced Hero Section */}
      <CaseStudyHero
        title={updatedProject.title}
        description={updatedProject.description}
        heroImage={updatedProject.image}
        tags={updatedProject.tags}
        duration={details.duration}
        role={details.role}
        client={details.client}
        keyMetrics={keyMetrics}
      />

      {/* Main Content Sections */}
      <div className="case-study-container space-y-16 py-16">
        
        {/* Challenge & Solution Overview with Images */}
        <ChallengeSolutionSection
          challenge={details.challenge}
          result={details.result}
          projectId={projectId}
        />

        {/* Process Timeline */}
        <section className="case-study-section">
          <ProcessTimeline steps={processSteps} />
        </section>

        {/* Technical Implementation */}
        <TechnicalImplementationSection
          technologies={details.technologies}
          technicalImages={organizedImages.technical}
          imageCaptions={imageCaptions}
        />

        {/* Call to Action Section */}
        <ProjectCallToAction />

        {/* Project Navigation */}
        <section className="case-study-section">
          <ProjectNavigation
            currentProjectId={projectId}
            projectsData={projectsData}
          />
        </section>
      </div>
    </motion.div>
  );
};

export default EnhancedProjectDetail;
