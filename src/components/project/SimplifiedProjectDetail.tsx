import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { projectDetails } from "@/data/project-details";
import { projectsData } from "@/data/projectsData";
import { useProjectAiCaptions } from "@/hooks/useProjectAiCaptions";
import { useSimplifiedProjectPersistence } from "@/hooks/useSimplifiedProjectPersistence";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import AiCaptionProgress from "./AiCaptionProgress";
import ProjectPublisher from "./ProjectPublisher";
import ProjectDetailLoading from "./ProjectDetailLoading";
import ProjectSidebar from "./ProjectSidebar";
import SimpleProjectHero from "./sections/SimpleProjectHero";
import SimpleContentSection from "./sections/SimpleContentSection";

const SimplifiedProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const showEditingControls = shouldShowEditingControls();

  const project = projectsData.find(p => p.id === projectId);
  const details = projectDetails[projectId as keyof typeof projectDetails];
  
  const { 
    saveTextContent, 
    saveImageReplacement, 
    getTextContent, 
    getImageSrc, 
    refreshTrigger 
  } = useSimplifiedProjectPersistence(projectId!);

  const staticCaptions = {};
  
  const { 
    finalCaptions, 
    isGenerating: isGeneratingCaptions, 
    captionsGenerated 
  } = useProjectAiCaptions(project!, details!, projectId!, staticCaptions);

  useEffect(() => {
    console.log('🔄 SimplifiedProjectDetail: Component refreshed due to data changes');
  }, [refreshTrigger]);

  if (!project || !details) {
    return <ProjectDetailLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Helmet>
        <title>{getTextContent('title', project.title)} - Barsky Design</title>
        <meta name="description" content={getTextContent('description', project.description)} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* AI Caption Progress */}
        {showEditingControls && (
          <div className="mb-6">
            <AiCaptionProgress 
              isGenerating={isGeneratingCaptions}
              generationProgress={null}
              aiCaptionsCount={Object.keys(finalCaptions).length}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <SimpleProjectHero 
              project={project}
              details={details}
              projectId={projectId!}
              getTextContent={getTextContent}
              getImageSrc={getImageSrc}
              saveTextContent={saveTextContent}
              saveImageReplacement={saveImageReplacement}
              finalCaptions={finalCaptions}
            />

            {/* Challenge Section */}
            {details.challenge && (
              <SimpleContentSection
                title="Challenge"
                content={details.challenge}
                images={details.challengeGalleryImages || []}
                sectionKey="challenge"
                projectId={projectId!}
                getTextContent={getTextContent}
                getImageSrc={getImageSrc}
                saveTextContent={saveTextContent}
                saveImageReplacement={saveImageReplacement}
                finalCaptions={finalCaptions}
              />
            )}

            {/* Process Section */}
            {details.process && (
              <SimpleContentSection
                title="Process"
                content={details.process}
                images={details.processGalleryImages || []}
                sectionKey="process"
                projectId={projectId!}
                getTextContent={getTextContent}
                getImageSrc={getImageSrc}
                saveTextContent={saveTextContent}
                saveImageReplacement={saveImageReplacement}
                finalCaptions={finalCaptions}
              />
            )}

            {/* Results Section */}
            {details.result && (
              <SimpleContentSection
                title="Results"
                content={details.result}
                images={details.resultGalleryImages || []}
                sectionKey="results"
                projectId={projectId!}
                getTextContent={getTextContent}
                getImageSrc={getImageSrc}
                saveTextContent={saveTextContent}
                saveImageReplacement={saveImageReplacement}
                finalCaptions={finalCaptions}
              />
            )}

            {/* Publishing Section */}
            {showEditingControls && captionsGenerated && (
              <div className="mt-8">
                <ProjectPublisher 
                  projectId={projectId!}
                  projectTitle={getTextContent('title', project.title)}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProjectSidebar 
              project={project}
              details={details}
              getTextContent={getTextContent}
              saveTextContent={saveTextContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedProjectDetail;
