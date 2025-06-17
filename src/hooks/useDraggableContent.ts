
import { useState, useCallback, useEffect } from 'react';
import { ProjectContentItem } from '@/components/project/enhanced/DraggableProjectSection';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { useParams } from 'react-router-dom';

export const useDraggableContent = (initialItems: ProjectContentItem[] = []) => {
  const { projectId } = useParams<{ projectId: string }>();
  const safeProjectId = projectId || '';
  const { getChanges } = useDevModeDatabase(safeProjectId);
  const [items, setItems] = useState<ProjectContentItem[]>(initialItems);

  // Listen for text updates from EditableText components
  useEffect(() => {
    const handleProjectDataUpdated = async (event: CustomEvent) => {
      if (event.detail.textChanged && event.detail.projectId === safeProjectId) {
        try {
          const changes = await getChanges();
          setItems(prev => prev.map(item => {
            if (item.type === 'text') {
              const textKey = `draggable-item-${item.id}`;
              const updatedContent = changes.textContent[textKey];
              if (updatedContent !== undefined) {
                return { ...item, content: updatedContent };
              }
            }
            return item;
          }));
        } catch (error) {
          console.error('Error updating draggable content from text changes:', error);
        }
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdated as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdated as EventListener);
    };
  }, [safeProjectId, getChanges]);

  const handleItemsReorder = useCallback((newItems: ProjectContentItem[]) => {
    setItems(newItems);
  }, []);

  const handleItemUpdate = useCallback((id: string, newContent: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, content: newContent } : item
    ));
  }, []);

  const handleItemDelete = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleItemAdd = useCallback((type: 'text' | 'image') => {
    const newItem: ProjectContentItem = {
      id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: type === 'text' 
        ? 'This is a new paragraph. Click to edit me.' 
        : '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png',
      order: items.length
    };
    
    setItems(prev => [...prev, newItem]);
  }, [items.length]);

  return {
    items,
    setItems,
    handleItemsReorder,
    handleItemUpdate,
    handleItemDelete,
    handleItemAdd
  };
};
