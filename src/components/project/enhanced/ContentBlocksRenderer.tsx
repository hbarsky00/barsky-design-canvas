
import React from 'react';
import EditableText from '@/components/dev/EditableText';
import DraggableContentBlock from '@/components/dev/DraggableContentBlock';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

interface ContentBlocksRendererProps {
  contentBlocks: ContentBlock[];
  sectionKey: string;
  projectId: string;
  isColumnLayout: boolean;
  contentHeader: string;
  contentBreakdown: string;
  onContentTextUpdate: (index: number, newValue: string) => void;
  onDeleteContent: (index: number) => void;
  onContentImageReplace: (index: number, newSrc: string) => Promise<void>;
  onVideoUrlUpdate: (index: number, newUrl: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onAddContent: (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => void;
}

const ContentBlocksRenderer: React.FC<ContentBlocksRendererProps> = ({
  contentBlocks,
  sectionKey,
  projectId,
  isColumnLayout,
  contentHeader,
  contentBreakdown,
  onContentTextUpdate,
  onDeleteContent,
  onContentImageReplace,
  onVideoUrlUpdate,
  onMoveUp,
  onMoveDown,
  onAddContent
}) => {
  if (contentBlocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="space-y-1">
        <EditableText 
          initialText={contentHeader}
          textKey={`${sectionKey}_content_header_${projectId}`}
        >
          {(text) => (
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              {text}
            </h3>
          )}
        </EditableText>
      </div>
      
      <div className={`${
        isColumnLayout 
          ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6' 
          : 'space-y-3 sm:space-y-4'
      }`}>
        {contentBlocks.map((block, index) => {
          const blockKey = `${sectionKey}-${block.type}-${index}-${block.src || block.embedUrl || block.value?.substring(0, 10) || 'no-content'}`;
          
          return (
            <div key={blockKey} className="border-l-4 border-blue-200 pl-3 sm:pl-4">
              {block.type === 'text' || block.type === 'header' ? (
                <EditableText
                  initialText={block.value || ''}
                  multiline={block.type === 'text'}
                  enableRichText={block.type === 'text'}
                  showDeleteButton={true}
                  onDelete={() => onDeleteContent(index)}
                  textKey={`${sectionKey}_content_block_${index}_${projectId}`}
                >
                  {(text) => (
                    block.type === 'header' ? (
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {text}
                      </h3>
                    ) : (
                      <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
                        {text.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-3 sm:mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )
                  )}
                </EditableText>
              ) : (
                <DraggableContentBlock
                  block={block}
                  index={index}
                  totalBlocks={contentBlocks.length}
                  onUpdate={onContentTextUpdate}
                  onDelete={onDeleteContent}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  onImageReplace={onContentImageReplace}
                  onVideoUrlUpdate={onVideoUrlUpdate}
                  projectId={projectId}
                  onAddContent={onAddContent}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentBlocksRenderer;
