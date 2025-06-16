import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, X } from "lucide-react";
import MaximizableImage from "../MaximizableImage";
import EditableText from "@/components/dev/EditableText";
import EditImageButton from "@/components/dev/EditImageButton";
import AddContentButton from "@/components/dev/AddContentButton";
import DraggableContentBlock, { ContentBlock } from "@/components/dev/DraggableContentBlock";
import { useDevMode } from "@/context/DevModeContext";
import { useProjectPersistence } from "@/hooks/useProjectPersistence";
import { useProjectDataUpdater } from "@/hooks/useProjectDataUpdater";
import { useDevModeDatabase } from "@/hooks/useDevModeDatabase";

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
  const { getChanges, saveChange } = useDevModeDatabase(projectId);
  const { 
    saveImageReplacement, 
    getProjectData 
  } = useProjectPersistence(projectId);
  
  // Get images for this section
  const sectionImages = imageConfig[sectionKey] || [];
  
  // State management for content blocks
  const [contentBlocks, setContentBlocks] = React.useState<ContentBlock[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load content blocks from database on mount and when projectId changes
  React.useEffect(() => {
    const loadContentBlocks = async () => {
      console.log('🔄 ModernProjectContentSection: Loading content blocks for section:', sectionKey);
      setIsLoading(true);
      
      try {
        const changes = await getChanges();
        const savedBlocks = changes.contentBlocks[sectionKey] || [];
        console.log('📦 ModernProjectContentSection: Loaded content blocks for', sectionKey, ':', savedBlocks);
        setContentBlocks(savedBlocks);
      } catch (error) {
        console.error('❌ ModernProjectContentSection: Error loading content blocks:', error);
        setContentBlocks([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      loadContentBlocks();
    }
  }, [projectId, sectionKey, getChanges]);

  const [draggedImageIndex, setDraggedImageIndex] = React.useState<number | null>(null);

  // Listen for live content block updates
  React.useEffect(() => {
    const handleLiveContentBlockUpdate = (event: CustomEvent) => {
      if (event.detail?.sectionKey === sectionKey) {
        console.log('📦 ModernProjectContentSection: Received live content block update for:', sectionKey);
        setContentBlocks(event.detail.blocks || []);
      }
    };

    const handleProjectDataUpdate = async (event: any) => {
      if (event.detail?.contentBlocksChanged) {
        console.log('🔄 ModernProjectContentSection: Content blocks changed, reloading');
        try {
          const changes = await getChanges();
          const savedBlocks = changes.contentBlocks[sectionKey] || [];
          console.log('📦 ModernProjectContentSection: Reloaded content blocks for', sectionKey, ':', savedBlocks);
          setContentBlocks(savedBlocks);
        } catch (error) {
          console.error('❌ ModernProjectContentSection: Error reloading content blocks:', error);
        }
      }
    };

    window.addEventListener('liveContentBlockUpdate', handleLiveContentBlockUpdate as EventListener);
    window.addEventListener('projectDataUpdated', handleProjectDataUpdate);
    
    return () => {
      window.removeEventListener('liveContentBlockUpdate', handleLiveContentBlockUpdate as EventListener);
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate);
    };
  }, [projectId, sectionKey, getChanges]);

  const handleImageReplace = (imageSrc: string, newSrc: string) => {
    console.log('🖼️ ModernProjectContentSection: Replacing image', imageSrc, 'with', newSrc, 'for project', projectId);
    
    // Save the replacement persistently
    saveImageReplacement(imageSrc, newSrc);
    
    if (projectId) {
      updateImageInProjectData(projectId, imageSrc, newSrc);
    }
  };

  const createNewBlock = (type: 'text' | 'image' | 'header' | 'video' | 'pdf'): ContentBlock => {
    console.log('🆕 ModernProjectContentSection: Creating new block of type:', type);
    
    switch (type) {
      case 'text':
        return { type: 'text', value: 'This is a new paragraph. Click to edit me.' };
      case 'image':
        // Create image block without any src - this will show the upload placeholder
        return { type: 'image', caption: 'A newly added image.' };
      case 'header':
        return { type: 'header', value: 'New Header', level: 2 };
      case 'video':
        return { type: 'video', caption: 'A newly added video.' };
      case 'pdf':
        return { type: 'pdf', caption: 'A newly added PDF document.' };
      default:
        return { type: 'text', value: 'This is a new paragraph. Click to edit me.' };
    }
  };

  const saveContentBlocks = async (blocks: ContentBlock[]) => {
    console.log('💾 ModernProjectContentSection: Saving content blocks for section:', sectionKey, blocks);
    try {
      const success = await saveChange('content_block', sectionKey, blocks);
      if (success) {
        console.log('✅ ModernProjectContentSection: Successfully saved content blocks to database');
        // Dispatch event to notify other components
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { projectId, contentBlocksChanged: true }
        }));
      } else {
        console.error('❌ ModernProjectContentSection: Failed to save content blocks to database');
      }
    } catch (error) {
      console.error('❌ ModernProjectContentSection: Error saving content blocks:', error);
    }
  };

  const handleAddContent = async (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => {
    console.log('➕ ModernProjectContentSection: Adding new content of type:', type, 'to section:', sectionKey);
    const newBlock = createNewBlock(type);
    console.log('📦 ModernProjectContentSection: New block created:', newBlock);
    
    const updatedBlocks = [...contentBlocks, newBlock];
    console.log('📋 ModernProjectContentSection: Updated blocks list:', updatedBlocks);
    
    // Update state immediately for instant UI feedback
    setContentBlocks(updatedBlocks);
    
    // Save content blocks to database
    await saveContentBlocks(updatedBlocks);
    
    console.log('✅ ModernProjectContentSection: Content blocks updated and saved');
  };

  const handleUpdateContent = async (index: number, newValue: string) => {
    console.log('✏️ ModernProjectContentSection: Updating content at index:', index, 'with value:', newValue);
    const updatedBlocks = contentBlocks.map((block, i) => 
      i === index && (block.type === 'text' || block.type === 'header') 
        ? { ...block, value: newValue }
        : block
    );
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    await saveContentBlocks(updatedBlocks);
  };

  const handleDeleteContent = async (index: number) => {
    console.log('🗑️ ModernProjectContentSection: Deleting content at index:', index);
    const updatedBlocks = contentBlocks.filter((_, i) => i !== index);
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    await saveContentBlocks(updatedBlocks);
  };

  const handleContentImageReplace = async (index: number, newSrc: string) => {
    console.log('🔄 ModernProjectContentSection: Replacing content image at index', index, 'with', newSrc, 'for project', projectId);
    
    const oldBlock = contentBlocks[index];
    const updatedBlocks = contentBlocks.map((block, i) => 
      i === index && block.type === 'image'
        ? { ...block, src: newSrc }
        : block
    );
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    await saveContentBlocks(updatedBlocks);
    
    if (projectId && oldBlock && oldBlock.type === 'image' && oldBlock.src) {
      saveImageReplacement(oldBlock.src, newSrc);
      updateImageInProjectData(projectId, oldBlock.src, newSrc);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedImageIndex(index);
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex === dropIndex) return;

    const newBlocks = [...contentBlocks];
    const draggedBlock = newBlocks[dragIndex];
    
    newBlocks.splice(dragIndex, 1);
    const insertIndex = dragIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newBlocks.splice(insertIndex, 0, draggedBlock);
    
    setContentBlocks(newBlocks);
    setDraggedImageIndex(null);
    
    // Save reordered content blocks persistently
    saveContentBlocks(newBlocks);
  };

  const handleDragEnd = () => {
    setDraggedImageIndex(null);
  };

  // Get saved image replacements (now includes published overrides automatically)
  const getReplacedImageSrc = (originalSrc: string) => {
    const savedData = getProjectData();
    return savedData.imageReplacements[originalSrc] || originalSrc;
  };

  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card-elevated p-8 layered-depth relative group"
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
      className="glass-card-elevated p-8 layered-depth relative group"
    >
      {isDevMode && <AddContentButton onAdd={handleAddContent} />}
      
      <div className="space-y-8">
        {/* Section Title */}
        <EditableText 
          initialText={title}
          textKey={`${sectionKey}_title_${projectId}`}
        >
          {(text) => (
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
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
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </EditableText>

        {/* Additional Content Blocks */}
        {contentBlocks.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Additional Content ({contentBlocks.length} items):</h3>
            {contentBlocks.map((block, index) => (
              <div key={`${sectionKey}-${block.type}-${index}-${block.src || 'no-src'}`} className="border-l-4 border-blue-200 pl-4">
                <DraggableContentBlock
                  block={block}
                  index={index}
                  onUpdate={handleUpdateContent}
                  onDelete={handleDeleteContent}
                  onImageReplace={handleContentImageReplace}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  isDragging={draggedImageIndex === index}
                  projectId={projectId}
                />
              </div>
            ))}
          </div>
        )}

        {/* Section Images */}
        {sectionImages.length > 0 && (
          <div className="space-y-6">
            {sectionImages.map((imageSrc, index) => {
              const replacedSrc = getReplacedImageSrc(imageSrc);
              const caption = imageCaptions[imageSrc] || imageCaptions[replacedSrc] || `${title} illustration ${index + 1}`;
              
              return (
                <div key={`${sectionKey}-image-${index}`} className="glass-card p-4 layered-depth relative group">
                  <EditImageButton
                    src={replacedSrc}
                    onImageReplace={(newSrc) => handleImageReplace(imageSrc, newSrc)}
                    projectId={projectId}
                  />
                  <MaximizableImage
                    src={replacedSrc}
                    alt={caption}
                    caption={caption}
                    imageList={sectionImages.map(getReplacedImageSrc)}
                    currentIndex={index}
                    className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
                    onImageReplace={(newSrc) => handleImageReplace(imageSrc, newSrc)}
                    projectId={projectId}
                    hideEditButton={true}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ModernProjectContentSection;
