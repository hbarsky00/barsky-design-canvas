
import React from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";

interface ProjectProcessSectionProps {
  images: string[];
  processDescription: string;
  imageCaptions: Record<string, string>;
}

const ProjectProcessSection: React.FC<ProjectProcessSectionProps> = ({
  images,
  processDescription,
  imageCaptions
}) => {
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center mb-6">
          <Settings className="h-6 w-6 text-blue-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">Development Process</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Process Description */}
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">{processDescription}</p>
          </div>
          
          {/* Process Images */}
          <div className="space-y-4">
            {images.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                  <img
                    src={image}
                    alt={imageCaptions[image] || `Process step ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {imageCaptions[image] && (
                  <p className="text-sm text-gray-500 mt-2 italic">
                    {imageCaptions[image]}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectProcessSection;
