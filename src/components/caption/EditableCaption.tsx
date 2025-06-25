
import React, { useState, useRef, useEffect } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { shouldShowEditingControls } from '@/utils/devModeDetection';
import { useSimplifiedProjectPersistence } from '@/hooks/useSimplifiedProjectPersistence';

interface EditableCaptionProps {
  imageSrc: string;
  initialCaption: string;
  projectId?: string;
  className?: string;
}

const EditableCaption: React.FC<EditableCaptionProps> = ({
  imageSrc,
  initialCaption,
  projectId,
  className = ""
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [caption, setCaption] = useState(initialCaption);
  const [tempCaption, setTempCaption] = useState(initialCaption);
  const inputRef = useRef<HTMLInputElement>(null);
  const showEditingControls = shouldShowEditingControls();
  
  const { saveTextContent } = useSimplifiedProjectPersistence(projectId || '');

  // Update caption when initialCaption changes
  useEffect(() => {
    setCaption(initialCaption);
    setTempCaption(initialCaption);
  }, [initialCaption]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    if (!showEditingControls) return;
    setTempCaption(caption);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!projectId || tempCaption.trim() === '') return;
    
    try {
      // Save with img_caption_ prefix to ensure isolation
      const captionKey = `img_caption_${imageSrc}`;
      await saveTextContent(captionKey, tempCaption.trim());
      
      setCaption(tempCaption.trim());
      setIsEditing(false);
      
      console.log('✅ Caption saved successfully:', captionKey, tempCaption.trim());
    } catch (error) {
      console.error('❌ Error saving caption:', error);
      // Revert on error
      setTempCaption(caption);
    }
  };

  const handleCancel = () => {
    setTempCaption(caption);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className={`editable-caption-container ${className}`}>
        <div className="flex items-center gap-2 mt-2 px-2">
          <input
            ref={inputRef}
            type="text"
            value={tempCaption}
            onChange={(e) => setTempCaption(e.target.value)}
            onKeyDown={handleKeyDown}
            className="editable-caption-input flex-1 px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            placeholder="Enter image caption..."
          />
          <button
            onClick={handleSave}
            className="editable-caption-save-btn p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
            title="Save caption"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleCancel}
            className="editable-caption-cancel-btn p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
            title="Cancel editing"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`editable-caption-container group ${className}`}>
      <div className="mt-2 px-2">
        <div 
          className={`editable-caption-text text-gray-600 text-sm text-center ${
            showEditingControls ? 'cursor-pointer hover:text-gray-800 hover:bg-gray-50 rounded px-2 py-1 transition-colors' : ''
          } relative`}
          onClick={handleStartEdit}
        >
          {caption || 'Click to add caption...'}
          {showEditingControls && (
            <Edit2 
              size={12} 
              className="editable-caption-edit-icon inline-block ml-1 opacity-0 group-hover:opacity-60 transition-opacity" 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableCaption;
