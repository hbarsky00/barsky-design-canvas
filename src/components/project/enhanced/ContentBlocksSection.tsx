
import React from 'react';
import DraggableContentBlock, { ContentBlock } from '@/components/dev/DraggableContentBlock';
import AddContentButton from '@/components/dev/AddContentButton';
import { useDevMode } from '@/context/DevModeContext';

interface ContentBlocksSectionProps {
  blocks: ContentBlock[];
  onUpdate: (index: number, newValue: string) => void;
  onDelete: (index: number) => void;
  onImageReplace: (index: number, newSrc: string) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  draggedIndex: number | null;
  onAdd: (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => void;
  keyPrefix: string;
  className?: string;
}

const ContentBlocksSection: React.FC<ContentBlocksSectionProps> = ({
  blocks,
  onUpdate,
  onDelete,
  onImageReplace,
  onDragStart,
  onDragOver,
  onDrop,
  draggedIndex,
  onAdd,
  keyPrefix,
  className = "space-y-4"
}) => {
  const { isDevMode } = useDevMode();

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className={`${className} relative group`}>
      {isDevMode && (
        <div className="absolute top-2 left-2 z-20">
          <AddContentButton onAdd={onAdd} />
        </div>
      )}
      
      {blocks.map((block, index) => (
        <DraggableContentBlock
          key={`${keyPrefix}-${block.type}-${index}`}
          block={block}
          index={index}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onImageReplace={onImageReplace}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          isDragging={draggedIndex === index}
        />
      ))}
    </div>
  );
};

export default ContentBlocksSection;
