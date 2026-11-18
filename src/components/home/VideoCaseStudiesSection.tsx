
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import CaseStudyFeature, { CaseStudyVariant } from "@/components/home/CaseStudyFeature";

import { caseStudies } from "@/data/homeCaseStudies";

/**
 * A chapter heading, not a second hero.
 *
 * This was a centred SectionHeader — "Case Studies That Drive Results" over a
 * marketing subtitle — in its own padded container, which read as a banner and
 * pushed the first project off the screen. It is now a compact left-aligned
 * rule on the same rail the case studies use, so the eye runs straight from the
 * heading into the first piece of work.
 */
const SelectedWorkIntro: React.FC<{ count: number }> = ({ count }) => {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-14 pt-10 md:pt-12 pb-1">
      <motion.div {...rise(0)} className="flex items-center gap-4 md:gap-6">
        <p className="text-eyebrow text-muted-foreground whitespace-nowrap">Selected work</p>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        <p className="text-eyebrow text-muted-foreground tabular-nums whitespace-nowrap">
          01 — {String(count).padStart(2, "0")}
        </p>
      </motion.div>

      {/* Deliberately not the hero's headline. The two lines swapped when the
          hero took "solve real problems" — both are Hiram's, and printing either
          one twice a screen apart read as a mistake.

          Sized down 2026-11-17. It was 2rem/2.5rem/3rem, against a case-study
          title of 2xl/3xl/2.5rem directly beneath it — 3rem over 2.5rem, same
          weight, same typeface, same left rail, one short paragraph apart. Two
          headlines that close together do not read as a hierarchy, they read as
          a mistake: "one header on top of another", which is what the homepage
          was actually doing to every reader who got that far.

          The file's own comment at the top says "a chapter heading, not a
          second hero". It had become the second hero. Now the case-study title
          is the largest text in the band by a clear margin, and this is what it
          was always meant to be — the line that introduces the chapter. Nothing
          was cut; both of Hiram's lines are still here. */}
      <motion.h2
        {...rise(0.06)}
        className="mt-5 md:mt-6 font-display font-semibold tracking-tight text-balance
                   text-xl md:text-2xl leading-snug max-w-[34ch]"
      >
        Designing complex products into simpler experiences.
      </motion.h2>

      <motion.p
        {...rise(0.12)}
        className="mt-2 max-w-[560px] text-sm md:text-base leading-relaxed text-muted-foreground"
      >
        A selection of product design work spanning enterprise platforms, healthcare, fintech, and
        consumer products.
      </motion.p>
    </div>
  );
};

const VideoCaseStudiesSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-background" tabIndex={-1}>
      <SelectedWorkIntro count={caseStudies.length} />

      {/* Each study is its own full-bleed band, so the backgrounds carry the
          scroll rhythm. They sit outside the intro rail on purpose. */}
      {caseStudies.map((study, index) => (
        <CaseStudyFeature key={study.id} project={study} variant={study.variant} index={index} />
      ))}
    </section>
  );
};

export default VideoCaseStudiesSection;
