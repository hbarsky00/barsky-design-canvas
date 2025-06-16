
import React from 'react';
import { GripVertical, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDevMode } from '@/context/DevModeContext';
import EditableText from './EditableText';
import MaximizableImage from '@/components/project/MaximizableImage';

export interface ContentBlock {
  type: 'text' | 'image' | 'header' | 'video' | 'pdf';
  value?: string;
  src?: string;
  caption?: string;
  level?: number; // for header levels
}

interface DraggableContentBlockProps {
  block: ContentBlock;
  index: number;
  onUpdate: (index: number, newValue: string) => void;
  onDelete: (index: number) => void;
  onImageReplace?: (index: number, newSrc: string) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  isDragging: boolean;
}

const DraggableContentBlock: React.FC<DraggableContentBlockProps> = ({
  block,
  index,
  onUpdate,
  onDelete,
  onImageReplace,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging
}) => {
  const { isDevMode } = useDevMode();

  const handleImageReplace = (newSrc: string) => {
    if (onImageReplace) {
      console.log('DraggableContentBlock: Calling onImageReplace for index', index, 'with', newSrc);
      onImageReplace(index, newSrc);
    } else {
      console.log('DraggableContentBlock: No onImageReplace callback provided for index', index);
    }
  };

  const renderContent = () => {
    switch (block.type) {
      case 'text':
        return (
          <EditableText initialText={block.value || ''} multiline>
            {(text) => (
              <div className="prose prose-slate max-w-none dark:prose-invert pr-8">
                {text.split('\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </EditableText>
        );

      case 'header':
        const HeaderTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <EditableText initialText={block.value || ''}>
            {(text) => (
              <HeaderTag className={`font-bold text-gray-900 pr-8 ${
                block.level === 1 ? 'text-4xl' : 
                block.level === 2 ? 'text-3xl' : 
                block.level === 3 ? 'text-2xl' : 'text-xl'
              }`}>
                {text}
              </HeaderTag>
            )}
          </EditableText>
        );

      case 'image':
        return (
          <div className="glass-card p-4 layered-depth floating-element">
            <MaximizableImage
              src={block.src || ''}
              alt={block.caption || 'Content image'}
              caption={block.caption}
              className="rounded-lg shadow-elevated w-full"
              onImageReplace={handleImageReplace}
            />
          </div>
        );

      case 'video':
        return (
          <div className="glass-card p-4 layered-depth floating-element">
            <video 
              src={block.src} 
              controls 
              className="w-full rounded-lg shadow-elevated"
              poster={block.src}
            >
              Your browser does not support the video tag.
            </video>
            {block.caption && (
              <EditableText initialText={block.caption}>
                {(text) => (
                  <p className="text-sm text-gray-600 mt-2 italic text-center pr-8">
                    {text}
                  </p>
                )}
              </EditableText>
            )}
          </div>
        );

      case 'pdf':
        return (
          <div className="glass-card p-4 layered-depth floating-element">
            <embed 
              src={block.src} 
              type="application/pdf" 
              className="w-full h-96 rounded-lg shadow-elevated"
            />
            {block.caption && (
              <EditableText initialText={block.caption}>
                {(text) => (
                  <p className="text-sm text-gray-600 mt-2 italic text-center pr-8">
                    {text}
                  </p>
                )}
              </EditableText>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`relative group ${isDragging ? 'opacity-50' : ''}`}
      draggable={isDevMode}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
    >
      {isDevMode && (
        <div className="absolute top-2 right-2 z-30 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 bg-background/80 backdrop-blur-sm cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
          >
            <GripVertical className="h-3 w-3" />
          </Button>
          <Button
            onClick={() => onDelete(index)}
            variant="destructive"
            size="icon"
            className="h-6 w-6"
            title="Delete content"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      {renderContent()}
    </div>
  );
};

export default DraggableContentBlock;
