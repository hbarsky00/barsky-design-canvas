
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Upload, Edit3, Pause } from "lucide-react";

interface EditableVideoProps {
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
  className?: string;
  onVideoChange?: (newSrc: string) => void;
  onCaptionChange?: (newCaption: string) => void;
  editable?: boolean;
  videoOptions?: {
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    playsInline?: boolean;
  };
}

export const EditableVideo: React.FC<EditableVideoProps> = ({
  src,
  alt,
  caption,
  poster,
  className = "",
  onVideoChange,
  onCaptionChange,
  editable = false,
  videoOptions
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCaption, setEditCaption] = useState(caption || "");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onVideoChange) {
      // In a real implementation, you'd upload to a service
      const url = URL.createObjectURL(file);
      onVideoChange(url);
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
        className="relative overflow-hidden rounded-xl bg-surface-container aspect-video"
      >
        <div className="relative w-full h-full">
          <img
            src="https://barskyux.com/wp-content/uploads/2025/08/mobilepromo.png"
            alt="SplitTime mobile application promotional image"
            className="w-full h-full object-contain"
          />
          {editable && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute top-4 right-4 flex gap-2"
            >
              <Button
                size="sm"
                variant="filled"
                className="bg-surface/90 text-on-surface shadow-lg"
                onClick={() => document.getElementById(`upload-image-${src}`)?.click()}
              >
                <Upload className="h-4 w-4" />
              </Button>
              <input
                id={`upload-image-${src}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Caption */}
      {(caption || editable) && (
        <div className="mt-3">
          {isEditing ? (
            <Card className="p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="flex-1 text-body-small text-on-surface-variant bg-transparent border-none outline-none"
                  placeholder="Add image caption..."
                />
                <Button size="sm" onClick={handleCaptionSave}>
                  Save
                </Button>
              </div>
            </Card>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 italic mt-2 text-center w-full">
                {caption || "SplitTime mobile application promotional image"}
              </p>
              {editable && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
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
