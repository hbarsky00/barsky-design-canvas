
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useProjectPersistence } from '@/hooks/useProjectPersistence';

interface SimpleEditableTextProps {
  children: (text: string) => React.ReactNode;
  initialText: string;
  textKey?: string;
  multiline?: boolean;
  disableEditing?: boolean;
}

const SimpleEditableText: React.FC<SimpleEditableTextProps> = ({
  children,
  initialText,
  textKey,
  multiline = false,
  disableEditing = false
}) => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const safeProjectId = projectId || '';
  
  const { getTextContent, saveTextContent } = useProjectPersistence(safeProjectId);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Get saved text or use initial - but ensure we have a stable key
  const savedText = textKey ? getTextContent(textKey, initialText) : initialText;
  
  const [text, setText] = useState(savedText);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedText, setLastSavedText] = useState(savedText);

  // Update text when saved content changes, but only if we're not editing
  useEffect(() => {
    if (textKey && !isEditing) {
      const currentSaved = getTextContent(textKey, initialText);
      if (currentSaved !== lastSavedText) {
        setText(currentSaved);
        setLastSavedText(currentSaved);
      }
    }
  }, [textKey, getTextContent, initialText, isEditing, lastSavedText]);

  const debouncedSave = useCallback(async (textToSave: string) => {
    if (!textKey || !safeProjectId) return;

    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set a new timeout for debounced saving
    saveTimeoutRef.current = setTimeout(async () => {
      console.log('💾 SimpleEditableText: Debounced save for key:', textKey, 'text:', textToSave.substring(0, 30) + '...');
      
      setIsSaving(true);
      
      try {
        await saveTextContent(textKey, textToSave);
        setLastSavedText(textToSave);
        console.log('✅ SimpleEditableText: Text saved successfully');
        toast.success('Text saved!', { duration: 1000 });
      } catch (error) {
        console.error('❌ SimpleEditableText: Error saving text:', error);
        toast.error('Failed to save text');
      } finally {
        setIsSaving(false);
      }
    }, 1000); // 1 second debounce
  }, [textKey, safeProjectId, saveTextContent]);

  const handleSave = useCallback(async () => {
    if (!textKey || !safeProjectId) {
      setIsEditing(false);
      return;
    }

    // Only save if text has actually changed
    if (text === lastSavedText) {
      setIsEditing(false);
      return;
    }

    console.log('💾 SimpleEditableText: Immediate save for key:', textKey);
    
    setIsSaving(true);
    
    try {
      await saveTextContent(textKey, text);
      setLastSavedText(text);
      console.log('✅ SimpleEditableText: Immediate save successful');
      toast.success('Text saved!', { duration: 1000 });
    } catch (error) {
      console.error('❌ SimpleEditableText: Error saving text:', error);
      toast.error('Failed to save text');
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  }, [textKey, safeProjectId, text, lastSavedText, saveTextContent]);

  const handleCancel = useCallback(() => {
    setText(lastSavedText);
    setIsEditing(false);
    
    // Clear any pending save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
  }, [lastSavedText]);

  const handleClick = useCallback(() => {
    if (isDevMode && textKey && !isSaving && !disableEditing) {
      console.log('📝 SimpleEditableText: Starting edit for key:', textKey);
      setIsEditing(true);
    }
  }, [isDevMode, textKey, isSaving, disableEditing]);

  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
    
    // Trigger debounced save for auto-save behavior
    if (textKey && newText !== lastSavedText) {
      debouncedSave(newText);
    }
  }, [textKey, lastSavedText, debouncedSave]);

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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  if (isEditing && isDevMode && textKey && !disableEditing) {
    return (
      <div className="relative">
        {multiline ? (
          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
            className="w-full p-2 border border-blue-300 rounded bg-white text-gray-900 min-h-[100px] resize-vertical"
            placeholder="Enter text..."
            disabled={isSaving}
          />
        ) : (
          <input
            type="text"
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
            className="w-full p-2 border border-blue-300 rounded bg-white text-gray-900"
            placeholder="Enter text..."
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
          {isSaving && ' • Saving...'}
        </div>
      </div>
    );
  }

  const canClick = isDevMode && textKey && !disableEditing;
  
  return (
    <div
      onClick={handleClick}
      className={`${canClick ? 'cursor-pointer hover:bg-blue-50/50 rounded p-1 -m-1 transition-colors' : ''} ${
        isSaving ? 'opacity-50' : ''
      }`}
      title={canClick ? 'Click to edit text' : undefined}
    >
      {children(text)}
    </div>
  );
};

export default SimpleEditableText;
