
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

export const useContentHandlers = (
  contentBlocks: ContentBlock[],
  setContentBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>,
  beforeHeaderBlocks: ContentBlock[],
  setBeforeHeaderBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>,
  afterHeaderBlocks: ContentBlock[],
  setAfterHeaderBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>,
  createNewBlock: (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => ContentBlock
) => {
  // Main content handlers
  const handleAddContent = (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => {
    const newBlock = createNewBlock(type);
    setContentBlocks(prev => [...prev, newBlock]);
  };

  const handleUpdateContent = (index: number, newValue: string) => {
    setContentBlocks(prev => 
      prev.map((block, i) => 
        i === index && (block.type === 'text' || block.type === 'header') 
          ? { ...block, value: newValue }
          : block
      )
    );
  };

  const handleDeleteContent = (index: number) => {
    if (contentBlocks.length > 1) {
      setContentBlocks(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleImageReplace = (index: number, newSrc: string) => {
    console.log('ModernProjectContentSection: Replacing image at index', index, 'with', newSrc);
    setContentBlocks(prev => 
      prev.map((block, i) => 
        i === index && block.type === 'image'
          ? { ...block, src: newSrc }
          : block
      )
    );
  };

  // Before header handlers
  const handleAddBeforeHeaderContent = (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => {
    const newBlock = createNewBlock(type);
    setBeforeHeaderBlocks(prev => [...prev, newBlock]);
  };

  const handleUpdateBeforeHeaderContent = (index: number, newValue: string) => {
    setBeforeHeaderBlocks(prev => 
      prev.map((block, i) => 
        i === index && (block.type === 'text' || block.type === 'header') 
          ? { ...block, value: newValue }
          : block
      )
    );
  };

  const handleDeleteBeforeHeaderContent = (index: number) => {
    setBeforeHeaderBlocks(prev => prev.filter((_, i) => i !== index));
  };

  const handleBeforeHeaderImageReplace = (index: number, newSrc: string) => {
    console.log('ModernProjectContentSection: Replacing before header image at index', index, 'with', newSrc);
    setBeforeHeaderBlocks(prev => 
      prev.map((block, i) => 
        i === index && block.type === 'image'
          ? { ...block, src: newSrc }
          : block
      )
    );
  };

  // After header handlers
  const handleAddAfterHeaderContent = (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => {
    const newBlock = createNewBlock(type);
    setAfterHeaderBlocks(prev => [...prev, newBlock]);
  };

  const handleUpdateAfterHeaderContent = (index: number, newValue: string) => {
    setAfterHeaderBlocks(prev => 
      prev.map((block, i) => 
        i === index && (block.type === 'text' || block.type === 'header') 
          ? { ...block, value: newValue }
          : block
      )
    );
  };

  const handleDeleteAfterHeaderContent = (index: number) => {
    setAfterHeaderBlocks(prev => prev.filter((_, i) => i !== index));
  };

  const handleAfterHeaderImageReplace = (index: number, newSrc: string) => {
    console.log('ModernProjectContentSection: Replacing after header image at index', index, 'with', newSrc);
    setAfterHeaderBlocks(prev => 
      prev.map((block, i) => 
        i === index && block.type === 'image'
          ? { ...block, src: newSrc }
          : block
      )
    );
  };

  return {
    // Main content
    handleAddContent,
    handleUpdateContent,
    handleDeleteContent,
    handleImageReplace,
    // Before header
    handleAddBeforeHeaderContent,
    handleUpdateBeforeHeaderContent,
    handleDeleteBeforeHeaderContent,
    handleBeforeHeaderImageReplace,
    // After header
    handleAddAfterHeaderContent,
    handleUpdateAfterHeaderContent,
    handleDeleteAfterHeaderContent,
    handleAfterHeaderImageReplace
  };
};
