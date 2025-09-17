
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";
import { ExternalLink } from "lucide-react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SimpleProjectHeroProps {
  project: ProjectProps;
  details: ProjectDetails;
  imageCaptions: Record<string, string>;
  projectId?: string;
}

const SimpleProjectHero: React.FC<SimpleProjectHeroProps> = ({
  project,
  details,
  imageCaptions,
  projectId
}) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-indigo-50/20" />
      <div className="absolute top-20 right-20 w-64 h-64 glass-accent rounded-full blur-3xl gentle-float opacity-20" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl gentle-float opacity-30" style={{ animationDelay: '2s' }} />
      
      <div className="relative w-full px-4 sm:px-6 z-10">
        {/* Header with proper spacing from logo */}
        <div className="max-w-7xl mx-auto pt-24 pb-8 lg:pt-28 lg:pb-16">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card-elevated p-4 sm:p-8 text-center space-y-4 lg:space-y-6 layered-depth mb-10 lg:mb-16"
          >
            <div className="flex items-center justify-center space-x-3 text-sm">
              <span className="font-medium text-blue-600 glass-button px-3 py-1 rounded-full">{details.client}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{details.duration}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{details.role}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              {project.description}
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {project.tags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary" 
                  className="glass-button px-3 py-1 bg-blue-50/80 text-blue-700 hover:bg-blue-100/80 backdrop-blur-sm transition-all duration-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {details.projectLink && (
              <div className="flex justify-center pt-4">
                <Button 
                  asChild
                  variant="default"
                >
                  <a
                    href={details.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="floating-element max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8"
          >
            <MaximizableImage
              src={project.image}
              alt={project.title}
              caption={imageCaptions[project.image] || project.title}
              className="rounded-xl shadow-elevated-lg w-full glass-card layered-depth"
              imageList={[project.image]}
              currentIndex={0}
              projectId={projectId}
              priority={true}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProjectHero;
