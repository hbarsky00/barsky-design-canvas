
import React from 'react';
import DraggableContentBlock, { ContentBlock } from '@/components/dev/DraggableContentBlock';
import { useContentBlocksManager } from '@/hooks/useContentBlocksManager';
import AddContentButton from '@/components/dev/AddContentButton';
import { useDevMode } from '@/context/DevModeContext';

interface ContentBlocksSectionProps {
  projectId: string;
  sectionKey: string;
  title?: string;
  className?: string;
}

const ContentBlocksSection: React.FC<ContentBlocksSectionProps> = ({
  projectId,
  sectionKey,
  title,
  className = ""
}) => {
  const { isDevMode } = useDevMode();
  const {
    contentBlocks,
    setContentBlocks,
    isLoading,
    saveContentBlocks
  } = useContentBlocksManager(projectId, sectionKey);

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newBlocks = [...contentBlocks];
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
      setContentBlocks(newBlocks);
      saveContentBlocks(newBlocks);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < contentBlocks.length - 1) {
      const newBlocks = [...contentBlocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setContentBlocks(newBlocks);
      saveContentBlocks(newBlocks);
    }
  };

  const handleContentUpdate = (index: number, newValue: string) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index] = { ...newBlocks[index], value: newValue };
    setContentBlocks(newBlocks);
    saveContentBlocks(newBlocks);
  };

  const handleHeaderLevelChange = (index: number, level: 1 | 2 | 3) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index] = { ...newBlocks[index], level };
    setContentBlocks(newBlocks);
    saveContentBlocks(newBlocks);
  };

  const handleImageReplace = (index: number, newSrc: string) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index] = { ...newBlocks[index], src: newSrc };
    setContentBlocks(newBlocks);
    saveContentBlocks(newBlocks);
  };

  const handleImageRemove = (index: number) => {
    const newBlocks = contentBlocks.filter((_, i) => i !== index);
    setContentBlocks(newBlocks);
    saveContentBlocks(newBlocks);
  };

  const handleVideoUrlUpdate = (index: number, newUrl: string) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index] = { ...newBlocks[index], embedUrl: newUrl };
    setContentBlocks(newBlocks);
    saveContentBlocks(newBlocks);
  };

  const handleDelete = (index: number) => {
    const newBlocks = contentBlocks.filter((_, i) => i !== index);
    setContentBlocks(newBlocks);
    saveContentBlocks(newBlocks);
  };

  const handleAddContent = (type: 'text' | 'image' | 'header' | 'video' | 'pdf', position?: number) => {
    const newBlock: ContentBlock = {
      type,
      value: type === 'text' ? 'New text content...' : type === 'header' ? 'New Header' : '',
      src: type === 'image' ? '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png' : type === 'pdf' ? '' : undefined,
      embedUrl: type === 'video' ? 'placeholder' : undefined,
      level: type === 'header' ? 2 : undefined
    };

    const newBlocks = [...contentBlocks];
    if (position !== undefined) {
      newBlocks.splice(position, 0, newBlock);
    } else {
      newBlocks.push(newBlock);
    }
    
    setContentBlocks(newBlocks);
    saveContentBlocks(newBlocks);
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      {contentBlocks.length === 0 && isDevMode && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">No content blocks yet. Add some content to get started.</p>
          <AddContentButton onAdd={handleAddContent} />
        </div>
      )}

      <div className="space-y-4">
        {contentBlocks.map((block, index) => (
          <DraggableContentBlock
            key={index}
            block={block}
            index={index}
            totalBlocks={contentBlocks.length}
            onUpdate={handleContentUpdate}
            onDelete={handleDelete}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onImageReplace={handleImageReplace}
            onImageRemove={handleImageRemove}
            onVideoUrlUpdate={handleVideoUrlUpdate}
            onHeaderLevelChange={handleHeaderLevelChange}
            projectId={projectId}
            onAddContent={handleAddContent}
          />
        ))}
      </div>

      {isDevMode && contentBlocks.length > 0 && (
        <div className="flex justify-center pt-4">
          <AddContentButton onAdd={handleAddContent} />
        </div>
      )}
    </div>
  );
};

export default ContentBlocksSection;
