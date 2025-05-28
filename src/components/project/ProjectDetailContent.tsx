
import React from "react";
import { motion } from "framer-motion";
import ProjectHeader from "./ProjectHeader";
import ProjectOverview from "./ProjectOverview";
import ProjectGallery from "./ProjectGallery";
import ProjectContactSection from "./ProjectContactSection";
import ProjectNavigation from "../ProjectNavigation";
import MaximizableImage from "./MaximizableImage";
import { ProjectDetails } from "@/data/types/project";

interface ProjectDetailContentProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link?: string;
  };
  details: ProjectDetails;
  projectId: string;
  projectsData: Array<{ id: string; title: string; image: string }>;
  imageCaptions: Record<string, string>;
}

const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({
  project,
  details,
  projectId,
  projectsData,
  imageCaptions,
}) => {
  // Create a complete image list for navigation
  const allImages = [
    project.image,
    ...(details.galleryImages || [])
  ];

  const renderContentSection = (section: any, index: number) => {
    if (section.type === "text") {
      return (
        <motion.div
          key={`text-${index}`}
          className="prose prose-lg max-w-none mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <p className="text-gray-700 leading-relaxed">{section.content}</p>
        </motion.div>
      );
    }

    if (section.type === "image") {
      const imageIndex = allImages.indexOf(section.src);
      const caption = imageCaptions[section.src] || section.alt || "";
      
      return (
        <motion.div
          key={`image-${index}`}
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <MaximizableImage
            src={section.src}
            alt={section.alt}
            caption={caption}
            imageList={allImages}
            currentIndex={imageIndex >= 0 ? imageIndex : 0}
            priority={index === 0}
          />
        </motion.div>
      );
    }

    if (section.type === "gallery") {
      return (
        <motion.div
          key={`gallery-${index}`}
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <ProjectGallery 
            images={section.images} 
            imageCaptions={imageCaptions}
            allImages={allImages}
          />
        </motion.div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      <ProjectHeader
        title={project.title}
        description={project.description}
        image={project.image}
        tags={project.tags}
        imageCaptions={imageCaptions}
        imageList={allImages}
        currentIndex={0}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <ProjectOverview 
              challenge={details.challenge || ""}
              process={details.process || ""}
              result={details.result || ""}
              technologies={details.technologies || []}
              projectLink={project.link || details.projectLink}
              challengeImage={details.challengeImage}
              processImage={details.processImage}
              processBottomImage={details.processBottomImage}
              resultImage={details.resultImage}
              resultGalleryImages={details.resultGalleryImages}
              imageCaptions={imageCaptions}
              galleryImages={details.galleryImages}
              showTechnologies={details.showTechnologies}
              videoUrl={details.videoUrl}
              challengeBottomImage={details.challengeBottomImage}
              challengeGalleryImages={details.challengeGalleryImages}
            />
            
            {/* Render content sections if they exist */}
            {details.content && (
              <div className="space-y-8">
                {details.content.map((section, index) => {
                  // Add safety check for section content
                  if (!section || typeof section.content !== 'string') {
                    return null;
                  }
                  return renderContentSection(section, index);
                })}
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            {/* Project sidebar content can go here */}
          </div>
        </div>
      </div>

      <ProjectContactSection />
      <ProjectNavigation currentProjectId={projectId} projectsData={projectsData} />
    </div>
  );
};

export default ProjectDetailContent;
