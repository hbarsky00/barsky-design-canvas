
import React from 'react';
import { Columns2 } from 'lucide-react';
import AddContentButton from '@/components/dev/AddContentButton';
import { useDevMode } from '@/context/DevModeContext';

interface LayoutControlsProps {
  isColumnLayout: boolean;
  setIsColumnLayout: (value: boolean) => void;
  onAddContent: (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => void;
}

const LayoutControls: React.FC<LayoutControlsProps> = ({
  isColumnLayout,
  setIsColumnLayout,
  onAddContent
}) => {
  const { isDevMode } = useDevMode();

  if (!isDevMode) return null;

  return (
    <div className="flex items-center gap-2 mb-4">
      <AddContentButton onAdd={onAddContent} />
      <button
        onClick={() => setIsColumnLayout(!isColumnLayout)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
          isColumnLayout 
            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        title={isColumnLayout ? 'Switch to 1 column' : 'Switch to 2 columns'}
      >
        <Columns2 className="h-4 w-4" />
        {isColumnLayout ? '2 Columns' : '1 Column'}
      </button>
    </div>
  );
};

export default LayoutControls;
