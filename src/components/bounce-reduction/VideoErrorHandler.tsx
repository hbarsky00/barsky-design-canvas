import React, { useState, useRef, useEffect } from 'react';

interface VideoErrorHandlerProps {
  videoSrc: string;
  fallbackImageSrc: string;
  className?: string;
  alt: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: string;
}

const VideoErrorHandler: React.FC<VideoErrorHandlerProps> = ({
  videoSrc,
  fallbackImageSrc,
  className = "",
  alt,
  autoPlay = false,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "metadata"
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoad = () => setIsLoading(false);
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener('loadeddata', handleLoad);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoad);
      video.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <img
        src={fallbackImageSrc}
        alt={alt}
        className={className}
        loading="eager"
      />
    );
  }

  return (
    <>
      {isLoading && (
        <img
          src={fallbackImageSrc}
          alt={alt}
          className={className}
          loading="eager"
        />
      )}
      <video
        ref={videoRef}
        src={videoSrc}
        className={className}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={preload}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </>
  );
};

export default VideoErrorHandler;