
import React from 'react';
import { Bold, Italic, List, ListOrdered, Trash2, Heading1, Heading2, Heading3 } from 'lucide-react';
import { useDevMode } from '@/context/DevModeContext';

interface RichTextToolbarProps {
  onFormat: (format: 'bold' | 'italic' | 'list' | 'ordered-list' | 'h1' | 'h2' | 'h3') => void;
  onDelete?: () => void;
  showDelete?: boolean;
}

const RichTextToolbar: React.FC<RichTextToolbarProps> = ({
  onFormat,
  onDelete,
  showDelete = false
}) => {
  const { isDevMode } = useDevMode();

  if (!isDevMode) return null;

  return (
    <div className="flex items-center gap-1 p-2 bg-white border border-gray-300 rounded-md shadow-sm mb-2">
      <button
        onClick={() => onFormat('bold')}
        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        title="Bold"
        type="button"
      >
        <Bold className="h-4 w-4" />
      </button>
      
      <button
        onClick={() => onFormat('italic')}
        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        title="Italic"
        type="button"
      >
        <Italic className="h-4 w-4" />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1" />
      
      <button
        onClick={() => onFormat('h1')}
        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        title="Header 1"
        type="button"
      >
        <Heading1 className="h-4 w-4" />
      </button>
      
      <button
        onClick={() => onFormat('h2')}
        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        title="Header 2"
        type="button"
      >
        <Heading2 className="h-4 w-4" />
      </button>
      
      <button
        onClick={() => onFormat('h3')}
        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        title="Header 3"
        type="button"
      >
        <Heading3 className="h-4 w-4" />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1" />
      
      <button
        onClick={() => onFormat('list')}
        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        title="Bullet List"
        type="button"
      >
        <List className="h-4 w-4" />
      </button>
      
      <button
        onClick={() => onFormat('ordered-list')}
        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        title="Numbered List"
        type="button"
      >
        <ListOrdered className="h-4 w-4" />
      </button>
      
      {showDelete && onDelete && (
        <>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button
            onClick={onDelete}
            className="p-1.5 hover:bg-red-100 text-red-600 rounded transition-colors"
            title="Delete Paragraph"
            type="button"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
};

export default RichTextToolbar;
