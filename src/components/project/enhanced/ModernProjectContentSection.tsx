
import React from 'react';
import { motion } from 'framer-motion';
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
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="glass-card p-6 sm:p-8 lg:p-10 layered-depth floating-element relative group">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            {title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <div>
            <RichTextRenderer text={content} />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ModernProjectContentSection;
