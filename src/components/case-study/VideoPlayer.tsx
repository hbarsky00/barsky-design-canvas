
import React from "react";

interface VideoPlayerProps {
  videoSrc: string;
  thumbnailSrc: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, thumbnailSrc, title }) => {
  const isLoomVideo = videoSrc && videoSrc.includes('loom.com/share/');
  
  const getEmbedUrl = (url: string) => {
    if (isLoomVideo) {
      const videoId = url.split('loom.com/share/')[1]?.split('?')[0];
      return `https://www.loom.com/embed/${videoId}?autoplay=1&muted=0&t=0`;
    }
    return url;
  };

  if (isLoomVideo) {
    return (
      <div className="relative bg-white rounded-lg overflow-hidden">
        <iframe
          src={getEmbedUrl(videoSrc)}
          title={title}
          className="w-full h-80 md:h-96 lg:h-[32rem]"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{ 
            display: 'block',
            maxWidth: '100%'
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-lg overflow-hidden">
      <img
        src={thumbnailSrc}
        alt={`${title} promotional image`}
        className="w-full h-auto object-contain image-high-quality"
      />
    </div>
  );
};

export default VideoPlayer;
