import React from 'react';
import { ModernTiptapEditor } from './ModernTiptapEditor';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSave?: () => void;
  className?: string;
  placeholder?: string;
  editable?: boolean;
  showToolbar?: boolean;
  autoSave?: boolean;
  autoSaveDelay?: number;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = (props) => {
  return <ModernTiptapEditor {...props} />;
};
