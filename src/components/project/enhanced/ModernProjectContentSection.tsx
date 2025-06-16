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
  console.log('ModernProjectContentSection: projectId received:', projectId, typeof projectId);
  console.log('ModernProjectContentSection: title:', title);
  
  const { isDevMode } = useDevMode();
  const { updateImageInProjectData } = useProjectDataUpdater();
  const { 
    saveImageReplacement, 
    saveContentBlocks, 
    getProjectData 
  } = useProjectPersistence(projectId);
  
  // Get images for this section
  const sectionImages = imageConfig[sectionKey] || [];
  
  // Load saved content blocks
  const [contentBlocks, setContentBlocks] = React.useState<ContentBlock[]>(() => {
    const savedData = getProjectData();
    return savedData.contentBlocks[sectionKey] || [];
  });

  const [draggedImageIndex, setDraggedImageIndex] = React.useState<number | null>(null);

  // Force re-render when project data updates (including published changes)
  React.useEffect(() => {
    const handleProjectDataUpdate = () => {
      console.log('ModernProjectContentSection: Project data updated, reloading content blocks');
      const savedData = getProjectData();
      setContentBlocks(savedData.contentBlocks[sectionKey] || []);
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate);
    };
  }, [projectId, sectionKey, getProjectData]);

  const handleImageReplace = (imageSrc: string, newSrc: string) => {
    console.log('ModernProjectContentSection: Replacing image', imageSrc, 'with', newSrc, 'for project', projectId);
    
    // Save the replacement persistently
    saveImageReplacement(imageSrc, newSrc);
    
    if (projectId) {
      updateImageInProjectData(projectId, imageSrc, newSrc);
    }
  };

  const createNewBlock = (type: 'text' | 'image' | 'header' | 'video' | 'pdf'): ContentBlock => {
    switch (type) {
      case 'text':
        return { type: 'text', value: 'This is a new paragraph. Click to edit me.' };
      case 'image':
        return { type: 'image', src: '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png', caption: 'A newly added image.' };
      case 'header':
        return { type: 'header', value: 'New Header', level: 2 };
      case 'video':
        return { type: 'video', src: '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png', caption: 'A newly added video.' };
      case 'pdf':
        return { type: 'pdf', src: '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png', caption: 'A newly added PDF document.' };
      default:
        return { type: 'text', value: 'This is a new paragraph. Click to edit me.' };
    }
  };

  const handleAddContent = (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => {
    const newBlock = createNewBlock(type);
    const updatedBlocks = [...contentBlocks, newBlock];
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    saveContentBlocks(sectionKey, updatedBlocks);
  };

  const handleUpdateContent = (index: number, newValue: string) => {
    const updatedBlocks = contentBlocks.map((block, i) => 
      i === index && (block.type === 'text' || block.type === 'header') 
        ? { ...block, value: newValue }
        : block
    );
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    saveContentBlocks(sectionKey, updatedBlocks);
  };

  const handleDeleteContent = (index: number) => {
    const updatedBlocks = contentBlocks.filter((_, i) => i !== index);
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    saveContentBlocks(sectionKey, updatedBlocks);
  };

  const handleContentImageReplace = (index: number, newSrc: string) => {
    console.log('ModernProjectContentSection: Replacing content image at index', index, 'with', newSrc, 'for project', projectId);
    
    const oldBlock = contentBlocks[index];
    const updatedBlocks = contentBlocks.map((block, i) => 
      i === index && block.type === 'image'
        ? { ...block, src: newSrc }
        : block
    );
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    saveContentBlocks(sectionKey, updatedBlocks);
    
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
    saveContentBlocks(sectionKey, newBlocks);
  };

  const handleDragEnd = () => {
    setDraggedImageIndex(null);
  };

  // Get saved image replacements (now includes published overrides automatically)
  const getReplacedImageSrc = (originalSrc: string) => {
    const savedData = getProjectData();
    return savedData.imageReplacements[originalSrc] || originalSrc;
  };

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
            {contentBlocks.map((block, index) => (
              <DraggableContentBlock
                key={`${sectionKey}-${block.type}-${index}`}
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
