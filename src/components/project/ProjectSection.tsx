
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import MaximizableImage from "./MaximizableImage";

interface ProjectSectionProps {
  title: string;
  icon?: LucideIcon;
  content: string;
  image?: string;
  imageCaption?: string;
  onImageReplace?: (newSrc: string) => void;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ 
  title, 
  icon: Icon, 
  content, 
  image, 
  imageCaption,
  onImageReplace 
}) => {
  // Handle image replacement with proper event handling
  const handleImageReplace = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onImageReplace) return;
    
    // Create object URL for immediate display
    const newSrc = URL.createObjectURL(file);
    onImageReplace(newSrc);
    event.target.value = '';
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-12"
    >
      {title && (
        <div className="flex items-center mb-4 space-x-2">
          {Icon && <Icon className="h-5 w-5 text-barsky-blue" />}
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      )}
      
      {content && (
        <div className="prose prose-slate max-w-none dark:prose-invert mb-6">
          {content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      )}
      
      {image && (
        <div className="glass-card p-4 layered-depth floating-element">
          <MaximizableImage
            src={image}
            alt={imageCaption || title}
            caption={imageCaption}
            className="rounded-lg shadow-elevated w-full"
            onImageReplace={handleImageReplace}
          />
        </div>
      )}
    </motion.section>
  );
};

export default ProjectSection;
