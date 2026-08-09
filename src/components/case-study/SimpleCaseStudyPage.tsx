import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { Button } from "@/components/ui/button";
import CaseStudyFigure, {
  CaseStudyClip,
  CaseStudyHeroMedia,
} from "@/components/case-study/CaseStudyFigure";
import { getCaseStudyNeighbours } from "@/data/caseStudyIndex";

const CALENDLY_URL = "https://calendly.com/barskyuxdesignservices/30min";

export interface SimpleCaseStudyImage {
  src: string;
  alt: string;
  /** Optional video URL that plays on hover over the image. */
  hoverVideo?: string;
}

export interface SimpleCaseStudyVideo {
  src: string;
  /** Still shown before the clip plays, and wherever autoplay is blocked. */
  poster?: string;
  caption: string;
}

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
  /**
   * Optional facts for the header rail — Role, Timeline, Stack, and so on.
   * Left empty rather than guessed: a case study that invents its own
   * credentials is worse than one that omits them.
   */
  meta?: { label: string; value: string }[];
}

/** Thin scroll indicator. Transform-only, so it stays off the main thread. */
const ReadingProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = barRef.current;
      if (!el) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 z-40 h-0.5 bg-transparent"
      style={{ top: "var(--header-height, 64px)" }}
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-primary"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};

const SimpleCaseStudyPage: React.FC<SimpleCaseStudyPageProps> = ({
  projectId,
  title,
  description,
  tags,
  liveUrl,
  heroImage,
  blocks,
  meta,
}) => {
  // One flat list of every image on the page so the lightbox can arrow
  // through the whole study rather than one figure at a time.
  const allImages: string[] = [];
  if (heroImage) allImages.push(heroImage.src);
  blocks.forEach((b) => {
    (b.images ?? (b.image ? [b.image] : [])).forEach((img) => allImages.push(img.src));
  });

  let imageCursor = heroImage ? 1 : 0;
  const { prev, next } = getCaseStudyNeighbours(projectId);

  return (
    <ImageMaximizerProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <ReadingProgress />

        <main className="pb-24 pt-[calc(var(--header-height,64px)+40px)]">
          {/* ── Title block ─────────────────────────────────────────── */}
          <header className="cs-grid">
            <Link
              to="/#case-studies"
              className="mb-8 flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All work
            </Link>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Case Study
            </p>

            <h1 className="cs-measure mb-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              {title}
            </h1>

            <p className="cs-measure mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {description}
            </p>

            {/* Tags read as quiet metadata, not as buttons competing with the CTA. */}
            <ul className="cs-measure mb-8 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-sm text-muted-foreground">
              {tags.map((t, i) => (
                <li key={t} className="flex items-center gap-2.5">
                  {i > 0 && <span aria-hidden="true" className="text-border">·</span>}
                  {t}
                </li>
              ))}
            </ul>

            {meta && meta.length > 0 && (
              <dl className="mb-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {m.label}
                    </dt>
                    <dd className="text-sm font-medium text-foreground">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {/* Wrapper, not `w-fit`: Button's own `sm:w-auto` is a responsive
                variant and so wins the cascade over a plain width utility,
                which stretched it across the whole grid track. */}
            {liveUrl && (
              <div className="mb-14">
                <Button asChild size="lg">
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    Visit {liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    <ArrowUpRight className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </header>

          {/* ── Hero media ──────────────────────────────────────────── */}
          {heroImage && (
            <div className="cs-grid">
              <div>
                <CaseStudyHeroMedia
                  src={heroImage.src}
                  alt={heroImage.alt}
                  hoverVideo={heroImage.hoverVideo}
                  projectId={projectId}
                  imageList={allImages}
                />
              </div>
            </div>
          )}

          {/* ── Sections ────────────────────────────────────────────── */}
          {blocks.map((b, blockIndex) => {
            const imgs = b.images ?? (b.image ? [b.image] : []);
            const startIndex = imageCursor;
            imageCursor += imgs.length;

            return (
              <section key={b.heading} className="cs-grid mt-20 md:mt-28">
                <div className="mb-6">
                  <p className="mb-2 font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground">
                    {String(blockIndex + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-[2rem]">
                    {b.heading}
                  </h2>
                </div>

                <div className="cs-measure space-y-5">
                  {b.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className={
                        // The opening line of each section carries the point,
                        // so it gets full contrast; the rest supports it.
                        i === 0
                          ? "text-lg leading-[1.7] text-foreground md:text-xl"
                          : "text-base leading-[1.75] text-muted-foreground md:text-lg"
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {b.videos && b.videos.length > 0 && (
                  <div className="mt-10 space-y-10">
                    {b.videos.map((v) => (
                      <CaseStudyClip
                        key={v.src}
                        src={v.src}
                        poster={v.poster}
                        caption={v.caption}
                      />
                    ))}
                  </div>
                )}

                {imgs.length > 0 && (
                  <div
                    className={
                      imgs.length > 1
                        ? "mt-10 grid grid-cols-1 gap-8 md:grid-cols-2"
                        : "mt-10"
                    }
                  >
                    {imgs.map((img, idx) => (
                      <CaseStudyFigure
                        key={`${img.src}-${idx}`}
                        src={img.src}
                        alt={img.alt}
                        caption={img.alt}
                        projectId={projectId}
                        imageList={allImages}
                        currentIndex={startIndex + idx}
                        className={
                          // On an odd count, let the last figure span both
                          // columns instead of dangling beside an empty cell.
                          imgs.length > 1 && imgs.length % 2 === 1 && idx === imgs.length - 1
                            ? "md:col-span-2"
                            : undefined
                        }
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          {/* ── Keep reading ────────────────────────────────────────── */}
          {(prev || next) && (
            <nav aria-label="More case studies" className="cs-grid mt-28">
              <div className="grid gap-4 border-t border-border pt-10 md:grid-cols-2">
                {prev && (
                  <Link
                    to={`/project/${prev.id}`}
                    className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                  >
                    <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Previous
                    </span>
                    <span className="block font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                      {prev.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{prev.blurb}</span>
                  </Link>
                )}
                {next && (
                  <Link
                    to={`/project/${next.id}`}
                    className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 md:text-right"
                  >
                    <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground md:justify-end">
                      Next
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                    <span className="block font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                      {next.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{next.blurb}</span>
                  </Link>
                )}
              </div>
            </nav>
          )}

          {/* ── Closing CTA ─────────────────────────────────────────── */}
          <section className="cs-grid mt-20">
            <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center md:px-12 md:py-16">
              <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Want something like this built?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                I design and ship products end to end. Tell me what you're working on,
                or grab a time and we'll talk it through.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a Call
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/#case-studies">See More Work</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ImageMaximizerProvider>
  );
};

export default SimpleCaseStudyPage;
