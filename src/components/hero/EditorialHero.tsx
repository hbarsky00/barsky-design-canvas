import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronRight, Layers, Monitor, Sparkles, Users } from "lucide-react";
import { imgDims } from "@/utils/imageDims";

/**
 * The homepage opening spread.
 *
 * The visual focus is the product work rather than a portrait: HerbaLink's real
 * desktop home screen and a real CatchBuddy phone screen, both shipped assets
 * lifted from those case studies, not mockups drawn for this page.
 *
 * This is a dark SECTION, not a dark theme — no toggle, no tokens redefined for
 * dark, and every other surface on the site stays light.
 */

/**
 * Two labels each: the full one, and a shorter one below 1280. At 390 the long
 * versions wrapped "Full-Stack Development" onto two lines and "React,
 * Databases, Launch" onto three; at 1024 the four-across strip does the same.
 * Only one of the pair is ever exposed to assistive tech.
 */
const CAPABILITIES = [
  { Icon: Layers, label: "Product Design", detail: "UX/UI, Systems" },
  {
    Icon: Monitor,
    label: "Full-Stack Development",
    short: "Full-Stack",
    detail: "React, Databases, Launch",
    shortDetail: "React, Launch",
  },
  { Icon: Sparkles, label: "AI & Emerging Tech", detail: "Gen AI, Automation" },
  {
    Icon: Users,
    label: "15+ Years Experience",
    short: "15+ Years",
    detail: "Fintech, Healthcare, Pharma",
    shortDetail: "Product Design",
  },
] as const;

const HERBALINK = "/images/herbalink/hero-desktop.webp";
const CATCHBUDDY = "/images/catchbuddy/hero-phone.webp";

const Responsive: React.FC<{ full: string; short?: string; className?: string }> = ({
  full,
  short,
  className,
}) =>
  short ? (
    <span className={className}>
      <span className="xl:hidden" aria-hidden="true">
        {short}
      </span>
      <span className="hidden xl:inline">{full}</span>
      <span className="sr-only xl:hidden">{full}</span>
    </span>
  ) : (
    <span className={className}>{full}</span>
  );

/** A product annotation — a caption, deliberately not an advert. */
const ProductTag: React.FC<{ name: string; kind: string; className?: string }> = ({
  name,
  kind,
  className = "",
}) => (
  <span
    className={`inline-flex flex-col rounded-xl border border-white/10 bg-slate-900/85 px-3 py-2
                backdrop-blur-sm shadow-lg shadow-black/40 ${className}`}
  >
    <span className="text-sm font-semibold leading-tight text-white">{name}</span>
    <span className="text-xs leading-tight text-white/60">{kind}</span>
  </span>
);

