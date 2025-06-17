
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDevMode } from '@/context/DevModeContext';

interface InsertContentButtonProps {
  onAdd: (type: 'text' | 'image' | 'header' | 'video' | 'pdf', position?: number) => void;
  position?: number;
  label?: string;
  className?: string;
}

const InsertContentButton: React.FC<InsertContentButtonProps> = ({
  onAdd,
  position,
  label = "Add content here",
  className = ""
}) => {
  const { isDevMode } = useDevMode();

  if (!isDevMode) return null;

  return (
    <div className={`flex justify-center my-2 opacity-0 group-hover:opacity-100 transition-opacity ${className}`}>
      <div className="flex gap-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-1 shadow-sm">
        <Button
          onClick={() => onAdd('text', position)}
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs"
          title="Add text"
        >
          <Plus className="h-3 w-3 mr-1" />
          Text
        </Button>
        <Button
          onClick={() => onAdd('image', position)}
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs"
          title="Add image"
        >
          <Plus className="h-3 w-3 mr-1" />
          Image
        </Button>
        <Button
          onClick={() => onAdd('header', position)}
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs"
          title="Add header"
        >
          <Plus className="h-3 w-3 mr-1" />
          Header
        </Button>
      </div>
    </div>
  );
};

export default InsertContentButton;
