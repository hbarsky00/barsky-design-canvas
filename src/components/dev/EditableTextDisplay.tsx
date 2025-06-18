
import React from 'react';
import RichTextRenderer from './RichTextRenderer';

interface EditableTextDisplayProps {
  text: string;
  children: (text: string) => React.ReactNode;
  enableRichText: boolean;
  multiline: boolean;
  canClick: boolean;
  isSaving: boolean;
  onClick: () => void;
}

const EditableTextDisplay: React.FC<EditableTextDisplayProps> = ({
  text,
  children,
  enableRichText,
  multiline,
  canClick,
  isSaving,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`${
        canClick
          ? 'cursor-pointer hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 rounded p-1 -m-1 transition-all duration-200' 
          : ''
      } ${isSaving ? 'opacity-50' : ''}`}
      title={canClick ? (isSaving ? 'Saving...' : 'Click to edit') : undefined}
    >
      {enableRichText && multiline ? (
        <RichTextRenderer text={text} />
      ) : (
        children(text)
      )}
      {isSaving && (
        <span className="ml-2 text-xs text-blue-600">
          Saving...
        </span>
      )}
    </div>
  );
};

export default EditableTextDisplay;
