
import React from "react";
import { FileText, List, Award } from "lucide-react";
import ProjectSection from "./ProjectSection";
import TechnologiesList from "./TechnologiesList";
import ServicesList from "./ServicesList";
import ProjectLinks from "./ProjectLinks";
import ProjectMultiImageGallery from "./ProjectMultiImageGallery";
import { removeDuplicateImages } from "@/utils/imageUtils";

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
  challengeBottomImage?: string;
  challengeGalleryImages?: string[];
  allImages: string[];
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
  showTechnologies = false,
  videoUrl,
  challengeBottomImage,
  challengeGalleryImages = [],
  allImages
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
      <ProjectSection
        title="The Challenge"
        icon={FileText}
        content={challenge}
        image={challengeImage}
        imageCaption={challengeImage && imageCaptions[challengeImage]}
        bottomImage={challengeBottomImage}
        bottomImageCaption={challengeBottomImage && imageCaptions[challengeBottomImage]}
      />
      
      {/* Challenge Gallery - Carousel Format */}
      {challengeGalleryImages && challengeGalleryImages.length > 0 && (
        <div className="mt-6 mb-8">
          <ProjectMultiImageGallery 
            images={removeDuplicateImages(challengeGalleryImages)}
            captions={imageCaptions}
          />
        </div>
      )}
      
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
      
      {/* Result Section with consistent typography */}
      <div className="mb-12">
        <div className="flex items-center mb-4 space-x-2">
          <Award className="h-5 w-5 text-barsky-blue" />
          <h2 className="text-2xl font-bold">The Result</h2>
        </div>
        <div className="mb-6">
          <div className="prose prose-slate max-w-none dark:prose-invert">
            {result.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        
        {/* Show carousel gallery if resultGalleryImages exists, otherwise show single image */}
        {resultGalleryImages && resultGalleryImages.length > 0 ? (
          <ProjectMultiImageGallery 
            images={removeDuplicateImages(resultGalleryImages)}
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

        {/* Video Section - Show in result section if videoUrl exists */}
        {videoUrl && (
          <div className="mt-8">
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
      </div>
      
      {/* Technologies Section - Only show if showTechnologies is true */}
      {showTechnologies && <TechnologiesList technologies={technologies} />}
      
      {/* Services Section */}
      <ServicesList />
      
      {/* Links Section */}
      <ProjectLinks projectLink={projectLink} />
    </div>
  );
};

export default ProjectOverview;
