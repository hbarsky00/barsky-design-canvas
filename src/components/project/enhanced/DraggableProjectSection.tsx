
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GripVertical, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDevMode } from '@/context/DevModeContext';
import EditableText from '@/components/dev/EditableText';
import MaximizableImage from '@/components/project/MaximizableImage';

export interface ProjectContentItem {
  id: string;
  type: 'text' | 'image';
  content: string;
  order: number;
}

interface DraggableProjectSectionProps {
  items: ProjectContentItem[];
  onItemsReorder: (newItems: ProjectContentItem[]) => void;
  onItemUpdate: (id: string, newContent: string) => void;
  onItemDelete: (id: string) => void;
  onItemAdd: (type: 'text' | 'image') => void;
  title?: string;
  projectId?: string;
}

const DraggableProjectSection: React.FC<DraggableProjectSectionProps> = ({
  items,
  onItemsReorder,
  onItemUpdate,
  onItemDelete,
  onItemAdd,
  title,
  projectId
}) => {
  const { isDevMode } = useDevMode();
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData('text/plain');
    
    if (!draggedItemId || draggedItemId === items[targetIndex]?.id) {
      setDraggedItem(null);
      return;
    }

    const draggedIndex = items.findIndex(item => item.id === draggedItemId);
    if (draggedIndex === -1) return;

    const newItems = [...items];
    const [draggedItemData] = newItems.splice(draggedIndex, 1);
    
    // Insert at the target position
    const insertIndex = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex;
    newItems.splice(insertIndex, 0, draggedItemData);
    
    // Update order values
    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index
    }));

    onItemsReorder(reorderedItems);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          {isDevMode && (
            <div className="flex gap-2">
              <Button
                onClick={() => onItemAdd('text')}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Text
              </Button>
              <Button
                onClick={() => onItemAdd('image')}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Image
              </Button>
            </div>
          )}
        </div>
      )}
      
      {sortedItems.map((item, index) => (
        <motion.div
          key={item.id}
          layout
          className={`relative group ${
            draggedItem === item.id ? 'opacity-50' : ''
          }`}
          draggable={isDevMode}
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
        >
          {isDevMode && (
            <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 bg-background/80 backdrop-blur-sm cursor-grab active:cursor-grabbing"
                title="Drag to reorder"
              >
                <GripVertical className="h-3 w-3" />
              </Button>
              <Button
                onClick={() => onItemDelete(item.id)}
                variant="destructive"
                size="icon"
                className="h-6 w-6"
                title="Delete item"
              >
                ×
              </Button>
            </div>
          )}

          {item.type === 'text' ? (
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <EditableText
                initialText={item.content}
                multiline
                onTextChange={(newText) => onItemUpdate(item.id, newText)}
              >
                {(text) => (
                  <div className="pr-8">
                    {text.split('\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </EditableText>
            </div>
          ) : (
            <div className="glass-card p-4 layered-depth">
              <MaximizableImage
                src={item.content}
                alt={`Content image ${index + 1}`}
                className="rounded-lg shadow-elevated w-full"
                onImageReplace={(newSrc) => onItemUpdate(item.id, newSrc)}
                onImageRemove={() => onItemDelete(item.id)}
                projectId={projectId}
                allowRemove={true}
              />
            </div>
          )}
        </motion.div>
      ))}
      
      {sortedItems.length === 0 && isDevMode && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">No content yet. Add some text or images.</p>
          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => onItemAdd('text')}
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Text
            </Button>
            <Button
              onClick={() => onItemAdd('image')}
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DraggableProjectSection;
