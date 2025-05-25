
import React from "react";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectSidebar from "@/components/project/ProjectSidebar";
import ProjectNavigation from "@/components/ProjectNavigation";
import { ProjectDetails } from "@/data/projectsData";

interface ProjectDetailContentProps {
  project: {
    id: string;
    title: string;
    tags: string[];
    link?: string;
    image: string;
  };
  details: ProjectDetails;
  projectId: string;
  projectsData: Array<{
    id: string;
    title: string;
    image: string;
  }>;
  imageCaptions: Record<string, string>;
}

const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({
  project,
  details,
  projectId,
  projectsData,
  imageCaptions
}) => {
  // Add video URLs for specific projects
  const getVideoUrl = (id: string) => {
    switch (id) {
      case "barskyjoint":
        return "https://youtube.com/shorts/UGlOWDnsHi0?feature=share";
      case "dae-search":
        return "https://youtu.be/lHU7yvZiMhQ?feature=shared";
      default:
        return undefined;
    }
  };

  const videoUrl = getVideoUrl(projectId);

  return (
    <section className="py-20">
      <div className="section-container">
        <ProjectHeader title={project.title} tags={project.tags} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <ProjectOverview 
              challenge={details.challenge}
              process={details.process}
              result={details.result}
              technologies={details.technologies}
              projectLink={project.link}
              challengeImage={details.challengeImage}
              processImage={details.processImage}
              processBottomImage={details.processBottomImage}
              resultImage={details.resultImage}
              resultGalleryImages={details.resultGalleryImages}
              imageCaptions={imageCaptions}
              galleryImages={details.galleryImages}
              showTechnologies={false}
              videoUrl={videoUrl}
              challengeBottomImage={details.challengeBottomImage}
            />
          </div>
          
          <div>
            <ProjectSidebar 
              duration={details.duration}
              client={details.client}
              role={details.role}
            />
          </div>
        </div>
        
        <ProjectNavigation 
          currentProjectId={projectId} 
          projectsData={projectsData} 
        />
      </div>
    </section>
  );
};

export default ProjectDetailContent;
