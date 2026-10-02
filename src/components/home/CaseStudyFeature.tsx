import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { imgDims } from "@/utils/imageDims";
import { shouldShowPromoImpact } from "@/utils/promoCopy";

/**
 * One case study, presented as its own art-directed section.
 *
 * The homepage used to render the same card five times — same gradient, same
 * 625px image cap, same grid — so five different products read as one template
 * repeated. This is the same design system (the .text-eyebrow / .text-impact-
 * metric / font-display tokens, the same motion timing, the same CTA) composed
 * five different ways. Content is never touched here: titles, descriptions,
 * metrics, tags and URLs all arrive as props and are rendered verbatim.
 */
export type CaseStudyVariant =
  | "productHero"
  | "editorialSplit"
  | "cinematic"
  | "productContext"
  | "workflow";

export interface FeatureScreen {
  src: string;
  alt: string;
}

export interface CaseStudyFeatureProject {
  id: string;
  tags: string[];
  title: string;
  description: string;
  impact: string;
  url: string;
  hasDetail?: boolean;
  liveUrl?: string;
  images: { primary: string; secondary?: string; alt: string };
  /** Extra product screens for the layered and workflow compositions. */
  screens?: FeatureScreen[];
  /** Keeps the impact line off the homepage band without discarding the copy. */
  hideImpact?: boolean;
  video?: string;
}

/**
 * "68% Fewer Operation Errors" -> { value: "68%", label: "Fewer Operation Errors" }
 *
 * Presentation only: the string is never rewritten, just split at the leading
 * figure so the number can be set large and the rest can sit under it. An
 * impact with no leading figure ("Safety layer shipped in v1") keeps its whole
 * sentence and simply renders without a display number — nothing is invented to
 * fill the slot.
 */
const splitImpact = (impact: string): { value?: string; label: string } => {
  const m = /^(\d[\d.,]*\s*(?:%|×|x)?)\s+(.+)$/i.exec(impact.trim());
  return m ? { value: m[1].replace(/\s+/g, ""), label: m[2] } : { label: impact };
};

const Eyebrow: React.FC<{ tags: string[]; tone?: "light" | "dark" }> = ({ tags, tone = "light" }) => (
  <p className={`text-eyebrow ${tone === "dark" ? "text-white/60" : "text-primary"}`}>
    {tags.join(" · ")}
  </p>
);

const Metric: React.FC<{ impact: string; tone?: "light" | "dark" }> = ({ impact, tone = "light" }) => {
  const { value, label } = splitImpact(impact);
  return (
    <div className="flex items-baseline gap-3">
      {value && (
        <span
          className={`font-display font-bold leading-none text-3xl md:text-4xl lg:text-5xl ${
            tone === "dark" ? "text-white" : "text-primary"
          }`}
        >
          {value}
        </span>
      )}
      <span
        className={`text-sm md:text-base leading-snug ${
          tone === "dark" ? "text-white/70" : "text-muted-foreground"
        } ${value ? "max-w-[18ch]" : "font-medium"}`}
      >
        {label}
      </span>
    </div>
  );
};

const Actions: React.FC<{ project: CaseStudyFeatureProject; tone?: "light" | "dark" }> = ({
  project,
  tone = "light",
}) => (
  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
    {project.hasDetail !== false && (
      <Link
        to={project.url}
        className={`group/cta inline-flex min-h-[44px] items-center gap-2 text-base font-semibold rounded-md
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    ${
                      tone === "dark"
                        ? "text-white focus-visible:ring-white focus-visible:ring-offset-slate-950"
                        : "text-primary focus-visible:ring-primary focus-visible:ring-offset-background"
                    }`}
      >
        View case study
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover/cta:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    )}
    {project.liveUrl && (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group/live inline-flex min-h-[44px] items-center gap-2 text-base rounded-md
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    ${
                      tone === "dark"
                        ? "text-white/70 hover:text-white focus-visible:ring-white focus-visible:ring-offset-slate-950"
                        : "text-muted-foreground hover:text-foreground focus-visible:ring-primary focus-visible:ring-offset-background"
                    }`}
      >
        View live
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover/live:-translate-y-0.5"
          aria-hidden="true"
        />
      </a>
    )}
  </div>
);

const Copy: React.FC<{
  project: CaseStudyFeatureProject;
  headingId: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}> = ({ project, headingId, tone = "light", align = "left" }) => {
  const showImpact =
    !project.hideImpact &&
    shouldShowPromoImpact(project.title, project.description, project.impact);
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center max-w-[58ch] mx-auto" : "max-w-[46ch]"
      }`}
    >
      <Eyebrow tags={project.tags} tone={tone} />
      <h3
        id={headingId}
        className={`font-display font-bold tracking-tight text-balance
                    text-2xl md:text-3xl lg:text-[2.5rem] lg:leading-[1.1]
                    ${tone === "dark" ? "text-white" : "text-foreground"}`}
      >
        {/* A retired detail route 301s away, so it never gets an anchor — the
            old card was careful about this and the heading must be too. */}
        {project.hasDetail === false ? (
          project.title
        ) : (
          <Link
            to={project.url}
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {project.title}
          </Link>
        )}
      </h3>
      <p
        className={`text-base md:text-lg leading-relaxed ${
          tone === "dark" ? "text-white/70" : "text-muted-foreground"
        }`}
      >
        {project.description}
      </p>
      {showImpact && <Metric impact={project.impact} tone={tone} />}
      <Actions project={project} tone={tone} />
    </div>
  );
};

