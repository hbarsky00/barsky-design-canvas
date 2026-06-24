import React, { useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MaximizableImage from "@/components/project/MaximizableImage";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { Badge } from "@/components/ui/badge";
import ProjectSeo from "@/components/project-pages/ProjectSeo";

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

export interface SimpleCaseStudyBlock {
  heading: string;
  paragraphs: string[];
  images?: SimpleCaseStudyImage[];
  /** @deprecated use images */
  image?: SimpleCaseStudyImage;
}

export interface SimpleCaseStudyPageProps {
  projectId: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  overviewUrl?: string;
  heroImage?: SimpleCaseStudyImage;
  blocks: SimpleCaseStudyBlock[];
}

const SimpleCaseStudyPage: React.FC<SimpleCaseStudyPageProps> = ({
  projectId,
  title,
  description,
  tags,
  liveUrl,
  overviewUrl,
  heroImage,
  blocks,
}) => {
  const fallbackBlockImage = blocks.find((block) => {
    const imgs = block.images ?? (block.image ? [block.image] : []);
    return imgs.length > 0;
  });
  const fallbackImages = fallbackBlockImage
    ? fallbackBlockImage.images ?? (fallbackBlockImage.image ? [fallbackBlockImage.image] : [])
    : [];
  const seoImage = heroImage?.src ?? fallbackImages[0]?.src;

  return (
    <ImageMaximizerProvider>
      <div className="min-h-screen bg-background">
        <ProjectSeo
          slug={projectId}
          title={`${title} — UX Case Study`}
          description={description}
          image={seoImage}
        />
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
            {overviewUrl && (
              <a
                href={overviewUrl}
                className="text-primary hover:underline text-sm font-medium ml-4"
              >
                View product overview →
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
                  {imgs.length > 0 && (
                    <div className="space-y-6">
                      {imgs.map((img, idx) => (
                        <MaximizableImage
                          key={`${img.src}-${idx}`}
                          src={img.src}
                          alt={img.alt}
                          className="w-full"
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
