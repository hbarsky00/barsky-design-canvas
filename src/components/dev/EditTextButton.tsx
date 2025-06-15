
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';

interface EditTextButtonProps {
  text?: string;
  className?: string;
}

const EditTextButton: React.FC<EditTextButtonProps> = ({ text, className }) => {
  const { isDevMode } = useDevMode();

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard.", {
        description: "You can now ask me to replace the copied text with new content.",
        duration: 8000,
      });
    }
  };

  if (!isDevMode || !text) {
    return null;
  }

  return (
    <Button
      onClick={handleEditClick}
      variant="outline"
      size="icon"
      className={`absolute top-2 right-2 z-20 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background ${className}`}
      title="Edit text"
    >
      <Edit className="h-4 w-4" />
    </Button>
  );
};

export default EditTextButton;
