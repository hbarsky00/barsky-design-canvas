import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Minus,
  Image as ImageIcon
} from 'lucide-react';

interface SlashCommandListProps {
  items: Array<{
    title: string;
    command: (props: any) => void;
    icon: React.ComponentType<any>;
    output?: string;
  }>;
  command: (item: any) => void;
}

export const SlashCommandList = forwardRef<any, SlashCommandListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  const commands = [
    {
      title: 'Heading 1',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 1 })
          .run();
      },
      icon: Heading1,
    },
    {
      title: 'Heading 2',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 2 })
          .run();
      },
      icon: Heading2,
    },
    {
      title: 'Heading 3',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 3 })
          .run();
      },
      icon: Heading3,
    },
    {
      title: 'Bullet List',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleBulletList()
          .run();
      },
      icon: List,
    },
    {
      title: 'Numbered List',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleOrderedList()
          .run();
      },
      icon: ListOrdered,
    },
    {
      title: 'Quote',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleBlockquote()
          .run();
      },
      icon: Quote,
    },
    {
      title: 'Code Block',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleCodeBlock()
          .run();
      },
      icon: Code,
    },
    {
      title: 'Divider',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setHorizontalRule()
          .run();
      },
      icon: Minus,
    },
  ];

  return (
    <div className="slash-command-list bg-background border border-border rounded-lg shadow-lg p-2 max-w-sm">
      {commands.map((item, index) => (
        <button
          key={index}
          className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 hover:bg-muted transition-colors ${
            index === selectedIndex ? 'bg-muted' : ''
          }`}
          onClick={() => selectItem(index)}
        >
          <item.icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{item.title}</span>
        </button>
      ))}
    </div>
  );
});

SlashCommandList.displayName = 'SlashCommandList';