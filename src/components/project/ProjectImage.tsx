
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
}

const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  caption,
  className = "",
  priority = false,
}) => {
  return (
    <div className={`shadow-elevated w-full glass-card layered-depth ${className}`}>
      <AIEnhancedImage
        src={src}
        alt={alt}
        priority={priority}
        enableAI={true}
        showEnhancementIndicator={true}
        className="w-full h-full object-contain"
      />
      {caption && (
        <div className="p-3 text-sm text-muted-foreground text-center border-t border-border">
          {caption}
        </div>
      )}
    </div>
  );
};

export default ProjectImage;
