
import React from "react";
import { motion } from "framer-motion";

import { ExternalLink } from "lucide-react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import AnimatedText from "@/components/AnimatedText";

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
        {/* Header with conditional spacing - more padding on desktop, less on mobile */}
        <div className="max-w-7xl mx-auto pt-8 lg:pt-24 pb-8 lg:pb-16">{/* Reduced mobile top padding since image comes first */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card-elevated p-4 sm:p-8 text-center space-y-4 lg:space-y-6 layered-depth relative group"
          >
            <div className="flex items-center justify-center space-x-3 text-sm">
              <span className="font-medium text-blue-600 glass-button px-3 py-1">{details.client}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{details.duration}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{details.role}</span>
            </div>
            
            <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight text-center">
              <AnimatedText
                text={project.title}
                tag="h1"
                type="character"
                animation="typewriter"
                delay={200}
                staggerChildren={0.03}
              />
            </div>
            
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
                  variant="brand"
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
