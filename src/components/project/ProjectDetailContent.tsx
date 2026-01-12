
import React from "react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import ProjectHeader from "./ProjectHeader";
import ProjectOverview from "./ProjectOverview";
import ProjectSidebar from "./ProjectSidebar";
import ProjectGallery from "./ProjectGallery";
import ProjectCallToAction from "./ProjectCallToAction";
import { getImageAssignments } from "@/utils/imageConfigUtils";
import { useProjectPersistence } from "@/hooks/useProjectPersistence";

interface ProjectDetailContentProps {
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

const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({
  project,
  details,
  projectId,
  projectsData,
  imageCaptions = {}
}) => {
  const { getProjectData } = useProjectPersistence(projectId);
  
  // Get published image replacements
  const getReplacedImageSrc = React.useCallback((originalSrc: string) => {
    const savedData = getProjectData();
    return savedData.imageReplacements[originalSrc] || originalSrc;
  }, [getProjectData]);

  // Apply image replacements to project data
  const updatedProject = React.useMemo(() => ({
    ...project,
    image: getReplacedImageSrc(project.image)
  }), [project, getReplacedImageSrc]);
  
  // Get all unique images from the new image configuration and legacy properties
  const imageAssignments = getImageAssignments(details.imageConfig);
  const configImages = imageAssignments.map(assignment => assignment.imagePath);
  
  // Remove duplicates by converting to Set and back to array
  const allImages = Array.from(new Set([
    ...configImages,
    ...(details.challengeGalleryImages || []),
    ...(details.processImage ? [details.processImage] : []),
    ...(details.processBottomImage ? [details.processBottomImage] : []),
    ...(details.resultGalleryImages || []),
    ...(details.galleryImages || []),
    ...(details.extraImages || []),
    ...(details.challengeImage ? [details.challengeImage] : []),
    ...(details.resultImage ? [details.resultImage] : []),
    ...(details.challengeBottomImage ? [details.challengeBottomImage] : []),
    ...(details.servicesGalleryImages || [])
  ])).map(getReplacedImageSrc);

  // Find current image index
  const currentImageIndex = allImages.indexOf(updatedProject.image);

  // Check if this is DAE Search project to conditionally hide bottom gallery
  const isDaeSearchProject = projectId === "dae-search";


  return (
    <div className="w-full px-4 sm:px-6 pt-20 pb-4 lg:pt-24 lg:pb-8">
      <ProjectHeader
        title={updatedProject.title}
        description={updatedProject.description}
        image={updatedProject.image}
        tags={updatedProject.tags}
        imageCaptions={imageCaptions}
        imageList={allImages}
        currentIndex={currentImageIndex >= 0 ? currentImageIndex : 0}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 mt-6 lg:mt-8 max-w-6xl mx-auto">
        {/* Project Sidebar - Shows first on mobile, last on desktop */}
        <div className="lg:col-span-1 order-first lg:order-last">
          <ProjectSidebar
            duration={details.duration}
            client={details.client}
            role={details.role}
          />
        </div>
        
        {/* Main Content - Shows second on mobile, first on desktop */}
        <div className="lg:col-span-2 order-last lg:order-first">
          <ProjectOverview
            challenge={details.challenge}
            challengeAdditionalText={details.challengeAdditionalText}
            technologies={details.technologies}
            projectLink={details.projectLink}
            caseStudyLink={details.caseStudyLink}
            challengeImage={getReplacedImageSrc(details.challengeImage || '')}
            imageCaptions={imageCaptions}
            galleryImages={details.galleryImages?.map(getReplacedImageSrc)}
            showTechnologies={false}
            challengeBottomImage={getReplacedImageSrc(details.challengeBottomImage || '')}
            challengeGalleryImages={details.challengeGalleryImages?.map(getReplacedImageSrc)}
            allImages={allImages}
            projectId={projectId}
          />
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="max-w-6xl mx-auto">
        <ProjectCallToAction />
      </div>
      
      {/* Only show bottom gallery if it's not DAE Search project and has gallery images */}
      {!isDaeSearchProject && details.galleryImages && details.galleryImages.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <ProjectGallery
            images={Array.from(new Set(details.galleryImages.map(getReplacedImageSrc)))}
            imageCaptions={imageCaptions}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectDetailContent;
