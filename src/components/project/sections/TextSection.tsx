
import React from "react";
import { motion } from "framer-motion";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import { shouldShowEditingControls } from "@/utils/devModeDetection";

interface TextSectionProps {
  content: string;
  onSave?: (content: string) => void;
  projectId?: string;
  sectionKey?: string;
  className?: string;
}

const TextSection: React.FC<TextSectionProps> = ({
  content,
  onSave,
  projectId,
  sectionKey,
  className = ""
}) => {
  const showEditingControls = shouldShowEditingControls();

  const handleSave = (newContent: string) => {
    if (onSave) {
      onSave(newContent);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`text-gray-600 max-w-none ${className}`}
      style={{
        fontSize: '18px',
        lineHeight: '1.625',
        fontWeight: '400',
        color: 'rgb(75 85 99)'
      }}
    >
      {showEditingControls && onSave ? (
        <EnhancedContentEditor
          content={content}
          contentType="paragraph"
          onSave={handleSave}
          projectId={projectId}
        />
      ) : (
        <div className="whitespace-pre-wrap">
          {content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4" style={{
              fontSize: '18px',
              lineHeight: '1.625',
              fontWeight: '400',
              color: 'rgb(75 85 99)'
            }}>
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TextSection;
