
import React from "react";

interface ProjectImageCarouselProps {
  mainImage: string;
  title: string;
  extraImages: string[]; // Keeping this for backward compatibility
}

const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({ title }) => {
  return (
    <div className="mb-12">
      {/* Main image has been removed as requested */}
    </div>
  );
};

export default ProjectImageCarousel;
