
import { useState, useCallback } from 'react';
import { ProjectContentItem } from '@/components/project/enhanced/DraggableProjectSection';

export const useDraggableContent = (initialItems: ProjectContentItem[] = []) => {
  const [items, setItems] = useState<ProjectContentItem[]>(initialItems);

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
