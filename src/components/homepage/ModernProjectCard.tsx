import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Hash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface ModernProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  videoThumbnail: string;
  video?: string;
  url: string;
  className?: string;
}
const ModernProjectCard: React.FC<ModernProjectCardProps> = ({
  title,
  description,
  tags,
  videoThumbnail,
  video,
  url,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoSrcLoaded, setVideoSrcLoaded] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDirectVideo = Boolean(video && /(\.(mp4|webm|ogg)(\?.*)?$)/i.test(video as string));
  const [capturedThumb, setCapturedThumb] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasTriedCapture, setHasTriedCapture] = useState(false);
  const [inView, setInView] = useState(false);

  // Observe when the card enters the viewport
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, {
      threshold: 0.2
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Capture first frame of direct videos to use as a thumbnail when none is provided
  useEffect(() => {
    if (!inView || !isDirectVideo || hasTriedCapture || capturedThumb || !video) return;
    setHasTriedCapture(true);
    const url = video as string;

    // Lightly prime the video source for quick capture
    if (!videoSrcLoaded) setVideoSrcLoaded(url);
    const v = document.createElement('video');
    v.crossOrigin = 'anonymous';
    v.muted = true;
    (v as any).playsInline = true;
    v.preload = 'auto';
    v.src = url;
    const cleanup = () => {
      try {
        v.remove();
      } catch {}
    };
    const doCapture = () => {
      try {
        const seekTo = 0.1;
        const onSeeked = () => {
          try {
            const canvas = document.createElement('canvas');
            const w = v.videoWidth || 1280;
            const h = v.videoHeight || 720;
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(v, 0, 0, w, h);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
              setCapturedThumb(dataUrl);
            }
          } catch {}
          cleanup();
        };
        v.addEventListener('seeked', onSeeked, {
          once: true
        });
        try {
          v.currentTime = seekTo;
        } catch {
          onSeeked();
        }
      } catch {
        cleanup();
      }
    };
    v.addEventListener('loadeddata', doCapture, {
      once: true
    });
    v.addEventListener('error', cleanup, {
      once: true
    });

    // Some browsers require the element to be in the DOM to load
    document.body.appendChild(v);
    return () => cleanup();
  }, [inView, isDirectVideo, video, videoSrcLoaded, hasTriedCapture, capturedThumb]);
  // 3D scroll transforms
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -6]);
  const yTransform = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const scaleTransform = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.985]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.0]);
  return <motion.div
    initial={{
      opacity: 0,
      y: 30
    }}
    whileInView={{
      opacity: 1,
      y: 0
    }}
    viewport={{
      once: true
    }}
    transition={{
      duration: 0.6
    }}
    className={`${className} will-change-transform`}
    ref={containerRef}
    style={prefersReducedMotion ? undefined : { rotateX, y: yTransform, scale: scaleTransform, transformPerspective: 1000 }}
    onHoverStart={() => {
      setIsHovered(true);
      if (isDirectVideo) {
        if (!videoSrcLoaded) setVideoSrcLoaded(video as string);
        setTimeout(() => {
          try {
            videoRef.current?.play();
          } catch {}
        }, 0);
      }
    }}
    onHoverEnd={() => {
      setIsHovered(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }}
  >
      <Link to={url} aria-label={`${title} case study`} className="block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
        <Card className="overflow-hidden bg-surface/80 backdrop-blur-sm border-outline/20 hover:shadow-xl transition-all duration-300 group cursor-pointer">
          {/* Video/Thumbnail Section */}
          <div className="relative aspect-video bg-surface-variant overflow-hidden">
            {capturedThumb || videoThumbnail ? <>
                <motion.img src={capturedThumb || videoThumbnail || ''} alt={title} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" style={prefersReducedMotion ? undefined : { y: mediaY, scale: mediaScale }} />
                {isDirectVideo && <motion.video ref={videoRef} src={videoSrcLoaded ?? undefined} poster={capturedThumb || videoThumbnail || undefined} muted playsInline loop preload="none" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${isHovered && videoSrcLoaded ? 'opacity-100' : 'opacity-0'}`} style={prefersReducedMotion ? undefined : { y: mediaY, scale: mediaScale }} onCanPlay={() => {
              if (isHovered) {
                try {
                  videoRef.current?.play();
                } catch {}
              }
            }} />}
              </> : isDirectVideo ? <motion.video ref={videoRef} src={video as string || undefined} muted playsInline loop preload="metadata" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" style={prefersReducedMotion ? undefined : { y: mediaY, scale: mediaScale }} onCanPlay={() => {
            if (isHovered) {
              try {
                videoRef.current?.play();
              } catch {}
            }
          }} /> : <div className="w-full h-full bg-surface-variant" />}
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Tags */}
            <div className="hidden sm:flex flex-wrap gap-2">
              {tags.map(tag => <Badge key={tag} variant="secondary" className="text-body-small gap-1">
                  <Hash className="h-3 w-3" />
                  {tag}
                </Badge>)}
            </div>

            {/* Title */}
            <h2 className="text-title-large text-primary/90 leading-tight transition-colors duration-200 group-hover:text-primary font-extrabold">
              {title}
            </h2>

            {/* Description */}
            <p className="text-body-medium text-on-surface-variant leading-relaxed">
              {description}
            </p>

            {/* CTA visual (entire card is clickable) */}
            <div className="pt-2 text-primary flex items-center gap-2">
              <span className="font-medium">View Case Study</span>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>;
};
export default ModernProjectCard;