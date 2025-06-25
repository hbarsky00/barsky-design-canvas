
import React from "react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";

interface SimpleProjectHeroProps {
  project: ProjectProps;
  details: ProjectDetails;
  projectId: string;
  getTextContent?: (key: string, fallback?: string) => string;
  getImageSrc?: (originalSrc: string) => string;
  saveTextContent?: (key: string, content: string) => Promise<void>;
  saveImageReplacement?: (originalSrc: string, newSrc: string) => Promise<void>;
  finalCaptions?: Record<string, string>;
  imageCaptions?: Record<string, string>;
}

const SimpleProjectHero: React.FC<SimpleProjectHeroProps> = ({
  project,
  details,
  projectId,
  getTextContent,
  getImageSrc,
  saveTextContent,
  saveImageReplacement,
  finalCaptions,
  imageCaptions
}) => {
  const captions = finalCaptions || imageCaptions || {};
  const getImageSource = getImageSrc || ((src: string) => src);
  const getTextValue = getTextContent || ((key: string, fallback?: string) => fallback || '');

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {getTextValue('title', project.title)}
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        {getTextValue('description', project.description)}
      </p>
      
      <div className="mb-8">
        <img
          src={getImageSource(project.image)}
          alt={captions[project.image] || project.title}
          className="w-full h-auto rounded-lg shadow-md"
        />
        {captions[project.image] && (
          <p className="text-sm text-gray-600 mt-2 italic">
            {captions[project.image]}
          </p>
        )}
      </div>
    </div>
  );
};

export default SimpleProjectHero;
