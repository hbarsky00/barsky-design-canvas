import React from 'react';
import { BubbleMenu as TiptapBubbleMenu, Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Code,
  Link,
  Unlink,
  Palette
} from 'lucide-react';
import { EnhancedColorPicker } from './EnhancedColorPicker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface BubbleMenuProps {
  editor: Editor;
}

export const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleColorChange = (color: string) => {
    editor.chain().focus().setColorWithOpacity(color).run();
  };

  const handleRemoveColor = () => {
    editor.chain().focus().unsetColorWithOpacity().run();
  };

  return (
    <TiptapBubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="bubble-menu bg-background border border-border rounded-lg shadow-lg p-1 flex items-center gap-1"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-muted' : ''}`}
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-muted' : ''}`}
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`h-8 w-8 p-0 ${editor.isActive('strike') ? 'bg-muted' : ''}`}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`h-8 w-8 p-0 ${editor.isActive('code') ? 'bg-muted' : ''}`}
      >
        <Code className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <Palette className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" side="top">
          <EnhancedColorPicker
            currentColor={editor.getAttributes('textStyle').color}
            onColorChange={handleColorChange}
            onRemoveColor={handleRemoveColor}
          />
        </PopoverContent>
      </Popover>

      <Separator orientation="vertical" className="h-6" />

      {editor.isActive('link') ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="h-8 w-8 p-0"
        >
          <Unlink className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={setLink}
          className="h-8 w-8 p-0"
        >
          <Link className="h-4 w-4" />
        </Button>
      )}
    </TiptapBubbleMenu>
  );
};