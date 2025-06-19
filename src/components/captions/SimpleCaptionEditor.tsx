
import React, { useState, useRef, useEffect } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useSimpleCaptions } from '@/hooks/useSimpleCaptions';

interface SimpleCaptionEditorProps {
  imageSrc: string;
  projectId: string;
  children: (caption: string) => React.ReactNode;
  fallbackCaption?: string;
}

const SimpleCaptionEditor: React.FC<SimpleCaptionEditorProps> = ({
  imageSrc,
  projectId,
  children,
  fallbackCaption
}) => {
  const { isDevMode } = useDevMode();
  const { getCaption, saveCaption, isSaving } = useSimpleCaptions(projectId);
  const [isEditing, setIsEditing] = useState(false);
  const [tempCaption, setTempCaption] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentCaption = getCaption(imageSrc, fallbackCaption);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    if (!isDevMode || isSaving) return;
    setTempCaption(currentCaption);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (tempCaption.trim()) {
      const success = await saveCaption(imageSrc, tempCaption.trim());
      if (success) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempCaption('');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  if (isEditing && isDevMode) {
    return (
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={tempCaption}
          onChange={(e) => setTempCaption(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="w-full p-2 border border-blue-300 rounded bg-white text-gray-900 min-h-[60px] resize-vertical text-sm"
          placeholder="Enter caption..."
          disabled={isSaving}
        />
        <div className="text-xs text-gray-500 mt-1">
          Ctrl+Enter to save, Escape to cancel
          {isSaving && ' • Saving...'}
        </div>
      </div>
    );
  }

  const canEdit = isDevMode && !isSaving;

  return (
    <div
      onClick={handleStartEdit}
      className={`${canEdit ? 'cursor-pointer hover:bg-blue-50/50 rounded p-1 -m-1 transition-colors' : ''} ${
        isSaving ? 'opacity-50' : ''
      }`}
      title={canEdit ? 'Click to edit caption' : undefined}
    >
      {children(currentCaption)}
    </div>
  );
};

export default SimpleCaptionEditor;
