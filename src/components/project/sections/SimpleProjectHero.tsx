
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
    <div className="relative hero-no-overflow project-hero-root">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-indigo-50/20" />
      <div className="absolute top-20 right-20 w-64 h-64 glass-accent rounded-full blur-3xl gentle-float opacity-20" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl gentle-float opacity-30" style={{ animationDelay: '2s' }} />
      
      <div className="relative hero-mobile-fullbleed hero-no-overflow z-10">
        <div className="md:max-w-7xl md:mx-auto md:px-8 pt-20 pb-8 lg:pt-24 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card-elevated p-6 sm:p-8 lg:p-10 flex flex-col items-center text-center layered-depth mb-10 lg:mb-16"
          >
            <div className="hero-text-stack">
              <div className="flex items-center justify-center flex-wrap gap-2 text-sm">
                <span className="font-medium text-blue-600 glass-button px-3 py-1.5 rounded-full">{details.client}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{details.duration}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{details.role}</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                {project.title}
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 hero-subtitle">
                {project.description}
              </p>

              <div className="hero-tags flex flex-wrap justify-center gap-2 mt-4">
                {project.tags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant="secondary" 
                    className="glass-button px-3 py-1.5 bg-blue-50/80 text-blue-700 hover:bg-blue-100/80 backdrop-blur-sm transition-all duration-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {details.projectLink && (
                <div className="hero-cta-wrapper max-w-md mx-auto mt-6">
                  <Button asChild variant="default">
                    <a href={details.projectLink} target="_blank" rel="noopener noreferrer">
                      View Live Project
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-image-fullwidth md:max-w-3xl md:mx-auto md:px-6 lg:px-8 md:pb-8"
        >
          <div className="hero-image">
            <MaximizableImage
              src={project.image}
              alt={project.title}
              caption={imageCaptions[project.image] || project.title}
              className="w-full h-auto block rounded-2xl shadow-md glass-card layered-depth md:rounded-xl md:shadow-elevated-lg"
              imageList={[project.image]}
              currentIndex={0}
              projectId={projectId}
              priority={true}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SimpleProjectHero;
