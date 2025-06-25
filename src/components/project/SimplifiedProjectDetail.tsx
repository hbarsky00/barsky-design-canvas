
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { projectDetails } from "@/data/project-details";
import { projectsData } from "@/data/projects/projectsList";
import { useProjectAiCaptions } from "@/hooks/useProjectAiCaptions";
import { useSimplifiedProjectPersistence } from "@/hooks/useSimplifiedProjectPersistence";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import AiCaptionProgress from "./AiCaptionProgress";
import ProjectDetailLoading from "./ProjectDetailLoading";
import ProjectSidebar from "./ProjectSidebar";
import SimpleProjectHero from "./sections/SimpleProjectHero";
import SimpleContentSection from "./sections/SimpleContentSection";

const SimplifiedProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const showEditingControls = shouldShowEditingControls();

  console.log('📋 SimplifiedProjectDetail: Loading project:', projectId);
  console.log('📋 Available projects:', projectsData.map(p => p.id));
  console.log('📋 Available project details:', Object.keys(projectDetails));

  const project = projectsData.find(p => p.id === projectId);
  const details = projectDetails[projectId as keyof typeof projectDetails];
  
  console.log('📋 Found project:', !!project);
  console.log('📋 Found details:', !!details);
  
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
    isGenerating: isGeneratingCaptions
  } = useProjectAiCaptions(project!, details!, projectId!, staticCaptions);

  useEffect(() => {
    console.log('🔄 SimplifiedProjectDetail: Component refreshed due to data changes');
  }, [refreshTrigger]);

  if (!projectId) {
    console.log('❌ No project ID provided');
    return <ProjectDetailLoading />;
  }

  if (!project) {
    console.log('❌ Project not found:', projectId);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600">Project "{projectId}" could not be found.</p>
            <p className="text-sm text-gray-500 mt-2">Available projects: {projectsData.map(p => p.id).join(', ')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!details) {
    console.log('❌ Project details not found:', projectId);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Details Not Found</h1>
            <p className="text-gray-600">Details for project "{projectId}" could not be found.</p>
            <p className="text-sm text-gray-500 mt-2">Available details: {Object.keys(projectDetails).join(', ')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Helmet>
        <title>{getTextContent('title', project.title)} - Barsky Design</title>
        <meta name="description" content={getTextContent('description', project.description)} />
      </Helmet>

      <div className="container mx-auto px-4 py-8 pt-24">
        {/* AI Caption Progress - Shows database status only */}
        {showEditingControls && (
          <div className="mb-6">
            <AiCaptionProgress 
              isGenerating={false}
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
              imageCaptions={finalCaptions}
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
                imageCaptions={finalCaptions}
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
                imageCaptions={finalCaptions}
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
                imageCaptions={finalCaptions}
              />
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
