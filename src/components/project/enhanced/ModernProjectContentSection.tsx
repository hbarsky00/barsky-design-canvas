
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
import { useProjectDataUpdater } from "@/hooks/useProjectDataUpdater";

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
  const { updateImageInProjectData } = useProjectDataUpdater();
  
  const {
    contentBlocks,
    setContentBlocks,
    beforeHeaderBlocks,
    setBeforeHeaderBlocks,
    afterHeaderBlocks,
    setAfterHeaderBlocks,
    createNewBlock
  } = useContentBlocks({ content, sectionKey, imageConfig, imageCaptions });

  const handleImageReplaceWithDataUpdate = (index: number, newSrc: string) => {
    console.log('ModernProjectContentSection: Replacing image at index', index, 'with', newSrc);
    
    // Update the content blocks state immediately for UI feedback
    setContentBlocks(prev => 
      prev.map((block, i) => 
        i === index && block.type === 'image'
          ? { ...block, src: newSrc }
          : block
      )
    );
    
    // Also update the project data
    const oldBlock = contentBlocks[index];
    if (oldBlock && oldBlock.type === 'image' && oldBlock.src) {
      updateImageInProjectData(projectId, oldBlock.src, newSrc);
    }
  };

  const handleBeforeHeaderImageReplaceWithDataUpdate = (index: number, newSrc: string) => {
    console.log('ModernProjectContentSection: Replacing before header image at index', index, 'with', newSrc);
    
    setBeforeHeaderBlocks(prev => 
      prev.map((block, i) => 
        i === index && block.type === 'image'
          ? { ...block, src: newSrc }
          : block
      )
    );
    
    const oldBlock = beforeHeaderBlocks[index];
    if (oldBlock && oldBlock.type === 'image' && oldBlock.src) {
      updateImageInProjectData(projectId, oldBlock.src, newSrc);
    }
  };

  const handleAfterHeaderImageReplaceWithDataUpdate = (index: number, newSrc: string) => {
    console.log('ModernProjectContentSection: Replacing after header image at index', index, 'with', newSrc);
    
    setAfterHeaderBlocks(prev => 
      prev.map((block, i) => 
        i === index && block.type === 'image'
          ? { ...block, src: newSrc }
          : block
      )
    );
    
    const oldBlock = afterHeaderBlocks[index];
    if (oldBlock && oldBlock.type === 'image' && oldBlock.src) {
      updateImageInProjectData(projectId, oldBlock.src, newSrc);
    }
  };

  const {
    handleAddContent,
    handleUpdateContent,
    handleDeleteContent,
    handleAddBeforeHeaderContent,
    handleUpdateBeforeHeaderContent,
    handleDeleteBeforeHeaderContent,
    handleAddAfterHeaderContent,
    handleUpdateAfterHeaderContent,
    handleDeleteAfterHeaderContent
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
        onImageReplace={handleBeforeHeaderImageReplaceWithDataUpdate}
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
        onImageReplace={handleAfterHeaderImageReplaceWithDataUpdate}
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
            onImageReplace={handleImageReplaceWithDataUpdate}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            isDragging={draggedIndex === index}
            projectId={projectId}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default ModernProjectContentSection;
