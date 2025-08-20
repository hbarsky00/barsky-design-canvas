import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { TextAlign } from '@tiptap/extension-text-align';
import { createLowlight, common } from 'lowlight';
import { TiptapToolbar } from './TiptapToolbar';
import { useToast } from '@/hooks/use-toast';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSave?: () => void;
  className?: string;
  placeholder?: string;
  editable?: boolean;
  showToolbar?: boolean;
  autoSave?: boolean;
  autoSaveDelay?: number;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content,
  onChange,
  onSave,
  className = '',
  placeholder = 'Start typing...',
  editable = true,
  showToolbar = true,
  autoSave = true,
  autoSaveDelay = 2000
}) => {
  const { toast } = useToast();

  const lowlight = createLowlight(common);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // We'll use CodeBlockLowlight instead
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:text-primary-glow underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-muted p-4 rounded-lg overflow-x-auto',
        },
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: `prose prose-slate max-w-none focus:outline-none min-h-[200px] p-4 ${className}`,
        'data-placeholder': placeholder,
      },
    },
  });

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !onSave || !editor) return;

    const saveTimer = setTimeout(() => {
      if (editor.getHTML() !== content) {
        onSave();
      }
    }, autoSaveDelay);

    return () => clearTimeout(saveTimer);
  }, [content, autoSave, autoSaveDelay, onSave, editor]);

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      // This would integrate with your Supabase storage
      // For now, we'll create a placeholder
      const imageUrl = URL.createObjectURL(file);
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      
      toast({
        title: "Image uploaded",
        description: "Image has been added to the content",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  }, [editor, toast]);

  if (!editor) {
    return <div className="animate-pulse bg-muted h-48 rounded-lg" />;
  }

  return (
    <div className="tiptap-editor border border-border rounded-lg overflow-hidden bg-background">
      {showToolbar && (
        <TiptapToolbar 
          editor={editor} 
          onImageUpload={handleImageUpload}
          onSave={onSave}
        />
      )}
      <EditorContent 
        editor={editor} 
        className="prose-editor"
      />
      <style>{`
        .tiptap-editor .ProseMirror {
          outline: none;
        }
        
        .tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: hsl(var(--muted-foreground));
          pointer-events: none;
          height: 0;
        }
        
        .tiptap-editor .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
        }
        
        .tiptap-editor .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.75rem 0;
        }
        
        .tiptap-editor .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        
        .tiptap-editor .ProseMirror ul,
        .tiptap-editor .ProseMirror ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
        
        .tiptap-editor .ProseMirror blockquote {
          border-left: 4px solid hsl(var(--primary));
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
        }
        
        .tiptap-editor .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
        
        .tiptap-editor .ProseMirror table td,
        .tiptap-editor .ProseMirror table th {
          border: 1px solid hsl(var(--border));
          padding: 0.5rem;
          text-align: left;
        }
        
        .tiptap-editor .ProseMirror table th {
          background-color: hsl(var(--muted));
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};