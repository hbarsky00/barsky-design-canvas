
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

  // Apply custom styles via useEffect
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .ql-editor {
        min-height: ${height - 42}px !important;
        font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif !important;
        font-size: 14px !important;
      }
      .ql-toolbar {
        border-top: 1px solid #ccc !important;
        border-left: 1px solid #ccc !important;
        border-right: 1px solid #ccc !important;
      }
      .ql-container {
        border-bottom: 1px solid #ccc !important;
        border-left: 1px solid #ccc !important;
        border-right: 1px solid #ccc !important;
      }
      .ql-editor.ql-blank::before {
        color: #999 !important;
        font-style: italic !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [height]);

  // Custom styles for the editor container
  const editorStyle = {
    height: `${height}px`,
    backgroundColor: 'white',
  };

  return (
    <div className="w-full">
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
