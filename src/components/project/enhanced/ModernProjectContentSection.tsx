
import React from "react";
import { motion } from "framer-motion";
import { ProjectImageConfig } from "@/data/types/project";
import EditableText from "@/components/dev/EditableText";
import { useDevMode } from "@/context/DevModeContext";
import AddContentButton from "@/components/dev/AddContentButton";
import DraggableContentBlock, { ContentBlock } from "@/components/dev/DraggableContentBlock";
import ContentBlocksSection from "./ContentBlocksSection";
import { useContentBlocks } from "@/hooks/useContentBlocks";
import { useContentHandlers } from "@/hooks/useContentHandlers";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

interface ModernProjectContentSectionProps {
  title: string;
  content: string | ContentBlock[];
  sectionKey: keyof ProjectImageConfig;
  imageConfig?: ProjectImageConfig;
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
    contentBlocks,
    setContentBlocks,
    beforeHeaderBlocks,
    setBeforeHeaderBlocks,
    afterHeaderBlocks,
    setAfterHeaderBlocks,
    createNewBlock
  } = useContentBlocks({ content, sectionKey, imageConfig, imageCaptions });

  const {
    handleAddContent,
    handleUpdateContent,
    handleDeleteContent,
    handleImageReplace,
    handleAddBeforeHeaderContent,
    handleUpdateBeforeHeaderContent,
    handleDeleteBeforeHeaderContent,
    handleBeforeHeaderImageReplace,
    handleAddAfterHeaderContent,
    handleUpdateAfterHeaderContent,
    handleDeleteAfterHeaderContent,
    handleAfterHeaderImageReplace
  } = useContentHandlers(
    contentBlocks,
    setContentBlocks,
    beforeHeaderBlocks,
    setBeforeHeaderBlocks,
    afterHeaderBlocks,
    setAfterHeaderBlocks,
    createNewBlock
  );

  const {
    draggedIndex,
    beforeHeaderDraggedIndex,
    afterHeaderDraggedIndex,
    handleDragStart,
    handleBeforeHeaderDragStart,
    handleAfterHeaderDragStart,
    handleDragOver,
    handleDrop,
    handleBeforeHeaderDrop,
    handleAfterHeaderDrop
  } = useDragAndDrop(
    contentBlocks,
    setContentBlocks,
    beforeHeaderBlocks,
    setBeforeHeaderBlocks,
    afterHeaderBlocks,
    setAfterHeaderBlocks
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card-elevated p-8 space-y-8 layered-depth floating-element relative group"
    >
      {isDevMode && <AddContentButton onAdd={handleAddContent} />}
      
      {/* Content blocks before the header */}
      <ContentBlocksSection
        blocks={beforeHeaderBlocks}
        onUpdate={handleUpdateBeforeHeaderContent}
        onDelete={handleDeleteBeforeHeaderContent}
        onImageReplace={handleBeforeHeaderImageReplace}
        onDragStart={handleBeforeHeaderDragStart}
        onDragOver={handleDragOver}
        onDrop={handleBeforeHeaderDrop}
        draggedIndex={beforeHeaderDraggedIndex}
        onAdd={handleAddBeforeHeaderContent}
        keyPrefix="before-header"
        className="space-y-4 mb-6"
      />

      <EditableText initialText={title}>
        {(text) => (
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text pr-8 text-center">
            {text}
          </h2>
        )}
      </EditableText>

      {/* Content blocks after the header */}
      <ContentBlocksSection
        blocks={afterHeaderBlocks}
        onUpdate={handleUpdateAfterHeaderContent}
        onDelete={handleDeleteAfterHeaderContent}
        onImageReplace={handleAfterHeaderImageReplace}
        onDragStart={handleAfterHeaderDragStart}
        onDragOver={handleDragOver}
        onDrop={handleAfterHeaderDrop}
        draggedIndex={afterHeaderDraggedIndex}
        onAdd={handleAddAfterHeaderContent}
        keyPrefix="after-header"
        className="space-y-4 mb-6"
      />

      {/* Main content blocks with drag and drop capability */}
      <div className="space-y-4">
        {contentBlocks.map((block, index) => (
          <DraggableContentBlock
            key={`${block.type}-${index}`}
            block={block}
            index={index}
            onUpdate={handleUpdateContent}
            onDelete={handleDeleteContent}
            onImageReplace={handleImageReplace}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            isDragging={draggedIndex === index}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default ModernProjectContentSection;
