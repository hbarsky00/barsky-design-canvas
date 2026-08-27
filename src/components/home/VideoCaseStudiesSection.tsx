
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
    id: "bz-essentials",
    tags: ["Enterprise", "Information Architecture", "Solo Build"],
    title: "BZ Essentials",
    description: "An enterprise knowledge portal built from a client PRD. Region is a lens over the whole app, not a filter nobody opens.",
    impact: "",
    url: "/project/bz-essentials",
    liveUrl: "https://az-essentials.netlify.app",
    images: {
      primary: "/images/bz-essentials/card-hero.webp",
      alt: "BZ Essentials — enterprise knowledge portal home"
    },
    layout: "side-by-side",
    video: "/bz-essentials-card.mp4"
  },
  {
    id: "recast",
    tags: ["Product Design", "Cross-Platform", "Native + Web"],
    title: "Recast",
    description: "Record it once, send a link. Native capture on Mac and Android with a web library — including the browser recorder I built and then deleted.",
    impact: "",
    url: "/project/recast",
    liveUrl: "https://recastvid.com",
    images: {
      // Tight crop on the headline, not the full 1440px page capture. On a
      // phone the card is ~350px wide and there is no hover, so the whole
      // screenshot became an unreadable smudge — this crop still reads.
      primary: "/images/recast/card-hero.webp",
      alt: "Recast — record it once, send a link"
    },
    layout: "side-by-side",
    // Real footage Hiram recorded of the Mac app, trimmed to the eight seconds
    // that are the whole pitch: recording running, stop, the player opening
    // immediately from the local file with Copy Link already there.
    video: "/recast-card.mp4"
  },
  {
    id: "catchbuddy",
    tags: ["AI-Assisted Product", "Trust & Safety", "Mobile-First"],
    title: "CatchBuddy",
    description: "Same-day pickup sports, designed for trust. Post a game, see open games, confirm in a few taps.",
    impact: "",
    url: "/project/catchbuddy",
    liveUrl: "https://catchbuddy.fit",
    images: {
      primary: "/images/catchbuddy-hero-landing.webp",
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
      // The old barskyux.com-hosted video died with that domain; this card sat
      // static ever since. Hiram's booking-demo capture (Aug 2026) restores
      // the hover loop — poster is its first frame so hover continues the
      // same scene instead of jumping.
      primary: "/images/herbalink/card-poster-home.jpg",
      alt: "HerbaLink practitioner booking interface"
    },
    layout: "side-by-side",
    video: "/herbalink-card.mp4"
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
      primary: "/images/stips/card-poster-home.jpg",
      alt: "Stips markets board — live prices on real-world events"
    },
    layout: "side-by-side",
    // The old cut spent its first four seconds parked on the static landing
    // page, so hovering looked like nothing happened. This one opens on the
    // markets board already scrolling — motion from the first frame, and the
    // poster is that same frame.
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
      primary: "/images/dae-search/hero.webp",
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
      // Poster is the video's own first frame — the source clip had ~100px of
      // grey mock-frame baked into the top and bottom; it's cropped out of
      // both now, so no more letterboxed card.
      primary: "/images/investor-loan-app/card-poster-home.jpg",
      alt: "Investor loan analysis dashboard overview"
    },
    layout: "side-by-side",
    video: "/investor-loan-deals-card.mp4"
  },
  {
    // Never pulled — it was simply never added here. Hiram spotted it missing.
    id: "crypto",
    tags: ["Fintech UX", "Crypto", "Dual-Mode UX"],
    title: "Gold2Crypto",
    description: "A crypto trading interface for two audiences the industry insists you have to choose between — beginners paying hidden spreads, pros paying an are-you-sure tax.",
    impact: "",
    url: "/project/crypto",
    images: {
      primary: "/images/crypto/hero.webp",
      alt: "Gold2Crypto trading interface — one platform serving beginners and pros"
    },
    layout: "side-by-side"
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
        className={`block overflow-hidden rounded-xs border border-border bg-muted/20 aspect-[16/10] ${
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
              className="inline-flex items-center gap-1.5 min-h-[44px] px-2 -mx-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
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
    <section className="work-section work-canvas pt-8 md:pt-14 pb-20 md:pb-28">
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
