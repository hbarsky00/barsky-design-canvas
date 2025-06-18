import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Trash2, Upload, Link, Edit3 } from 'lucide-react';
import EditableText from './EditableText';
import EditImageButton from './EditImageButton';
import { useDevMode } from '@/context/DevModeContext';
import AddContentButton from './AddContentButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface ContentBlock {
  type: 'text' | 'image' | 'header' | 'video' | 'pdf';
  value?: string;
  src?: string;
  caption?: string;
  embedUrl?: string;
  level?: 1 | 2 | 3;
}

interface DraggableContentBlockProps {
  block: ContentBlock;
  index: number;
  totalBlocks: number;
  onUpdate: (index: number, newValue: string) => void;
  onDelete: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onImageReplace?: (index: number, newSrc: string) => void;
  onImageRemove?: (index: number) => void;
  onVideoUrlUpdate?: (index: number, newUrl: string) => void;
  projectId: string;
  onAddContent?: (type: 'text' | 'image' | 'header' | 'video' | 'pdf', position?: number) => void;
  onHeaderLevelChange?: (index: number, level: 1 | 2 | 3) => void;
}

const DraggableContentBlock: React.FC<DraggableContentBlockProps> = ({
  block,
  index,
  totalBlocks,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onImageReplace,
  onImageRemove,
  onVideoUrlUpdate,
  projectId,
  onAddContent,
  onHeaderLevelChange
}) => {
  const { isDevMode } = useDevMode();
  const [isEditingVideoUrl, setIsEditingVideoUrl] = useState(false);

  const handleHeaderLevelChange = (newLevel: string) => {
    const level = parseInt(newLevel) as 1 | 2 | 3;
    if (onHeaderLevelChange) {
      onHeaderLevelChange(index, level);
    }
  };

  const renderContent = () => {
    switch (block.type) {
      case 'text':
        return (
          <EditableText
            initialText={block.value || 'This is a new paragraph. Click to edit me.'}
            textKey={`content_block_${index}_${projectId}`}
            multiline
            enableRichText
          >
            {(text) => (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{text}</p>
              </div>
            )}
          </EditableText>
        );

      case 'header':
        const HeaderTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
        const headerClasses = {
          1: 'text-3xl font-bold text-gray-900',
          2: 'text-2xl font-bold text-gray-800', 
          3: 'text-xl font-semibold text-gray-800'
        };

        return (
          <div className="space-y-2">
            {isDevMode && (
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-600">Header Level:</label>
                <Select value={String(block.level || 2)} onValueChange={handleHeaderLevelChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">H1</SelectItem>
                    <SelectItem value="2">H2</SelectItem>
                    <SelectItem value="3">H3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <EditableText
              initialText={block.value || 'New Header'}
              textKey={`header_block_${index}_${projectId}`}
              multiline={false}
            >
              {(text) => (
                <HeaderTag className={headerClasses[block.level || 2]}>
                  {text}
                </HeaderTag>
              )}
            </EditableText>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-2">
            <div className="relative group">
              <img
                src={block.src}
                alt={block.caption || 'Content image'}
                className="w-full h-auto rounded-lg shadow-md"
              />
              {isDevMode && onImageReplace && (
                <EditImageButton
                  src={block.src || ''}
                  onImageReplace={(newSrc) => onImageReplace(index, newSrc)}
                  onImageRemove={() => onImageRemove?.(index)}
                  className="absolute top-2 right-2"
                />
              )}
            </div>
            {block.caption && (
              <EditableText
                initialText={block.caption}
                textKey={`image_caption_${index}_${projectId}`}
                multiline
              >
                {(text) => (
                  <p className="text-sm text-gray-600 italic text-center">{text}</p>
                )}
              </EditableText>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="space-y-2">
            {block.embedUrl && block.embedUrl !== 'placeholder' ? (
              <div className="relative">
                <div className="aspect-video">
                  <iframe
                    src={block.embedUrl}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                    title="Embedded video"
                  />
                </div>
                {isDevMode && (
                  <button
                    onClick={() => setIsEditingVideoUrl(true)}
                    className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Link className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500 mb-4">Add video embed URL</p>
                {isDevMode && (
                  <button
                    onClick={() => setIsEditingVideoUrl(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Add Video URL
                  </button>
                )}
              </div>
            )}
            
            {isEditingVideoUrl && (
              <div className="bg-white border rounded-lg p-4 shadow-lg">
                <input
                  type="url"
                  placeholder="Enter video embed URL (YouTube, Vimeo, etc.)"
                  defaultValue={block.embedUrl === 'placeholder' ? '' : block.embedUrl}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const newUrl = (e.target as HTMLInputElement).value;
                      onVideoUrlUpdate?.(index, newUrl);
                      setIsEditingVideoUrl(false);
                    }
                  }}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget.parentElement?.previousElementSibling as HTMLInputElement;
                      const newUrl = input?.value || '';
                      onVideoUrlUpdate?.(index, newUrl);
                      setIsEditingVideoUrl(false);
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingVideoUrl(false)}
                    className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {block.caption && (
              <EditableText
                initialText={block.caption}
                textKey={`video_caption_${index}_${projectId}`}
                multiline
              >
                {(text) => (
                  <p className="text-sm text-gray-600 italic text-center">{text}</p>
                )}
              </EditableText>
            )}
          </div>
        );

      case 'pdf':
        return (
          <div className="space-y-2">
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="bg-red-500 text-white p-2 rounded">
                  PDF
                </div>
                <div>
                  <p className="font-medium">Document Preview</p>
                  <p className="text-sm text-gray-600">Click to view full document</p>
                </div>
              </div>
            </div>
            {block.caption && (
              <EditableText
                initialText={block.caption}
                textKey={`pdf_caption_${index}_${projectId}`}
                multiline
              >
                {(text) => (
                  <p className="text-sm text-gray-600 italic">{text}</p>
                )}
              </EditableText>
            )}
          </div>
        );

      default:
        return <div>Unsupported content type</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
        {renderContent()}
        
        {isDevMode && (
          <>
            {/* Controls */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-lg p-1">
              <button
                onClick={() => onMoveUp(index)}
                disabled={index === 0}
                className="p-1 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Move up"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => onMoveDown(index)}
                disabled={index === totalBlocks - 1}
                className="p-1 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Move down"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(index)}
                className="p-1 text-gray-600 hover:text-red-600"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Add content between blocks */}
            {onAddContent && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <AddContentButton
                  onAdd={(type) => onAddContent(type, index + 1)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default DraggableContentBlock;
