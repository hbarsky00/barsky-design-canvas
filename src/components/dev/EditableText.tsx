
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

interface EditableTextProps {
  children: (text: string) => React.ReactNode;
  initialText: string;
  multiline?: boolean;
  textKey?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  children,
  initialText,
  multiline = false,
  textKey
}) => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { saveChange, getChanges } = useDevModeDatabase(projectId || '');
  
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const savingRef = useRef(false);
  const mountedRef = useRef(true);
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Stable callback for loading saved text
  const loadSavedText = useCallback(async () => {
    if (!textKey || !projectId || !mountedRef.current) {
      setText(initialText);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const changes = await getChanges();
      const savedText = changes.textContent[textKey] || initialText;
      
      if (mountedRef.current) {
        setText(savedText);
      }
    } catch (error) {
      console.error('Error loading text:', error);
      if (mountedRef.current) {
        setText(initialText);
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [textKey, projectId, initialText, getChanges]);

  // Load saved text with debouncing
  useEffect(() => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }

    loadTimeoutRef.current = setTimeout(() => {
      loadSavedText();
    }, 50);

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [loadSavedText]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleClick = useCallback(() => {
    if (isDevMode && !isLoading && !savingRef.current && textKey && mountedRef.current) {
      setIsEditing(true);
    }
  }, [isDevMode, isLoading, textKey]);

  const handleSave = useCallback(async () => {
    if (!textKey || !projectId || savingRef.current || !mountedRef.current) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    savingRef.current = true;
    
    try {
      const toastId = toast.loading('Saving text...');
      
      const success = await saveChange('text', textKey, text);
      
      if (success && mountedRef.current) {
        toast.success('Text saved!', { id: toastId, duration: 2000 });
        
        // Dispatch update event
        setTimeout(() => {
          if (mountedRef.current) {
            window.dispatchEvent(new CustomEvent('projectDataUpdated', {
              detail: { 
                projectId, 
                textChanged: true, 
                immediate: true,
                timestamp: Date.now()
              }
            }));
          }
        }, 100);
      } else {
        if (mountedRef.current) {
          toast.error('Failed to save text', { id: toastId });
        }
      }
    } catch (error) {
      console.error('Error saving text:', error);
      if (mountedRef.current) {
        toast.error('Error saving text');
      }
    } finally {
      savingRef.current = false;
      if (mountedRef.current) {
        setIsSaving(false);
        setIsEditing(false);
      }
    }
  }, [textKey, projectId, text, saveChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      // Reset to saved value
      if (textKey && projectId && mountedRef.current) {
        getChanges().then(changes => {
          if (mountedRef.current) {
            setText(changes.textContent[textKey] || initialText);
          }
        }).catch(() => {
          if (mountedRef.current) {
            setText(initialText);
          }
        });
      } else {
        setText(initialText);
      }
    }
  }, [handleSave, multiline, textKey, projectId, getChanges, initialText]);

  useEffect(() => {
    if (isEditing && inputRef.current && mountedRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (isLoading) {
    return (
      <div className="animate-pulse bg-gray-200 rounded min-h-[1.5rem]">
        {children(initialText)}
      </div>
    );
  }

  if (isEditing && isDevMode && textKey && mountedRef.current) {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <div className="relative">
        <InputComponent
          ref={inputRef as any}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          disabled={isSaving}
          className={`w-full bg-white border-2 border-blue-500 p-2 rounded focus:outline-none focus:border-blue-600 ${
            multiline ? 'min-h-[100px] resize-vertical' : ''
          } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ 
            fontSize: 'inherit', 
            fontFamily: 'inherit', 
            fontWeight: 'inherit',
            color: 'inherit',
            lineHeight: 'inherit'
          }}
          placeholder={isSaving ? 'Saving...' : 'Click to edit'}
        />
        {isSaving && (
          <div className="absolute top-2 right-2 text-xs text-blue-600">
            Saving...
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`${
        isDevMode && textKey
          ? 'cursor-pointer hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 rounded p-1 -m-1 transition-all duration-200' 
          : ''
      } ${isSaving ? 'opacity-50' : ''}`}
      title={isDevMode && textKey ? (isSaving ? 'Saving...' : 'Click to edit') : undefined}
    >
      {children(text)}
      {isSaving && (
        <span className="ml-2 text-xs text-blue-600">
          Saving...
        </span>
      )}
    </div>
  );
};

export default EditableText;
