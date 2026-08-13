
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PlaceholderImage from "@/components/case-study/structured/PlaceholderImage";
import { shouldShowPromoImpact } from "@/utils/promoCopy";

interface CaseStudy {
  id: string;
  tags: string[];
  title: string;
  description: string;
  impact: string;
  url: string;
  liveUrl?: string;
  images: {
    primary: string;
    secondary?: string;
    alt: string;
  };
  layout: "side-by-side" | "single-centered" | "web-mobile";
  video?: string;
}

// Pulled from featured work, routes/pages/content all untouched:
//   "fire-lion"         2026-08-07 — Hiram: "were going to work on that later."
//   "business-management" 2026-08-08 — page needs rebuilding on the current template.
//   "email-creation-ai" 2026-08-09 — Hiram: park it as a draft, revisit later.
// Each is still live at its own /project/<id> URL; only the homepage
// listing is affected.
const caseStudies: CaseStudy[] = [
  {
    id: "ring-rival",
    tags: ["AI-Assisted Product", "Mobile Web", "Game Design"],
    title: "Ring-Rival",
    description: "Console boxing feel on the mobile web — distinct AI opponents, AI-generated trash talk, career mode. Built solo with AI as a co-builder.",
    impact: "",
    url: "/project/ring-rival",
    liveUrl: "https://ringrival.today",
    images: {
      // Was the title screen still + an AI-generated cinematic of a
      // photorealistic boxer. Neither is the game: it's a flat-shaded 2D
      // fighter. Now the card shows the thing you actually get — first-person
      // gloves, opponent trash talk, the super-punch meter.
      primary: "/images/ringrival-now/card-poster.jpg",
      alt: "Ring-Rival mobile boxing gameplay"
    },
    layout: "side-by-side",
    video: "/ring-rival-card.mp4"
  },
  {
    id: "catchbuddy",
    tags: ["AI-Assisted Product", "Trust & Safety", "Mobile-First"],
    title: "CatchBuddy",
    description: "Same-day pickup sports, designed for trust. Post a game, see open games, confirm in a few taps.",
    impact: "",
    url: "/project/catchbuddy",
    liveUrl: "https://catchbuddy.me",
    images: {
      primary: "/images/catchbuddy-hero-landing.png",
      alt: "CatchBuddy pickup sports app"
    },
    layout: "side-by-side",
    video: "/catchbuddy-card.mp4"
  },
  {
    id: "herbalink",
    tags: ["Health", "Marketplace", "Trust & Safety"],
    title: "HerbaLink",
    description: "A booking platform for herbalists, built around the realization that the actual product is trust, not search.",
    impact: "",
    url: "/project/herbalink",
    liveUrl: "https://herbalink.live",
    images: {
      // Was hosted on barskyux.com (the old WordPress site) — that domain no
      // longer resolves at all (DNS failure, not a 404), so both this image
      // and the video below were broken. Swapped to a real local asset
      // already in this repo; no local HerbaLink video exists, so the video
      // field is dropped and this card now renders the static image
      // (same fallback path "Email Creation AI" already uses).
      primary: "/images/herbalink/home-2026.jpg",
      alt: "HerbaLink practitioner booking interface"
    },
    layout: "side-by-side"
  },
  {
    id: "stips",
    tags: ["AI-Assisted Product", "Fintech UX", "Solo Build"],
    title: "Stips",
    description: "Prediction markets you can actually read — play-money trading on real-world events, where the price is the probability.",
    impact: "",
    url: "/project/stips",
    liveUrl: "https://stips.bet",
    images: {
      primary: "/images/stips/landing.jpg",
      alt: "Stips landing — buy Yes or No on real-world events, $500 in play money to start"
    },
    layout: "side-by-side",
    // Cut from 1.5s of the walkthrough so the clip opens on the landing page —
    // the same frame as the poster above — then clicks through to the board.
    // Short like the other cards' loops so it starts instantly on hover.
    video: "/stips-card.mp4"
  },
  {
    id: "dae-search",
    tags: ["Enterprise", "Data Discovery", "Search UX"],
    title: "DAE Search",
    description: "Enterprise search redesigned around the inconvenient truth that finding the data is only half the job — knowing whether to trust it is the rest.",
    impact: "",
    url: "/project/dae-search",
    images: {
      // Was hosted on a Supabase project that's since been deprovisioned —
      // ctqttomppgkjbjkckise.supabase.co no longer resolves at all (DNS
      // failure). Hiram supplied the original source file directly;
      // restored locally (same asset used as the full case study's hero).
      primary: "/images/dae-search/hero.jpg",
      alt: "DAE Search platform interface"
    },
    layout: "side-by-side",
    video: "/lovable-uploads/dae-search-hero.mp4"
  },
  {
    id: "investor-loan-app",
    tags: ["Enterprise", "FinTech", "Workflow Design"],
    title: "Investor Loan Platform",
    description: "Replacing Excel as the system of record for multi-million-dollar loan deals — without anyone losing their workflow.",
    impact: "",
    url: "/project/investor-loan-app",
    images: {
      primary: "/images/investor-loan-app/hero.png",
      alt: "Investor loan analysis dashboard overview"
    },
    layout: "side-by-side",
    video: "/investor-loan-deals-card.mp4"
  }
];

