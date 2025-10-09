
import React, { useRef } from "react";
import EditableCaption from "../caption/EditableCaption";

interface ProjectVideoProps {
  src: string;
  title: string;
  caption?: string;
  className?: string;
  projectId?: string;
  hoverToPlay?: boolean;
  showControls?: boolean;
}

const ProjectVideo: React.FC<ProjectVideoProps> = ({
  src,
  title,
  caption,
  className = "",
  projectId,
  hoverToPlay = false,
  showControls = true
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (hoverToPlay && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (hoverToPlay && videoRef.current) {
      videoRef.current.pause();
    }
  };
  const isYouTubeVideo = /youtu\.be\/|youtube\.com\/(watch|shorts|embed)/.test(src);
  const isLoomVideo = src.includes('loom.com/share/');
  const isGif = src.toLowerCase().endsWith('.gif');
  
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
      return `https://www.loom.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <figure className={`relative overflow-hidden ${className}`}>
      {isYouTubeVideo ? (
        <iframe
          src={getYouTubeEmbedUrl(src)}
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
      ) : isLoomVideo ? (
        <iframe
          src={getEmbedUrl(src)}
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
      ) : isGif ? (
        <img
          src={src}
          alt={title}
          className="w-full h-auto"
          style={{ 
            display: 'block',
            maxWidth: '100%'
          }}
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          title={title}
          className="w-full h-auto"
          controls={showControls}
          muted={hoverToPlay}
          loop={hoverToPlay}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ 
            display: 'block',
            maxWidth: '100%'
          }}
        >
          Your browser does not support the video tag.
        </video>
      )}
      
      <EditableCaption
        imageSrc={src}
        initialCaption={caption || ''}
        projectId={projectId}
        variant="subtle"
        size="xs"
        alignment="center"
      />
    </figure>
  );
};

export default ProjectVideo;
