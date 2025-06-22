
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import SimpleProjectHero from "./sections/SimpleProjectHero";
import SimpleContentSection from "./sections/SimpleContentSection";
import ProjectCallToAction from "./ProjectCallToAction";
import ProjectNavigation from "@/components/ProjectNavigation";
import { useOpenAiCaptions } from "@/hooks/useOpenAiCaptions";

interface CleanProjectDetailProps {
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

const CleanProjectDetail: React.FC<CleanProjectDetailProps> = ({
  project,
  details,
  projectId,
  projectsData,
  imageCaptions = {}
}) => {
  const [aiCaptions, setAiCaptions] = useState<Record<string, string>>({});
  const { generateProjectCaptions, isGenerating } = useOpenAiCaptions();
  
  console.log('🎬 CleanProjectDetail: Rendering simplified project detail for:', project.title);

  // Generate AI captions for medication app
  useEffect(() => {
    if (projectId === 'medication-app' && details.useAiCaptions) {
      const allImages = [
        ...(details.challengeGalleryImages || []),
        ...(details.resultGalleryImages || []),
        ...(details.servicesGalleryImages || []),
        project.image
      ].filter(Boolean);

      const uniqueImages = [...new Set(allImages)];
      
      console.log('🤖 Generating OpenAI captions for medication app images:', uniqueImages.length);
      
      generateProjectCaptions(uniqueImages, projectId)
        .then(captions => {
          setAiCaptions(captions);
          console.log('✅ AI captions generated for medication app');
        })
        .catch(error => {
          console.error('❌ Failed to generate AI captions:', error);
        });
    }
  }, [projectId, details.useAiCaptions, generateProjectCaptions]);

  // Merge manual captions with AI captions (AI captions take priority for medication app)
  const finalCaptions = projectId === 'medication-app' && details.useAiCaptions 
    ? { ...imageCaptions, ...aiCaptions }
    : imageCaptions;

  // Extract process images for proper display order, removing duplicates
  const processBeforeHeaderImage = details.imageConfig?.process?.beforeHeader;
  const processRegularImage = details.processImage;
  
  // Create process images array with correct order, removing duplicates
  const processImages = React.useMemo(() => {
    const images: string[] = [];
    const seenImages = new Set<string>();
    
    // Add images in order, checking for duplicates
    if (processBeforeHeaderImage && !seenImages.has(processBeforeHeaderImage)) {
      images.push(processBeforeHeaderImage);
      seenImages.add(processBeforeHeaderImage);
    }
    
    if (processRegularImage && !seenImages.has(processRegularImage)) {
      images.push(processRegularImage);
      seenImages.add(processRegularImage);
    }
    
    // Add servicesGalleryImages to the process section, avoiding duplicates
    if (details.servicesGalleryImages) {
      details.servicesGalleryImages.forEach(imageSrc => {
        if (!seenImages.has(imageSrc)) {
          images.push(imageSrc);
          seenImages.add(imageSrc);
        }
      });
    }
    
    return images;
  }, [processBeforeHeaderImage, processRegularImage, details.servicesGalleryImages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <SimpleProjectHero
        project={project}
        details={details}
        imageCaptions={finalCaptions}
        projectId={projectId}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* AI Caption Loading Indicator */}
        {projectId === 'medication-app' && isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center text-blue-700"
          >
            🤖 Generating AI-powered image captions...
          </motion.div>
        )}
        
        {/* Challenge Section */}
        <SimpleContentSection
          title="The Challenge"
          content={details.challenge}
          images={details.challengeGalleryImages || []}
          imageCaptions={finalCaptions}
          projectId={projectId}
        />

        {/* Process Section */}
        <SimpleContentSection
          title="What I Did"
          content={details.process}
          images={processImages}
          imageCaptions={finalCaptions}
          projectId={projectId}
        />

        {/* Result Section */}
        <SimpleContentSection
          title="The Result"
          content={details.result}
          images={details.resultGalleryImages || []}
          imageCaptions={finalCaptions}
          projectId={projectId}
        />

        {/* Call to Action */}
        <ProjectCallToAction />

        {/* Project Navigation */}
        <section className="mt-16">
          <ProjectNavigation
            currentProjectId={projectId}
            projectsData={projectsData}
          />
        </section>
      </div>
    </div>
  );
};

export default CleanProjectDetail;
