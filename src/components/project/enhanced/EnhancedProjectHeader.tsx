
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";

interface EnhancedProjectHeaderProps {
  project: ProjectProps;
  details: ProjectDetails;
  imageCaptions: Record<string, string>;
}

const EnhancedProjectHeader: React.FC<EnhancedProjectHeaderProps> = ({
  project,
  details,
  imageCaptions
}) => {
  const { handleSectionContentSave } = useSimplifiedContentEditor({ 
    projectId: project.id || '' 
  });

  console.log('🎬 EnhancedProjectHeader: Rendering with proper spacing');

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
      
      <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-8 lg:pt-24 lg:pb-16">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            to="/projects" 
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Main Header Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-blue-400">{details.client}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-400">{details.duration}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                {project.title}
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary" 
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Project Links */}
            {details.projectLink && (
              <div className="flex items-center space-x-4">
                <Button 
                  asChild
                  variant="default"
                  className="[&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
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

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={project.image}
                  alt={imageCaptions[project.image] || project.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Elements for Visual Interest */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProjectHeader;
