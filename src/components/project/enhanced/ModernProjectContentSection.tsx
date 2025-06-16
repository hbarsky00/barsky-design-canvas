import React, { useState } from "react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";
import { ProjectImageConfig } from "@/data/types/project";
import EditableText from "@/components/dev/EditableText";
import { useDevMode } from "@/context/DevModeContext";
import AddContentButton from "@/components/dev/AddContentButton";
import DraggableContentBlock, { ContentBlock } from "@/components/dev/DraggableContentBlock";

// Define a flexible content block structure locally
export type ContentBlock = 
  | { type: 'text'; value: string }
  | { type: 'image'; src: string; caption?: string };

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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  // Convert string content to array format for consistent handling
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(() => {
    if (typeof content === 'string') {
      return [{ type: 'text', value: content }];
    }
    return content;
  });

  // State for before header content blocks
  const [beforeHeaderBlocks, setBeforeHeaderBlocks] = useState<ContentBlock[]>([]);
  const [beforeHeaderDraggedIndex, setBeforeHeaderDraggedIndex] = useState<number | null>(null);

  // State for after header content blocks  
  const [afterHeaderBlocks, setAfterHeaderBlocks] = useState<ContentBlock[]>([]);
  const [afterHeaderDraggedIndex, setAfterHeaderDraggedIndex] = useState<number | null>(null);

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
    setContentBlocks(prev => [...prev, newBlock]);
  };

  const handleAddBeforeHeaderContent = (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => {
    const newBlock = createNewBlock(type);
    setBeforeHeaderBlocks(prev => [...prev, newBlock]);
  };

  const handleAddAfterHeaderContent = (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => {
    const newBlock = createNewBlock(type);
    setAfterHeaderBlocks(prev => [...prev, newBlock]);
  };

  const handleUpdateContent = (index: number, newValue: string) => {
    setContentBlocks(prev => 
      prev.map((block, i) => 
        i === index && (block.type === 'text' || block.type === 'header') 
          ? { ...block, value: newValue }
          : block
      )
    );
  };

  const handleUpdateBeforeHeaderContent = (index: number, newValue: string) => {
    setBeforeHeaderBlocks(prev => 
      prev.map((block, i) => 
        i === index && (block.type === 'text' || block.type === 'header') 
          ? { ...block, value: newValue }
          : block
      )
    );
  };

  const handleUpdateAfterHeaderContent = (index: number, newValue: string) => {
    setAfterHeaderBlocks(prev => 
      prev.map((block, i) => 
        i === index && (block.type === 'text' || block.type === 'header') 
          ? { ...block, value: newValue }
          : block
      )
    );
  };

  const handleDeleteContent = (index: number) => {
    if (contentBlocks.length > 1) {
      setContentBlocks(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleDeleteBeforeHeaderContent = (index: number) => {
    setBeforeHeaderBlocks(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteAfterHeaderContent = (index: number) => {
    setAfterHeaderBlocks(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleBeforeHeaderDragStart = (e: React.DragEvent, index: number) => {
    setBeforeHeaderDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleAfterHeaderDragStart = (e: React.DragEvent, index: number) => {
    setAfterHeaderDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newBlocks = [...contentBlocks];
    const draggedBlock = newBlocks[draggedIndex];
    newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(dropIndex, 0, draggedBlock);
    
    setContentBlocks(newBlocks);
    setDraggedIndex(null);
  };

  const handleBeforeHeaderDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (beforeHeaderDraggedIndex === null || beforeHeaderDraggedIndex === dropIndex) return;

    const newBlocks = [...beforeHeaderBlocks];
    const draggedBlock = newBlocks[beforeHeaderDraggedIndex];
    newBlocks.splice(beforeHeaderDraggedIndex, 1);
    newBlocks.splice(dropIndex, 0, draggedBlock);
    
    setBeforeHeaderBlocks(newBlocks);
    setBeforeHeaderDraggedIndex(null);
  };

  const handleAfterHeaderDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (afterHeaderDraggedIndex === null || afterHeaderDraggedIndex === dropIndex) return;

    const newBlocks = [...afterHeaderBlocks];
    const draggedBlock = newBlocks[afterHeaderDraggedIndex];
    newBlocks.splice(afterHeaderDraggedIndex, 1);
    newBlocks.splice(dropIndex, 0, draggedBlock);
    
    setAfterHeaderBlocks(newBlocks);
    setAfterHeaderDraggedIndex(null);
  };
  
  const sectionImages = imageConfig?.[sectionKey];
  const beforeHeaderImage = sectionImages?.beforeHeader;
  const afterHeaderImage = sectionImages?.afterHeader;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card-elevated p-8 space-y-8 layered-depth floating-element relative group"
    >
      {isDevMode && <AddContentButton onAdd={handleAddContent} />}
      
      {beforeHeaderImage && (
        <div className="glass-card p-4 layered-depth floating-element relative group">
          {isDevMode && (
            <div className="absolute top-2 left-2 z-20">
              <AddContentButton onAdd={handleAddBeforeHeaderContent} />
            </div>
          )}
          
          {/* Content blocks before the image */}
          {beforeHeaderBlocks.length > 0 && (
            <div className="space-y-4 mb-6">
              {beforeHeaderBlocks.map((block, index) => (
                <DraggableContentBlock
                  key={`before-header-${block.type}-${index}`}
                  block={block}
                  index={index}
                  onUpdate={handleUpdateBeforeHeaderContent}
                  onDelete={handleDeleteBeforeHeaderContent}
                  onDragStart={handleBeforeHeaderDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleBeforeHeaderDrop}
                  isDragging={beforeHeaderDraggedIndex === index}
                />
              ))}
            </div>
          )}
          
          <MaximizableImage
            src={beforeHeaderImage}
            alt={imageCaptions[beforeHeaderImage] || `${title} overview`}
            caption={imageCaptions[beforeHeaderImage]}
            className="rounded-lg shadow-elevated w-full"
          />
        </div>
      )}

      <EditableText initialText={title}>
        {(text) => (
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text pr-8">
            {text}
          </h2>
        )}
      </EditableText>

      {afterHeaderImage && (
        <div className="glass-card p-4 layered-depth floating-element relative group">
          {isDevMode && (
            <div className="absolute top-2 left-2 z-20">
              <AddContentButton onAdd={handleAddAfterHeaderContent} />
            </div>
          )}
          
          {/* Content blocks before the image */}
          {afterHeaderBlocks.length > 0 && (
            <div className="space-y-4 mb-6">
              {afterHeaderBlocks.map((block, index) => (
                <DraggableContentBlock
                  key={`after-header-${block.type}-${index}`}
                  block={block}
                  index={index}
                  onUpdate={handleUpdateAfterHeaderContent}
                  onDelete={handleDeleteAfterHeaderContent}
                  onDragStart={handleAfterHeaderDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleAfterHeaderDrop}
                  isDragging={afterHeaderDraggedIndex === index}
                />
              ))}
            </div>
          )}
          
          <MaximizableImage
            src={afterHeaderImage}
            alt={imageCaptions[afterHeaderImage] || `${title} details`}
            caption={imageCaptions[afterHeaderImage]}
            className="rounded-lg shadow-elevated w-full"
          />
        </div>
      )}

      <div className="space-y-4">
        {contentBlocks.map((block, index) => (
          <DraggableContentBlock
            key={`${block.type}-${index}`}
            block={block}
            index={index}
            onUpdate={handleUpdateContent}
            onDelete={handleDeleteContent}
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
