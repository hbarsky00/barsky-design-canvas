
import React, { useRef, useEffect, useCallback } from 'react';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import RichTextToolbar from './RichTextToolbar';

interface EditableTextInputProps {
  text: string;
  setText: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
  multiline: boolean;
  enableRichText: boolean;
  isSaving: boolean;
  textKey?: string;
  onDelete?: () => void;
  showDeleteButton: boolean;
  initialText: string;
  projectId: string;
}

const EditableTextInput: React.FC<EditableTextInputProps> = ({
  text,
  setText,
  onSave,
  onCancel,
  multiline,
  enableRichText,
  isSaving,
  textKey,
  onDelete,
  showDeleteButton,
  initialText,
  projectId
}) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const { getChanges } = useDevModeDatabase(projectId);

  const handleFormat = useCallback((format: 'bold' | 'italic' | 'list' | 'ordered-list') => {
    if (!inputRef.current) return;

    const textarea = inputRef.current as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);
    
    let formattedText = '';
    let newCursorPos = start;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        newCursorPos = start + (selectedText ? 2 : 2);
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        newCursorPos = start + (selectedText ? 1 : 1);
        break;
      case 'list':
        const bulletList = selectedText.split('\n').map(line => 
          line.trim() ? `• ${line.trim()}` : line
        ).join('\n');
        formattedText = bulletList;
        newCursorPos = start + formattedText.length;
        break;
      case 'ordered-list':
        const numberedList = selectedText.split('\n').map((line, index) => 
          line.trim() ? `${index + 1}. ${line.trim()}` : line
        ).join('\n');
        formattedText = numberedList;
        newCursorPos = start + formattedText.length;
        break;
    }

    const newText = text.substring(0, start) + formattedText + text.substring(end);
    setText(newText);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  }, [text, setText]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    console.log('⌨️ EditableText: Key pressed:', e.key, 'for', textKey);
    
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      onSave();
    } else if (e.key === 'Escape') {
      console.log('🚫 EditableText: Escape pressed, canceling edit for', textKey);
      if (textKey && projectId) {
        getChanges().then(changes => {
          setText(changes.textContent[textKey] || initialText);
        }).catch(() => {
          setText(initialText);
        });
      } else {
        setText(initialText);
      }
      onCancel();
    }
  }, [onSave, multiline, textKey, projectId, getChanges, initialText, setText, onCancel]);

  useEffect(() => {
    if (inputRef.current) {
      console.log('🎯 EditableText: Focusing input for', textKey);
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [textKey]);

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className="relative">
      {enableRichText && multiline && (
        <RichTextToolbar
          onFormat={handleFormat}
          onDelete={onDelete}
          showDelete={showDeleteButton}
        />
      )}
      <InputComponent
        ref={inputRef as any}
        value={text}
        onChange={(e) => {
          console.log('📝 EditableText: Text changed for', textKey);
          setText(e.target.value);
        }}
        onBlur={onSave}
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
};

export default EditableTextInput;
