
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
  const lastLoadedTextRef = useRef<string>('');

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
    loadTimeoutRef,
    lastLoadedTextRef
  };
};

export const useEditableTextLoad = (
  textKey: string | undefined,
  projectId: string,
  initialText: string,
  setText: (text: string) => void,
  setIsLoading: (loading: boolean) => void,
  mountedRef: React.MutableRefObject<boolean>,
  loadTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
  lastLoadedTextRef: React.MutableRefObject<string>
) => {
  const { getChanges } = useDevModeDatabase(projectId);

  const loadSavedText = useCallback(async () => {
    if (!textKey || !projectId || !mountedRef.current) {
      setText(initialText);
      setIsLoading(false);
      lastLoadedTextRef.current = initialText;
      return;
    }

    try {
      setIsLoading(true);
      console.log('📤 EditableText: Loading persistent text for:', textKey);
      
      const changes = await getChanges();
      const savedText = changes.textContent[textKey] || initialText;
      
      if (mountedRef.current && savedText !== lastLoadedTextRef.current) {
        setText(savedText);
        lastLoadedTextRef.current = savedText;
        console.log('✅ EditableText: Loaded and cached text for', textKey, ':', savedText.substring(0, 50) + '...');
      }
    } catch (error) {
      console.error('❌ EditableText: Error loading text:', error);
      if (mountedRef.current) {
        setText(initialText);
        lastLoadedTextRef.current = initialText;
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [textKey, projectId, initialText, getChanges, setText, setIsLoading, mountedRef, lastLoadedTextRef]);

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
  mountedRef: React.MutableRefObject<boolean>,
  lastLoadedTextRef: React.MutableRefObject<string>
) => {
  const { saveChange } = useDevModeDatabase(projectId);

  const handleSave = useCallback(async () => {
    if (!textKey || !projectId || savingRef.current || !mountedRef.current) {
      setIsEditing(false);
      return;
    }

    console.log('💾 EditableText: Saving persistent text for', textKey);
    setIsSaving(true);
    savingRef.current = true;
    
    try {
      const toastId = toast.loading('Saving text...');
      
      const success = await saveChange('text', textKey, text);
      
      if (success && mountedRef.current) {
        // Update our cached state immediately
        lastLoadedTextRef.current = text;
        
        toast.success('Text saved! Auto-syncing to live...', { id: toastId, duration: 2000 });
        console.log('✅ EditableText: Text saved and cached for', textKey);
        
        // Trigger immediate sync
        setTimeout(() => {
          if (mountedRef.current) {
            console.log('🚀 EditableText: Triggering immediate sync');
            window.dispatchEvent(new CustomEvent('projectDataUpdated', {
              detail: { 
                projectId, 
                textChanged: true, 
                immediate: true,
                timestamp: Date.now(),
                source: 'editable-text',
                requiresSync: true
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
      }
    }
  }, [textKey, projectId, text, saveChange, setIsSaving, setIsEditing, savingRef, mountedRef, lastLoadedTextRef]);

  return { handleSave };
};
