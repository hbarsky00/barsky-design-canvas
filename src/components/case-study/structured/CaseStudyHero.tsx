import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import ProjectActionsCompact from "@/components/project/ProjectActionsCompact";
import { imgDims } from "@/utils/imageDims";
import { StructuredCaseStudyData } from "@/data/structuredCaseStudies";
import {
  getCaseStudyHero,
  CaseStudyHeroConfig,
  HeroMedia,
} from "@/data/caseStudyHeroes";

interface CaseStudyHeroProps {
  caseStudyData: StructuredCaseStudyData;
  heroAsImage?: boolean;
}

/**
 * A board wider than this can't survive a half-rail column: DAE's explorer
 * board is 2168x725, which renders at 640px in a split layout and makes its
 * panes unreadable. Anything at 2.2:1 or wider drops under the copy and takes
 * the full rail instead — and on a phone it gets a swipe rail, below.
 */
const STACK_ABOVE_RATIO = 2.2;

/** Below this, the asset is a phone screen and needs a width cap on a phone. */
const PORTRAIT_BELOW_RATIO = 0.7;

/** Studies with no entry get the same structure in the house light palette. */
const deriveConfig = (d: StructuredCaseStudyData): CaseStudyHeroConfig => ({
  eyebrow: d.tags.slice(0, 3).join(" · "),
  accentPhrase: "",
  metrics: (d.heroMetrics ?? []).slice(0, 2),
  media: [],
  theme: "light",
  accentText: "text-blue-600",
  surface: "bg-gradient-to-b from-slate-50 via-white to-white",
  glow:
    "radial-gradient(60% 55% at 72% 24%, rgba(37, 99, 235, 0.12), transparent 70%)",
});

interface HeroImageProps {
  media: HeroMedia;
  /** Rendered below lg in place of `media`, when the project has one. */
  mobileMedia?: HeroMedia;
  theme: "light" | "dark";
  priority: boolean;
  /** Wide boards get a swipe rail on a phone instead of an unreadable strip. */
  wideScroll?: boolean;
  className?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({
  media,
  mobileMedia,
  theme,
  priority,
  wideScroll = false,
  className = "",
}) => {
  const large = imgDims(media.src);
  const small = mobileMedia ?? media;
  const smallDims = imgDims(small.src);
  const portrait =
    !!smallDims.width &&
    !!smallDims.height &&
    smallDims.width / smallDims.height < PORTRAIT_BELOW_RATIO;

  /* A cut-out gets a drop shadow; a screenshot board gets a panel edge, or it
     floats on the wash with no boundary. Either way nothing is cropped — no
     overflow-hidden, no fixed aspect box — so the image sets its own height and
     keeps every edge. */
  const chrome = media.bare
    ? "drop-shadow-[0_28px_60px_rgba(2,6,23,0.55)]"
    : theme === "dark"
    ? "rounded-xl sm:rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/60"
    : "rounded-xl sm:rounded-2xl ring-1 ring-slate-900/10 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)]";

  /* A 780x1688 phone screen at the full column width is 758px tall on a 390px
     phone — the hero would be nothing but one screenshot. Capped on small
     screens only; the desktop asset it swaps to is always wider than its
     column, so there is nothing to cap up there. */
  const sizing = wideScroll
    ? "h-60 w-auto max-w-none sm:h-72 md:h-auto md:w-full"
    : portrait
    ? "mx-auto w-full max-w-[13.5rem] sm:max-w-[16rem] md:max-w-none"
    : "w-full";

  const img = (
    <picture>
      {/* One request per viewport: the phone never downloads the desktop board
          and vice versa. */}
      {mobileMedia && (
        <source
          media="(min-width: 768px)"
          srcSet={media.src}
          width={large.width || undefined}
          height={large.height || undefined}
        />
      )}
      <img
        src={small.src}
        alt={small.alt}
        width={smallDims.width || undefined}
        height={smallDims.height || undefined}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`block h-auto ${sizing} ${chrome} ${className}`}
        /* Cap at the source's own pixel width so nothing is ever blown up past
           native. Skipped when a class already owns max-width. */
        style={
          !portrait && !wideScroll && large.width
            ? { maxWidth: large.width }
            : undefined
        }
      />
    </picture>
  );

  if (!wideScroll) return img;

