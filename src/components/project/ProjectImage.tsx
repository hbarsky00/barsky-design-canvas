
import React from "react";
import MaximizableImage from "./MaximizableImage";

interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  projectId?: string;
}

const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  caption,
  className = "",
  priority = false,
}) => {
  return (
    <div className={`glass-card p-4 layered-depth ${className}`}>
      <MaximizableImage
        src={src}
        alt={alt}
        caption={caption}
        priority={priority}
        className="rounded-lg shadow-elevated w-full"
      />
    </div>
  );
};

export default ProjectImage;
