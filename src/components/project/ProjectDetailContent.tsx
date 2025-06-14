
import React from "react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import ProjectHeader from "./ProjectHeader";
import ProjectOverview from "./ProjectOverview";
import ProjectSidebar from "./ProjectSidebar";
import ProjectGallery from "./ProjectGallery";
import { getImageAssignments } from "@/utils/imageConfigUtils";

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
  ]));

  // Find current image index
  const currentImageIndex = allImages.indexOf(project.image);

  // Check if this is DAE Search project to conditionally hide bottom gallery
  const isDaeSearchProject = projectId === "dae-search";

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <ProjectHeader
        title={project.title}
        description={project.description}
        image={project.image}
        tags={project.tags}
        imageCaptions={imageCaptions}
        imageList={allImages}
        currentIndex={currentImageIndex >= 0 ? currentImageIndex : 0}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <ProjectOverview
            challenge={details.challenge}
            process={details.process}
            result={details.result}
            technologies={details.technologies}
            projectLink={details.projectLink}
            caseStudyLink={details.caseStudyLink}
            challengeImage={details.challengeImage}
            processImage={details.processImage}
            processBottomImage={details.processBottomImage}
            resultImage={details.resultImage}
            resultGalleryImages={details.resultGalleryImages}
            imageCaptions={imageCaptions}
            galleryImages={details.galleryImages}
            showTechnologies={false}
            videoUrl={details.videoUrl}
            challengeBottomImage={details.challengeBottomImage}
            challengeGalleryImages={details.challengeGalleryImages}
            allImages={allImages}
            projectId={projectId}
            servicesGalleryImages={details.servicesGalleryImages}
          />
        </div>
        
        <div className="lg:col-span-1">
          <ProjectSidebar
            duration={details.duration}
            client={details.client}
            role={details.role}
          />
        </div>
      </div>
      
      {/* Only show bottom gallery if it's not DAE Search project and has gallery images */}
      {!isDaeSearchProject && details.galleryImages && details.galleryImages.length > 0 && (
        <ProjectGallery
          images={Array.from(new Set(details.galleryImages))}
          allImages={allImages}
          imageCaptions={imageCaptions}
        />
      )}
    </div>
  );
};

export default ProjectDetailContent;
