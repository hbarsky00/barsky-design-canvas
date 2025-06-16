
import React from 'react';
import { motion } from 'framer-motion';
import { GripVertical, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDevMode } from '@/context/DevModeContext';
import EditableText from './EditableText';
import MaximizableImage from '../project/MaximizableImage';

// Updated ContentBlock type to include new content types
export type ContentBlock = 
  | { type: 'text'; value: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'header'; value: string; level?: 1 | 2 | 3 | 4 | 5 | 6 }
  | { type: 'video'; src: string; caption?: string }
  | { type: 'pdf'; src: string; caption?: string };

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

  const renderContent = () => {
    switch (block.type) {
      case 'text':
        return (
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
        );

      case 'header':
        const HeaderTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
        const headerClasses = {
          1: "text-4xl font-bold text-gray-900 mb-6",
          2: "text-3xl font-bold text-gray-900 mb-5",
          3: "text-2xl font-semibold text-gray-900 mb-4",
          4: "text-xl font-semibold text-gray-900 mb-3",
          5: "text-lg font-medium text-gray-900 mb-3",
          6: "text-base font-medium text-gray-900 mb-2"
        };

        return (
          <EditableText 
            initialText={block.value}
            onSave={(newText) => onUpdate(index, newText)}
          >
            {(text) => (
              <HeaderTag className={`${headerClasses[block.level || 2]} pr-8`}>
                {text}
              </HeaderTag>
            )}
          </EditableText>
        );

      case 'image':
        return (
          <div className="my-8">
            <div className="glass-card p-4 layered-depth floating-element">
              <MaximizableImage
                src={block.src}
                alt={block.caption || `Content image`}
                caption={block.caption}
                className="w-full rounded-lg shadow-elevated"
              />
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="my-8">
            <div className="glass-card p-4 layered-depth">
              <video 
                src={block.src} 
                controls 
                className="w-full rounded-lg"
                poster="/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png"
              >
                Your browser does not support the video tag.
              </video>
              {block.caption && (
                <div className="mt-2 text-sm text-gray-600 italic text-center">
                  <EditableText initialText={block.caption}>
                    {(text) => <span className="pr-8">{text}</span>}
                  </EditableText>
                </div>
              )}
            </div>
          </div>
        );

      case 'pdf':
        return (
          <div className="my-8">
            <div className="glass-card p-4 layered-depth">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">PDF Document</p>
                <a 
                  href={block.src} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View PDF
                </a>
              </div>
              {block.caption && (
                <div className="mt-2 text-sm text-gray-600 italic text-center">
                  <EditableText initialText={block.caption}>
                    {(text) => <span className="pr-8">{text}</span>}
                  </EditableText>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      layout
      className={`relative group ${isDragging ? 'opacity-50 scale-95' : ''} transition-all duration-200`}
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
            className="h-6 w-6 bg-background/90 backdrop-blur-sm cursor-grab active:cursor-grabbing border border-blue-200 hover:border-blue-400"
            title="Drag to reorder"
          >
            <GripVertical className="h-3 w-3 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 bg-background/90 backdrop-blur-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400"
            onClick={() => onDelete(index)}
            title="Delete content"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div className={`${isDevMode ? 'ml-8' : ''} ${isDragging ? 'pointer-events-none' : ''}`}>
        {renderContent()}
      </div>

      {/* Drop zone indicator */}
      {isDevMode && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-blue-100 border-2 border-dashed border-blue-300 rounded-lg pointer-events-none transition-opacity" />
      )}
    </motion.div>
  );
};

export default DraggableContentBlock;
