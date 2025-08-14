
import React from "react";
import { motion } from "framer-motion";
import ImageTextGallery from "./ImageTextGallery";
import ProjectContentBox from "@/components/project/ProjectContentBox";
import { ImageTextItem } from "@/data/types/project";

interface SimpleContentSectionProps {
  title: string;
  content: string;
  additionalText?: string;
  images?: string[];
  galleryContent?: ImageTextItem[];
  imageCaptions?: Record<string, string>;
  projectId?: string;
  onTextSave?: (textKey: string, content: string) => void;
}

const SimpleContentSection: React.FC<SimpleContentSectionProps> = ({
  title,
  content,
  additionalText,
  images = [],
  galleryContent,
  imageCaptions = {},
  projectId,
  onTextSave
}) => {
  // Use enhanced gallery if available, otherwise fall back to legacy image display
  const useEnhancedGallery = galleryContent && galleryContent.length > 0;

  // Convert galleryContent to the expected format if needed
  const normalizedGalleryContent = galleryContent?.map(item => ({
    text: item.text || item.content?.text || '',
    image: item.image || item.content?.image?.src,
    type: item.type,
    content: item.content
  })) || [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card-elevated p-8 layered-depth mb-12"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        {title}
      </h2>
      
      <ProjectContentBox>
        {content.split('\n').map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))}
      </ProjectContentBox>

      {useEnhancedGallery ? (
        <ImageTextGallery
          items={normalizedGalleryContent}
          imageCaptions={imageCaptions}
          projectId={projectId}
          sectionName={title}
          onTextSave={onTextSave}
        />
      ) : images.length > 0 ? (
        <div className="space-y-6">
          {/* First image */}
          {images[0] && (
            <figure className="project-image-container">
              <img
                src={images[0]}
                alt={`${title} image 1`}
                className="rounded-lg shadow-elevated w-full glass-card layered-depth cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              />
              <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                {imageCaptions[images[0]] || `${title} supporting image`}
              </figcaption>
            </figure>
          )}

          {/* Additional text between images */}
          {additionalText && (
            <ProjectContentBox>
              {additionalText.split('\n').map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </ProjectContentBox>
          )}

          {/* Remaining images */}
          {images.slice(1).map((imageSrc, index) => (
            <figure key={index + 1} className="project-image-container">
              <img
                src={imageSrc}
                alt={`${title} image ${index + 2}`}
                className="rounded-lg shadow-elevated w-full glass-card layered-depth cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              />
              <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                {imageCaptions[imageSrc] || `${title} supporting image`}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </motion.section>
  );
};

export default SimpleContentSection;
