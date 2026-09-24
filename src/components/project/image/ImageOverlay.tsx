import React from "react";
import { Maximize2 } from "lucide-react";

interface ImageOverlayProps {
  isHovered: boolean;
  imageError: boolean;
  onMaximize: () => void;
}

/**
 * The hover affordance on a case-study image: a maximize hint, nothing else.
 *
 * This used to carry replace/delete controls and a file input that uploaded to
 * Supabase storage. That path only ever rendered under import.meta.env.DEV, and
 * the storage bucket is gone, so the controls were dead weight holding a live
 * import to the Supabase client.
 */
const ImageOverlay: React.FC<ImageOverlayProps> = ({ isHovered, imageError, onMaximize }) => {
  if (imageError) return null;

  return (
    <button
      type="button"
      onClick={onMaximize}
      aria-label="View full size"
      className={`absolute inset-0 flex items-end justify-end p-2 transition-opacity duration-300 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="rounded-full bg-black/60 p-2 text-white">
        <Maximize2 className="h-4 w-4" />
      </span>
    </button>
  );
};

export default ImageOverlay;
