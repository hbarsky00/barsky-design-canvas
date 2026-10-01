import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Monitor, Sparkles, Users } from "lucide-react";
import { imgDims } from "@/utils/imageDims";

/**
 * The homepage opening spread.
 *
 * What this replaces: a centred stack of H1, a second headline, the name, the
 * site's own URL set as hero content, the city, and a row of social icons — a
 * résumé header. It shares its rail (max-w-[1440px], px-6/10/14), its eyebrow
 * token and its motion timing with the Selected Work section directly below, so
 * the two read as one page rather than two sites.
 */

const CAPABILITIES = [
  { Icon: Layers, label: "Product Design", detail: "UX/UI, Systems" },
  { Icon: Monitor, label: "Full-Stack Development", detail: "React, Databases, Launch" },
  { Icon: Sparkles, label: "AI & Emerging Tech", detail: "Gen AI, Automation" },
  { Icon: Users, label: "15+ Years Experience", detail: "Fintech, Healthcare, Pharma" },
] as const;

const EXPLORING = [
  "AI in Product Design",
  "Automation & Internal Tools",
  "Better Healthcare Experiences",
] as const;

const PHOTO = "/images/hiram-barsky-hero.webp";

const EditorialHero: React.FC = () => {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-14 pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-12">
      {/* Eyebrow rule — the mirror of "SELECTED WORK ———— 01 — 05" below. */}
      <motion.div {...rise(0)} className="flex items-center gap-4 md:gap-6">
        <p className="text-eyebrow text-muted-foreground whitespace-nowrap">Product Designer</p>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        <p className="text-eyebrow text-muted-foreground whitespace-nowrap flex items-center gap-2">
          Based in Clifton, NJ
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
        </p>
      </motion.div>

      <div className="mt-10 md:mt-12 grid items-center gap-10 xl:grid-cols-12 xl:gap-8">
        {/* ---------------------------------------------------------- copy */}
        <div className="order-1 xl:col-span-6">
          <motion.h1
            {...rise(0.06)}
            className="font-display font-bold tracking-tight text-balance text-foreground
                       text-[clamp(2.375rem,6.2vw,4.5rem)] leading-[1.02]"
          >
            Designing complex products into simpler experiences
            <span className="text-primary">.</span>
          </motion.h1>

          {/* His settled positioning, verbatim. The reference mockup had its own
              wording; this is the line the site already stands behind. */}
          <motion.p
            {...rise(0.12)}
            className="mt-6 max-w-[42rem] text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground"
          >
            I design and develop SaaS, web apps, mobile apps and internal tools — one person, from
            product design through React front end, database and launch. 15+ years across fintech,
            healthcare and pharma.
          </motion.p>

          <motion.div {...rise(0.18)} className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#case-studies"
              className="group/cta inline-flex min-h-[48px] items-center gap-2 rounded-xl px-6
                         bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold
                         shadow-md shadow-blue-600/20 transition-all duration-200
                         hover:shadow-lg hover:shadow-blue-600/25 motion-safe:hover:-translate-y-0.5
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                         focus-visible:ring-offset-2"
            >
              See My Work
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover/cta:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <Link
              to="/contact"
              className="inline-flex min-h-[48px] items-center rounded-xl border border-border
                         bg-background px-6 font-semibold text-foreground transition-colors
                         hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Book a Call
            </Link>
          </motion.div>
        </div>

        {/* --------------------------------------------------------- visual */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 xl:col-span-6 relative"
        >
          {/* Shapes are CSS, not pixels, so they scale with the column and stay
              crisp. Decorative — hidden from assistive tech. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-[-12%] top-[-18%] h-[118%] w-[108%] rounded-[46%_54%_42%_58%/52%_44%_56%_48%] bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100" />
            <div className="absolute left-[-6%] top-[24%] h-[52%] w-[48%] rounded-full bg-blue-200/50 blur-[2px]" />
          </div>

          <img
            {...imgDims(PHOTO)}
            src={PHOTO}
            alt="Hiram Barsky waving at his desk beside a laptop"
            fetchPriority="high"
            decoding="async"
            sizes="(max-width: 1024px) 70vw, 610px"
            className="relative mx-auto block w-full max-w-[610px] h-auto"
            style={{
              maskImage: "radial-gradient(58% 64% at 52% 42%, #000 48%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(58% 64% at 52% 42%, #000 48%, transparent 100%)",
            }}
          />

          {/* Editorial annotation, not a dashboard widget. */}
          <div
            className="mt-5 xl:mt-0 xl:absolute xl:right-0 xl:top-6 xl:w-[17rem]
                       rounded-2xl border border-border/70 bg-white/85 backdrop-blur-sm
                       px-5 py-4 shadow-lg shadow-slate-900/5"
          >
            <p className="text-eyebrow text-muted-foreground flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              Currently exploring
            </p>
            <ul className="mt-3 space-y-2">
              {EXPLORING.map((item) => (
                <li key={item} className="text-sm text-foreground leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Capability row — dividers, not cards. Leads the eye into Selected Work. */}
      <motion.ul
        {...rise(0.3)}
        className="mt-12 md:mt-14 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-border pt-8
                   lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-border"
      >
        {CAPABILITIES.map(({ Icon, label, detail }, i) => (
          <li key={label} className={`flex items-start gap-3 ${i > 0 ? "lg:pl-8" : ""}`}>
            <Icon className="mt-0.5 h-6 w-6 shrink-0 text-foreground" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block font-semibold text-foreground leading-snug">{label}</span>
              <span className="block text-sm text-muted-foreground leading-snug">{detail}</span>
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default EditorialHero;
