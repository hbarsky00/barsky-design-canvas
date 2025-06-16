
import React, { useState, useRef, useEffect } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { useParams } from 'react-router-dom';

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

  // Load saved text from database on mount and when dependencies change
  useEffect(() => {
    const loadSavedText = async () => {
      if (textKey && projectId) {
        try {
          setIsLoading(true);
          const changes = await getChanges();
          const savedText = changes.textContent[textKey] || initialText;
          console.log('🔄 EditableText loading:', textKey, 'saved:', savedText, 'initial:', initialText);
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

  // Listen for live text updates from published changes
  useEffect(() => {
    const handleLiveTextUpdate = (event: CustomEvent) => {
      if (event.detail?.textKey === textKey) {
        console.log('📝 EditableText: Received live text update for:', textKey, '->', event.detail.newText);
        setText(event.detail.newText);
      }
    };

    window.addEventListener('liveTextUpdate', handleLiveTextUpdate as EventListener);
    
    return () => {
      window.removeEventListener('liveTextUpdate', handleLiveTextUpdate as EventListener);
    };
  }, [textKey]);

  // Listen for project data updates to refresh text content
  useEffect(() => {
    const handleProjectUpdate = async () => {
      if (textKey && projectId) {
        try {
          const changes = await getChanges();
          const savedText = changes.textContent[textKey] || initialText;
          setText(savedText);
        } catch (error) {
          console.error('❌ EditableText: Error reloading text:', error);
        }
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate);
    };
  }, [textKey, projectId, getChanges, initialText]);

  const handleClick = () => {
    if (isDevMode && !isLoading && !isSaving) {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!textKey || !projectId || isSaving) {
      setIsEditing(false);
      return;
    }

    console.log('💾 EditableText saving:', textKey, 'text:', text);
    setIsSaving(true);
    
    try {
      const success = await saveChange('text', textKey, text);
      if (success) {
        console.log('✅ EditableText: Successfully saved text to database');
        // Dispatch event to notify other components
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { projectId, textChanged: true, immediate: true }
        }));
      } else {
        console.error('❌ EditableText: Failed to save text to database');
      }
    } catch (error) {
      console.error('❌ EditableText: Error saving text:', error);
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
      setIsEditing(false);
      // Reset to saved value
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
      <div className="animate-pulse">
        {children(initialText)}
      </div>
    );
  }

  if (isEditing && isDevMode) {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <InputComponent
        ref={inputRef as any}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        disabled={isSaving}
        className={`w-full bg-white border-2 border-blue-500 p-2 rounded ${
          multiline ? 'min-h-[100px] resize-vertical' : ''
        } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
        style={{ 
          fontSize: 'inherit', 
          fontFamily: 'inherit', 
          fontWeight: 'inherit',
          color: 'inherit',
          lineHeight: 'inherit'
        }}
      />
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`${
        isDevMode 
          ? 'cursor-pointer hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 rounded p-1 -m-1 transition-all duration-200' 
          : ''
      } ${isSaving ? 'opacity-50' : ''}`}
      title={isDevMode ? (isSaving ? 'Saving...' : 'Click to edit') : undefined}
    >
      {children(text)}
    </div>
  );
};

export default EditableText;
