
import React, { useState, useRef, useEffect } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useProjectPersistence } from '@/hooks/useProjectPersistence';
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
  const { saveTextContent, getTextContent } = useProjectPersistence(projectId || '');
  
  // Load saved text or use initial text
  const [text, setText] = useState(() => {
    if (textKey && projectId) {
      const savedText = getTextContent(textKey, initialText);
      console.log('EditableText loading:', textKey, 'saved:', savedText, 'initial:', initialText);
      return savedText;
    }
    return initialText;
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Update text when projectId or textKey changes
  useEffect(() => {
    if (textKey && projectId) {
      const savedText = getTextContent(textKey, initialText);
      setText(savedText);
    }
  }, [textKey, projectId, getTextContent, initialText]);

  const handleClick = () => {
    if (isDevMode) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (textKey && projectId) {
      console.log('EditableText saving:', textKey, 'text:', text);
      saveTextContent(textKey, text);
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
        setText(getTextContent(textKey, initialText));
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

  if (isEditing && isDevMode) {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <InputComponent
        ref={inputRef as any}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`w-full bg-white border-2 border-blue-500 p-2 rounded ${
          multiline ? 'min-h-[100px] resize-vertical' : ''
        }`}
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
      }`}
      title={isDevMode ? 'Click to edit' : undefined}
    >
      {children(text)}
    </div>
  );
};

export default EditableText;
