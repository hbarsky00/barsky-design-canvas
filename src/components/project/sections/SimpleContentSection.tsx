
import React from "react";
import { motion } from "framer-motion";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import EditableText from "@/components/project/EditableText";
import ImageGallery from "@/components/project/ImageGallery";

interface SimpleContentSectionProps {
  title: string;
  content: string;
  images?: string[];
  sectionKey: string;
  projectId: string;
  getTextContent: (key: string, fallback: string) => string;
  getImageSrc: (src: string) => string;
  saveTextContent: (key: string, content: string) => void;
  saveImageReplacement: (originalSrc: string, newSrc: string) => void;
  finalCaptions: Record<string, string>;
  imageCaptions: Record<string, string>;
}

const SimpleContentSection: React.FC<SimpleContentSectionProps> = ({
  title,
  content,
  images = [],
  sectionKey,
  projectId,
  getTextContent,
  getImageSrc,
  saveTextContent,
  saveImageReplacement,
  finalCaptions,
  imageCaptions
}) => {
  const showEditingControls = shouldShowEditingControls();
  
  // Get section-specific content
  const sectionContent = getTextContent(`${sectionKey}_content`, content);
  const sectionTitle = title === "Process" ? "What I Did" : title;

  console.log(`📋 SimpleContentSection (${sectionKey}):`, {
    title: sectionTitle,
    contentLength: sectionContent.length,
    imagesCount: images.length,
    images: images.map(img => img.substring(0, 50) + '...')
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {showEditingControls ? (
            <EditableText
              content={sectionTitle}
              onSave={(newTitle) => saveTextContent(`${sectionKey}_title`, newTitle)}
              className="text-3xl font-bold text-gray-900"
            />
          ) : (
            sectionTitle
          )}
        </h2>
        
        <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
          {showEditingControls ? (
            <EditableText
              content={sectionContent}
              onSave={(newContent) => saveTextContent(`${sectionKey}_content`, newContent)}
              className="prose prose-lg text-gray-600 leading-relaxed"
            />
          ) : (
            sectionContent.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))
          )}
        </div>
      </div>

      {/* Section Images */}
      {images && images.length > 0 && (
        <div className="mt-12">
          <ImageGallery
            images={images.map(getImageSrc)}
            imageCaptions={finalCaptions}
            onImageReplace={showEditingControls ? saveImageReplacement : undefined}
            projectId={projectId}
          />
        </div>
      )}
    </motion.section>
  );
};

export default SimpleContentSection;
