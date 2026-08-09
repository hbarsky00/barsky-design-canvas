import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MaximizableImage from "@/components/project/MaximizableImage";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { Badge } from "@/components/ui/badge";

export interface SimpleCaseStudyImage {
  src: string;
  alt: string;
  /** Optional video URL that plays on hover over the image. */
  hoverVideo?: string;
}

const HeroHoverMedia: React.FC<{ image: SimpleCaseStudyImage; projectId: string }> = ({ image, projectId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!image.hoverVideo) {
    return (
      <MaximizableImage
        src={image.src}
        alt={image.alt}
        caption={image.alt}
        className="w-full"
        projectId={projectId}
        fit="contain"
      />
    );
  }

  const onEnter = () => {
    setPlaying(true);
    videoRef.current?.play().catch(() => {});
  };
  const onLeave = () => {
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onTouchStart={onEnter}
      onTouchEnd={onLeave}
    >
      <div style={{ opacity: playing ? 0 : 1, transition: "opacity 200ms ease" }}>
        <MaximizableImage
          src={image.src}
          alt={image.alt}
          caption={image.alt}
          className="w-full"
          projectId={projectId}
          fit="contain"
        />
      </div>
      <video
        ref={videoRef}
        src={image.hoverVideo}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden={!playing}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ opacity: playing ? 1 : 0, transition: "opacity 200ms ease" }}
      />
    </div>
  );
};

export interface SimpleCaseStudyVideo {
  src: string;
  /** Still shown before the clip plays, and wherever autoplay is blocked. */
  poster?: string;
  caption: string;
}

/**
 * Silent looping clip that plays only while it's on screen — a moving figure,
 * not a video player. Pauses when scrolled away so a page of clips doesn't
 * burn battery or bandwidth, and stays a still image under reduced-motion.
 */
const BlockVideo: React.FC<{ video: SimpleCaseStudyVideo }> = ({ video }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="w-full">
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full rounded-lg border border-border"
      />
      <figcaption className="mt-3 text-sm text-muted-foreground">
        {video.caption}
      </figcaption>
    </figure>
  );
};

export interface SimpleCaseStudyBlock {
  heading: string;
  paragraphs: string[];
  images?: SimpleCaseStudyImage[];
  videos?: SimpleCaseStudyVideo[];
  /** @deprecated use images */
  image?: SimpleCaseStudyImage;
}

export interface SimpleCaseStudyPageProps {
  projectId: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  heroImage?: SimpleCaseStudyImage;
  blocks: SimpleCaseStudyBlock[];
}

const SimpleCaseStudyPage: React.FC<SimpleCaseStudyPageProps> = ({
  projectId,
  title,
  description,
  tags,
  liveUrl,
  heroImage,
  blocks,
}) => {
  return (
    <ImageMaximizerProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-[calc(var(--header-height,64px)+32px)] pb-24">
          <header className="mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm font-medium"
              >
                Live: {liveUrl.replace(/^https?:\/\//, "")}
              </a>
            )}
          </header>

          {heroImage && (
            <div className="mb-16">
              <HeroHoverMedia image={heroImage} projectId={projectId} />
            </div>
          )}

          <div className="space-y-16">
            {blocks.map((b) => {
              const imgs = b.images ?? (b.image ? [b.image] : []);
              return (
                <section key={b.heading}>
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-4">
                    {b.heading}
                  </h2>
                  {b.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6"
                    >
                      {p}
                    </p>
                  ))}
                  {b.videos && b.videos.length > 0 && (
                    <div className="space-y-6 mb-6">
                      {b.videos.map((v) => (
                        <BlockVideo key={v.src} video={v} />
                      ))}
                    </div>
                  )}
                  {imgs.length > 0 && (
                    <div className={imgs.length > 1 ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"}>
                      {imgs.map((img, idx) => (
                        <MaximizableImage
                          key={`${img.src}-${idx}`}
                          src={img.src}
                          alt={img.alt}
                          caption={img.alt}
                          className={
                            // On an odd count, let the last image span both
                            // columns instead of dangling beside an empty cell
                            imgs.length > 1 && imgs.length % 2 === 1 && idx === imgs.length - 1
                              ? "w-full md:col-span-2"
                              : "w-full"
                          }
                          projectId={projectId}
                          fit="contain"
                        />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    </ImageMaximizerProvider>
  );
};

export default SimpleCaseStudyPage;
