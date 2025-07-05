
import React from "react";
import { motion } from "framer-motion";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";

interface ResultSectionProps {
  result: string;
  resultGalleryImages?: string[];
  resultImage?: string;
  imageCaptions?: Record<string, string>;
  projectId?: string;
}

const ResultSection: React.FC<ResultSectionProps> = ({
  result,
  resultGalleryImages = [],
  imageCaptions = {}
}) => {
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
          The Results
        </h2>
        <div className="prose prose-lg text-gray-600 leading-relaxed">
          {result.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {resultGalleryImages && resultGalleryImages.length > 0 && (
        <div className="mt-12">
          <ProjectMultiImageGallery 
            images={resultGalleryImages}
            imageCaptions={imageCaptions}
          />
        </div>
      )}
    </motion.section>
  );
};

export default ResultSection;
