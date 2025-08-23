
import React from 'react';
import { Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SimpleTextEditor } from '@/components/editor/SimpleTextEditor';

interface ContentEditorProps {
  isEditing: boolean;
  content: string;
  editedContent: string;
  title: string;
  showEditingControls: boolean;
  onStartEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onContentChange: (content: string) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  isEditing,
  content,
  editedContent,
  title,
  showEditingControls,
  onStartEdit,
  onSave,
  onCancel,
  onContentChange
}) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Save button clicked');
    onSave();
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Cancel button clicked');
    onCancel();
  };

  if (!isEditing) {
    return (
      <div className="group/content relative">
        <div 
          className="prose prose-lg text-gray-600 leading-relaxed max-w-none text-center"
          dangerouslySetInnerHTML={{ __html: editedContent }}
        />
        {showEditingControls && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onStartEdit}
            className="absolute top-0 right-0 opacity-0 group-hover/content:opacity-100 transition-opacity duration-200"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SimpleTextEditor
        content={editedContent}
        onChange={onContentChange}
        height={300}
        placeholder={`Edit ${title.toLowerCase()} content...`}
      />
      <div className="flex justify-center space-x-2 relative z-10">
        <Button
          onClick={handleSaveClick}
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 cursor-pointer"
          type="button"
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button
          onClick={handleCancelClick}
          variant="outline"
          size="sm"
          className="cursor-pointer"
          type="button"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ContentEditor;
