
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import CaseStudyHero from "./enhanced/CaseStudyHero";
import InteractiveImageGallery from "./enhanced/InteractiveImageGallery";
import BeforeAfterComparison from "./enhanced/BeforeAfterComparison";
import ProcessTimeline from "./enhanced/ProcessTimeline";
import ProjectNavigation from "@/components/ProjectNavigation";
import ChallengeSolutionSection from "./enhanced/ChallengeSolutionSection";
import TechnicalImplementationSection from "./enhanced/TechnicalImplementationSection";
import { organizeProjectImages } from "./enhanced/ImageOrganizer";
import { generateProcessSteps } from "./enhanced/ProcessStepsGenerator";
import { generateKeyMetrics } from "./enhanced/KeyMetricsGenerator";

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
  const organizedImages = organizeProjectImages({ project, details });

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
        title={project.title}
        description={project.description}
        heroImage={project.image}
        tags={project.tags}
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

        {/* Image Gallery */}
        {organizedImages.gallery.length > 0 && (
          <section className="case-study-section">
            <InteractiveImageGallery
              images={organizedImages.gallery}
              captions={imageCaptions}
              title="Project Gallery"
              columns={3}
            />
          </section>
        )}

        {/* Before/After Comparison (if applicable) */}
        {details.challengeImage && details.resultImage && (
          <section className="case-study-section">
            <BeforeAfterComparison
              beforeImage={details.challengeImage}
              afterImage={details.resultImage}
              title="Design Evolution"
              description="See how the design evolved from initial concept to final solution"
            />
          </section>
        )}

        {/* Technical Implementation */}
        <TechnicalImplementationSection
          technologies={details.technologies}
          technicalImages={organizedImages.technical}
          imageCaptions={imageCaptions}
        />

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
