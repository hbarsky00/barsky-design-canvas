
import React, { useState, useRef, useEffect } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Edit, Check, X } from 'lucide-react';

interface EditableTextProps {
  initialText: string;
  children: (text: string) => React.ReactNode;
  multiline?: boolean;
  onSave?: (newText: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ 
  initialText, 
  children, 
  multiline = false,
  onSave 
}) => {
  const { isDevMode } = useDevMode();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [editingText, setEditingText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      const ref = multiline ? textareaRef : inputRef;
      if (ref.current) {
        ref.current.focus();
        ref.current.select();
      }
    }
  }, [isEditing, multiline]);

  const handleEdit = () => {
    setEditingText(text);
    setIsEditing(true);
  };

  const handleSave = () => {
    setText(editingText);
    setIsEditing(false);
    if (onSave) {
      onSave(editingText);
    }
  };

  const handleCancel = () => {
    setEditingText(text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  if (!isDevMode) {
    return <>{children(text)}</>;
  }

  return (
    <div className="relative group">
      {!isEditing && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-background/80 backdrop-blur-sm"
          onClick={handleEdit}
          title="Edit text"
        >
          <Edit className="h-3 w-3" />
        </Button>
      )}
      
      {isEditing ? (
        <div className="relative">
          {multiline ? (
            <textarea
              ref={textareaRef}
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full min-h-[100px] p-3 border border-blue-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your text here..."
            />
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your text here..."
            />
          )}
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 bg-green-500 hover:bg-green-600 text-white"
              onClick={handleSave}
              title="Save changes"
            >
              <Check className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 bg-red-500 hover:bg-red-600 text-white"
              onClick={handleCancel}
              title="Cancel editing"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          {multiline && (
            <p className="text-xs text-gray-500 mt-1">
              Press Ctrl+Enter to save, Escape to cancel
            </p>
          )}
        </div>
      ) : (
        children(text)
      )}
    </div>
  );
};

export default EditableText;