/** Media is a link to the study, except where the detail route is retired. */
const MediaLink: React.FC<{
  project: CaseStudyFeatureProject;
  className?: string;
  children: React.ReactNode;
}> = ({ project, className, children }) =>
  project.hasDetail === false ? (
    <div className={className}>{children}</div>
  ) : (
    <Link
      to={project.url}
      tabIndex={-1}
      aria-hidden="true"
      className={`block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        className ?? ""
      }`}
    >
      {children}
    </Link>
  );

const Screen: React.FC<{
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  cover?: boolean;
}> = ({ src, alt, className = "", priority = false, cover = false }) => (
  <img
    {...imgDims(src)}
    src={src}
    alt={alt}
    loading={priority ? "eager" : "lazy"}
    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 720px"
    style={imgDims(src).width ? { maxWidth: imgDims(src).width, marginInline: "auto" } : undefined}
    className={`w-full h-auto ${cover ? "object-cover object-top" : "object-contain"} ${className}`}
  />
);

/* ------------------------------------------------------------------ */

const MOTION_DISTANCE = 16;

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className,
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: MOTION_DISTANCE }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/** Every variant sits in the same rail; only the background and grid change. */
const Band: React.FC<{
  children: React.ReactNode;
  headingId: string;
  className?: string;
  /** The first band sits right under the section intro, so it opens tighter —
      the point of the intro is to hand straight over, not leave a blank screen. */
  first?: boolean;
}> = ({ children, headingId, className = "", first = false }) => (
  <article
    aria-labelledby={headingId}
    className={`w-screen relative left-1/2 -ml-[50vw] overflow-hidden
                ${first ? "pt-6 md:pt-8 lg:pt-10" : "pt-14 md:pt-20 lg:pt-28"}
                pb-14 md:pb-20 lg:pb-28 ${className}`}
  >
    <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-14">{children}</div>
  </article>
);

/* ------------------------------------------------------------------ */

