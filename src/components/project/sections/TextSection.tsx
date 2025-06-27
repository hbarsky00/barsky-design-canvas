
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
      className={`prose prose-lg text-gray-600 leading-relaxed max-w-none ${className}`}
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
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TextSection;
