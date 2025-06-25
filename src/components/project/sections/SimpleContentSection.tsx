
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";

interface SimpleContentSectionProps {
  title: string;
  content: string;
  additionalText?: string;
  images?: string[];
  imageCaptions?: Record<string, string>;
  projectId?: string;
}

const SimpleContentSection: React.FC<SimpleContentSectionProps> = ({
  title,
  content,
  additionalText,
  images = [],
  imageCaptions = {},
  projectId
}) => {
  console.log('🎬 SimpleContentSection: Rendering with captions:', Object.keys(imageCaptions).length);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
      
      <div className="prose prose-lg max-w-none text-gray-700 mb-8">
        <p className="leading-relaxed">{content}</p>
        {additionalText && (
          <p className="leading-relaxed mt-6">{additionalText}</p>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {images.map((imageSrc, index) => {
            const caption = imageCaptions[imageSrc];
            console.log('🖼️ SimpleContentSection: Image caption for', imageSrc.substring(0, 30) + '...', ':', caption);
            
            return (
              <MaximizableImage
                key={`${imageSrc}-${index}`}
                src={imageSrc}
                alt={caption || `${title} image ${index + 1}`}
                caption={caption}
                imageList={images}
                currentIndex={index}
                className="rounded-lg shadow-lg"
                projectId={projectId}
              />
            );
          })}
        </div>
      )}
    </motion.section>
  );
};

export default SimpleContentSection;
