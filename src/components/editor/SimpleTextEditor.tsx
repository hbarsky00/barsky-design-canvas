import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface SimpleTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSave?: () => void;
  className?: string;
  placeholder?: string;
  editable?: boolean;
  showToolbar?: boolean;
  autoSave?: boolean;
  autoSaveDelay?: number;
  height?: number;
  initialValue?: string;
  onEditorChange?: (content: string) => void;
  readonly?: boolean;
}

export const SimpleTextEditor: React.FC<SimpleTextEditorProps> = ({
  content,
  onChange,
  onSave,
  className = '',
  placeholder = 'Start writing...',
  editable = true,
  height = 200,
  initialValue,
  onEditorChange,
  readonly = false
}) => {
  const textValue = content || initialValue || '';

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
    onEditorChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      onSave?.();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <Textarea
        value={textValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={!editable || readonly}
        className="w-full resize-vertical"
        style={{ minHeight: `${height}px` }}
      />
      {onSave && (
        <div className="mt-2 flex justify-end">
          <Button onClick={onSave} size="sm">
            Save
          </Button>
        </div>
      )}
    </div>
  );
};