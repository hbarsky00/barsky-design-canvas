
import React, { useEffect, useCallback } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
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

  // Save functionality
  const { handleSave } = useEditableTextSave(
    textKey,
    safeProjectId,
    text,
    setIsSaving,
    setIsEditing,
    savingRef,
    mountedRef,
    lastLoadedTextRef
  );

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
