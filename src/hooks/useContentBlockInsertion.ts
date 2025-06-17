
import { useState, useCallback } from 'react';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

export const useContentBlockInsertion = () => {
  const [insertionPosition, setInsertionPosition] = useState<number | null>(null);

  const insertContentAtPosition = useCallback((
    contentBlocks: ContentBlock[],
    newBlock: ContentBlock,
    position: number
  ): ContentBlock[] => {
    const updatedBlocks = [...contentBlocks];
    updatedBlocks.splice(position, 0, newBlock);
    return updatedBlocks;
  }, []);

  const findInsertionPositionAfterHeader = useCallback((
    contentBlocks: ContentBlock[],
    headerIndex: number
  ): number => {
    // Insert right after the header (before any following content)
    return headerIndex + 1;
  }, []);

  return {
    insertionPosition,
    setInsertionPosition,
    insertContentAtPosition,
    findInsertionPositionAfterHeader
  };
};
