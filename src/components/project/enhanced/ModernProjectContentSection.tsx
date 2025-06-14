
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";
import { ProjectImageConfig } from "@/data/types/project";

interface ModernProjectContentSectionProps {
  title: string;
  content: string;
  sectionKey: keyof ProjectImageConfig; // 'challenge', 'process', or 'result'
  imageConfig?: ProjectImageConfig;
  imageCaptions: Record<string, string>;
}

const ModernProjectContentSection: React.FC<ModernProjectContentSectionProps> = ({
  title,
  content,
  sectionKey,
  imageConfig,
  imageCaptions
}) => {
  // Get images for this section from the new configuration
  const sectionImages = imageConfig?.[sectionKey];
  const beforeHeaderImage = sectionImages?.beforeHeader;
  const afterHeaderImage = sectionImages?.afterHeader;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card-elevated p-8 space-y-8 layered-depth floating-element"
    >
      {/* Image Before Header */}
      {beforeHeaderImage && (
        <div className="glass-card p-4 layered-depth floating-element">
          <MaximizableImage
            src={beforeHeaderImage}
            alt={imageCaptions[beforeHeaderImage] || `${title} overview`}
            caption={imageCaptions[beforeHeaderImage]}
            className="rounded-lg shadow-elevated w-full"
          />
        </div>
      )}

      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
        {title}
      </h2>

      {/* Image After Header */}
      {afterHeaderImage && (
        <div className="glass-card p-4 layered-depth floating-element">
          <MaximizableImage
            src={afterHeaderImage}
            alt={imageCaptions[afterHeaderImage] || `${title} details`}
            caption={imageCaptions[afterHeaderImage]}
            className="rounded-lg shadow-elevated w-full"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.section>
  );
};

export default ModernProjectContentSection;
