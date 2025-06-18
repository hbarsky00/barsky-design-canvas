
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDevMode } from '@/context/DevModeContext';
import EditableText from '@/components/dev/EditableText';
import MaximizableImage from '@/components/project/MaximizableImage';
import ContentOrderingControls from '@/components/dev/ContentOrderingControls';

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

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newItems = [...sortedItems];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      
      // Update order values
      const reorderedItems = newItems.map((item, idx) => ({
        ...item,
        order: idx
      }));

      onItemsReorder(reorderedItems);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < sortedItems.length - 1) {
      const newItems = [...sortedItems];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      
      // Update order values
      const reorderedItems = newItems.map((item, idx) => ({
        ...item,
        order: idx
      }));

      onItemsReorder(reorderedItems);
    }
  };

  const handleDelete = (index: number) => {
    const itemToDelete = sortedItems[index];
    onItemDelete(itemToDelete.id);
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
          className="relative group"
        >
          <ContentOrderingControls
            index={index}
            totalItems={sortedItems.length}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onDelete={handleDelete}
          />

          {item.type === 'text' ? (
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <EditableText
                initialText={item.content}
                multiline
                textKey={`draggable-item-${item.id}`}
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
