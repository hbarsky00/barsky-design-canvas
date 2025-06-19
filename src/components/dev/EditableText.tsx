
import React, { useEffect, useCallback } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useOptimizedSync } from '@/hooks/useOptimizedSync';
import { useEditableTextState, useEditableTextLoad, useEditableTextSave } from './EditableTextHooks';
import EditableTextInput from './EditableTextInput';
import EditableTextDisplay from './EditableTextDisplay';

interface EditableTextProps {
  children: (text: string) => React.ReactNode;
  initialText: string;
  multiline?: boolean;
  textKey?: string;
  enableRichText?: boolean;
  onDelete?: () => void;
  showDeleteButton?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  children,
  initialText,
  multiline = false,
  textKey,
  enableRichText = false,
  onDelete,
  showDeleteButton = false
}) => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  
  const safeProjectId = projectId || '';
  const { queueChange } = useOptimizedSync(safeProjectId);
  
  const {
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
  } = useEditableTextState(initialText, textKey, safeProjectId);

  // Set mounted to true on mount
  useEffect(() => {
    mountedRef.current = true;
    console.log('✅ EditableText: Component mounted for', textKey);
    
    return () => {
      console.log('🚪 EditableText: Component unmounting for', textKey);
      mountedRef.current = false;
    };
  }, [textKey, mountedRef]);

  // Load saved text
  useEditableTextLoad(
    textKey,
    safeProjectId,
    initialText,
    setText,
    setIsLoading,
    mountedRef,
    loadTimeoutRef,
    lastLoadedTextRef
  );

  // Optimized save functionality with queuing
  const handleSave = useCallback(async () => {
    if (!textKey || !safeProjectId || savingRef.current || !mountedRef.current) {
      setIsEditing(false);
      return;
    }

    console.log('💾 EditableText: Queuing text change for optimized sync:', textKey);
    setIsSaving(true);
    savingRef.current = true;
    
    try {
      // Queue the change for optimized processing
      queueChange('text', textKey, text);
      
      // Update our cached state immediately for UI responsiveness
      lastLoadedTextRef.current = text;
      
      // Dispatch save event for components that need to know about text updates
      window.dispatchEvent(new CustomEvent('editableTextSaved', {
        detail: { 
          textKey, 
          content: text,
          projectId: safeProjectId
        }
      }));
      
      toast.success('Text queued for sync!', { 
        description: 'Changes will be synced automatically',
        duration: 2000 
      });
      
      console.log('✅ EditableText: Text change queued successfully for', textKey);
      
    } catch (error) {
      console.error('❌ EditableText: Error queuing text change:', error);
      if (mountedRef.current) {
        toast.error('Failed to queue text change');
      }
    } finally {
      savingRef.current = false;
      if (mountedRef.current) {
        setIsSaving(false);
        setIsEditing(false);
      }
    }
  }, [textKey, safeProjectId, text, queueChange, setIsSaving, setIsEditing, savingRef, mountedRef, lastLoadedTextRef]);

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
    enableRichText,
    canEdit: isDevMode && !isLoading && !savingRef.current && textKey && mountedRef.current,
    mounted: mountedRef.current
  });

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
  }, [isDevMode, isLoading, textKey, savingRef, mountedRef, setIsEditing]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

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
    return (
      <EditableTextInput
        text={text}
        setText={setText}
        onSave={handleSave}
        onCancel={handleCancel}
        multiline={multiline}
        enableRichText={enableRichText}
        isSaving={isSaving}
        textKey={textKey}
        onDelete={onDelete}
        showDeleteButton={showDeleteButton}
        initialText={initialText}
        projectId={safeProjectId}
      />
    );
  }

  const canClick = isDevMode && textKey && mountedRef.current;
  console.log('👁️ EditableText: Rendering view mode for', textKey, 'canClick:', canClick);

  return (
    <EditableTextDisplay
      text={text}
      children={children}
      enableRichText={enableRichText}
      multiline={multiline}
      canClick={canClick}
      isSaving={isSaving}
      onClick={handleClick}
    />
  );
};

export default EditableText;
