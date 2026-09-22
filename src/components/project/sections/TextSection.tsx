
import React from "react";
import { motion } from "framer-motion";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import ProjectContentBox from "@/components/project/ProjectContentBox";
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
      className={className}
    >
      {showEditingControls && onSave ? (
        <ProjectContentBox>
          <EnhancedContentEditor
            content={content}
            contentType="paragraph"
            onSave={handleSave}
            projectId={projectId}
          />
        </ProjectContentBox>
      ) : (
        <ProjectContentBox>
          {content.split('\n').map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </ProjectContentBox>
      )}
    </motion.div>
  );
};

export default TextSection;
