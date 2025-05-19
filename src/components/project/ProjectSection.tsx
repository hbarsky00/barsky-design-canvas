
import React from "react";
import { LucideIcon } from "lucide-react";
import ProjectImage from "./ProjectImage";

interface ProjectSectionProps {
  title: string;
  icon: LucideIcon;
  content: string;
  image?: string;
  imageCaption?: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  title,
  icon: Icon,
  content,
  image,
  imageCaption,
}) => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-4 space-x-2">
        <Icon className="h-5 w-5 text-barsky-blue" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      
      {image && (
        <ProjectImage 
          image={image}
          alt={title}
          caption={imageCaption}
        />
      )}
      
      <div className="prose prose-slate max-w-none dark:prose-invert">
        {content.split('\n').map((paragraph, index) => (
          paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
