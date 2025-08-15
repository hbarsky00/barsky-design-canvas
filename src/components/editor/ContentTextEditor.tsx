import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Save, Edit3, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createSanitizedHtmlProps } from '@/utils/htmlSanitizer';

interface ContentTextEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
  isEditing: boolean;
  onEditToggle: () => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export const ContentTextEditor: React.FC<ContentTextEditorProps> = ({
  initialContent,
  onSave,
  isEditing,
  onEditToggle,
  placeholder = "Click to edit content...",
  className = "",
  minHeight = "120px"
}) => {
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(content);
      onEditToggle();
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setContent(initialContent);
    onEditToggle();
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`relative ${className}`}
      >
        <div
          ref={editorRef}
          contentEditable
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none resize-none"
          style={{ minHeight }}
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
          {...createSanitizedHtmlProps(content)}
          suppressContentEditableWarning={true}
        />
        
        <div className="flex gap-2 mt-2">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            <Check className="h-4 w-4 mr-1" />
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
          <Button
            onClick={handleCancel}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative group cursor-pointer ${className}`}
      onClick={onEditToggle}
    >
      <div
        className="min-h-[120px] p-4 rounded-lg border border-transparent group-hover:border-gray-300 group-hover:bg-gray-50 transition-all duration-200"
        style={{ minHeight }}
        {...createSanitizedHtmlProps(content || placeholder)}
      />
      
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Edit3 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};
