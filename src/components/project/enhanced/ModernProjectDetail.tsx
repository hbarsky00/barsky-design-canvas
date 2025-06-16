
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import ModernProjectHero from "./ModernProjectHero";
import ProjectHeroImageSection from "./ProjectHeroImageSection";
import ModernProjectContentSection from "./ModernProjectContentSection";
import ProjectNavigation from "@/components/ProjectNavigation";
import AddSectionButton from "@/components/dev/AddSectionButton";
import DevModeStatus from '@/components/dev/DevModeStatus';
import DevModeSyncButton from '@/components/dev/DevModeSyncButton';
import DevModeToggle from '@/components/dev/DevModeToggle';
import { useProjectPersistence } from "@/hooks/useProjectPersistence";

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
  console.log('ModernProjectDetail: projectId received:', projectId, typeof projectId);
  
  const { getProjectData } = useProjectPersistence(projectId);

  // Listen for project data updates to force re-render - PREVENT NAVIGATION
  const [updateTrigger, setUpdateTrigger] = React.useState(0);
  
  React.useEffect(() => {
    const handleProjectDataUpdate = (e: CustomEvent) => {
      console.log('ModernProjectDetail: Project data updated, forcing re-render');
      
      // Explicitly prevent any navigation or page refresh
      if (e.detail?.stayOnPage) {
        console.log('🔒 ModernProjectDetail: Staying on current page as requested');
        e.preventDefault?.();
        e.stopPropagation?.();
      }
      
      setUpdateTrigger(prev => prev + 1);
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    };
  }, []);

  // Get saved image replacements (now includes published overrides automatically)
  const savedData = React.useMemo(() => getProjectData(), [getProjectData, updateTrigger]);

  // Apply text content overrides
  const getTextContent = React.useCallback((key: string, fallback: string) => {
    return savedData.textContent[key] || fallback;
  }, [savedData.textContent]);

  // Apply image replacements
  const getReplacedImageSrc = React.useCallback((originalSrc: string) => {
    return savedData.imageReplacements[originalSrc] || originalSrc;
  }, [savedData.imageReplacements]);

  // Create updated project with published changes
  const updatedProject = React.useMemo(() => ({
    ...project,
    title: getTextContent(`hero_title_${projectId}`, project.title),
    description: getTextContent(`hero_description_${projectId}`, project.description),
    image: getReplacedImageSrc(project.image)
  }), [project, projectId, getTextContent, getReplacedImageSrc]);

  // Create updated details with published changes
  const updatedDetails = React.useMemo(() => ({
    ...details,
    challenge: getTextContent(`challenge_title_${projectId}`, 
      getTextContent(`challenge_content_${projectId}`, details.challenge)),
    process: getTextContent(`process_title_${projectId}`, 
      getTextContent(`process_content_${projectId}`, details.process)),
    result: getTextContent(`result_title_${projectId}`, 
      getTextContent(`result_content_${projectId}`, details.result))
  }), [details, projectId, getTextContent]);
  
  // Convert ProjectImageConfig to the expected format for ModernProjectContentSection
  const convertImageConfig = (imageConfig?: any): Record<string, string[]> => {
    if (!imageConfig) return {};
    
    const converted: Record<string, string[]> = {};
    
    // Convert each section's beforeHeader and afterHeader to arrays with image replacements applied
    Object.entries(imageConfig).forEach(([sectionKey, sectionConfig]: [string, any]) => {
      if (sectionConfig) {
        const images: string[] = [];
        if (sectionConfig.beforeHeader) images.push(getReplacedImageSrc(sectionConfig.beforeHeader));
        if (sectionConfig.afterHeader) images.push(getReplacedImageSrc(sectionConfig.afterHeader));
        if (images.length > 0) {
          converted[sectionKey] = images;
        }
      }
    });
    
    return converted;
  };

  const convertedImageConfig = convertImageConfig(details.imageConfig);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen relative"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-white/50 to-purple-50/10" />
      
      {/* Dev Mode Components */}
      <DevModeStatus />
      <DevModeSyncButton />
      <DevModeToggle />
      
      {/* Hero Section */}
      <ModernProjectHero
        project={updatedProject}
        details={updatedDetails}
        imageCaptions={imageCaptions}
      />

      {/* Main Content - Single Column Layout with Glass Effects */}
      <div className="relative max-w-4xl mx-auto px-6 py-16 space-y-16 z-10">
        
        {/* Hero Image Section */}
        <ProjectHeroImageSection 
          projectId={projectId} 
          imageCaptions={imageCaptions}
        />

        {/* Add section button after hero */}
        <AddSectionButton projectId={projectId} insertAfter="hero" />

        {/* The Challenge Section */}
        <ModernProjectContentSection
          title="The Challenge"
          content={updatedDetails.challenge}
          sectionKey="challenge"
          imageConfig={convertedImageConfig}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        {/* Add section button after challenge */}
        <AddSectionButton projectId={projectId} insertAfter="challenge" />

        {/* What I Did Section */}
        <ModernProjectContentSection
          title="What I Did"
          content={updatedDetails.process}
          sectionKey="process"
          imageConfig={convertedImageConfig}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        {/* Add section button after process */}
        <AddSectionButton projectId={projectId} insertAfter="process" />

        {/* The Result Section */}
        <ModernProjectContentSection
          title="The Result"
          content={updatedDetails.result}
          sectionKey="result"
          imageConfig={convertedImageConfig}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        {/* Add section button after result */}
        <AddSectionButton projectId={projectId} insertAfter="result" />

        {/* Project Navigation */}
        <div className="glass-card p-6 layered-depth">
          <ProjectNavigation
            currentProjectId={projectId}
            projectsData={projectsData}
          />
        </div>

        {/* Final add section button */}
        <AddSectionButton projectId={projectId} />
      </div>
    </motion.div>
  );
};

export default ModernProjectDetail;
