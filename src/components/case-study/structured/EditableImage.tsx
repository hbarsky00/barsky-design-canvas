
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Edit3, Maximize2 } from "lucide-react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import { getCaptionClasses } from "@/utils/captionStyles";

interface EditableImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  onImageChange?: (newSrc: string) => void;
  onCaptionChange?: (newCaption: string) => void;
  editable?: boolean;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  caption,
  className = "",
  onImageChange,
  onCaptionChange,
  editable = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCaption, setEditCaption] = useState(caption || "");
  const { maximizeImage } = useImageMaximizer();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageChange) {
      const url = URL.createObjectURL(file);
      onImageChange(url);
    }
  };

  const handleCaptionSave = () => {
    if (onCaptionChange) {
      onCaptionChange(editCaption);
    }
    setIsEditing(false);
  };

  return (
    <div className={`relative group ${className}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative overflow-hidden rounded-xl bg-surface-container"
      >
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          onClick={() => maximizeImage(src, alt)}
        />

        {editable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-scrim/50 backdrop-blur-sm flex items-center justify-center gap-3"
          >
            <Button
              size="sm"
              variant="filled"
              className="bg-surface text-on-surface shadow-lg"
              onClick={() => document.getElementById(`upload-${src}`)?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Replace
            </Button>
            <Button
              size="sm"
              variant="filled"
              className="bg-surface text-on-surface shadow-lg"
              onClick={() => maximizeImage(src, alt)}
            >
              <Maximize2 className="h-4 w-4 mr-2" />
              View
            </Button>
            <input
              id={`upload-${src}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </motion.div>
        )}
      </motion.div>

      {(caption || editable) && (
        <div className="mt-3">
          {isEditing ? (
            <Card className={getCaptionClasses({ variant: 'card', alignment: 'left' })}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="flex-1 text-xs bg-transparent border-none outline-none placeholder-gray-500"
                  placeholder="Add image caption..."
                />
                <Button size="sm" onClick={handleCaptionSave}>
                  Save
                </Button>
              </div>
            </Card>
          ) : (
            <div className="flex items-center justify-between">
              <figcaption className={getCaptionClasses({ variant: 'default', alignment: 'center' })}>
                {caption || "No caption"}
              </figcaption>
              {editable && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
