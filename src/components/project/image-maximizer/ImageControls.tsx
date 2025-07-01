
import React from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize, X } from "lucide-react";

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
    <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onZoomOut}
        disabled={scale <= 0.5}
        title="Zoom Out"
        className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 border-none shadow-lg text-white hover:text-white active:text-white focus:text-white disabled:text-white [&_svg]:text-white [&_svg]:stroke-white [&_svg]:fill-none hover:[&_svg]:text-white hover:[&_svg]:stroke-white active:[&_svg]:text-white active:[&_svg]:stroke-white focus:[&_svg]:text-white focus:[&_svg]:stroke-white disabled:[&_svg]:text-white disabled:[&_svg]:stroke-white"
      >
        <ZoomOut className="h-5 w-5 text-white stroke-white fill-none stroke-2" />
        <span className="sr-only">Zoom Out</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onZoomIn}
        disabled={scale >= 3}
        title="Zoom In"
        className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 border-none shadow-lg text-white hover:text-white active:text-white focus:text-white disabled:text-white [&_svg]:text-white [&_svg]:stroke-white [&_svg]:fill-none hover:[&_svg]:text-white hover:[&_svg]:stroke-white active:[&_svg]:text-white active:[&_svg]:stroke-white focus:[&_svg]:text-white focus:[&_svg]:stroke-white disabled:[&_svg]:text-white disabled:[&_svg]:stroke-white"
      >
        <ZoomIn className="h-5 w-5 text-white stroke-white fill-none stroke-2" />
        <span className="sr-only">Zoom In</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onReset}
        disabled={scale === 1}
        title="Reset Zoom"
        className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 border-none shadow-lg text-white hover:text-white active:text-white focus:text-white disabled:text-white [&_svg]:text-white [&_svg]:stroke-white [&_svg]:fill-none hover:[&_svg]:text-white hover:[&_svg]:stroke-white active:[&_svg]:text-white active:[&_svg]:stroke-white focus:[&_svg]:text-white focus:[&_svg]:stroke-white disabled:[&_svg]:text-white disabled:[&_svg]:stroke-white"
      >
        <Maximize className="h-5 w-5 text-white stroke-white fill-none stroke-2" />
        <span className="sr-only">Reset Zoom</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onClose}
        title="Close"
        className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 border-none shadow-lg text-white hover:text-white active:text-white focus:text-white disabled:text-white [&_svg]:text-white [&_svg]:stroke-white [&_svg]:fill-none hover:[&_svg]:text-white hover:[&_svg]:stroke-white active:[&_svg]:text-white active:[&_svg]:stroke-white focus:[&_svg]:text-white focus:[&_svg]:stroke-white disabled:[&_svg]:text-white disabled:[&_svg]:stroke-white"
      >
        <X className="h-5 w-5 text-white stroke-white fill-none stroke-2" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};

export default ImageControls;
