
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
  
  // Add safety check for projectId
  const safeProjectId = projectId || '';
  const { saveChange, getChanges } = useDevModeDatabase(safeProjectId);
  
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const savingRef = useRef(false);
  const mountedRef = useRef(true);
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Set mounted to true on mount
  useEffect(() => {
    mountedRef.current = true;
    console.log('✅ EditableText: Component mounted for', textKey);
    
    return () => {
      console.log('🚪 EditableText: Component unmounting for', textKey);
      mountedRef.current = false;
    };
  }, [textKey]);

  // COMPREHENSIVE DEBUGGING
  console.log('🔍 EditableText DEBUG:', { 
    isDevMode, 
    projectId: safeProjectId, 
    textKey, 
    hasTextKey: !!textKey,
    initialText: initialText.substring(0, 50) + '...',
    currentText: text.substring(0, 50) + '...',
    isEditing,
    isLoading,
    isSaving,
    canEdit: isDevMode && !isLoading && !savingRef.current && textKey && mountedRef.current,
    mounted: mountedRef.current
  });

  // Stable callback for loading saved text
  const loadSavedText = useCallback(async () => {
    console.log('🔄 EditableText: loadSavedText called with:', { textKey, safeProjectId, mounted: mountedRef.current });
    
    if (!textKey || !safeProjectId || !mountedRef.current) {
      console.log('⚠️ EditableText: Early return from loadSavedText:', { 
        hasTextKey: !!textKey, 
        hasProjectId: !!safeProjectId, 
        mounted: mountedRef.current 
      });
      setText(initialText);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('📤 EditableText: Calling getChanges...');
      const changes = await getChanges();
      console.log('📋 EditableText: Got changes:', changes);
      
      const savedText = changes.textContent[textKey] || initialText;
      
      if (mountedRef.current) {
        setText(savedText);
        console.log('✅ EditableText: Loaded saved text for', textKey, ':', savedText.substring(0, 50) + '...');
      } else {
        console.log('⚠️ EditableText: Component unmounted during load');
      }
    } catch (error) {
      console.error('❌ EditableText: Error loading text:', error);
      if (mountedRef.current) {
        setText(initialText);
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
        console.log('✅ EditableText: Loading complete for', textKey);
      }
    }
  }, [textKey, safeProjectId, initialText, getChanges]);

  // Load saved text with debouncing
  useEffect(() => {
    console.log('🎯 EditableText: useEffect triggered for loadSavedText');
    
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

  const handleClick = useCallback(() => {
    const canEdit = isDevMode && !isLoading && !savingRef.current && textKey && mountedRef.current;
    
    console.log('👆 EditableText: Click detected for', textKey, { 
      isDevMode, 
      isLoading, 
      isSaving: savingRef.current, 
      textKey,
      mounted: mountedRef.current,
      canEdit,
      event: 'CLICK'
    });
    
    if (canEdit) {
      console.log('✅ EditableText: Starting edit mode for', textKey);
      setIsEditing(true);
    } else {
      console.log('❌ EditableText: Cannot edit because:', {
        devMode: isDevMode,
        loading: isLoading,
        saving: savingRef.current,
        hasTextKey: !!textKey,
        mounted: mountedRef.current
      });
      
      // Show helpful toast
      if (!isDevMode) {
        toast.error('Dev mode is not enabled');
      } else if (!textKey) {
        toast.error('No text key provided for editing');
      } else if (isLoading) {
        toast.error('Still loading, please wait');
      } else if (savingRef.current) {
        toast.error('Currently saving, please wait');
      } else if (!mountedRef.current) {
        toast.error('Component not properly mounted');
      }
    }
  }, [isDevMode, isLoading, textKey]);

  const handleSave = useCallback(async () => {
    if (!textKey || !safeProjectId || savingRef.current || !mountedRef.current) {
      console.log('⚠️ EditableText: Early return from handleSave:', {
        hasTextKey: !!textKey,
        hasProjectId: !!safeProjectId,
        saving: savingRef.current,
        mounted: mountedRef.current
      });
      setIsEditing(false);
      return;
    }

    console.log('💾 EditableText: Saving text for', textKey, ':', text.substring(0, 50) + '...');
    setIsSaving(true);
    savingRef.current = true;
    
    try {
      const toastId = toast.loading('Saving text...');
      
      const success = await saveChange('text', textKey, text);
      
      if (success && mountedRef.current) {
        toast.success('Text saved!', { id: toastId, duration: 2000 });
        console.log('✅ EditableText: Text saved successfully for', textKey);
        
        // Dispatch update event
        setTimeout(() => {
          if (mountedRef.current) {
            window.dispatchEvent(new CustomEvent('projectDataUpdated', {
              detail: { 
                projectId: safeProjectId, 
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
          console.error('❌ EditableText: Failed to save text for', textKey);
        }
      }
    } catch (error) {
      console.error('❌ EditableText: Error saving text:', error);
      if (mountedRef.current) {
        toast.error('Error saving text');
      }
    } finally {
      savingRef.current = false;
      if (mountedRef.current) {
        setIsSaving(false);
        setIsEditing(false);
        console.log('🏁 EditableText: Save operation complete for', textKey);
      }
    }
  }, [textKey, safeProjectId, text, saveChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    console.log('⌨️ EditableText: Key pressed:', e.key, 'for', textKey);
    
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      console.log('🚫 EditableText: Escape pressed, canceling edit for', textKey);
      setIsEditing(false);
      // Reset to saved value
      if (textKey && safeProjectId && mountedRef.current) {
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
  }, [handleSave, multiline, textKey, safeProjectId, getChanges, initialText]);

  useEffect(() => {
    if (isEditing && inputRef.current && mountedRef.current) {
      console.log('🎯 EditableText: Focusing input for', textKey);
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing, textKey]);

  if (isLoading) {
    console.log('⏳ EditableText: Rendering loading state for', textKey);
    return (
      <div className="animate-pulse bg-gray-200 rounded min-h-[1.5rem]">
        {children(initialText)}
      </div>
    );
  }

  if (isEditing && isDevMode && textKey && mountedRef.current) {
    console.log('✏️ EditableText: Rendering edit mode for', textKey);
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <div className="relative">
        <InputComponent
          ref={inputRef as any}
          value={text}
          onChange={(e) => {
            console.log('📝 EditableText: Text changed for', textKey);
            setText(e.target.value);
          }}
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

  const canClick = isDevMode && textKey && mountedRef.current;
  console.log('👁️ EditableText: Rendering view mode for', textKey, 'canClick:', canClick);

  return (
    <div
      onClick={handleClick}
      className={`${
        canClick
          ? 'cursor-pointer hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 rounded p-1 -m-1 transition-all duration-200' 
          : ''
      } ${isSaving ? 'opacity-50' : ''}`}
      title={canClick ? (isSaving ? 'Saving...' : 'Click to edit') : undefined}
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
