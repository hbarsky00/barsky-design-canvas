
import React from 'react';
import ReactQuillEditor from './ReactQuillEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContentEditorProps {
  title?: string;
  content: string;
  onContentChange: (content: string) => void;
  placeholder?: string;
  readonly?: boolean;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  title = 'Content Editor',
  content,
  onContentChange,
  placeholder = 'Start writing...',
  readonly = false
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ReactQuillEditor
          initialValue={content}
          onEditorChange={onContentChange}
          placeholder={placeholder}
          readonly={readonly}
          height={400}
        />
      </CardContent>
    </Card>
  );
};

export default ContentEditor;
