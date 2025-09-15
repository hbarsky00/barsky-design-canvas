import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import MaximizableImage from "./MaximizableImage";
import { getAnnotationCaptionClasses, getResponsiveTruncatedText } from "@/utils/captionStyles";

interface VideoHoverImageProps {
  src: string;
  alt: string;
  caption?: string;
  videoSrc?: string;
  className?: string;
  priority?: boolean;
  projectId?: string;
  hideEditButton?: boolean;
  onImageReplace?: (newSrc: string) => void;
  imageList?: string[];
  currentIndex?: number;
}

const VideoHoverImage: React.FC<VideoHoverImageProps> = ({
  src,
  alt,
  caption,
  videoSrc,
  className = "",
  priority = false,
  projectId,
  hideEditButton = false,
  onImageReplace,
  imageList = [],
  currentIndex = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Detect if the video is a Loom embed
  const isLoomVideo = videoSrc?.includes('loom.com/embed');

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isLoomVideo && iframeRef.current) {
      // For Loom videos, we'll rely on the autoplay parameter in the URL
      setIsVideoLoaded(true);
    } else if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(console.error);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isLoomVideo && iframeRef.current) {
      // For Loom, reload the iframe to stop playback
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = '';
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
        }
      }, 50);
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  if (!videoSrc) {
    return (
      <MaximizableImage
        src={src}
        alt={alt}
        caption={caption}
        priority={priority}
        className={`shadow-elevated-lg w-full glass-card layered-depth ${className}`}
        projectId={projectId}
        hideEditButton={hideEditButton}
        onImageReplace={onImageReplace}
        imageList={imageList}
        currentIndex={currentIndex}
        fit="contain"
      />
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden shadow-elevated-lg w-full glass-card layered-depth ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative aspect-video bg-muted">
        {/* Static Image */}
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-contain transition-opacity duration-300"
          style={{ 
            opacity: isHovered && isVideoLoaded ? 0 : 1,
            position: 'absolute',
            top: 0,
            left: 0
          }}
          loading={priority ? "eager" : "lazy"}
        />
        
        {/* Video or Loom Embed */}
        {isLoomVideo ? (
          <motion.iframe
            ref={iframeRef}
            src={isHovered ? `${videoSrc}&autoplay=1` : videoSrc}
            className="w-full h-full transition-opacity duration-300"
            style={{ 
              opacity: isHovered ? 1 : 0,
              position: 'absolute',
              top: 0,
              left: 0,
              border: 'none'
            }}
            allow="autoplay; fullscreen"
            allowFullScreen
            onLoad={() => setIsVideoLoaded(true)}
          />
        ) : (
          <motion.video
            ref={videoRef}
            className="w-full h-full object-contain transition-opacity duration-300"
            style={{ 
              opacity: isHovered && isVideoLoaded ? 1 : 0,
              position: 'absolute',
              top: 0,
              left: 0
            }}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoad}
            poster={src}
          >
            <source src={videoSrc} type="video/mp4" />
          </motion.video>
        )}
      </div>
      
      {caption && (
        <div className={getAnnotationCaptionClasses()}>
          {getResponsiveTruncatedText(caption)}
        </div>
      )}
    </motion.div>
  );
};

export default VideoHoverImage;