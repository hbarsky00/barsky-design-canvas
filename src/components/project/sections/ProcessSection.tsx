
import React from "react";
import { motion } from "framer-motion";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";

interface ProcessSectionProps {
  processBeforeGallery?: string;
  processAfterGallery?: string;
  isInvestorProject?: boolean;
  isDaeSearchProject?: boolean;
  inspirationImages?: string[];
  inspirationCaptions?: Record<string, string>;
  servicesGalleryImages?: string[];
  servicesCaptions?: Record<string, string>;
  processImage?: string;
  processBottomImage?: string;
  imageCaptions?: Record<string, string>;
  projectId?: string;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({
  processBeforeGallery = "",
  processAfterGallery = "",
  servicesGalleryImages = [],
  imageCaptions = {}
}) => {
  const fullProcess = processBeforeGallery + processAfterGallery;
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          What I Did
        </h2>
        <div className="prose prose-lg text-gray-600 leading-relaxed">
          {fullProcess.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {servicesGalleryImages && servicesGalleryImages.length > 0 && (
        <div className="mt-12">
          <ProjectMultiImageGallery 
            images={servicesGalleryImages}
            imageCaptions={imageCaptions}
          />
        </div>
      )}
    </motion.section>
  );
};

export default ProcessSection;
