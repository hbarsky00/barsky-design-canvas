
import { useState } from 'react';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

export const useDragAndDrop = (
  contentBlocks: ContentBlock[],
  setContentBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>,
  beforeHeaderBlocks: ContentBlock[],
  setBeforeHeaderBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>,
  afterHeaderBlocks: ContentBlock[],
  setAfterHeaderBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>,
  saveContentBlocks?: (blocks: ContentBlock[]) => Promise<void>
) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [beforeHeaderDraggedIndex, setBeforeHeaderDraggedIndex] = useState<number | null>(null);
  const [afterHeaderDraggedIndex, setAfterHeaderDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleBeforeHeaderDragStart = (e: React.DragEvent, index: number) => {
    setBeforeHeaderDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleAfterHeaderDragStart = (e: React.DragEvent, index: number) => {
    setAfterHeaderDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newBlocks = [...contentBlocks];
    const draggedBlock = newBlocks[draggedIndex];
    newBlocks.splice(draggedIndex, 1);
    
    // Adjust drop index if dragging from before the drop position
    const adjustedDropIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newBlocks.splice(adjustedDropIndex, 0, draggedBlock);
    
    setContentBlocks(newBlocks);
    setDraggedIndex(null);
    
    // Save changes if function provided
    if (saveContentBlocks) {
      await saveContentBlocks(newBlocks);
    }
  };

  const handleBeforeHeaderDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (beforeHeaderDraggedIndex === null || beforeHeaderDraggedIndex === dropIndex) {
      setBeforeHeaderDraggedIndex(null);
      return;
    }

    const newBlocks = [...beforeHeaderBlocks];
    const draggedBlock = newBlocks[beforeHeaderDraggedIndex];
    newBlocks.splice(beforeHeaderDraggedIndex, 1);
    
    const adjustedDropIndex = beforeHeaderDraggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newBlocks.splice(adjustedDropIndex, 0, draggedBlock);
    
    setBeforeHeaderBlocks(newBlocks);
    setBeforeHeaderDraggedIndex(null);
  };

  const handleAfterHeaderDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (afterHeaderDraggedIndex === null || afterHeaderDraggedIndex === dropIndex) {
      setAfterHeaderDraggedIndex(null);
      return;
    }

    const newBlocks = [...afterHeaderBlocks];
    const draggedBlock = newBlocks[afterHeaderDraggedIndex];
    newBlocks.splice(afterHeaderDraggedIndex, 1);
    
    const adjustedDropIndex = afterHeaderDraggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newBlocks.splice(adjustedDropIndex, 0, draggedBlock);
    
    setAfterHeaderBlocks(newBlocks);
    setAfterHeaderDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setBeforeHeaderDraggedIndex(null);
    setAfterHeaderDraggedIndex(null);
  };

  return {
    draggedIndex,
    beforeHeaderDraggedIndex,
    afterHeaderDraggedIndex,
    handleDragStart,
    handleBeforeHeaderDragStart,
    handleAfterHeaderDragStart,
    handleDragOver,
    handleDrop,
    handleBeforeHeaderDrop,
    handleAfterHeaderDrop,
    handleDragEnd
  };
};