/**
 * One case study, presented editorially rather than as a card.
 *
 * The previous version wrapped every study in a full-bleed grey gradient panel
 * with its own borders, and rendered the whole thing twice (a `lg:hidden`
 * mobile copy and a separate desktop copy). That produced a stack of heavy
 * boxes and double the DOM. This is a single responsive layout: the work is
 * the visual, the page background is left alone, and the media side alternates
 * so a column of studies has some rhythm.
 */
const CaseStudyCard: React.FC<{ study: CaseStudy; index: number }> = React.memo(({ study, index }) => {
  const showImpact = shouldShowPromoImpact(study.title, study.description, study.impact);
  const mediaFirst = index % 2 === 0;

  const needsPlaceholder = (src?: string) =>
    Boolean(src && src.includes("/assets/case-studies/smarter-health/"));
  const showPlaceholder =
    needsPlaceholder(study.video) || needsPlaceholder(study.images.primary);

  const renderMedia = () => {
    if (showPlaceholder) {
      return <PlaceholderImage title={study.title} className="w-full h-full" />;
    }
    if (study.video) {
      return (
        <video
          src={study.video}
          poster={study.images.primary}
          className="w-full h-full object-cover object-top"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={study.images.alt}
          onMouseEnter={(e) => {
            if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
              e.currentTarget.play().catch(() => {});
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
      );
    }
    return (
      <img
        src={study.images.primary}
        alt={study.images.alt}
        loading="lazy"
        className="w-full h-full object-cover object-top"
      />
    );
  };

  return (
    <motion.article
      id={`case-study-${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group grid lg:grid-cols-2 gap-6 lg:gap-14 items-center"
    >
      {/* Media — the work leads */}
      <Link
        to={study.url}
        tabIndex={-1}
        aria-hidden="true"
        className={`block overflow-hidden rounded-2xl border border-border bg-muted/20 aspect-[16/10] ${
          mediaFirst ? "" : "lg:order-2"
        }`}
      >
        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          {renderMedia()}
        </div>
      </Link>

      {/* Copy */}
      <div className={`min-w-0 ${mediaFirst ? "" : "lg:order-1"}`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-display text-sm tabular-nums text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-6 bg-border" aria-hidden="true" />
          <div className="flex flex-wrap gap-x-3 gap-y-1 min-w-0">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h3 className="font-display font-bold text-foreground text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">
          <Link to={study.url} className="hover:text-primary transition-colors duration-200">
            {study.title}
          </Link>
        </h3>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
          {study.description}
        </p>

        {showImpact ? <div className="text-impact-metric-md mb-6">{study.impact}</div> : null}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button asChild className="!w-auto">
            <Link to={study.url}>
              View Case Study
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
            >
              View Live
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
});

CaseStudyCard.displayName = "CaseStudyCard";

const VideoCaseStudiesSection: React.FC = () => {
  return (
    <section className="pt-8 md:pt-14 pb-20 md:pb-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <h2 className="font-display font-bold text-foreground text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Selected Work
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Products I designed and shipped — most of them live, all of them with the
            decisions written down.
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoCaseStudiesSection;
