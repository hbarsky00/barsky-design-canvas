import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SimpleTextEditor } from './SimpleTextEditor';
import { useEditableContent } from '@/hooks/useEditableContent';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';
import { Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { shouldShowEditingControls } from '@/utils/devModeDetection';

interface EditableContentProps {
  contentKey: string;
  defaultContent: string;
  pagePath?: string;
  sectionName?: string;
  className?: string;
  renderAs?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  placeholder?: string;
}

export const EditableContent: React.FC<EditableContentProps> = ({
  contentKey,
  defaultContent,
  pagePath = '/',
  sectionName = 'default',
  className = '',
  renderAs = 'div',
  placeholder = 'Click to edit...'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const { toast } = useToast();
  
  const {
    content,
    isLoading,
    isSaving,
    saveContent,
  } = useEditableContent(contentKey, defaultContent, pagePath, sectionName);

  const showEditingControls = shouldShowEditingControls();

  const handleEditStart = () => {
    setEditContent(content || defaultContent);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditContent('');
  };

  const handleEditSave = async () => {
    try {
      await saveContent(editContent);
      setIsEditing(false);
      setEditContent('');
    } catch (error) {
      console.error('Failed to save content:', error);
    }
  };

  if (isLoading) {
    return (
      <div className={`animate-pulse bg-muted h-8 rounded ${className}`} />
    );
  }

  const Component = renderAs;

  return (
    <div className={`relative group ${className}`}>
      {showEditingControls && (
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="h-6 w-6 p-0 shadow-lg"
                onClick={handleEditStart}
              >
                <Edit className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>Edit Content</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-hidden">
                <SimpleTextEditor
                  content={editContent}
                  onChange={setEditContent}
                  placeholder={placeholder}
                  className="h-full"
                  height={400}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleEditCancel}
                  disabled={isSaving}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  onClick={handleEditSave}
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4 mr-1" />
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
      
      <Component className={className}>
        {content ? (
          <RichTextRenderer content={content} />
        ) : (
          <span className="text-muted-foreground italic">
            {showEditingControls ? placeholder : defaultContent}
          </span>
        )}
      </Component>
    </div>
  );
};