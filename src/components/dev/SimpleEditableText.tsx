
import React, { useState, useCallback, useEffect } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useProjectPersistence } from '@/hooks/useProjectPersistence';

interface SimpleEditableTextProps {
  children: (text: string) => React.ReactNode;
  initialText: string;
  textKey?: string;
  multiline?: boolean;
}

const SimpleEditableText: React.FC<SimpleEditableTextProps> = ({
  children,
  initialText,
  textKey,
  multiline = false
}) => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const safeProjectId = projectId || '';
  
  const { getTextContent, saveTextContent } = useProjectPersistence(safeProjectId);
  
  // Get saved text or use initial
  const savedText = textKey ? getTextContent(textKey, initialText) : initialText;
  
  const [text, setText] = useState(savedText);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Update text when saved content changes
  useEffect(() => {
    if (textKey) {
      const currentSaved = getTextContent(textKey, initialText);
      if (currentSaved !== text && !isEditing) {
        setText(currentSaved);
      }
    }
  }, [textKey, getTextContent, initialText, text, isEditing]);

  const handleSave = useCallback(async () => {
    if (!textKey || !safeProjectId) {
      setIsEditing(false);
      return;
    }

    console.log('💾 SimpleEditableText: Saving text with key:', {
      textKey,
      text: text.substring(0, 50) + '...',
      projectId: safeProjectId
    });
    
    setIsSaving(true);
    
    try {
      await saveTextContent(textKey, text);
      console.log('✅ SimpleEditableText: Text saved successfully to key:', textKey);
      toast.success('Caption saved!', { duration: 1500 });
    } catch (error) {
      console.error('❌ SimpleEditableText: Error saving text:', error);
      toast.error('Failed to save caption');
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  }, [textKey, safeProjectId, text, saveTextContent]);

  const handleCancel = useCallback(() => {
    setText(savedText);
    setIsEditing(false);
  }, [savedText]);

  const handleClick = useCallback(() => {
    if (isDevMode && textKey && !isSaving) {
      console.log('📝 SimpleEditableText: Starting edit for key:', textKey);
      setIsEditing(true);
    }
  }, [isDevMode, textKey, isSaving]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      e.preventDefault();
      handleSave();
    }
  }, [multiline, handleSave, handleCancel]);

  if (isEditing && isDevMode && textKey) {
    return (
      <div className="relative">
        {multiline ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
            className="w-full p-2 border border-blue-300 rounded bg-white text-gray-900 min-h-[100px] resize-vertical"
            placeholder="Enter caption..."
            disabled={isSaving}
          />
        ) : (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
            className="w-full p-2 border border-blue-300 rounded bg-white text-gray-900"
            placeholder="Enter caption..."
            disabled={isSaving}
          />
        )}
        {isSaving && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
        <div className="text-xs text-gray-500 mt-1">
          {multiline ? 'Ctrl+Enter to save, Escape to cancel' : 'Enter to save, Escape to cancel'}
        </div>
      </div>
    );
  }

  const canClick = isDevMode && textKey;
  
  return (
    <div
      onClick={handleClick}
      className={`${canClick ? 'cursor-pointer hover:bg-blue-50/50 rounded p-1 -m-1 transition-colors' : ''} ${
        isSaving ? 'opacity-50' : ''
      }`}
      title={canClick ? 'Click to edit caption' : undefined}
    >
      {children(text)}
    </div>
  );
};

export default SimpleEditableText;
