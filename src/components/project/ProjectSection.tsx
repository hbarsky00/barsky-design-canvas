
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import MaximizableImage from "./MaximizableImage";
import CaseStudySectionHeader from "@/components/case-study/CaseStudySectionHeader";

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
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-12"
    >
      {title && Icon && (
        <CaseStudySectionHeader
          title={title}
          icon={Icon}
          variant="default"
          className="justify-start lg:justify-center mb-4"
        />
      )}
      
      {title && !Icon && (
        <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold md:font-bold text-left lg:text-center mx-auto max-w-5xl [text-wrap:balance] mb-4">{title}</h2>
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
        <MaximizableImage
          src={image}
          alt={imageCaption || title}
          caption={imageCaption}
          className="shadow-elevated w-full glass-card layered-depth floating-element"
          onImageReplace={onImageReplace}
        />
      )}
    </motion.section>
  );
};

export default ProjectSection;
