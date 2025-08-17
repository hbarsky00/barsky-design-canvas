
import React from "react";

interface VideoPlayerProps {
  videoSrc: string;
  thumbnailSrc: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ thumbnailSrc, title }) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
      <img
        src={thumbnailSrc}
        alt={`${title} promotional image`}
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

export default VideoPlayer;
