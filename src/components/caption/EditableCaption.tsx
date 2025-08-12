
import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const showEditingControls = shouldShowEditingControls();
  
  const { saveTextContent, getImageCaption } = useSimplifiedProjectPersistence(projectId || '');
  
  // Get the actual caption from all possible sources
  const actualCaption = getImageCaption(imageSrc) || initialCaption;
  const [caption, setCaption] = useState(actualCaption);
  const [tempCaption, setTempCaption] = useState(actualCaption);

  console.log('🔍 EditableCaption Debug:', {
    imageSrc: imageSrc.substring(0, 50) + '...',
    actualCaption,
    caption,
    tempCaption,
    isEditing,
    showEditingControls
  });

  // Update caption when source changes - use useCallback to prevent unnecessary updates
  const updateCaption = useCallback(() => {
    const currentCaption = getImageCaption(imageSrc) || initialCaption;
    console.log('🔄 EditableCaption: Updating caption for:', imageSrc.substring(0, 50), 'to:', currentCaption);
    setCaption(currentCaption);
    if (!isEditing) {
      setTempCaption(currentCaption);
    }
  }, [imageSrc, initialCaption, getImageCaption, isEditing]);

  useEffect(() => {
    updateCaption();
  }, [updateCaption]);

  // Focus input when editing starts - improve focus handling
  useEffect(() => {
    if (isEditing && inputRef.current) {
      console.log('🎯 Focusing input field');
      const timeoutId = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isEditing]);

  const handleStartEdit = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!showEditingControls) return;
    console.log('✏️ Starting edit mode');
    setTempCaption(caption);
    setIsEditing(true);
  }, [showEditingControls, caption]);

  const handleSave = useCallback(async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!projectId) {
      console.warn('⚠️ No projectId provided, cannot save');
      return;
    }
    
    console.log('💾 Saving caption:', {
      imageSrc: imageSrc.substring(0, 50) + '...',
      tempCaption,
      projectId
    });
    
    setIsSaving(true);
    try {
      // Save with img_caption_ prefix to ensure proper storage
      const captionKey = `img_caption_${imageSrc}`;
      await saveTextContent(captionKey, tempCaption.trim());
      
      setCaption(tempCaption.trim());
      setIsEditing(false);
      
      console.log('✅ Caption saved successfully:', captionKey, tempCaption.trim());
    } catch (error) {
      console.error('❌ Error saving caption:', error);
      // Revert on error
      setTempCaption(caption);
    } finally {
      setIsSaving(false);
    }
  }, [projectId, imageSrc, tempCaption, caption, saveTextContent]);

  const handleCancel = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('❌ Canceling edit');
    setTempCaption(caption);
    setIsEditing(false);
  }, [caption]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    console.log('⌨️ Key pressed:', e.key);
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      handleCancel();
    }
  }, [handleSave, handleCancel]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log('📝 Input changed:', newValue);
    setTempCaption(newValue);
  }, []);

  // Prevent event bubbling on the container when editing
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (isEditing) {
      e.stopPropagation();
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <div className={`editable-caption-container ${className}`} onClick={handleContainerClick}>
        <div className="flex items-center gap-2 mt-2 px-4 sm:px-6">
          <input
            ref={inputRef}
            type="text"
            value={tempCaption}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="editable-caption-input flex-1 px-3 py-2 text-sm border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            placeholder="Enter image caption..."
            disabled={isSaving}
            autoComplete="off"
            spellCheck="false"
            style={{ minWidth: '200px' }}
            onFocus={() => console.log('🎯 Input focused')}
            onBlur={() => console.log('🔍 Input blurred')}
          />
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="editable-caption-save-btn p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50"
            title="Save caption"
            type="button"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="editable-caption-cancel-btn p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
            title="Cancel editing"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
        {isSaving && (
          <div className="text-xs text-blue-600 text-center mt-1">Saving...</div>
        )}
      </div>
    );
  }

  return (
    <div className={`editable-caption-container group ${className}`}>
      <div className="mt-2 px-4 sm:px-6">
        <div 
          className={`editable-caption-text text-gray-700 text-sm text-center ${
            showEditingControls ? 'cursor-pointer hover:text-gray-900 hover:bg-blue-50 rounded-md py-2 transition-all duration-200 border border-transparent hover:border-blue-200' : ''
          } relative`}
          onClick={handleStartEdit}
        >
          {caption || 'Click to add caption...'}
          {showEditingControls && (
            <Edit2 
              size={12} 
              className="editable-caption-edit-icon inline-block ml-2 opacity-0 group-hover:opacity-70 transition-opacity text-blue-500" 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableCaption;
