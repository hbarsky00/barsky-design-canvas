
import React from "react";
import { motion } from "framer-motion";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";
import MaximizableImage from "../MaximizableImage";

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
  processBeforeHeaderImage?: string;
  imageCaptions?: Record<string, string>;
  projectId?: string;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({
  processBeforeGallery = "",
  processAfterGallery = "",
  servicesGalleryImages = [],
  processImage,
  processBottomImage,
  processBeforeHeaderImage,
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6 pt-2.5">
          What I Did
        </h2>
        
        {/* Image after header, before content */}
        {processBeforeHeaderImage && (
          <MaximizableImage
            src={processBeforeHeaderImage}
            alt={imageCaptions[processBeforeHeaderImage] || "Process overview"}
            caption={imageCaptions[processBeforeHeaderImage]}
            className="rounded-lg shadow-lg mb-8"
          />
        )}
        
        <div className="prose prose-lg text-gray-600 leading-relaxed">
          {fullProcess.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Image after content */}
        {processImage && (
          <MaximizableImage
            src={processImage}
            alt={imageCaptions[processImage] || "Process details"}
            caption={imageCaptions[processImage]}
            className="rounded-lg shadow-lg mt-8"
          />
        )}
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
