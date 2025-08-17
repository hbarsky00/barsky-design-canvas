
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
    <MaximizableImage
      src={src}
      alt={alt}
      caption={caption}
      priority={priority}
      fit="contain"
      className={`shadow-elevated w-full glass-card layered-depth image-clarity-enhanced ${className}`}
    />
  );
};

export default ProjectImage;
