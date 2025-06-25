
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
      
      <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none text-center mb-8">
        {content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      {images.length > 0 && (
        <div className="space-y-6">
          {/* First image */}
          {images[0] && (
            <div className="glass-card p-4 layered-depth">
              <MaximizableImage
                src={images[0]}
                alt={`${title} image 1`}
                caption={imageCaptions[images[0]] || `${title} supporting image`}
                imageList={images}
                currentIndex={0}
                className="rounded-lg shadow-elevated w-full"
                projectId={projectId}
                hideEditButton={false}
                allowRemove={false}
              />
            </div>
          )}

          {/* Additional text between images */}
          {additionalText && (
            <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none text-center my-8">
              {additionalText.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Remaining images */}
          {images.slice(1).map((imageSrc, index) => (
            <div key={index + 1} className="glass-card p-4 layered-depth">
              <MaximizableImage
                src={imageSrc}
                alt={`${title} image ${index + 2}`}
                caption={imageCaptions[imageSrc] || `${title} supporting image`}
                imageList={images}
                currentIndex={index + 1}
                className="rounded-lg shadow-elevated w-full"
                projectId={projectId}
                hideEditButton={false}
                allowRemove={false}
              />
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default SimpleContentSection;
