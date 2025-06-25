
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
import ProjectCallToAction from "./ProjectCallToAction";
import ProjectNavigation from "@/components/ProjectNavigation";
import Footer from "@/components/Footer";

const SimplifiedProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const showEditingControls = shouldShowEditingControls();

  console.log('📋 SimplifiedProjectDetail: Loading project:', projectId);

  // Find project and details
  const project = projectsData.find(p => p.id === projectId);
  const details = projectDetails[projectId as keyof typeof projectDetails];
  
  console.log('📋 Project found:', !!project, project?.title);
  console.log('📋 Details found:', !!details);
  
  const { 
    saveTextContent, 
    saveImageReplacement, 
    getTextContent, 
    getImageSrc, 
    refreshTrigger 
  } = useSimplifiedProjectPersistence(projectId!);

  // Static captions - empty object since we load from database
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
    console.log('📋 Available projects:', projectsData.map(p => p.id));
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
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
    console.log('📋 Available details:', Object.keys(projectDetails));
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Details Not Found</h1>
            <p className="text-gray-600">Details for project "{projectId}" could not be found.</p>
            <p className="text-sm text-gray-500 mt-2">Available details: {Object.keys(projectDetails).join(', ')}</p>
          </div>
        </div>
      </div>
    );
  }

  // Log the actual project data being displayed
  console.log('✅ Displaying project:', {
    id: project.id,
    title: getTextContent('title', project.title),
    description: getTextContent('description', project.description),
    image: getImageSrc(project.image),
    captionsCount: Object.keys(finalCaptions).length
  });

  console.log('✅ Displaying details:', {
    challenge: getTextContent('challenge_content', details.challenge)?.substring(0, 50) + '...',
    process: getTextContent('process_content', details.process)?.substring(0, 50) + '...',
    result: getTextContent('result_content', details.result)?.substring(0, 50) + '...',
    availableImages: details.availableImages?.length || 0
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Helmet>
        <title>{getTextContent('title', project.title)} - Barsky Design</title>
        <meta name="description" content={getTextContent('description', project.description)} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
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

            {/* Call to Action */}
            <ProjectCallToAction />

            {/* Project Navigation */}
            <ProjectNavigation
              currentProjectId={projectId!}
              projectsData={projectsData}
            />
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SimplifiedProjectDetail;
