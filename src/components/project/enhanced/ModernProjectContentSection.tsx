
import React from 'react';
import { motion } from 'framer-motion';
import EditableText from '@/components/dev/EditableText';
import SectionImages from './SectionImages';
import { useDevMode } from '@/context/DevModeContext';
import { useContentHandlers } from '@/hooks/useContentHandlers';
import RichTextRenderer from '@/components/dev/RichTextRenderer';

interface ModernProjectContentSectionProps {
  title: string;
  content: string;
  sectionKey: string;
  imageConfig: Record<string, string[]>;
  imageCaptions: Record<string, string>;
  projectId: string;
}

const ModernProjectContentSection: React.FC<ModernProjectContentSectionProps> = ({
  title,
  content,
  sectionKey,
  imageConfig,
  imageCaptions,
  projectId
}) => {
  const { isDevMode } = useDevMode();
  const {
    handleImageReplace,
    handleImageRemove,
    handleImageReorder,
    getReplacedImageSrc
  } = useContentHandlers(projectId, sectionKey);

  const sectionImages = imageConfig[sectionKey] || [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="glass-card p-6 sm:p-8 lg:p-10 layered-depth floating-element">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <EditableText 
            initialText={title}
            textKey={`${sectionKey}_title_${projectId}`}
          >
            {(text) => (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 pr-8">
                {text}
              </h2>
            )}
          </EditableText>
        </motion.div>

        {/* Section Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <EditableText 
            initialText={content}
            textKey={`${sectionKey}_content_${projectId}`}
            multiline
            enableRichText
          >
            {(text) => (
              <div className="pr-8">
                <RichTextRenderer text={text} />
              </div>
            )}
          </EditableText>
        </motion.div>

        {/* Section Images */}
        {sectionImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionImages
              sectionImages={sectionImages}
              imageCaptions={imageCaptions}
              title={title}
              sectionKey={sectionKey}
              projectId={projectId}
              getReplacedImageSrc={getReplacedImageSrc}
              handleImageReplace={handleImageReplace}
              handleImageRemove={handleImageRemove}
              onImageReorder={handleImageReorder}
            />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default ModernProjectContentSection;
