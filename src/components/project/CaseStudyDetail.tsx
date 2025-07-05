import React from "react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import MaximizableImage from "./MaximizableImage";
import CaseStudyChallengeSection from "./sections/CaseStudyChallengeSection";
import CaseStudyWhatIDidSection from "./sections/CaseStudyWhatIDidSection";
import CaseStudyResultsSection from "./sections/CaseStudyResultsSection";
import { getProjectStyling, getImageGradients, getProjectImages } from "@/utils/caseStudyStyling";

interface CaseStudyDetailProps {
  project: ProjectProps;
  details: ProjectDetails;
  projectId: string;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({
  project,
  details,
  projectId,
}) => {
  console.log('🎯 CaseStudyDetail: Rendering for project:', projectId);

  // Use imported utility functions
  const styling = getProjectStyling(projectId);
  const gradients = getImageGradients(projectId);
  const images = getProjectImages(projectId, details);
  
  console.log('🎨 CaseStudyDetail: Tagline should be:', styling.tagline);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section */}
      <div 
        className="hero-header relative py-16 lg:py-24 flex flex-col items-center justify-center text-white text-center"
        style={{ background: styling.gradient }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 max-w-6xl px-4 w-full">
          {/* Title and Tagline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">{project.title}</h1>
          <p 
            className="text-xl md:text-2xl mb-8 font-medium" 
            style={{ 
              color: '#ffffff !important',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {styling.tagline}
          </p>
          
          {/* Hero Image */}
          <div className="mb-8">
            <MaximizableImage
              src={images.hero}
              alt={project.title}
              caption={details.imageCaptions?.[images.hero]}
              className="w-full max-w-4xl mx-auto h-64 md:h-80 object-cover rounded-xl shadow-2xl"
              projectId={projectId}
            />
          </div>
          
          {/* Project Meta */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-white drop-shadow-sm">
            <div className="font-medium"><strong>Role:</strong> {styling.role}</div>
            <div className="font-medium"><strong>Duration:</strong> {styling.duration}</div>
            <div className="font-medium"><strong>Platform:</strong> {styling.platform}</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Anchor Links */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex justify-center md:justify-start h-14">
            <a 
              href="#challenge" 
              className="h-14 px-6 border-b-2 border-transparent hover:border-blue-500 flex items-center text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              Challenge
            </a>
            <a 
              href="#what-i-did" 
              className="h-14 px-6 border-b-2 border-transparent hover:border-blue-500 flex items-center text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              What I Did
            </a>
            <a 
              href="#results" 
              className="h-14 px-6 border-b-2 border-transparent hover:border-blue-500 flex items-center text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              Results
            </a>
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        <CaseStudyChallengeSection
          details={details}
          projectId={projectId}
          images={images}
          gradients={gradients}
        />
        
        <CaseStudyWhatIDidSection
          details={details}
          projectId={projectId}
          images={images}
          gradients={gradients}
        />
        
        <CaseStudyResultsSection
          details={details}
          projectId={projectId}
          images={images}
          gradients={gradients}
        />
      </div>
    </div>
  );
};

export default CaseStudyDetail;