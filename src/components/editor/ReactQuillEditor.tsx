
import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ReactQuillEditorProps {
  initialValue?: string;
  onEditorChange?: (content: string) => void;
  height?: number;
  placeholder?: string;
  readonly?: boolean;
}

const ReactQuillEditor: React.FC<ReactQuillEditorProps> = ({
  initialValue = '',
  onEditorChange,
  height = 400,
  placeholder = 'Start typing...',
  readonly = false
}) => {
  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'link', 'image',
    'align', 'color', 'background'
  ];

  const handleChange = (content: string) => {
    if (onEditorChange) {
      onEditorChange(content);
    }
  };

  // Custom styles for the editor
  const editorStyle = {
    height: `${height}px`,
    backgroundColor: 'white',
  };

  return (
    <div className="w-full">
      <style jsx global>{`
        .ql-editor {
          min-height: ${height - 42}px;
          font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif;
          font-size: 14px;
        }
        .ql-toolbar {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
        }
        .ql-container {
          border-bottom: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
        }
        .ql-editor.ql-blank::before {
          color: #999;
          font-style: italic;
        }
      `}</style>
      
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={initialValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={readonly}
        style={editorStyle}
      />
    </div>
  );
};

export default ReactQuillEditor;
