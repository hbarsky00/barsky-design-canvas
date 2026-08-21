import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Maximize2, Play } from "lucide-react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";

/**
 * Fades an element up as it scrolls into view. One-shot — figures don't
 * re-animate on the way back up, which reads as twitchy on a long page.
 *
 * The hidden start state is applied *by this hook*, never in the markup.
 * Doing it the other way round means a figure that starts at opacity 0 and
 * waits for IntersectionObserver to un-hide it — so anywhere the observer
 * doesn't fire (no IO support, a background/suspended tab, JS erroring
 * before this runs) the case study renders blank. The animation is a nicety;
 * the screenshots are the point. Visible is the safe default, and the class
 * is added in a layout effect so there's no flash of the un-hidden state.
 */
export const useReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only ever hide when there's a real, visible viewport to animate into.
    // A backgrounded tab throttles timers and delivers no intersections, so a
    // timeout alone is not a failsafe — measured live, four of five figures
    // stayed at opacity 0 in a suspended tab. Nothing to animate for anyway
    // if nobody is looking at it.
    if (document.visibilityState !== "visible") return;
    if (!window.innerWidth || !window.innerHeight) return;

    el.classList.add("cs-reveal");
    const show = () => el.classList.add("is-visible");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    io.observe(el);

    // If the tab is ever backgrounded mid-read, drop the hidden state rather
    // than risk coming back to a blank page.
    document.addEventListener("visibilitychange", show);
    const failsafe = window.setTimeout(show, 1200);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", show);
      window.clearTimeout(failsafe);
    };
  }, []);

  return ref;
};

interface CaseStudyFigureProps {
  src: string;
  alt: string;
  caption?: string;
  projectId?: string;
  /** Every image on the page, so the lightbox can arrow through all of them. */
  imageList?: string[];
  currentIndex?: number;
  priority?: boolean;
  className?: string;
  /**
   * What to notice in the shot. The older studies pinned these to x/y
   * coordinates over the image, which broke down at every width other than
   * the one they were placed at — listing them under the figure keeps the
   * observation and loses only the arrow.
   */
  notes?: string[];
  /**
   * Intrinsic size. Used to reserve space before load and, more importantly, to
   * refuse to upscale: several of these captures are 390px-wide phone shots,
   * and stretching one across a 1150px column is just a blurry rectangle.
   */
  width?: number;
  height?: number;
}

/**
 * A product screenshot, framed.
 *
 * Deliberately not MaximizableImage: that component caps height at 70vh and
 * scales to 105% on hover inside an overflow-hidden box, which letterboxes
 * wide screenshots and then crops them the moment you point at one. For a
 * case study the screenshot *is* the evidence, so it renders at its natural
 * aspect and holds still.
 *
 * The border matters more than it looks — most of these screenshots are
 * white-background UI on a near-white page, so without an edge they bleed
 * into the page and lose their shape.
 */
