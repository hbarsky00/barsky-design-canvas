
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactQuillEditor from './ReactQuillEditor';

interface ContentTextEditorProps {
  content: string;
  contentType: 'paragraph' | 'header' | 'section';
  onSave: (content: string) => void;
  className?: string;
}

const ContentTextEditor: React.FC<ContentTextEditorProps> = ({
  content,
  contentType,
  onSave,
  className = ""
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const getEditorHeight = () => {
    switch (contentType) {
      case 'header': return 150;
      case 'paragraph': return 200;
      case 'section': return 300;
      default: return 200;
    }
  };

  const getPlaceholder = () => {
    switch (contentType) {
      case 'header': return 'Edit header text...';
      case 'paragraph': return 'Edit paragraph content...';
      case 'section': return 'Edit section content...';
      default: return 'Start editing...';
    }
  };

  const renderContent = () => {
    if (contentType === 'header') {
      return (
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {editedContent.replace(/<[^>]*>/g, '')}
        </h2>
      );
    }
    
    if (contentType === 'paragraph') {
      return (
        <div 
          className="text-xl text-gray-600 leading-relaxed prose prose-lg"
          dangerouslySetInnerHTML={{ __html: editedContent }}
        />
      );
    }
    
    // section type
    return (
      <div 
        className="prose prose-lg text-gray-600 leading-relaxed max-w-none"
        dangerouslySetInnerHTML={{ __html: editedContent }}
      />
    );
  };

  return (
    <div className={`relative group ${className}`}>
      {!isEditing ? (
        <div className="group/content relative">
          {renderContent()}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="absolute top-0 right-0 opacity-0 group-hover/content:opacity-100 transition-opacity duration-200"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <ReactQuillEditor
            initialValue={editedContent}
            onEditorChange={setEditedContent}
            height={getEditorHeight()}
            placeholder={getPlaceholder()}
          />
          
          <div className="flex justify-center space-x-2">
            <Button
              onClick={handleSave}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ContentTextEditor;
