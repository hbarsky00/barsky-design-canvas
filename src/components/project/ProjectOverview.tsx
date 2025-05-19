
import React from "react";
import { FileText, List, Award } from "lucide-react";
import ProjectSection from "./ProjectSection";
import TechnologiesList from "./TechnologiesList";
import ServicesList from "./ServicesList";
import ProjectLinks from "./ProjectLinks";
import ProjectContactSection from "./ProjectContactSection";
import FigmaEmbed from "./FigmaEmbed";

interface ProjectOverviewProps {
  challenge: string;
  process: string;
  result: string;
  technologies: string[];
  projectLink?: string;
  caseStudyLink?: string;
  challengeImage?: string;
  processImage?: string;
  resultImage?: string;
  imageCaptions?: Record<string, string>;
  figmaSlideEmbed?: string;
  galleryImages?: string[];
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ 
  challenge, 
  process, 
  result,
  technologies,
  projectLink,
  challengeImage,
  processImage,
  resultImage,
  imageCaptions = {},
  figmaSlideEmbed,
  galleryImages = []
}) => {
  return (
    <div>
      {/* Challenge Section */}
      <div className="mb-8">
        {figmaSlideEmbed || galleryImages.length > 0 ? (
          <FigmaEmbed 
            embedUrl={figmaSlideEmbed || ""} 
            galleryImages={galleryImages}
            captions={imageCaptions}
          />
        ) : null}
        
        <ProjectSection
          title="The Challenge"
          icon={FileText}
          content={challenge}
          image={figmaSlideEmbed || galleryImages.length > 0 ? undefined : challengeImage}
          imageCaption={figmaSlideEmbed || galleryImages.length > 0 ? undefined : (challengeImage && imageCaptions[challengeImage])}
        />
      </div>
      
      {/* Process Section */}
      <ProjectSection
        title="What I Did"
        icon={List}
        content={process}
        image={processImage}
        imageCaption={processImage && imageCaptions[processImage]}
      />
      
      {/* Result Section */}
      <ProjectSection
        title="The Result"
        icon={Award}
        content={result}
        image={resultImage}
        imageCaption={resultImage && imageCaptions[resultImage]}
      />
      
      {/* Technologies Section */}
      <TechnologiesList technologies={technologies} />
      
      {/* Services Section */}
      <ServicesList />
      
      {/* Links Section */}
      <ProjectLinks projectLink={projectLink} />
      
      {/* Contact Section */}
      <ProjectContactSection />
    </div>
  );
};

export default ProjectOverview;