const EditorialHero: React.FC = () => {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="relative overflow-hidden bg-slate-950 lg:flex lg:min-h-svh lg:items-center">
      {/* Atmosphere, kept away from the type so contrast never drops. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   [background:radial-gradient(60%_55%_at_72%_38%,rgba(59,130,246,0.22),transparent_70%),radial-gradient(45%_45%_at_96%_88%,rgba(139,92,246,0.16),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-6 md:px-10 lg:px-14 pt-10 md:pt-12 pb-10 lg:pb-12">
        <div className="grid items-center gap-12 lg:gap-10 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
          {/* ------------------------------------------------------- copy */}
          <div className="order-1">
            <motion.div {...rise(0)} className="flex items-center gap-4">
              <p className="text-eyebrow text-white/50 whitespace-nowrap">Lead Product Designer</p>
              <span className="h-px w-16 shrink-0 bg-white/20 lg:w-24" aria-hidden="true" />
            </motion.div>

            <motion.h1
              {...rise(0.06)}
              className="mt-5 font-display font-bold tracking-tight text-balance text-white
                         text-[clamp(2.625rem,1.1rem+7.5vw,3.125rem)] md:text-[clamp(2.5rem,1.3rem+3vw,4rem)]
                         leading-[1.02] max-w-[15ch]"
            >
              Designing products that solve{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                real problems.
              </span>
            </motion.h1>

            {/* The site's settled positioning, unchanged. */}
            <motion.p
              {...rise(0.12)}
              className="mt-6 max-w-[34rem] text-base md:text-lg leading-relaxed text-white/70"
            >
              I design and develop SaaS, web apps, mobile apps and internal tools — one person, from
              product design through React front end, database and launch. 15+ years across fintech,
              healthcare and pharma.
            </motion.p>

            <motion.div {...rise(0.18)} className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#case-studies"
                className="group/cta inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-6
                           bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold
                           shadow-lg shadow-blue-900/40 transition-all duration-200
                           hover:shadow-xl hover:shadow-blue-900/50 motion-safe:hover:-translate-y-0.5
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                           focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                See My Work
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover/cta:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <Link
                to="/contact"
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/25
                           px-6 font-semibold text-white transition-colors hover:bg-white/10
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                           focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Book a Call
              </Link>
            </motion.div>
          </div>

          {/* --------------------------------------------- product showcase */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 relative"
          >
            {/* Phone in front on the left, web behind on the right. The phone
                sits in normal flow so it sets the height of the box; an
                aspect-ratio wrapper with overflow-hidden cropped the top of the
                phone and the left of the web screen. Nothing here is clipped. */}
            <div className="relative w-full">
              {/* HerbaLink — the web product, behind and to the right */}
              <figure className="absolute right-0 top-[10%] w-[64%] sm:w-[62%] lg:w-[70%]">
                <img
                  {...imgDims(HERBALINK)}
                  src={HERBALINK}
                  alt="HerbaLink web app: the home screen for finding a certified herbalist, with the herb field guide alongside"
                  fetchPriority="high"
                  decoding="async"
                  sizes="(max-width: 767px) 62vw, (max-width: 1023px) 58vw, 40vw"
                  className="w-full rounded-lg ring-1 ring-white/10 shadow-2xl shadow-black/60 lg:rounded-xl"
                />
                <ProductTag
                  name="HerbaLink"
                  kind="Healthcare Marketplace"
                  className="absolute -top-3 right-0 scale-90 origin-top-right sm:scale-100 lg:-top-4"
                />
                {/* HerbaLink's own figure from its case study, not a new claim. */}
                <span
                  className="absolute -bottom-3 right-1 inline-flex items-baseline gap-1.5 rounded-xl
                             border border-emerald-400/25 bg-emerald-950/85 px-2.5 py-1.5 sm:px-3 sm:py-2
                             backdrop-blur-sm shadow-lg shadow-black/40"
                >
                  <span className="text-sm font-bold text-emerald-300">3×</span>
                  <span className="text-xs text-white/70">more bookings</span>
                </span>
              </figure>

              {/* CatchBuddy — the phone, in front on the left, and the element
                  that gives this box its height. */}
              <figure className="relative z-10 w-[46%] sm:w-[42%] lg:w-[36%]">
                <img
                  {...imgDims(CATCHBUDDY)}
                  src={CATCHBUDDY}
                  alt="CatchBuddy phone app: nearby pickup games at Riverside Park, Maplewood Courts and Lincoln Park, each showing how many players are going"
                  decoding="async"
                  sizes="(max-width: 767px) 46vw, (max-width: 1023px) 38vw, 20vw"
                  className="w-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.65)]"
                />
                <ProductTag
                  name="CatchBuddy"
                  kind="Sports Meetup App"
                  className="absolute -top-3 left-0 scale-90 origin-top-left whitespace-nowrap sm:scale-100 lg:-top-4"
                />
              </figure>
            </div>
          </motion.div>
        </div>

        {/* Capabilities: a vertical list on phones, where four columns would be
            four cramped slivers, and the four-across strip from sm up. */}
        <motion.ul
          {...rise(0.3)}
          className="mt-12 lg:mt-10 border-t border-white/10
                     sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10"
        >
          {CAPABILITIES.map((cap, i) => {
            const { Icon, label, detail } = cap;
            const short = "short" in cap ? cap.short : undefined;
            const shortDetail = "shortDetail" in cap ? cap.shortDetail : undefined;
            return (
              <li
                key={label}
                className={`flex items-center gap-4 border-b border-white/10 py-4
                            sm:items-start sm:gap-3 sm:border-b-0 sm:py-5 sm:pr-6 lg:py-6
                            ${i % 2 === 1 ? "sm:border-l sm:border-white/10 sm:pl-6 lg:border-l-0 lg:pl-8" : ""}
                            ${i >= 2 ? "sm:border-t sm:border-white/10 lg:border-t-0" : ""}
                            ${i === 2 || i === 3 ? "lg:pl-8" : ""}`}
              >
                <Icon
                  className="h-6 w-6 shrink-0 text-white/70 sm:mt-0.5"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <Responsive
                    full={label}
                    short={short}
                    className="block font-semibold leading-snug text-white"
                  />
                  <Responsive
                    full={detail}
                    short={shortDetail}
                    className="block text-sm leading-snug text-white/55"
                  />
                </span>
                <ChevronRight
                  className="h-5 w-5 shrink-0 text-white/30 sm:hidden"
                  aria-hidden="true"
                />
              </li>
            );
          })}
        </motion.ul>
      </div>

      {/* The scroll cue that used to live on the old hero (fabe213a), back in
          place: absolutely positioned so it adds nothing to the layout, centred
          on the page axis, and only on the sizes where the hero fills the
          viewport — on a phone the hero scrolls anyway and a cue pinned to its
          foot would sit a screen and a half down.
          It is an anchor, not a scroll handler, so it inherits the same
          scroll-padding the nav uses and works without JS. */}
      {/* The centring lives on the wrapper and the bounce on the anchor: both on
          one element and animate-bounce's keyframes overwrite transform, which
          cancels -translate-x-1/2 and leaves the cue half its own width (22px)
          right of centre. */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
        <a
          href="#case-studies"
          aria-label="Scroll to selected work"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full
                     border border-white/15 text-white/60 transition-colors
                     hover:border-white/40 hover:bg-white/10 hover:text-white
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                     focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
                     motion-safe:animate-bounce"
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default EditorialHero;
