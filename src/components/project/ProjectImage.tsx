import React from "react";
import MaximizableImage from "./MaximizableImage";
import { AIEnhancedImage } from "@/components/enhanced/AIEnhancedImage";

interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  projectId?: string;
  size?: "hero" | "standard" | "small";
}

const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  caption,
  className = "",
  priority = false,
  size = "standard",
}) => {
  const sizeClass = size === "hero" 
    ? "case-study-image-hero" 
    : size === "small"
    ? "case-study-image-small"
    : "case-study-image-standard";

  return (
    <div className={`case-study-image-container ${sizeClass} ${className}`}>
      <AIEnhancedImage
        src={src}
        alt={alt}
        priority={priority}
        enableAI={true}
        showEnhancementIndicator={true}
        className="w-full h-full object-cover"
      />
      {caption && (
        <p className="case-study-image-caption">
          {caption}
        </p>
      )}
    </div>
  );
};

export default ProjectImage;
