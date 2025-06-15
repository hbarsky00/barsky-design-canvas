
import React, { useState } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Check } from 'lucide-react';
import { toast } from 'sonner';

interface EditableTextProps {
  initialText: string;
  children: (currentText: string) => React.ReactNode;
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({ initialText, children, multiline = false }) => {
  const { isDevMode } = useDevMode();
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(initialText);

  const handleSave = () => {
    setIsEditing(false);
    // Only show toast if text has changed
    if (currentText.trim() !== initialText.trim()) {
      const command = `Please replace the following text:\n--- ORIGINAL ---\n${initialText}\n--- WITH ---\n${currentText}`;
      
      navigator.clipboard.writeText(command);
      toast.success("Text updated on screen. Command copied!", {
        description: "To make this change permanent, just paste the command into our chat.",
        duration: 8000,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setCurrentText(initialText);
    }
  };

  if (!isDevMode || !initialText) {
    return <>{children(initialText)}</>;
  }

  // When not editing, we show the updated text for immediate feedback.
  // The original text is preserved in `initialText` for comparison on save.
  const displayedText = isEditing ? currentText : (currentText !== initialText && !isEditing ? currentText : initialText);

  return (
    <div className="relative group w-full">
      {isEditing ? (
        <div className='w-full pr-10'>
          {multiline ? (
            <Textarea
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-auto text-inherit"
              autoFocus
            />
          ) : (
            <Input
              type="text"
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-inherit"
              autoFocus
            />
          )}
        </div>
      ) : (
        children(displayedText)
      )}
      
      <Button
        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 z-20 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background"
        title={isEditing ? "Save changes" : "Edit text"}
      >
        {isEditing ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default EditableText;
