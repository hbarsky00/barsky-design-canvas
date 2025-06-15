
import React from 'react';
import { motion } from 'framer-motion';
import { GripVertical, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDevMode } from '@/context/DevModeContext';
import EditableText from './EditableText';
import MaximizableImage from '../project/MaximizableImage';
import { ContentBlock } from '../project/enhanced/ModernProjectContentSection';

interface DraggableContentBlockProps {
  block: ContentBlock;
  index: number;
  onUpdate: (index: number, newValue: string) => void;
  onDelete: (index: number) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, dropIndex: number) => void;
  isDragging: boolean;
}

const DraggableContentBlock: React.FC<DraggableContentBlockProps> = ({
  block,
  index,
  onUpdate,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging
}) => {
  const { isDevMode } = useDevMode();

  return (
    <motion.div
      layout
      className={`relative group ${isDragging ? 'opacity-50' : ''}`}
      draggable={isDevMode}
      onDragStart={(e) => onDragStart(e as any, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e as any, index)}
    >
      {isDevMode && (
        <div className="absolute left-0 top-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 bg-background/80 backdrop-blur-sm cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
          >
            <GripVertical className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 bg-background/80 backdrop-blur-sm text-red-500 hover:text-red-700"
            onClick={() => onDelete(index)}
            title="Delete content"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div className={isDevMode ? 'ml-8' : ''}>
        {block.type === 'text' ? (
          <EditableText 
            initialText={block.value} 
            multiline
            onSave={(newText) => onUpdate(index, newText)}
          >
            {(text) => (
              <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none pr-8">
                {text.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-4">{paragraph}</p>
                ))}
              </div>
            )}
          </EditableText>
        ) : (
          <div className="my-8">
            <MaximizableImage
              src={block.src}
              alt={block.caption || `Content image`}
              caption={block.caption}
              className="w-full"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DraggableContentBlock;
