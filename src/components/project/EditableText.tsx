
import React, { useState } from 'react';
import { shouldShowEditingControls } from '@/utils/devModeDetection';

interface EditableTextProps {
  content: string;
  onSave: (newContent: string) => void;
  className?: string;
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  content,
  onSave,
  className = '',
  multiline = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const showEditingControls = shouldShowEditingControls();

  if (!showEditingControls) {
    return <span className={className}>{content}</span>;
  }

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(content);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded resize-vertical min-h-[100px]"
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            autoFocus
          />
        )}
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <span 
      className={`${className} cursor-pointer hover:bg-yellow-100 rounded px-1`}
      onClick={() => setIsEditing(true)}
      title="Click to edit"
    >
      {content}
    </span>
  );
};

export default EditableText;
