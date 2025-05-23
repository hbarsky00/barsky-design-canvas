
import React from "react";
import { FileText, List, Award } from "lucide-react";
import ProjectSection from "./ProjectSection";
import TechnologiesList from "./TechnologiesList";
import ServicesList from "./ServicesList";
import ProjectLinks from "./ProjectLinks";
import ProjectContactSection from "./ProjectContactSection";
import ProjectGallery from "./ProjectGallery";

interface ProjectOverviewProps {
  challenge: string;
  process: string;
  result: string;
  technologies: string[];
  projectLink?: string;
  caseStudyLink?: string;
  challengeImage?: string;
  processImage?: string;
  processBottomImage?: string;
  resultImage?: string;
  imageCaptions?: Record<string, string>;
  galleryImages?: string[];
  showTechnologies?: boolean;
  videoUrl?: string;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ 
  challenge, 
  process, 
  result,
  technologies,
  projectLink,
  challengeImage,
  processImage,
  processBottomImage,
  resultImage,
  imageCaptions = {},
  galleryImages = [],
  showTechnologies = false,
  videoUrl
}) => {
  // Convert YouTube Shorts URL to embeddable format
  const getEmbedUrl = (url: string) => {
    const videoId = url.match(/shorts\/([^?]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div>
      {/* Gallery Images Section */}
      <div className="mb-8">
        {galleryImages && galleryImages.length > 0 ? (
          <ProjectGallery 
            galleryImages={galleryImages}
            captions={imageCaptions}
          />
        ) : null}
        
        <ProjectSection
          title="The Challenge"
          icon={FileText}
          content={challenge}
          image={challengeImage}
          imageCaption={challengeImage && imageCaptions[challengeImage]}
        />
      </div>
      
      {/* Process Section */}
      <ProjectSection
        title="What I Did"
        icon={List}
        content={process}
        image={processImage}
        imageCaption={processImage && imageCaptions[processImage]}
        bottomImage={processBottomImage}
        bottomImageCaption={processBottomImage && imageCaptions[processBottomImage]}
      />
      
      {/* Video Section - Only show for projects with videoUrl */}
      {videoUrl && (
        <div className="mb-12">
          <div className="flex items-center mb-4 space-x-2">
            <Award className="h-5 w-5 text-barsky-blue" />
            <h2 className="text-2xl font-bold">Demo Video</h2>
          </div>
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src={getEmbedUrl(videoUrl)}
              title="Project Demo Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
      
      {/* Result Section */}
      <ProjectSection
        title="The Result"
        icon={Award}
        content={result}
        image={resultImage}
        imageCaption={resultImage && imageCaptions[resultImage]}
      />
      
      {/* Technologies Section - Only show if showTechnologies is true */}
      {showTechnologies && <TechnologiesList technologies={technologies} />}
      
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
