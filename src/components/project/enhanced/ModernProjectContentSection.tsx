
import React from 'react';
import { motion } from 'framer-motion';
import EditableText from '@/components/dev/EditableText';
import SectionImages from './SectionImages';
import { useDevMode } from '@/context/DevModeContext';
import RichTextRenderer from '@/components/dev/RichTextRenderer';
import { useProjectPersistence } from '@/hooks/useProjectPersistence';
import ContentBlocksSection from './ContentBlocksSection';

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
  const { getProjectData, saveImageReplacement } = useProjectPersistence(projectId);

  // Get replaced image source
  const getReplacedImageSrc = React.useCallback((originalSrc: string) => {
    const savedData = getProjectData();
    return savedData.imageReplacements[originalSrc] || originalSrc;
  }, [getProjectData]);

  // Handle image replacement
  const handleImageReplace = React.useCallback((imageSrc: string, newSrc: string) => {
    console.log('ModernProjectContentSection: Replacing image:', imageSrc, 'with', newSrc);
    saveImageReplacement(imageSrc, newSrc);
  }, [saveImageReplacement]);

  // Handle image removal - for now just log, can be implemented later
  const handleImageRemove = React.useCallback((imageSrc: string) => {
    console.log('ModernProjectContentSection: Remove image:', imageSrc);
    // This could remove the image from the imageConfig in the future
  }, []);

  // Handle image reordering - for now just log, can be implemented later  
  const handleImageReorder = React.useCallback((oldIndex: number, newIndex: number) => {
    console.log('ModernProjectContentSection: Reorder images from', oldIndex, 'to', newIndex);
    // This could reorder images in the imageConfig in the future
  }, []);

  const sectionImages = imageConfig[sectionKey] || [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="glass-card p-6 sm:p-8 lg:p-10 layered-depth floating-element relative group">
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
            className="mb-6 sm:mb-8"
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

        {/* Dynamic Content Blocks Section - This provides add/move/reorder functionality */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ContentBlocksSection
            projectId={projectId}
            sectionKey={`${sectionKey}_dynamic_content`}
            className="mt-6"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ModernProjectContentSection;
