
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEEditorProps {
  initialValue?: string;
  onEditorChange?: (content: string) => void;
  height?: number;
  placeholder?: string;
  readonly?: boolean;
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({
  initialValue = '',
  onEditorChange,
  height = 400,
  placeholder = 'Start typing...',
  readonly = false
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    if (onEditorChange) {
      onEditorChange(content);
    }
  };

  return (
    <div className="w-full">
      <Editor
        apiKey="n96w6o5vvrinqjhvz1f0bfec0w9hpla9km5xxhdtxkgrua5u"
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        initialValue={initialValue}
        init={{
          height: height,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; margin: 1rem; }',
          placeholder: placeholder,
          readonly: readonly,
          branding: false,
          promotion: false,
          setup: function (editor) {
            editor.ui.registry.addButton('customSave', {
              text: 'Save',
              onAction: function () {
                const content = editor.getContent();
                if (onEditorChange) {
                  onEditorChange(content);
                }
              }
            });
          }
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default TinyMCEEditor;
