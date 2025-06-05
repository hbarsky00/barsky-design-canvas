
import React from "react";
import { motion } from "framer-motion";

interface ModernProjectProcessProps {
  process: string;
  processImage?: string;
  imageCaptions: Record<string, string>;
}

const ModernProjectProcess: React.FC<ModernProjectProcessProps> = ({
  process,
  processImage,
  imageCaptions
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          The Process
        </h2>
        <div className="prose prose-lg text-gray-600 leading-relaxed">
          {process.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Process Image */}
      {processImage && (
        <div className="mt-12">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={processImage}
              alt={imageCaptions[processImage] || "Design process"}
              className="w-full h-auto object-cover"
            />
          </div>
          {imageCaptions[processImage] && (
            <p className="text-sm text-gray-500 text-center mt-3">
              {imageCaptions[processImage]}
            </p>
          )}
        </div>
      )}
    </motion.section>
  );
};

export default ModernProjectProcess;
