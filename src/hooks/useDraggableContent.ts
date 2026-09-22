
import { useState, useCallback } from 'react';

export const useDraggableContent = (projectId: string) => {
  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addContentBlock = useCallback((type: string, content: any) => {
    console.log('Adding content block:', type, content);
  }, []);

  const removeContentBlock = useCallback((id: string) => {
    console.log('Removing content block:', id);
  }, []);

  const reorderContentBlocks = useCallback((newOrder: any[]) => {
    console.log('Reordering content blocks:', newOrder);
  }, []);

  return {
    contentBlocks,
    isLoading,
    addContentBlock,
    removeContentBlock,
    reorderContentBlocks
  };
};
