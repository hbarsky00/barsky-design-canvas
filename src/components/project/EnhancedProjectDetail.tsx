
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import CaseStudyHero from "./enhanced/CaseStudyHero";
import InteractiveImageGallery from "./enhanced/InteractiveImageGallery";
import BeforeAfterComparison from "./enhanced/BeforeAfterComparison";
import ProcessTimeline from "./enhanced/ProcessTimeline";
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

  // Sample key metrics - you can customize these based on project data
  const keyMetrics = [
    { value: "2x", label: "User Engagement" },
    { value: "45%", label: "Task Completion" },
    { value: "95%", label: "User Satisfaction" },
    { value: "30%", label: "Time Saved" }
  ];

  // Sample process steps - customize based on actual project process
  const processSteps = [
    {
      title: "Research & Discovery",
      description: "Conducted user interviews, surveys, and competitive analysis to understand user needs and pain points.",
      image: details.processImage,
      completed: true
    },
    {
      title: "Ideation & Strategy",
      description: "Brainstormed solutions, created user personas, and defined the design strategy and goals.",
      completed: true
    },
    {
      title: "Design & Prototyping",
      description: "Developed wireframes, created high-fidelity designs, and built interactive prototypes for testing.",
      image: details.processBottomImage,
      completed: true
    },
    {
      title: "Testing & Iteration",
      description: "Conducted usability testing, gathered feedback, and iterated on the design based on user insights.",
      completed: true
    }
  ];

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
        
        {/* Challenge & Solution Overview */}
        <section className="case-study-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="process-card"
            >
              <h2 className="text-heading-2 text-navy-primary mb-6">The Challenge</h2>
              <p className="text-body text-neutral-500 leading-relaxed">
                {details.challenge}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="process-card"
            >
              <h2 className="text-heading-2 text-navy-primary mb-6">The Solution</h2>
              <p className="text-body text-neutral-500 leading-relaxed">
                {details.result}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="case-study-section">
          <ProcessTimeline steps={processSteps} />
        </section>

        {/* Image Gallery */}
        {organizedImages.gallery.length > 0 && (
          <section className="case-study-section">
            <InteractiveImageGallery
              images={organizedImages.gallery}
              imageCaptions={imageCaptions}
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
        {organizedImages.technical.length > 0 && (
          <section className="case-study-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="process-card"
            >
              <h2 className="text-heading-2 text-navy-primary mb-6">Technical Implementation</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {details.technologies.map((tech) => (
                  <div key={tech} className="text-center p-3 bg-neutral-100 rounded-lg">
                    <span className="text-sm font-medium text-navy-primary">{tech}</span>
                  </div>
                ))}
              </div>
              <InteractiveImageGallery
                images={organizedImages.technical}
                imageCaptions={imageCaptions}
                columns={2}
              />
            </motion.div>
          </section>
        )}

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
