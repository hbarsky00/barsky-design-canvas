import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { homepageCaseStudyPreviews } from "@/data/caseStudies";

const VideoCaseStudiesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);

  // Enhanced YouTube video ID extraction supporting all URL formats
  const getYouTubeVideoId = (url: string): string => {
    // Handle youtu.be short URLs
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0] || '';
    }
    
    // Handle youtube.com/watch URLs
    if (url.includes('youtube.com/watch')) {
      return url.split('v=')[1]?.split('&')[0] || '';
    }
    
    // Handle YouTube Shorts
    if (url.includes('youtube.com/shorts/')) {
      return url.split('shorts/')[1]?.split('?')[0]?.split('&')[0] || '';
    }
    
    // Handle embed URLs that might already be embed format
    if (url.includes('youtube.com/embed/')) {
      return url.split('embed/')[1]?.split('?')[0]?.split('&')[0] || '';
    }
    
    // Handle youtube-nocookie.com URLs
    if (url.includes('youtube-nocookie.com')) {
      if (url.includes('/embed/')) {
        return url.split('embed/')[1]?.split('?')[0]?.split('&')[0] || '';
      }
      if (url.includes('v=')) {
        return url.split('v=')[1]?.split('&')[0] || '';
      }
    }
    
    // Handle mobile YouTube URLs
    if (url.includes('m.youtube.com')) {
      return url.split('v=')[1]?.split('&')[0] || '';
    }
    
    return '';
  };

  // Detect if URL is a YouTube video (any format)
  const isYouTubeVideo = (url: string): boolean => {
    return url.includes('youtube.com') || 
           url.includes('youtu.be') || 
           url.includes('youtube-nocookie.com') ||
           url.includes('m.youtube.com');
  };

  // Detect if URL is a standard video file
  const isVideoFile = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    const urlWithoutParams = url.split('?')[0].toLowerCase();
    return videoExtensions.some(ext => urlWithoutParams.endsWith(ext));
  };

  // Generate YouTube embed URL with maximum UI suppression
  const getYouTubeEmbedUrl = (url: string, isHovered: boolean): string => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return url;
    
    // Comprehensive parameters to hide ALL YouTube UI elements
    const baseParams = [
      'controls=0',           // Hide all controls
      'showinfo=0',          // Hide video info
      'rel=0',               // Hide related videos
      'modestbranding=1',    // Hide YouTube logo
      'iv_load_policy=3',    // Hide annotations
      'cc_load_policy=0',    // Hide closed captions
      'disablekb=1',         // Disable keyboard controls
      'fs=0',                // Disable fullscreen button
      'playsinline=1',       // Play inline on mobile
      'mute=1',              // Start muted
      'loop=1',              // Loop video
      `playlist=${videoId}`, // Required for looping
      'enablejsapi=1',       // Enable JS API for better control
      'origin=' + window.location.origin, // Set origin for security
      'widget_referrer='     // Remove referrer info
    ].join('&');
    
    const autoplay = isHovered ? '&autoplay=1' : '&autoplay=0';
    return `https://www.youtube-nocookie.com/embed/${videoId}?${baseParams}${autoplay}`;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Case Studies That Drive Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real projects. Measurable outcomes. See how I transform business challenges into digital solutions.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {homepageCaseStudyPreviews.map((study, index) => {
            const isYouTube = isYouTubeVideo(study.video);

            const handleMouseEnter = () => {
              setHoveredIndex(index);
              
              if (window.innerWidth > 768) { // Only on non-mobile devices
                if (isYouTube) {
                  // Update YouTube iframe src to trigger autoplay
                  const iframe = iframeRefs.current[index];
                  if (iframe) {
                    iframe.src = getYouTubeEmbedUrl(study.video, true);
                  }
                } else {
                  // Handle regular video
                  const video = videoRefs.current[index];
                  if (video) {
                    video.currentTime = 0;
                    video.play().catch(() => {
                      // Silently handle autoplay failures
                    });
                  }
                }
              }
            };

            const handleMouseLeave = () => {
              setHoveredIndex(null);
              
              if (isYouTube) {
                // Reset YouTube iframe src to stop autoplay
                const iframe = iframeRefs.current[index];
                if (iframe) {
                  iframe.src = getYouTubeEmbedUrl(study.video, false);
                }
              } else {
                // Handle regular video
                const video = videoRefs.current[index];
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              }
            };

            return (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  to={study.url}
                  className="group block h-full"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col group-hover:scale-[1.02]">
                  {/* Video Preview */}
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    {isYouTube ? (
                      <iframe
                        ref={(el) => (iframeRefs.current[index] = el)}
                        src={getYouTubeEmbedUrl(study.video, false)}
                        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        poster={`/images/${study.videoThumbnail}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        preload="none"
                      >
                        <source src={`/videos/${study.video}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {/* Impact Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900 font-semibold">
                        Case Study
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                      {study.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center text-primary font-semibold group-hover:text-primary/80 transition-colors">
                      <span>Read Case Study</span>
                      <ArrowRight 
                        className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                          hoveredIndex === index ? 'translate-x-1' : ''
                        }`} 
                      />
                    </div>
                  </div>
                </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Case Studies
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoCaseStudiesSection;