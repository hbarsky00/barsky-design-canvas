
import React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import EditableText from "@/components/dev/EditableText";
import AddContentButton from "@/components/dev/AddContentButton";
import DraggableContentBlock from "@/components/dev/DraggableContentBlock";
import SectionImages from "./SectionImages";
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

  const handleSectionImageRemove = (imageSrc: string, index: number) => {
    console.log('🗑️ ModernProjectContentSection: Removing section image:', imageSrc, 'at index:', index);
    
    // Replace the removed image with a transparent placeholder to effectively "remove" it
    const transparentPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+';
    
    // Save the replacement to effectively hide the image
    saveImageReplacement(imageSrc, transparentPlaceholder);
    
    if (projectId) {
      updateImageInProjectData(projectId, imageSrc, transparentPlaceholder);
    }
    
    toast.success('Image removed successfully');
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
      {isDevMode && <AddContentButton onAdd={handleAddContent} />}
      
      <div className="mobile-section-spacing">
        {/* Section Title */}
        <EditableText 
          initialText={title}
          textKey={`${sectionKey}_title_${projectId}`}
        >
          {(text) => (
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center">
              {text}
            </h2>
          )}
        </EditableText>
        
        {/* Section Content */}
        <EditableText 
          initialText={content} 
          multiline
          textKey={`${sectionKey}_content_${projectId}`}
        >
          {(text) => (
            <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
              {text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-3 sm:mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </EditableText>

        {/* Dynamic Additional Content Blocks */}
        {contentBlocks.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-1">
              <EditableText 
                initialText={contentHeader}
                textKey={`${sectionKey}_content_header_${projectId}`}
              >
                {(text) => (
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {text}
                  </h3>
                )}
              </EditableText>
              
              {contentBreakdown && (
                <p className="text-sm text-gray-500">
                  {contentBreakdown}
                </p>
              )}
            </div>
            
            {contentBlocks.map((block, index) => (
              <div key={`${sectionKey}-${block.type}-${index}-${block.src || block.embedUrl || 'no-src'}`} className="border-l-4 border-blue-200 pl-3 sm:pl-4">
                <DraggableContentBlock
                  block={block}
                  index={index}
                  onUpdate={handleUpdateContent}
                  onDelete={handleDeleteContent}
                  onImageReplace={wrappedHandleContentImageReplace}
                  onVideoUrlUpdate={handleVideoUrlUpdate}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  isDragging={draggedImageIndex === index}
                  projectId={projectId}
                  onAddContent={handleAddContent}
                />
              </div>
            ))}
          </div>
        )}

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
          onImageRemove={handleSectionImageRemove}
        />
      </div>
    </motion.section>
  );
};

export default ModernProjectContentSection;