const CaseStudyFeature: React.FC<{
  project: CaseStudyFeatureProject;
  variant: CaseStudyVariant;
  index: number;
}> = ({ project, variant, index }) => {
  const headingId = `case-study-${project.id}-title`;
  const screens = project.screens ?? [];
  const priority = index === 0;

  /* 01 — Large product hero. The device shot dominates and runs wider than the
     text rail; a second interface panel overlaps its lower corner. */
  if (variant === "productHero") {
    return (
      <Band headingId={headingId} first={priority} className="bg-background">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-5">
            <Copy project={project} headingId={headingId} />
          </Reveal>
          <Reveal delay={0.12} className="order-1 lg:order-2 lg:col-span-7">
            <MediaLink project={project} className="group/media relative block">
              {/* No surface panel: the tint existed because the old DAE artwork
                  was a transparent device render that vanished on white. The
                  board that replaced it carries its own ground, so the panel was
                  drawing a box around it. */}
              <div className="transition-transform duration-500 motion-safe:group-hover/media:scale-[1.015]">
                <Screen
                  src={project.images.primary}
                  alt={project.images.alt}
                  priority={priority}
                  className="rounded-xl drop-shadow-xl"
                />
              </div>
              {screens[0] && (
                <div
                  className="hidden md:block absolute -bottom-6 -left-6 w-[38%] rounded-lg overflow-hidden
                             ring-1 ring-black/5 shadow-2xl bg-white
                             transition-transform duration-500 motion-safe:group-hover/media:-translate-y-1"
                >
                  <Screen src={screens[0].src} alt={screens[0].alt} cover className="aspect-[4/3]" />
                </div>
              )}
            </MediaLink>
          </Reveal>
        </div>
      </Band>
    );
  }

  /* 02 — Editorial split. The interface is the artwork: an oversized crop that
     bleeds off the left edge, with the copy held in a narrow column. */
  if (variant === "editorialSplit") {
    return (
      <Band headingId={headingId} first={priority} className="bg-slate-50/80 border-y border-border/40">
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
          <Reveal className="order-1 lg:-ml-14 xl:-ml-24">
            <MediaLink project={project} className="group/media block">
              <div
                className="overflow-hidden rounded-xl ring-1 ring-black/5 shadow-2xl bg-white
                           transition-transform duration-500 motion-safe:group-hover/media:scale-[1.01]"
              >
                <Screen src={project.images.primary} alt={project.images.alt} priority={priority} />
              </div>
            </MediaLink>
          </Reveal>
          <Reveal delay={0.12} className="order-2 lg:pl-6">
            <Copy project={project} headingId={headingId} />
          </Reveal>
        </div>
      </Band>
    );
  }

  /* 03 — Dark cinematic. One deliberate break in the scroll. This is a dark
     SECTION, not a dark theme: no toggle, no theme tokens redefined, and the
     rest of the page stays light. */
  if (variant === "cinematic") {
    return (
      <Band headingId={headingId} first={priority} className="bg-slate-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70
                     [background:radial-gradient(60%_50%_at_75%_40%,theme(colors.sky.500/0.16),transparent_70%)]"
        />
        <div className="relative grid items-center gap-12 lg:gap-16 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-5">
            <Copy project={project} headingId={headingId} tone="dark" />
          </Reveal>
          <Reveal delay={0.12} className="order-1 lg:order-2 lg:col-span-7">
            <MediaLink project={project} className="group/media relative block">
              {screens[0] && (
                <div
                  className="hidden md:block absolute right-0 -top-8 w-[72%] rounded-lg overflow-hidden
                             ring-1 ring-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)]
                             transition-transform duration-500 motion-safe:group-hover/media:-translate-y-2"
                >
                  <Screen src={screens[0].src} alt={screens[0].alt} />
                </div>
              )}
              {/* No ring, no panel: the artwork here is a transparent PNG, so a
                  border drew a rounded box around empty space on the navy. The
                  drop shadow follows the subject instead of a rectangle. */}
              <div
                className={`relative ${screens[0] ? "md:mt-20" : ""}
                           [filter:drop-shadow(0_30px_60px_rgba(0,0,0,0.55))]
                           transition-transform duration-500 motion-safe:group-hover/media:translate-y-1`}
              >
                <Screen src={project.images.primary} alt={project.images.alt} priority={priority} />
              </div>
            </MediaLink>
          </Reveal>
        </div>
      </Band>
    );
  }

  /* 04 — Product in context. Desktop and mobile together, the phone overlapping
     the lower-left corner of the desktop screen. */
  if (variant === "productContext") {
    return (
      <Band headingId={headingId} first={priority} className="bg-background">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-5">
            <Copy project={project} headingId={headingId} />
          </Reveal>
          <Reveal delay={0.12} className="order-1 lg:order-2 lg:col-span-7">
            <MediaLink project={project} className="group/media relative block md:pb-10 md:pl-12">
              <div
                className="rounded-xl overflow-hidden ring-1 ring-black/5 shadow-2xl bg-white
                           transition-transform duration-500 motion-safe:group-hover/media:scale-[1.01]"
              >
                <Screen src={project.images.primary} alt={project.images.alt} priority={priority} />
              </div>
              {screens[0] && (
                <div
                  className="hidden md:block absolute bottom-0 left-0 w-[26%] rounded-xl overflow-hidden
                             ring-1 ring-black/5 shadow-2xl bg-white
                             transition-transform duration-500 motion-safe:group-hover/media:-translate-y-2"
                >
                  <Screen src={screens[0].src} alt={screens[0].alt} />
                </div>
              )}
            </MediaLink>
          </Reveal>
        </div>
      </Band>
    );
  }

  /* 05 — Workflow. The product as a system: the steps run across the top at a
     slight stagger, the copy reads underneath. */
  return (
    <Band headingId={headingId} first={priority} className="bg-sky-50/40 border-y border-border/40">
      <Reveal>
        <MediaLink project={project} className="group/media block">
          {/* Four across only once there is room for it. At 768 and 1024 that
              put each step at 157px and 213px wide, which is a thumbnail of a
              screen rather than a screen; two across keeps them legible, and
              phones get one per row. */}
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {(screens.length ? screens : [{ src: project.images.primary, alt: project.images.alt }]).map(
              (screen, i) => (
                <li
                  key={screen.src}
                  className={`overflow-hidden rounded-lg ring-1 ring-black/5 bg-white shadow-xl
                              transition-transform duration-500
                              motion-safe:group-hover/media:-translate-y-1
                              ${i % 2 === 1 ? "xl:translate-y-6" : ""}`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <Screen src={screen.src} alt={screen.alt} cover className="aspect-[4/3]" priority={priority && i === 0} />
                </li>
              ),
            )}
          </ol>
        </MediaLink>
      </Reveal>
      <Reveal delay={0.12} className="mt-12 md:mt-20">
        <Copy project={project} headingId={headingId} align="center" />
      </Reveal>
    </Band>
  );
};

export default CaseStudyFeature;
