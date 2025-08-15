
import React from "react";

interface EditableVideoProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
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
  className = "",
  videoOptions = {}
}) => {
  const {
    autoplay = false,
    loop = false,
    muted = true,
    controls = true,
    playsInline = true
  } = videoOptions;

  return (
    <div className="space-y-2">
      <video
        src={src}
        className={className}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline={playsInline}
        aria-label={alt}
      >
        Your browser does not support the video tag.
      </video>
      {caption && (
        <p className="text-sm text-muted-foreground text-center italic">
          {caption}
        </p>
      )}
    </div>
  );
};
