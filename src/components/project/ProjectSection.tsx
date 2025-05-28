
import React from "react";
import { LucideIcon } from "lucide-react";
import MaximizableImage from "./MaximizableImage";

interface ProjectSectionProps {
  title: string;
  icon: LucideIcon;
  content: string;
  image?: string;
  imageCaption?: string;
  bottomImage?: string;
  bottomImageCaption?: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  title,
  icon: Icon,
  content,
  image,
  imageCaption,
  bottomImage,
  bottomImageCaption,
}) => {
  // Add safety check for content
  const safeContent = content || "";
  
  return (
    <div className="mb-12">
      <div className="flex items-center mb-4 space-x-2">
        <Icon className="h-5 w-5 text-barsky-blue" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      
      {image && (
        <div className="mb-6">
          <MaximizableImage
            src={image}
            alt={title}
            caption={imageCaption}
          />
        </div>
      )}
      
      <div className="prose prose-slate max-w-none dark:prose-invert">
        {safeContent.split('\n').map((paragraph, index) => (
          paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
        ))}
      </div>

      {bottomImage && (
        <div className="mt-6">
          <MaximizableImage
            src={bottomImage}
            alt={title}
            caption={bottomImageCaption}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
