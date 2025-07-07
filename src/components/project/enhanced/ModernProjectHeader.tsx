
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Users, Clock, User, TrendingUp } from "lucide-react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";

interface ModernProjectHeaderProps {
  project: ProjectProps;
  details: ProjectDetails;
  projectId?: string;
}

const ModernProjectHeader: React.FC<ModernProjectHeaderProps> = ({
  project,
  details,
  projectId
}) => {
  const { handleSectionContentSave } = useSimplifiedContentEditor({ 
    projectId: projectId || '' 
  });

  console.log('🎬 ModernProjectHeader: Rendering with proper spacing');

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-indigo-50/20" />
      <div className="absolute top-20 right-20 w-64 h-64 glass-accent blur-3xl gentle-float opacity-20" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 blur-3xl gentle-float opacity-30" style={{ animationDelay: '2s' }} />
      
      <div className="relative w-full px-4 sm:px-6 z-10">
        {/* Header with proper spacing from logo */}
        <div className="max-w-7xl mx-auto pt-20 pb-8 lg:pt-24 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 lg:mb-16"
          >
            <Link 
              to="/projects" 
              className="glass-button inline-flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 px-4 py-2 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card-elevated p-4 sm:p-8 text-center space-y-4 lg:space-y-6 layered-depth relative group"
          >
            {/* Project Overview Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl bg-white border border-neutral-200 shadow-lg mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20"></div>
              <div className="relative p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center relative">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-blue-vibrant" />
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-600 uppercase tracking-wide mb-2">Client</h3>
                    <p className="text-lg font-bold text-neutral-900">{details.client}</p>
                  </div>
                  
                  <div className="text-center relative">
                    <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 w-px h-16 bg-neutral-200"></div>
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-600 uppercase tracking-wide mb-2">Duration</h3>
                    <p className="text-lg font-bold text-neutral-900">{details.duration}</p>
                  </div>
                  
                  <div className="text-center relative">
                    <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 w-px h-16 bg-neutral-200"></div>
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
                      <User className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-600 uppercase tracking-wide mb-2">Role</h3>
                    <p className="text-lg font-bold text-neutral-900">{details.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <EnhancedContentEditor
              content={project.title}
              contentType="header"
              onSave={(content) => handleSectionContentSave('hero', 'title', content)}
              projectId={projectId}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight text-center"
            />
            
            <EnhancedContentEditor
              content={project.description}
              contentType="paragraph"
              onSave={(content) => handleSectionContentSave('hero', 'content', content)}
              projectId={projectId}
              className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto text-center"
            />

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
        </div>
      </div>
    </div>
  );
};

export default ModernProjectHeader;
