
import React from "react";
import { FileText, List, Award } from "lucide-react";
import ProjectSection from "./ProjectSection";
import TechnologiesList from "./TechnologiesList";
import ServicesList from "./ServicesList";
import ProjectLinks from "./ProjectLinks";
import ProjectContactSection from "./ProjectContactSection";
import ProjectGallery from "./ProjectGallery";
import ProjectMultiImageGallery from "./ProjectMultiImageGallery";

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
  resultGalleryImages?: string[];
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
  resultGalleryImages,
  imageCaptions = {},
  galleryImages = [],
  showTechnologies = false,
  videoUrl
}) => {
  // Convert YouTube URLs to embeddable format
  const getEmbedUrl = (url: string) => {
    // Handle YouTube Shorts
    const shortsMatch = url.match(/shorts\/([^?]+)/);
    if (shortsMatch) {
      return `https://www.youtube.com/embed/${shortsMatch[1]}`;
    }
    
    // Handle regular YouTube URLs
    const regularMatch = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^?&]+)/);
    if (regularMatch) {
      return `https://www.youtube.com/embed/${regularMatch[1]}`;
    }
    
    return url;
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
            <h2 className="text-2xl font-bold">Workflow Video</h2>
          </div>
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src={getEmbedUrl(videoUrl)}
              title="Workflow Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
      
      {/* Result Section with Gallery or Single Image */}
      <div className="mb-12">
        <div className="flex items-center mb-4 space-x-2">
          <Award className="h-5 w-5 text-barsky-blue" />
          <h2 className="text-2xl font-bold">The Result</h2>
        </div>
        <div className="mb-6">
          <p className="text-lg leading-relaxed text-gray-700">{result}</p>
        </div>
        
        {/* Show gallery if resultGalleryImages exists, otherwise show single image */}
        {resultGalleryImages && resultGalleryImages.length > 0 ? (
          <ProjectMultiImageGallery 
            images={resultGalleryImages}
            captions={imageCaptions}
          />
        ) : resultImage ? (
          <ProjectSection
            title=""
            icon={Award}
            content=""
            image={resultImage}
            imageCaption={resultImage && imageCaptions[resultImage]}
          />
        ) : null}
      </div>
      
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
