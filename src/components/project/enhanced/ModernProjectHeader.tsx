
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { Badge } from "@/components/ui/badge";
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

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-slate-800/10 to-slate-700/20" />
      <div className="absolute top-20 right-20 w-64 h-64 glass-accent rounded-full blur-3xl gentle-float opacity-20" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-700/5 rounded-full blur-3xl gentle-float opacity-30" style={{ animationDelay: '2s' }} />
      
      <div className="relative w-full px-4 sm:px-6 pt-20 pb-8 lg:pt-24 lg:pb-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 lg:mb-8"
        >
          <Link 
            to="/projects" 
            className="glass-button inline-flex items-center text-white hover:text-slate-300 transition-all duration-300 px-4 py-2 rounded-lg backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card-elevated p-4 sm:p-8 text-center space-y-4 lg:space-y-6 layered-depth relative group max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-center space-x-3 text-sm">
            <span className="font-medium text-slate-300 glass-button px-3 py-1 rounded-full">{details.client}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-200">{details.duration}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-200">{details.role}</span>
          </div>
          
          <EnhancedContentEditor
            content={project.title}
            contentType="header"
            onSave={(content) => handleSectionContentSave('hero', 'title', content)}
            projectId={projectId}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight text-center"
          />
          
          <EnhancedContentEditor
            content={project.description}
            contentType="paragraph"
            onSave={(content) => handleSectionContentSave('hero', 'content', content)}
            projectId={projectId}
            className="text-lg lg:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto text-center"
          />

          <div className="flex flex-wrap justify-center gap-2">
            {project.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary" 
                className="glass-button px-3 py-1 bg-slate-700/20 text-slate-200 hover:bg-slate-600/30 backdrop-blur-sm transition-all duration-300"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {details.projectLink && (
            <div className="flex justify-center pt-4">
              <a
                href={details.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-accent inline-flex items-center px-6 py-3 border border-slate-600/30 text-slate-200 font-medium rounded-lg transition-all duration-300 hover:bg-slate-700/30 hover:scale-105 shadow-elevated backdrop-blur-md"
              >
                View Live Project
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ModernProjectHeader;
