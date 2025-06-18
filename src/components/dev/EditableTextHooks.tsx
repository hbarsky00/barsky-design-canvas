
import { useState, useCallback, useRef, useEffect } from 'react';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { toast } from 'sonner';

export const useEditableTextState = (initialText: string, textKey?: string, projectId?: string) => {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const savingRef = useRef(false);
  const mountedRef = useRef(true);
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  return {
    text,
    setText,
    isEditing,
    setIsEditing,
    isLoading,
    setIsLoading,
    isSaving,
    setIsSaving,
    savingRef,
    mountedRef,
    loadTimeoutRef
  };
};

export const useEditableTextLoad = (
  textKey: string | undefined,
  projectId: string,
  initialText: string,
  setText: (text: string) => void,
  setIsLoading: (loading: boolean) => void,
  mountedRef: React.MutableRefObject<boolean>,
  loadTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
) => {
  const { getChanges } = useDevModeDatabase(projectId);

  const loadSavedText = useCallback(async () => {
    console.log('🔄 EditableText: loadSavedText called with:', { textKey, projectId, mounted: mountedRef.current });
    
    if (!textKey || !projectId || !mountedRef.current) {
      console.log('⚠️ EditableText: Early return from loadSavedText:', { 
        hasTextKey: !!textKey, 
        hasProjectId: !!projectId, 
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
  }, [textKey, projectId, initialText, getChanges, setText, setIsLoading, mountedRef]);

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
  }, [loadSavedText, loadTimeoutRef]);

  return { loadSavedText };
};

export const useEditableTextSave = (
  textKey: string | undefined,
  projectId: string,
  text: string,
  setIsSaving: (saving: boolean) => void,
  setIsEditing: (editing: boolean) => void,
  savingRef: React.MutableRefObject<boolean>,
  mountedRef: React.MutableRefObject<boolean>
) => {
  const { saveChange } = useDevModeDatabase(projectId);

  const handleSave = useCallback(async () => {
    if (!textKey || !projectId || savingRef.current || !mountedRef.current) {
      console.log('⚠️ EditableText: Early return from handleSave:', {
        hasTextKey: !!textKey,
        hasProjectId: !!projectId,
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
  }, [textKey, projectId, text, saveChange, setIsSaving, setIsEditing, savingRef, mountedRef]);

  return { handleSave };
};
