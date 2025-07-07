
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";

interface ModernProjectProcessProps {
  process: string;
  processImage?: string;
  imageCaptions: Record<string, string>;
  projectId?: string;
}

const ModernProjectProcess: React.FC<ModernProjectProcessProps> = ({
  process,
  processImage,
  imageCaptions,
  projectId
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
          <MaximizableImage
            src={processImage}
            alt={imageCaptions[processImage] || "Design process"}
            caption={imageCaptions[processImage]}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            projectId={projectId}
          />
        </div>
      )}
    </motion.section>
  );
};

export default ModernProjectProcess;
