
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export interface ProjectHeaderProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  imageCaptions?: Record<string, string>;
  imageList?: string[];
  currentIndex?: number;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  description,
  image,
  tags
}) => {
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          {title}
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-3 py-1">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto">
          <img
            src={image}
            alt={title}
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectHeader;
