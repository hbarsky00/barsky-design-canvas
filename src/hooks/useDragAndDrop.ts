
import { useState } from 'react';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

export const useDragAndDrop = (
  contentBlocks: ContentBlock[],
  setContentBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>,
  beforeHeaderBlocks: ContentBlock[],
  setBeforeHeaderBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>,
  afterHeaderBlocks: ContentBlock[],
  setAfterHeaderBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>
) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [beforeHeaderDraggedIndex, setBeforeHeaderDraggedIndex] = useState<number | null>(null);
  const [afterHeaderDraggedIndex, setAfterHeaderDraggedIndex] = useState<number | null>(null);

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
    handleAfterHeaderDrop
  };
};