const CaseStudyFigure: React.FC<CaseStudyFigureProps> = ({
  src,
  alt,
  caption,
  projectId,
  imageList,
  currentIndex = 0,
  priority = false,
  className = "",
  notes,
  width,
  height,
}) => {
  const { maximizeImage } = useImageMaximizer();
  const [failed, setFailed] = useState(false);
  const ref = useReveal<HTMLElement>();

  return (
    <figure ref={ref} className={`group ${className}`}>
      <button
        type="button"
        onClick={() => !failed && maximizeImage(src, caption || alt, imageList ?? [src], currentIndex)}
        aria-label={`View "${alt}" full screen`}
        className="relative block w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg focus-visible:shadow-lg"
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="mx-auto block h-auto w-full"
          style={width ? { maxWidth: `${width}px` } : undefined}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-foreground/80 px-2.5 py-1.5 text-xs font-medium text-background opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          Expand
        </span>
      </button>
      {(caption || (notes && notes.length > 0)) && (
        <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {caption}
          {notes && notes.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {notes.map((n, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden="true" className="text-primary">
                    &bull;
                  </span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          )}
        </figcaption>
      )}
    </figure>
  );
};

export interface CaseStudyClipProps {
  src: string;
  poster?: string;
  caption: string;
  className?: string;
}

/**
 * Silent looping clip that plays only while on screen — a moving figure, not
 * a video player. Pauses when scrolled away so a page of clips doesn't burn
 * battery, and stays a still poster under reduced-motion.
 */
export const CaseStudyClip: React.FC<CaseStudyClipProps> = ({
  src,
  poster,
  caption,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ref = useReveal<HTMLElement>();

  useEffect(() => {
    const el = videoRef.current;
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
    <figure ref={ref} className={className}>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
};

export interface CaseStudyWalkthroughProps {
  src: string;
  poster?: string;
  caption: string;
  className?: string;
}

/**
 * A narrated walkthrough — the opposite of CaseStudyClip in every way that
 * matters. Clips are silent, looping, autoplaying wallpaper; this one has a
 * voice track, so it keeps its sound, waits to be asked, and shows real
 * controls. Autoplaying audio at a reader is hostile, and muting it would
 * throw away the entire reason the video exists.
 *
 * preload="none" because these are minutes long and megabytes heavy: nobody
 * should pay to download a walkthrough they never press play on.
 */
export const CaseStudyWalkthrough: React.FC<CaseStudyWalkthroughProps> = ({
  src,
  poster,
  caption,
  className = "",
}) => {
  const ref = useReveal<HTMLElement>();

  return (
    <figure ref={ref} className={className}>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="none"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
};

export interface HeroMediaProps {
  src: string;
  alt: string;
  hoverVideo?: string;
  projectId?: string;
  imageList?: string[];
  /** Intrinsic size of the still. Sets the box the video plays inside. */
  width?: number;
  height?: number;
}

/**
 * The opening image. When a walkthrough clip exists it plays on hover —
 * previously with no affordance at all, so nobody knew to try. Now it says so.
 *
 * The video is `object-contain`, not `object-cover`. Cover cropped the clip to
 * fill whatever box the still image happened to define: the investor hero is a
 * 4:3 studio mockup and its clip is a 2.05 screen recording, so hovering chopped
 * 35% off the clip's width and scaled the rest up about 1.55×. Contain keeps the
 * whole frame at its own proportions inside the same box — the still's size is
 * left alone, the video just fits into it instead of being magnified.
 */
export const CaseStudyHeroMedia: React.FC<HeroMediaProps> = ({
  src,
  alt,
  hoverVideo,
  projectId,
  imageList,
  width,
  height,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const { maximizeImage } = useImageMaximizer();

  const start = () => {
    setPlaying(true);
    videoRef.current?.play().catch(() => setPlaying(false));
  };

  const stop = () => {
    setPlaying(false);
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  };

  if (!hoverVideo) {
    return (
      <CaseStudyFigure
        src={src}
        alt={alt}
        width={width}
        height={height}
        projectId={projectId}
        imageList={imageList}
        currentIndex={0}
        priority
      />
    );
  }

  return (
    <figure className="group">
      <div
        className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl"
        onMouseEnter={start}
        onMouseLeave={stop}
      >
        <button
          type="button"
          onClick={() => (playing ? stop() : start())}
          aria-label={playing ? `Stop the ${alt} walkthrough` : `Play the ${alt} walkthrough`}
          className="block w-full"
        >
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="eager"
            decoding="async"
            className="block h-auto w-full transition-opacity duration-300"
            style={{ opacity: playing ? 0 : 1 }}
          />
          <video
            ref={videoRef}
            src={hoverVideo}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden={!playing}
            className="pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-300"
            style={{ opacity: playing ? 1 : 0 }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-foreground/80 px-3 py-1.5 text-xs font-medium text-background backdrop-blur-sm transition-opacity duration-300"
            style={{ opacity: playing ? 0 : 1 }}
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Hover to watch it run
          </span>
        </button>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {alt}
      </figcaption>
    </figure>
  );
};

export default CaseStudyFigure;
