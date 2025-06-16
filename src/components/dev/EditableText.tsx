
import React, { useState, useRef, useEffect } from 'react';
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

  // Load saved text from database on mount
  useEffect(() => {
    const loadSavedText = async () => {
      if (textKey && projectId) {
        try {
          setIsLoading(true);
          const changes = await getChanges();
          const savedText = changes.textContent[textKey] || initialText;
          console.log('📖 EditableText loading for key:', textKey, 'saved text:', savedText);
          setText(savedText);
        } catch (error) {
          console.error('❌ EditableText: Error loading text:', error);
          setText(initialText);
        } finally {
          setIsLoading(false);
        }
      } else {
        setText(initialText);
        setIsLoading(false);
      }
    };

    loadSavedText();
  }, [textKey, projectId, initialText, getChanges]);

  const handleClick = () => {
    if (isDevMode && !isLoading && !isSaving && textKey) {
      console.log('🖱️ EditableText clicked for editing:', textKey);
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!textKey || !projectId || isSaving) {
      console.log('⚠️ EditableText: Cannot save - missing requirements:', { textKey, projectId, isSaving });
      setIsEditing(false);
      return;
    }

    console.log('💾 EditableText: Starting save for key:', textKey, 'text:', text);
    setIsSaving(true);
    
    try {
      const success = await saveChange('text', textKey, text);
      if (success) {
        console.log('✅ EditableText: Successfully saved text to database');
        toast.success('Text saved!', { duration: 2000 });
        
        // Dispatch immediate update event
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId, 
            textChanged: true, 
            immediate: true,
            timestamp: Date.now()
          }
        }));
      } else {
        console.error('❌ EditableText: Failed to save text to database');
        toast.error('Failed to save text');
      }
    } catch (error) {
      console.error('❌ EditableText: Error saving text:', error);
      toast.error('Error saving text');
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      console.log('⏪ EditableText: Reverting changes');
      setIsEditing(false);
      // Reset to original saved value
      if (textKey && projectId) {
        getChanges().then(changes => {
          setText(changes.textContent[textKey] || initialText);
        }).catch(() => {
          setText(initialText);
        });
      } else {
        setText(initialText);
      }
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (isLoading) {
    return (
      <div className="animate-pulse bg-gray-200 rounded">
        {children(initialText)}
      </div>
    );
  }

  if (isEditing && isDevMode && textKey) {
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
