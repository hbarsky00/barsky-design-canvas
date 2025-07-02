
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Maximize, X } from "lucide-react";

interface ImageControlsProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onClose: () => void;
}

const ImageControls: React.FC<ImageControlsProps> = ({
  scale,
  onZoomIn,
  onZoomOut,
  onReset,
  onClose,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {/* Zoom Out Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomOut}
        disabled={scale <= 0.5}
        title="Zoom Out"
        className="w-10 h-10 min-w-10 min-h-10 max-w-10 max-h-10 rounded-full p-0 flex items-center justify-center border-none shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-white transition-all duration-200 ease-in-out"
        style={{ 
          backgroundColor: scale <= 0.5 ? '#93C5FD' : '#3B82F6',
          width: '38px',
          height: '38px'
        }}
        onMouseEnter={(e) => {
          if (scale > 0.5) {
            e.currentTarget.style.backgroundColor = '#1E40AF';
          }
        }}
        onMouseLeave={(e) => {
          if (scale > 0.5) {
            e.currentTarget.style.backgroundColor = '#3B82F6';
          }
        }}
      >
        <Minus className="w-5 h-5 stroke-2 text-white" />
        <span className="sr-only">Zoom Out</span>
      </Button>

      {/* Zoom In Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomIn}
        disabled={scale >= 3}
        title="Zoom In"
        className="w-10 h-10 min-w-10 min-h-10 max-w-10 max-h-10 rounded-full p-0 flex items-center justify-center border-none shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-white transition-all duration-200 ease-in-out"
        style={{ 
          backgroundColor: scale >= 3 ? '#93C5FD' : '#3B82F6',
          width: '38px',
          height: '38px'
        }}
        onMouseEnter={(e) => {
          if (scale < 3) {
            e.currentTarget.style.backgroundColor = '#1E40AF';
          }
        }}
        onMouseLeave={(e) => {
          if (scale < 3) {
            e.currentTarget.style.backgroundColor = '#3B82F6';
          }
        }}
      >
        <Plus className="w-5 h-5 stroke-2 text-white" />
        <span className="sr-only">Zoom In</span>
      </Button>

      {/* Full Screen / Reset Zoom Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        disabled={scale === 1}
        title="Fit to Screen"
        className="w-10 h-10 min-w-10 min-h-10 max-w-10 max-h-10 rounded-full p-0 flex items-center justify-center border-none shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-white transition-all duration-200 ease-in-out"
        style={{ 
          backgroundColor: scale === 1 ? '#93C5FD' : '#3B82F6',
          width: '38px',
          height: '38px'
        }}
        onMouseEnter={(e) => {
          if (scale !== 1) {
            e.currentTarget.style.backgroundColor = '#1E40AF';
          }
        }}
        onMouseLeave={(e) => {
          if (scale !== 1) {
            e.currentTarget.style.backgroundColor = '#3B82F6';
          }
        }}
      >
        <Maximize className="w-5 h-5 stroke-2 text-white" />
        <span className="sr-only">Fit to Screen</span>
      </Button>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        title="Close"
        className="w-10 h-10 min-w-10 min-h-10 max-w-10 max-h-10 rounded-full p-0 flex items-center justify-center border-none shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-white transition-all duration-200 ease-in-out"
        style={{ 
          backgroundColor: '#3B82F6',
          width: '38px',
          height: '38px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#1E40AF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#3B82F6';
        }}
      >
        <X className="w-5 h-5 stroke-2 text-white" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};

export default ImageControls;
