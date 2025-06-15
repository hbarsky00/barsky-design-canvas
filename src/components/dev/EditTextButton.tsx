
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';

interface EditTextButtonProps {
  text?: string;
  className?: string;
}

const EditTextButton: React.FC<EditTextButtonProps> = ({ text, className = '' }) => {
  const { isDevMode } = useDevMode();

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success("Text content copied to clipboard!", {
        description: text.length > 50 ? `${text.substring(0, 50)}...` : text,
      });
    }
  };

  if (!isDevMode || !text) {
    return null;
  }

  return (
    <div className={`absolute top-1/2 -translate-y-1/2 -right-2 transform translate-x-full z-20 opacity-0 group-hover:opacity-100 transition-opacity ${className}`}>
      <Button
        onClick={handleEditClick}
        variant="secondary"
        size="icon"
        className="shadow-md h-6 w-6 rounded-md"
      >
        <Edit className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default EditTextButton;
