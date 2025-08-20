import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { ColorWithOpacity } from '@/extensions/ColorWithOpacity';
import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { TextAlign } from '@tiptap/extension-text-align';
import { SlashCommand } from './extensions/SlashCommand';

import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import './modern-editor.css';

interface ModernTiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSave?: () => void;
  className?: string;
  placeholder?: string;
  editable?: boolean;
  autoSave?: boolean;
  autoSaveDelay?: number;
  projectId?: string;
  contentKey?: string;
}

export const ModernTiptapEditor: React.FC<ModernTiptapEditorProps> = ({
  content,
  onChange,
  onSave,
  className = '',
  placeholder = 'Type "/" for commands...',
  editable = true,
  autoSave = true,
  autoSaveDelay = 2000,
  projectId,
  contentKey
}) => {
  const { toast } = useToast();

  const saveToDatabase = useCallback(async (content: string) => {
    if (!projectId || !contentKey) {
      if (onSave) onSave();
      return;
    }

    try {
      const { error } = await supabase
        .from('project_content')
        .upsert({
          project_id: projectId,
          content_key: contentKey,
          content_value: content,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      if (onSave) onSave();
      
      toast({
        title: "Saved",
        description: "Content has been saved successfully",
      });
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Save failed",
        description: "Failed to save content. Please try again.",
        variant: "destructive",
      });
    }
  }, [projectId, contentKey, onSave, toast]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextStyle,
      ColorWithOpacity,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:text-primary-glow underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      SlashCommand,
    ],
    content,
    editable,
    editorProps: {
      attributes: {
        class: `prose prose-slate max-w-none focus:outline-none min-h-[200px] p-6 ${className}`,
        'data-placeholder': placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !editor) return;

    const timeoutId = setTimeout(() => {
      saveToDatabase(editor.getHTML());
    }, autoSaveDelay);

    return () => clearTimeout(timeoutId);
  }, [content, autoSave, autoSaveDelay, saveToDatabase, editor]);

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Manual save
  const handleSave = useCallback(() => {
    if (editor) {
      saveToDatabase(editor.getHTML());
    }
  }, [editor, saveToDatabase]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSave]);

  if (!editor) {
    return (
      <div className="animate-pulse bg-muted h-48 rounded-lg border border-border" />
    );
  }

  return (
    <div className="modern-editor border border-border rounded-lg overflow-hidden bg-background">
      
      
      <EditorContent 
        editor={editor} 
        className="modern-editor-content"
      />
      
      <style>{`
        .modern-editor .ProseMirror {
          outline: none;
        }
        
        .modern-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: hsl(var(--muted-foreground));
          pointer-events: none;
          height: 0;
        }
        
        .modern-editor .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1.5rem 0 1rem 0;
          line-height: 1.2;
        }
        
        .modern-editor .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1.25rem 0 0.75rem 0;
          line-height: 1.3;
        }
        
        .modern-editor .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.4;
        }
        
        .modern-editor .ProseMirror ul,
        .modern-editor .ProseMirror ol {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }
        
        .modern-editor .ProseMirror li {
          margin: 0.25rem 0;
        }
        
        .modern-editor .ProseMirror blockquote {
          border-left: 4px solid hsl(var(--primary));
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: hsl(var(--muted-foreground));
        }
        
        .modern-editor .ProseMirror code {
          background-color: hsl(var(--muted));
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
          font-size: 0.875em;
        }
        
        .modern-editor .ProseMirror pre {
          background-color: hsl(var(--muted));
          padding: 1rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
          overflow-x: auto;
        }
        
        .modern-editor .ProseMirror pre code {
          background: none;
          padding: 0;
          border-radius: 0;
        }
        
        .modern-editor .ProseMirror hr {
          border: none;
          border-top: 2px solid hsl(var(--border));
          margin: 2rem 0;
        }
        
        .modern-editor .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
};