
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSimplifiedDataManager } from "@/hooks/useSimplifiedDataManager";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import ModernProjectHeader from "./ModernProjectHeader";
import ModernProjectImage from "./ModernProjectImage";
import ModernProjectSections from "./sections/ModernProjectSections";
import ProjectCallToAction from "../ProjectCallToAction";
import ProjectNavigation from "@/components/ProjectNavigation";

interface ModernProjectDetailProps {
  project: ProjectProps;
  details: ProjectDetails;
  projectId: string;
  projectsData: Array<{
    id: string;
    title: string;
    image: string;
  }>;
  imageCaptions?: Record<string, string>;
}

const ModernProjectDetail: React.FC<ModernProjectDetailProps> = ({
  project,
  details,
  projectId,
  projectsData,
  imageCaptions = {}
}) => {
  console.log('🎬 ModernProjectDetail: Rendering with projectId:', projectId);
  console.log('🎬 ModernProjectDetail: Projects data received:', projectsData.length, 'projects');
  
  const { updatedProject, updatedDetails, componentKey } = useSimplifiedDataManager(projectId, project, details);
  const { handleSectionContentSave } = useSimplifiedContentEditor({ 
    projectId: projectId || '' 
  });
  
  // Use manual captions from details, merged with any saved captions from database
  const finalCaptions = {
    ...details.imageCaptions,
    ...imageCaptions
  };

  console.log('🔄 ModernProjectDetail: Component key:', componentKey);
  console.log('🔄 ModernProjectDetail: Updated project data:', {
    title: updatedProject.title,
    description: updatedProject.description.substring(0, 50) + '...'
  });
  console.log('📝 ModernProjectDetail: Using manual captions:', Object.keys(finalCaptions).length, 'captions available');

  return (
    <div key={`project-detail-${componentKey}`} className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      
      {/* Mobile Layout: Image First, Then Header (< 1024px) */}
      <div className="lg:hidden">
        {/* Mobile: Back Button */}
        <div className="px-4 sm:px-6 pt-20 pb-4">
          <Link 
            to="/projects" 
            className="glass-button inline-flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 px-4 py-2 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </div>

        {/* Mobile: Hero Image First */}
        <div className="px-4 sm:px-6 pb-4">
          <ModernProjectImage
            project={updatedProject}
            imageCaptions={finalCaptions}
            projectId={projectId}
          />
        </div>
        
        {/* Mobile: Header Content After Image */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-indigo-50/20" />
          <div className="relative w-full px-4 sm:px-6 z-10">
            <div className="max-w-7xl mx-auto py-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-card-elevated p-4 sm:p-8 text-center space-y-4 lg:space-y-6 layered-depth relative group"
              >
                <div className="flex items-center justify-center space-x-3 text-sm">
                  <span className="font-medium text-blue-600 glass-button px-3 py-1">{updatedDetails.client}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{updatedDetails.duration}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{updatedDetails.role}</span>
                </div>
                
                <EnhancedContentEditor
                  content={updatedProject.title}
                  contentType="header"
                  onSave={(content) => handleSectionContentSave('hero', 'title', content)}
                  projectId={projectId}
                  className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight text-center"
                />
                
                <EnhancedContentEditor
                  content={updatedProject.description}
                  contentType="paragraph"
                  onSave={(content) => handleSectionContentSave('hero', 'content', content)}
                  projectId={projectId}
                  className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto text-center"
                />

                <div className="flex flex-wrap justify-center gap-2">
                  {updatedProject.tags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="secondary" 
                      className="glass-button px-3 py-1 bg-blue-50/80 text-blue-700 hover:bg-blue-100/80 backdrop-blur-sm transition-all duration-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {updatedDetails.projectLink && (
                  <div className="flex justify-center pt-4">
                    <Button 
                      asChild
                      variant="default"
                    >
                      <a
                        href={updatedDetails.projectLink}
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

        {/* Mobile: Project Sections */}
        <div className="w-full px-4 sm:px-6 py-8 space-y-8">
          <ModernProjectSections
            details={updatedDetails}
            projectId={projectId}
            componentKey={componentKey.toString()}
            imageCaptions={finalCaptions}
            project={updatedProject}
          />
          <ProjectCallToAction />
          <section className="mt-8">
            <ProjectNavigation
              currentProjectId={projectId}
              projectsData={projectsData}
            />
          </section>
        </div>
      </div>

      {/* Desktop Layout: Header First, Then Image (>= 1024px) */}
      <div className="hidden lg:block">
        <ModernProjectHeader
          project={updatedProject}
          details={updatedDetails}
          projectId={projectId}
        />

        <div className="w-full px-4 sm:px-6 py-8 lg:py-16 space-y-8 lg:space-y-16">
          <ModernProjectImage
            project={updatedProject}
            imageCaptions={finalCaptions}
            projectId={projectId}
          />
          <ModernProjectSections
            details={updatedDetails}
            projectId={projectId}
            componentKey={componentKey.toString()}
            imageCaptions={finalCaptions}
            project={updatedProject}
          />
          <ProjectCallToAction />
          <section className="mt-8 lg:mt-16">
            <ProjectNavigation
              currentProjectId={projectId}
              projectsData={projectsData}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernProjectDetail;
