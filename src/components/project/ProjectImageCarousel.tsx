import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectImageCarouselProps {
  mainImage: string;
  title: string;
  extraImages: string[]; // Now we'll actually use this again
}

// Define a placeholder image to use when images fail to load
const FALLBACK_IMAGE = "/placeholder.svg";

const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({ 
  title,
  extraImages 
}) => {
  return (
    <div className="mb-12">
      {/* We're not displaying the main image as per previous request */}
      {/* But we keep the component structure for potential future use */}
    </div>
  );
};

export default ProjectImageCarousel;
