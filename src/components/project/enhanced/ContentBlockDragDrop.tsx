
import React from 'react';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

export const useContentBlockDragDrop = (
  contentBlocks: ContentBlock[],
  setContentBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>,
  saveContentBlocks: (blocks: ContentBlock[]) => Promise<void>
) => {
  const [draggedImageIndex, setDraggedImageIndex] = React.useState<number | null>(null);

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

  return {
    draggedImageIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  };
};
