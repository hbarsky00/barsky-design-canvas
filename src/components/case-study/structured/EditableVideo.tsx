
import React from 'react';

interface EditableVideoProps {
  src: string;
  poster: string;
  alt: string;
}

const EditableVideo: React.FC<EditableVideoProps> = ({ src, poster, alt }) => {
  return (
    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
      <video
        className="w-full h-full object-cover"
        poster={poster}
        controls
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default EditableVideo;
