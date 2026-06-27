import React, { useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MaximizableImage from "@/components/project/MaximizableImage";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { Badge } from "@/components/ui/badge";
import ProjectSeo from "@/components/project-pages/ProjectSeo";
import ProductOverviewBanner from "@/components/project-pages/ProductOverviewBanner";
import { Link } from "react-router-dom";
import { getCaseStudyNavItems } from "@/utils/caseStudyNav";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface SimpleCaseStudyImage {
  src: string;
  alt: string;
  /** Optional video URL that plays on hover over the image. */
  hoverVideo?: string;
}

const HeroHoverMedia: React.FC<{ image: SimpleCaseStudyImage; projectId: string }> = ({ image, projectId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(image.src);
  if (isVideo) {
    return (
      <video
        src={image.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={image.alt}
        className="w-full h-auto rounded-lg"
      />
    );
  }

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
          basePath="/case-studies"
          title={`${title} — UX Case Study`}
          description={description}
          image={seoImage}
        />
        {overviewUrl && (
          <ProductOverviewBanner slug={projectId} />
        )}
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
                    <div
                      className={
                        imgs.length === 1
                          ? "w-full"
                          : "grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
                      }
                    >
                      {imgs.map((img, idx) => (
                        <figure
                          key={`${img.src}-${idx}`}
                          className="m-0 flex flex-col"
                        >
                          <MaximizableImage
                            src={img.src}
                            alt={img.alt}
                            className="w-full"
                            projectId={projectId}
                            fit="contain"
                          />
                          {img.alt && imgs.length > 1 && (
                            <figcaption className="mt-2 text-xs text-muted-foreground leading-snug">
                              {img.alt}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
          {(() => {
            const items = getCaseStudyNavItems();
            const idx = items.findIndex((it) => it.id === projectId);
            if (idx === -1 || items.length < 2) return null;
            const next = items[(idx + 1) % items.length];
            return (
              <nav aria-label="Next case study" className="mt-20 pt-10 border-t border-border">
                <p className="text-sm uppercase tracking-wide text-muted-foreground mb-6">
                  Next case study
                </p>
                <Link
                  to={`/case-studies/${next.id}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                    <img
                      src={next.image}
                      alt={next.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-6">
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                        Up next
                      </div>
                      <div className="text-xl md:text-2xl font-display font-semibold text-foreground line-clamp-2">
                        {next.title}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary shrink-0">
                      Read case study
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </nav>
            );
          })()}
          {overviewUrl && (
            <aside className="mt-20 rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                Want the short version?
              </p>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-3">
                See the {title} product overview
              </h2>
              <p className="text-base text-muted-foreground mb-6 max-w-xl mx-auto">
                Features, screenshots, and how to try it — without the full case study.
              </p>
              <Link
                to={overviewUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
              >
                View product overview →
              </Link>
            </aside>
          )}
        </main>
        <Footer />
      </div>
    </ImageMaximizerProvider>
  );
};

export default SimpleCaseStudyPage;
