
import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionImages from "./SectionImages";
import SectionContent from "./SectionContent";
import ContentBlocksRenderer from "./ContentBlocksRenderer";
import LayoutControls from "./LayoutControls";
import { useDevMode } from "@/context/DevModeContext";
import { useProjectPersistence } from "@/hooks/useProjectPersistence";
import { useProjectDataUpdater } from "@/hooks/useProjectDataUpdater";
import { useContentBlocksManager } from "@/hooks/useContentBlocksManager";
import { useContentBlockActions } from "./ContentBlockActions";
import { useContentBlockDragDrop } from "./ContentBlockDragDrop";
import { generateContentHeader, generateContentBreakdown } from "@/utils/contentHeaderGenerator";

interface ModernProjectContentSectionProps {
  title: string;
  content: string;
  sectionKey: string;
  imageConfig?: Record<string, string[]>;
  imageCaptions?: Record<string, string>;
  projectId: string;
}

const ModernProjectContentSection: React.FC<ModernProjectContentSectionProps> = ({
  title,
  content,
  sectionKey,
  imageConfig = {},
  imageCaptions = {},
  projectId
}) => {
  console.log('🎯 ModernProjectContentSection: Rendering section:', {
    sectionKey,
    projectId,
    timestamp: new Date().toISOString()
  });
  
  const { isDevMode } = useDevMode();
  const { updateImageInProjectData } = useProjectDataUpdater();
  const { 
    saveImageReplacement, 
    getProjectData 
  } = useProjectPersistence(projectId);
  
  // Local state for column layout
  const [isColumnLayout, setIsColumnLayout] = useState(false);
  
  // Get images for this section
  const sectionImages = imageConfig[sectionKey] || [];
  
  // Use content blocks manager hook
  const {
    contentBlocks,
    setContentBlocks,
    isLoading,
    saveContentBlocks
  } = useContentBlocksManager(projectId, sectionKey);

  // Generate smart header and breakdown
  const contentHeader = generateContentHeader(contentBlocks);
  const contentBreakdown = generateContentBreakdown(contentBlocks);

  // Use content block actions hook
  const {
    handleAddContent,
    handleUpdateContent,
    handleDeleteContent,
    handleContentImageReplace,
    handleVideoUrlUpdate
  } = useContentBlockActions(contentBlocks, setContentBlocks, saveContentBlocks);

  // Use drag and drop hook
  const {
    draggedImageIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  } = useContentBlockDragDrop(contentBlocks, setContentBlocks, saveContentBlocks);

  const handleImageReplace = (imageSrc: string, newSrc: string) => {
    console.log('🖼️ ModernProjectContentSection: Replacing image', imageSrc, 'with', newSrc, 'for project', projectId);
    
    // Save the replacement persistently
    saveImageReplacement(imageSrc, newSrc);
    
    if (projectId) {
      updateImageInProjectData(projectId, imageSrc, newSrc);
    }
  };

  const handleImageReorder = (oldIndex: number, newIndex: number) => {
    console.log('🔄 ModernProjectContentSection: Reordering images from', oldIndex, 'to', newIndex);
    // This would need to be implemented to update the imageConfig order
    // For now, we'll just log the action
  };

  // Get saved image replacements (now includes published overrides automatically)
  const getReplacedImageSrc = (originalSrc: string) => {
    const savedData = getProjectData();
    return savedData.imageReplacements[originalSrc] || originalSrc;
  };

  const wrappedHandleContentImageReplace = async (index: number, newSrc: string) => {
    await handleContentImageReplace(index, newSrc, projectId, saveImageReplacement, updateImageInProjectData);
  };

  // Enhanced text update handler that ensures proper saving
  const handleContentTextUpdate = async (index: number, newValue: string) => {
    console.log('📝 ModernProjectContentSection: Updating text at index', index, 'with value:', newValue);
    
    // Update the content block immediately
    const updatedBlocks = contentBlocks.map((block, i) => 
      i === index && (block.type === 'text' || block.type === 'header') 
        ? { ...block, value: newValue }
        : block
    );
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    await saveContentBlocks(updatedBlocks);
    
    console.log('✅ ModernProjectContentSection: Content blocks saved successfully');
  };

  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card-elevated mobile-optimized-padding layered-depth relative group"
      >
        <div className="animate-pulse">Loading content...</div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card-elevated mobile-optimized-padding layered-depth relative group"
    >
      <LayoutControls
        isColumnLayout={isColumnLayout}
        setIsColumnLayout={setIsColumnLayout}
        onAddContent={handleAddContent}
      />
      
      <div className="mobile-section-spacing">
        <SectionContent
          title={title}
          content={content}
          sectionKey={sectionKey}
          projectId={projectId}
        />

        {/* Dynamic Additional Content Blocks */}
        <ContentBlocksRenderer
          contentBlocks={contentBlocks}
          sectionKey={sectionKey}
          projectId={projectId}
          isColumnLayout={isColumnLayout}
          contentHeader={contentHeader}
          contentBreakdown={contentBreakdown}
          onContentTextUpdate={handleContentTextUpdate}
          onDeleteContent={handleDeleteContent}
          onContentImageReplace={wrappedHandleContentImageReplace}
          onVideoUrlUpdate={handleVideoUrlUpdate}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onAddContent={handleAddContent}
          draggedImageIndex={draggedImageIndex}
        />

        {/* Section Images */}
        <SectionImages
          sectionImages={sectionImages}
          imageCaptions={imageCaptions}
          title={title}
          sectionKey={sectionKey}
          projectId={projectId}
          getReplacedImageSrc={getReplacedImageSrc}
          handleImageReplace={handleImageReplace}
          onImageReorder={handleImageReorder}
        />
      </div>
    </motion.section>
  );
};

export default ModernProjectContentSection;
