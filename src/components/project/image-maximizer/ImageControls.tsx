
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
        className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-800 disabled:bg-blue-300 border-none shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-white hover:text-white disabled:text-white transition-all duration-200 ease-in-out [&_svg]:stroke-white [&_svg]:fill-none"
        style={{ backgroundColor: scale <= 0.5 ? '#93C5FD' : '#3B82F6' }}
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
        <Minus className="h-6 w-6 stroke-2 text-white" />
        <span className="sr-only">Zoom Out</span>
      </Button>

      {/* Zoom In Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomIn}
        disabled={scale >= 3}
        title="Zoom In"
        className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-800 disabled:bg-blue-300 border-none shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-white hover:text-white disabled:text-white transition-all duration-200 ease-in-out [&_svg]:stroke-white [&_svg]:fill-none"
        style={{ backgroundColor: scale >= 3 ? '#93C5FD' : '#3B82F6' }}
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
        <Plus className="h-6 w-6 stroke-2 text-white" />
        <span className="sr-only">Zoom In</span>
      </Button>

      {/* Full Screen / Reset Zoom Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        disabled={scale === 1}
        title="Fit to Screen"
        className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-800 disabled:bg-blue-300 border-none shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-white hover:text-white disabled:text-white transition-all duration-200 ease-in-out [&_svg]:stroke-white [&_svg]:fill-none"
        style={{ backgroundColor: scale === 1 ? '#93C5FD' : '#3B82F6' }}
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
        <Maximize className="h-6 w-6 stroke-2 text-white" />
        <span className="sr-only">Fit to Screen</span>
      </Button>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        title="Close"
        className="w-12 h-12 rounded-full border-none shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-white hover:text-white transition-all duration-200 ease-in-out [&_svg]:stroke-white [&_svg]:fill-none"
        style={{ backgroundColor: '#3B82F6' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#1E40AF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#3B82F6';
        }}
      >
        <X className="h-6 w-6 stroke-2 text-white" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};

export default ImageControls;
