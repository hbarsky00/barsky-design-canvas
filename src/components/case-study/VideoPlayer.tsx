
import React from "react";

interface VideoPlayerProps {
  videoSrc: string;
  thumbnailSrc: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, thumbnailSrc, title }) => {
  const isYouTubeVideo = /youtu\.be\/|youtube\.com\/(watch|shorts|embed)/.test(videoSrc);
  const isLoomVideo = videoSrc && videoSrc.includes('loom.com/share/');
  
  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';

    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v') || '';
    } else if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('youtube.com/shorts/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1]?.split('?')[0];
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`;
  };
  
  const getEmbedUrl = (url: string) => {
    if (isLoomVideo) {
      const videoId = url.split('loom.com/share/')[1]?.split('?')[0];
      return `https://www.loom.com/embed/${videoId}?autoplay=1&muted=0&t=0`;
    }
    if (isYouTubeVideo) {
      return getYouTubeEmbedUrl(url);
    }
    return url;
  };
  if (isLoomVideo || isYouTubeVideo) {
    return (
      <div className="relative bg-white rounded-lg overflow-hidden">
        <iframe
          src={getEmbedUrl(videoSrc)}
          title={title}
          className="w-full h-80 md:h-96 lg:h-[32rem]"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
    <div className="relative bg-white rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
      <img
        src={thumbnailSrc}
        alt={`${title} promotional image`}
        className="w-full h-full object-contain image-high-quality"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default VideoPlayer;
