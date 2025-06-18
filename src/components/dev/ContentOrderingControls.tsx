
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDevMode } from '@/context/DevModeContext';

interface ContentOrderingControlsProps {
  index: number;
  totalItems: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (index: number) => void;
}

const ContentOrderingControls: React.FC<ContentOrderingControlsProps> = ({
  index,
  totalItems,
  onMoveUp,
  onMoveDown,
  onDelete
}) => {
  const { isDevMode } = useDevMode();

  if (!isDevMode) return null;

  const canMoveUp = index > 0;
  const canMoveDown = index < totalItems - 1;

  return (
    <div className="absolute top-2 right-2 z-30 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-md p-1 shadow-sm">
      <Button
        onClick={() => onMoveUp(index)}
        disabled={!canMoveUp}
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        title="Move up"
      >
        <ArrowUp className="h-3 w-3" />
      </Button>
      <Button
        onClick={() => onMoveDown(index)}
        disabled={!canMoveDown}
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        title="Move down"
      >
        <ArrowDown className="h-3 w-3" />
      </Button>
      <Button
        onClick={() => onDelete(index)}
        variant="destructive"
        size="icon"
        className="h-6 w-6"
        title="Delete content"
      >
        ×
      </Button>
    </div>
  );
};

export default ContentOrderingControls;
