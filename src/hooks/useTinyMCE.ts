
import React, { useCallback, useState } from 'react';

interface UseTinyMCEOptions {
  initialContent?: string;
  autoSave?: boolean;
  autoSaveInterval?: number;
}

interface UseTinyMCEReturn {
  content: string;
  setContent: (content: string) => void;
  saveContent: () => void;
  clearContent: () => void;
  isDirty: boolean;
  lastSaved: Date | null;
}

export const useTinyMCE = (options: UseTinyMCEOptions = {}): UseTinyMCEReturn => {
  const { initialContent = '', autoSave = false, autoSaveInterval = 30000 } = options;
  
  const [content, setContentState] = useState(initialContent);
  const [savedContent, setSavedContent] = useState(initialContent);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const setContent = useCallback((newContent: string) => {
    setContentState(newContent);
  }, []);

  const saveContent = useCallback(() => {
    setSavedContent(content);
    setLastSaved(new Date());
    
    // Here you could integrate with your backend API
    console.log('Content saved:', content);
  }, [content]);

  const clearContent = useCallback(() => {
    setContentState('');
  }, []);

  const isDirty = content !== savedContent;

  // Auto-save functionality
  React.useEffect(() => {
    if (autoSave && isDirty) {
      const timer = setTimeout(() => {
        saveContent();
      }, autoSaveInterval);

      return () => clearTimeout(timer);
    }
  }, [autoSave, isDirty, autoSaveInterval, saveContent]);

  return {
    content,
    setContent,
    saveContent,
    clearContent,
    isDirty,
    lastSaved
  };
};
