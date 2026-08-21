import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Mail, Linkedin, Github, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const CALENDLY = "https://calendly.com/barskyuxdesignservices/30min";

// Jump straight to the first case-study card (id="case-study-1", already set
// by VideoCaseStudiesSection.tsx's CaseStudyCard), not the section wrapper —
// the wrapper's own scroll target lands on the section heading/subtitle, one
// full scroll short of any actual card. html has a global scroll-padding-top
// tied to --header-height, so this still clears the fixed header correctly.
const scrollToCaseStudies = () => {
  const firstCard = document.getElementById("case-study-1");
  const fallback = document.getElementById("case-studies");
  (firstCard ?? fallback)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const SOCIALS = [
  { Icon: Mail, href: "mailto:hbarsky01@gmail.com", label: "Email Hiram Barsky", external: false },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/hiram-barsky", label: "Hiram Barsky on LinkedIn", external: true },
  { Icon: Github, href: "https://github.com/hbarsky00", label: "Hiram Barsky on GitHub", external: true },
];

const STATS = [
  { value: "15+ Yrs", label: "Product Design" },
  { value: "AI-Native", label: "Design + Build" },
  { value: "Solo Shipped", label: "Live Products" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const CleanHero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : item;

  return (
    <section className="hero-canvas relative overflow-hidden">
      {/* Fine dot-grid texture — a nod to Swiss-grid structure, not decoration for its own
          sake. Pure CSS radial-gradient tiling, no image asset, no JS. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--foreground) / 0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 80% 70% at 65% 15%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 65% 15%, black 40%, transparent 100%)",
        }}
      />
      {/* Two off-center brand glows, layered above the grid. They drift on a
          slow loop now — the page was completely static above the fold, so
          nothing on screen suggested it was alive. Transform-only, so it stays
          on the compositor, and it stops entirely under reduced-motion. */}
      <div
        aria-hidden="true"
        className="hero-aurora hero-aurora-a pointer-events-none absolute -inset-24"
        style={{
          background:
            "radial-gradient(620px circle at 78% 12%, hsl(var(--primary) / 0.20), transparent 62%)",
        }}
      />
      <div
        aria-hidden="true"
        className="hero-aurora hero-aurora-b pointer-events-none absolute -inset-24"
        style={{
          background:
            "radial-gradient(520px circle at 12% 82%, hsl(270 80% 60% / 0.16), transparent 62%)",
        }}
      />

      <div className="hero-shell relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={prefersReducedMotion ? undefined : container}
          className="grid lg:grid-cols-[1fr_0.82fr] gap-8 lg:gap-14 items-center"
        >
          {/* Text column */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-5 order-2 lg:order-1">
            <motion.div
              variants={variants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/40 text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              Product Design × AI
            </motion.div>

            <motion.h1
              variants={variants}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tight leading-[1.02]"
            >
              Hiram Barsky
            </motion.h1>

            <motion.div variants={variants} className="flex flex-col gap-1.5">
              <p className="text-lg sm:text-xl font-display font-medium text-foreground/90">
                Lead Product &amp; AI Designer
              </p>
              <p className="inline-flex items-center justify-center lg:justify-start gap-1.5 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                Clifton, NJ
              </p>
            </motion.div>

            <motion.p
              variants={variants}
              className="max-w-xl text-lg sm:text-xl text-foreground/90 font-medium"
            >
              I design AI-first products that ship.
            </motion.p>

            <motion.div
              variants={variants}
              className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <Button variant="brand" onClick={scrollToCaseStudies} className="!w-auto">
                See My Work <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" asChild className="!w-auto">
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  Book a Call
                </a>
              </Button>
            </motion.div>

            {/* Credibility strip — same label/value pattern used throughout the
                case studies' heroMetrics, kept consistent here. */}
            {/* Mobile: equal-width 3-col grid so the row can never outgrow the
                viewport (fixed flex gaps + nowrap labels clipped on ~360px
                phones). sm+: original inline flex with divider borders. */}
            <motion.div
              variants={variants}
              className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:flex sm:items-center sm:gap-8 pt-1"
            >
              {STATS.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center text-center sm:items-start sm:text-left ${i > 0 ? "sm:pl-8 sm:border-l border-border" : ""}`}
                >
                  <span className="font-display font-bold text-foreground text-sm sm:text-lg leading-tight sm:leading-none">
                    {value}
                  </span>
                  <span className="mt-1 text-[11px] sm:text-xs text-muted-foreground whitespace-nowrap">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={variants} className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, href, label, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={label}
                  className="p-2.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Photo column */}
          <motion.div
            variants={prefersReducedMotion ? undefined : { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } } }}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            {/* Was capped at max-w-sm, which left the photo shorter than the
                text beside it and opened a dead wedge under it. Sized to the
                column now, so both sides finish together. */}
            <div className="hero-photo relative w-56 sm:w-72 lg:w-full lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/25 via-purple-500/15 to-transparent blur-2xl"
              />
              <div className="relative rounded-[1.75rem] p-1.5 bg-gradient-to-tr from-primary/40 via-purple-500/30 to-transparent">
                <img
                  src="/images/hiram-barsky-profile.png"
                  alt="Hiram Barsky"
                  width={400}
                  height={400}
                  loading="eager"
                  className="w-full aspect-square rounded-[1.5rem] object-cover bg-muted"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* The chevron used to live here, floating alone in ~200px of empty
            page between the socials row and Selected Work. It duplicated the
            "See My Work" button directly above it, so it bought nothing and
            cost the biggest dead band on the homepage. */}
      </div>
    </section>
  );
};

export default CleanHero;