  /* Horizontal scroll is the honest answer for a 3:1 board on a 390px screen:
     ManuscriptRx and DAE have no portrait product art, and shrinking the board
     to fit makes its screens unreadable. Swiping across it keeps them legible.
     The negative margin lets it start and end at the page edge. */
  return (
    <div className="-mx-5 overflow-x-auto overscroll-x-contain px-5 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:overflow-visible md:px-0 md:pb-0">
      {img}
    </div>
  );
};

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  caseStudyData,
  heroAsImage = false,
}) => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const config = getCaseStudyHero(caseStudyData.id) ?? deriveConfig(caseStudyData);
  const dark = config.theme === "dark";

  /* heroVideo is a still in practice: VideoPlayer only embeds YouTube and Loom,
     and every heroVideo on this site is a local .mp4, so it has always rendered
     its poster inside a white 16:9 letterbox and nothing more. Treating the
     poster as what it is — the fallback image — also stops a cut-out sitting in
     a white box on a dark hero. */
  const posterMedia: HeroMedia | undefined = (() => {
    const poster = heroAsImage ? undefined : caseStudyData.heroVideo?.poster;
    const src = poster || caseStudyData.seoData?.image;
    if (!src) return undefined;
    return {
      src,
      alt:
        (poster && caseStudyData.heroVideo?.alt) ||
        `${caseStudyData.title} product interface`,
      role: "primary",
    };
  })();

  const primary = config.media.find((m) => m.role === "primary") ?? posterMedia;
  const inset = config.media.find((m) => m.role === "inset");
  const mobileMedia = config.media.find((m) => m.role === "mobile") ?? inset;

  /* Sizing the inset by width works for a near-square card and fails for a
     780x1688 phone: at 1024px that was 128x277 against a 493x308 primary, i.e.
     the phone covered nine tenths of the screen behind it. A tall inset is
     sized by height instead, so it stays the same proportion of the primary at
     every width. */
  const insetDims = inset ? imgDims(inset.src) : null;
  const insetIsTall =
    !!insetDims?.width && !!insetDims?.height && insetDims.height > insetDims.width * 1.2;

  const primaryDims = primary ? imgDims(primary.src) : { width: 0, height: 0 };
  const ratio =
    !primaryDims.width || !primaryDims.height
      ? 16 / 9
      : primaryDims.width / primaryDims.height;
  const stacked = ratio >= STACK_ABOVE_RATIO;

  const titleParts = (() => {
    const at = config.accentPhrase ? caseStudyData.title.indexOf(config.accentPhrase) : -1;
    if (at === -1) return null;
    return [
      caseStudyData.title.slice(0, at),
      config.accentPhrase,
      caseStudyData.title.slice(at + config.accentPhrase.length),
    ];
  })();

  /* A 3.4rem headline is right for "CatchBuddy: Trust Is the Product, Not a
     Settings Page" and five lines deep for HerbaLink's, which is half as long
     again. The copy column is fixed, so the type scale moves instead. */
  const longTitle = caseStudyData.title.length > 48;

  const rise = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

  const media = primary ? (
    <div className="relative">
      <HeroImage
        media={primary}
        mobileMedia={mobileMedia}
        theme={config.theme}
        priority
        wideScroll={(stacked || !!primary.scrollOnMobile) && !mobileMedia}
      />

      {/* The inset only appears from md, where the desktop artwork is also in
          play. Below that it IS the main image, so layering it on itself would
          be nonsense. */}
      {inset && (
        <HeroImage
          media={inset}
          theme={config.theme}
          priority={false}
          className={`absolute -bottom-8 -left-6 hidden !max-w-none md:block ${
            insetIsTall ? "!h-[74%] !w-auto" : "!w-[30%]"
          }`}
        />
      )}
    </div>
  ) : null;

  return (
    <section
      id="hero"
      data-section="hero"
      className={`relative isolate flex w-full items-center scroll-mt-[calc(var(--header-height,64px)+1rem)] lg:min-h-[32rem] xl:min-h-[36rem] ${config.surface}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: config.glow }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div
          className={
            stacked || !primary
              ? "flex flex-col gap-8 sm:gap-10 lg:gap-14"
              : "grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-12 xl:gap-16"
          }
        >
          <motion.div
            {...rise}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={stacked ? "max-w-3xl" : ""}
          >
            <p
              className={`text-[0.68rem] font-semibold uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.18em] ${
                dark ? "text-white/60" : "text-slate-500"
              }`}
            >
              {config.eyebrow}
            </p>

            <h1
              className={`mt-4 font-display font-semibold leading-[1.1] tracking-tight sm:mt-5 ${
                longTitle
                  ? "text-[1.8rem] sm:text-[2.2rem] lg:text-[2.6rem] xl:text-[2.9rem]"
                  : "text-[1.95rem] sm:text-4xl lg:text-5xl xl:text-[3.4rem]"
              } ${dark ? "text-white" : "text-slate-900"}`}
            >
              {titleParts ? (
                <>
                  {titleParts[0]}
                  <span className={config.accentText}>{titleParts[1]}</span>
                  {titleParts[2]}
                </>
              ) : (
                caseStudyData.title
              )}
            </h1>

            <p
              className={`mt-4 max-w-xl text-base leading-relaxed sm:mt-5 sm:text-lg ${
                dark ? "text-white/70" : "text-slate-600"
              }`}
            >
              {caseStudyData.description}
            </p>

            {/* No metrics in the record means no metrics row. Nothing here
                invents a number to fill the space. */}
            {config.metrics.length > 0 && (
              <dl
                /* A two-column grid on phones, not flex-wrap: DAE's
                   "Information retrieval time" is wider than half of a 350px
                   column, so wrapping dropped the second metric onto its own
                   row and cost the hero ~90px for nothing. */
                className={`mt-7 grid grid-cols-2 gap-x-6 gap-y-6 border-t pt-6 sm:mt-9 sm:flex sm:flex-wrap sm:gap-x-10 sm:pt-7 ${
                  dark ? "border-white/15" : "border-slate-900/10"
                }`}
              >
                {config.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col sm:min-w-[8.5rem]">
                    <dt
                      className={`order-2 mt-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] ${
                        dark ? "text-white/60" : "text-slate-500"
                      }`}
                    >
                      {metric.label}
                    </dt>
                    <dd
                      className={`order-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl ${config.accentText}`}
                    >
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {caseStudyData.projectLink && (
              <div className="mt-7 max-w-md sm:mt-9">
                <ProjectActionsCompact
                  liveUrl={caseStudyData.projectLink}
                  projectTitle={caseStudyData.title}
                  projectDescription={caseStudyData.description}
                  projectPageUrl={`https://barskydesign.pro${location.pathname}`}
                />
              </div>
            )}
          </motion.div>

          {media && (
            <motion.div
              {...rise}
              transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {media}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
