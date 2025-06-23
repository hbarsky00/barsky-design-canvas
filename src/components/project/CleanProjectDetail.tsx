
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
  const { generateProjectCaptions, isGenerating, generationProgress } = useOpenAiCaptions();
  
  console.log('🎬 CleanProjectDetail: Rendering simplified project detail for:', project.title);

  // Generate AI captions for projects that have useAiCaptions enabled
  useEffect(() => {
    if (details.useAiCaptions) {
      const allImages = [
        project.image,
        ...(details.imageConfig?.challenge?.beforeHeader ? [details.imageConfig.challenge.beforeHeader] : []),
        ...(details.imageConfig?.challenge?.afterHeader ? [details.imageConfig.challenge.afterHeader] : []),
        ...(details.imageConfig?.process?.beforeHeader ? [details.imageConfig.process.beforeHeader] : []),
        ...(details.imageConfig?.process?.afterHeader ? [details.imageConfig.process.afterHeader] : []),
        ...(details.imageConfig?.result?.beforeHeader ? [details.imageConfig.result.beforeHeader] : []),
        ...(details.imageConfig?.result?.afterHeader ? [details.imageConfig.result.afterHeader] : []),
        ...(details.challengeGalleryImages || []),
        ...(details.resultGalleryImages || []),
        ...(details.servicesGalleryImages || []),
        ...(details.processGalleryImages || []),
        ...(details.galleryImages || [])
      ].filter(Boolean);

      const uniqueImages = [...new Set(allImages)];
      
      console.log(`🤖 Generating OpenAI captions for ${projectId} images:`, uniqueImages.length);
      
      generateProjectCaptions(uniqueImages, projectId)
        .then(captions => {
          setAiCaptions(captions);
          console.log(`✅ AI captions generated for ${projectId}:`, Object.keys(captions).length, 'captions');
        })
        .catch(error => {
          console.error('❌ Failed to generate AI captions:', error);
        });
    }
  }, [projectId, details.useAiCaptions, generateProjectCaptions]);

  // Merge manual captions with AI captions (AI captions take priority for projects with useAiCaptions enabled)
  const finalCaptions = details.useAiCaptions 
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
        
        {/* AI Caption Generation Progress */}
        {details.useAiCaptions && isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center"
          >
            <div className="flex items-center justify-center space-x-3 text-blue-700">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="font-medium">🤖 Generating AI-powered image captions...</span>
            </div>
            {generationProgress && (
              <div className="mt-3">
                <div className="text-sm text-blue-600">
                  Processing image {generationProgress.current} of {generationProgress.total}
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(generationProgress.current / generationProgress.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Success indicator when AI captions are ready */}
        {details.useAiCaptions && !isGenerating && Object.keys(aiCaptions).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 text-center text-green-700"
          >
            ✅ AI captions generated for {Object.keys(aiCaptions).length} images
          </motion.div>
        )}
        
        {/* Challenge Section */}
        <SimpleContentSection
          title="The Challenge"
          content={details.challenge}
          additionalText={details.challengeAdditionalText}
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
