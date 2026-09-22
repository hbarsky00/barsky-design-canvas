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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCaption, setEditCaption] = useState(caption || "");

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        {videoOptions?.autoplay ? (
          // Autoplay video mode
          <div className="relative w-full h-full">
            <video
              src={src}
              title={alt}
              poster={poster}
              autoPlay
              loop={videoOptions?.loop ?? true}
              muted={videoOptions?.muted ?? true}
              playsInline={videoOptions?.playsInline ?? true}
              controls={videoOptions?.controls ?? false}
              className="w-full h-full object-cover"
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
                  onClick={() => document.getElementById(`upload-video-${src}`)?.click()}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <input
                  id={`upload-video-${src}`}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </motion.div>
            )}
          </div>
        ) : (
          !isPlaying ? (
            // Video Thumbnail
            <div className="relative w-full h-full">
              <img
                src={poster || "/placeholder.svg"}
                alt={alt}
                className="w-full h-full object-cover"
              />
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-scrim/30 flex items-center justify-center">
                <Button
                  size="lg"
                  variant="filled"
                  className="bg-surface/90 text-on-surface hover:bg-surface shadow-xl"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="h-6 w-6 mr-2" />
                  Play Demo
                </Button>
              </div>
              
              {/* Edit Controls */}
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
                    onClick={() => document.getElementById(`upload-video-${src}`)?.click()}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  <input
                    id={`upload-video-${src}`}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoUpload}
                  />
                </motion.div>
              )}
            </div>
          ) : (
            // Video Player (manual play)
            <div className="relative w-full h-full bg-surface-variant">
              <video
                src={src}
                title={alt}
                controls
                playsInline
                autoPlay
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
              <Button
                variant="outline"
                onClick={() => setIsPlaying(false)}
                className="gap-2 absolute top-4 right-4"
              >
                <Pause className="h-4 w-4" />
                Back to Thumbnail
              </Button>
            </div>
          )
        )}
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
                  placeholder="Add video caption..."
                />
                <Button size="sm" onClick={handleCaptionSave}>
                  Save
                </Button>
              </div>
            </Card>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-body-small text-on-surface-variant italic">
                {caption || "No caption"}
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