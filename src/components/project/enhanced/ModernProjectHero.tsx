
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { Badge } from "@/components/ui/badge";
import MaximizableImage from "../MaximizableImage";

interface ModernProjectHeroProps {
  project: ProjectProps;
  details: ProjectDetails;
  imageCaptions: Record<string, string>;
}

const ModernProjectHero: React.FC<ModernProjectHeroProps> = ({
  project,
  details,
  imageCaptions
}) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            to="/projects" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Project Header - Single Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          {/* Project Meta */}
          <div className="flex items-center justify-center space-x-3 text-sm">
            <span className="font-medium text-blue-600">{details.client}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{details.duration}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{details.role}</span>
          </div>
          
          {/* Project Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {project.title}
          </h1>
          
          {/* Project Description */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {project.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary" 
                className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Project Links */}
          {details.projectLink && (
            <div className="flex justify-center pt-4">
              <a
                href={details.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                View Live Project
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          )}
        </motion.div>

        {/* Hero Image - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12"
        >
          <MaximizableImage
            src={project.image}
            alt={project.title}
            caption={imageCaptions[project.image] || project.title}
            imageList={[project.image]}
            currentIndex={0}
            priority={true}
            className="rounded-xl shadow-2xl w-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ModernProjectHero;
