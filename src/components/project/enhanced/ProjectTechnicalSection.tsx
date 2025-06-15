
import React from "react";
import { motion } from "framer-motion";
import { Code, ExternalLink } from "lucide-react";
import EditImageButton from "@/components/dev/EditImageButton";

interface ProjectTechnicalSectionProps {
  images: string[];
  imageCaptions: Record<string, string>;
  projectLink?: string;
}

const ProjectTechnicalSection: React.FC<ProjectTechnicalSectionProps> = ({
  images,
  imageCaptions,
  projectLink
}) => {
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Code className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Technical Implementation</h2>
          </div>
          
          {projectLink && (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              View Live
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          )}
        </div>
        
        {/* Technical Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md bg-white p-4 relative group">
                <EditImageButton src={image} />
                <img
                  src={image}
                  alt={imageCaptions[image] || `Technical diagram ${index + 1}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              {imageCaptions[image] && (
                <p className="text-sm text-gray-600 mt-3 font-medium">
                  {imageCaptions[image]}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectTechnicalSection;
