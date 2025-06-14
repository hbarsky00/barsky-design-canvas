
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";

interface ProjectHeroImageSectionProps {
  projectId: string;
  imageCaptions: Record<string, string>;
}

const ProjectHeroImageSection: React.FC<ProjectHeroImageSectionProps> = ({
  projectId,
  imageCaptions
}) => {
  // Define which projects have hero images and their URLs
  const projectHeroImages: Record<string, { url: string; title: string }> = {
    "medication-app": {
      url: "/lovable-uploads/5ebc710e-fd8f-40aa-b092-99290c136a57.png",
      title: "Medication App Task Completion Interface"
    },
    "investor-loan-app": {
      url: "/lovable-uploads/b49f4918-37cd-4ffa-bae3-2468e22f2fce.png",
      title: "Advanced Search Functionality"
    }
  };

  const heroImageData = projectHeroImages[projectId];

  // Only show hero image section if project has one
  if (!heroImageData) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <div className="glass-card-elevated p-8 layered-depth">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Project Showcase
        </h2>
        <div className="floating-element">
          <div className="glass-card p-4 layered-depth">
            <MaximizableImage
              src={heroImageData.url}
              alt={heroImageData.title}
              caption={imageCaptions[heroImageData.url] || heroImageData.title}
              imageList={[heroImageData.url]}
              currentIndex={0}
              priority={true}
              className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectHeroImageSection;
