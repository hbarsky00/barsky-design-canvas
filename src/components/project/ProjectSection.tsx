
import React from "react";
import { LucideIcon } from "lucide-react";
import ProjectImage from "./ProjectImage";
import { motion } from "framer-motion";

interface ProjectSectionProps {
  title: string;
  icon: LucideIcon;
  content: string;
  image?: string;
  imageCaption?: string;
  onImageClick?: (image: string, title: string) => void;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  title,
  icon: Icon,
  content,
  image,
  imageCaption,
  onImageClick
}) => {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {image && (
        <ProjectImage 
          image={image}
          alt={`${title} illustration`}
          caption={imageCaption}
          onImageClick={onImageClick}
        />
      )}
      <h2 className="text-2xl font-semibold text-barsky-dark mb-4 flex items-center">
        <Icon className="h-6 w-6 mr-2 text-barsky-blue" />
        {title}
      </h2>
      <p className="text-barsky-text mb-6 leading-relaxed">
        {content}
      </p>
    </motion.div>
  );
};

export default ProjectSection;
