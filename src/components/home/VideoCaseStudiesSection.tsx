
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
          one twice a screen apart read as a mistake. */}
      <motion.h2
        {...rise(0.06)}
        className="mt-5 md:mt-6 font-display font-bold tracking-tight text-balance
                   text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.08] max-w-[20ch]"
      >
        Designing complex products into simpler experiences.
      </motion.h2>

      <motion.p
        {...rise(0.12)}
        className="mt-3 md:mt-4 max-w-[640px] text-base md:text-lg leading-relaxed text-muted-foreground"
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
