
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';

interface EditImageButtonProps {
  src?: string;
}

const EditImageButton: React.FC<EditImageButtonProps> = ({ src }) => {
  const { isDevMode } = useDevMode();

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (src) {
      navigator.clipboard.writeText(src);
      toast.success("Image source copied to clipboard!", {
        description: src,
      });
    }
  };

  if (!isDevMode) {
    return null;
  }

  return (
    <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button
        onClick={handleEditClick}
        variant="secondary"
        size="sm"
        className="shadow-md"
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </Button>
    </div>
  );
};

export default EditImageButton;
