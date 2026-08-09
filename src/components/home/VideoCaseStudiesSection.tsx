
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedText from "@/components/AnimatedText";
import { useIsMobile } from "@/hooks/use-mobile";
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

// "fire-lion" pulled 2026-08-07 — Hiram: "were going to work on that
// later." Route/page/content untouched, just off every featured
// surface until it's revisited.
const caseStudies: CaseStudy[] = [
  {
    id: "ring-rival",
    tags: ["AI-Assisted Product", "Mobile Web", "Game Design"],
    title: "Ring-Rival",
    description: "Console boxing feel on the mobile web — distinct AI opponents, AI-generated trash talk, career mode. Built solo with AI as a co-builder.",
    impact: "",
    url: "/project/ring-rival",
    liveUrl: "https://rival.li",
    images: {
      primary: "/images/ringrival-hero-title.png",
      alt: "Ring-Rival mobile boxing gameplay"
    },
    layout: "side-by-side",
    video: "/lovable-uploads/ring-rival-hero.mp4"
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
    video: "/lovable-uploads/catchbuddy-hero.mp4"
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
      primary: "/images/herbalink-promo.png",
      alt: "HerbaLink practitioner booking interface"
    },
    layout: "side-by-side"
  },
  {
    id: "email-creation-ai",
    tags: ["Enterprise", "Gen AI", "Pharma", "Workflow Design"],
    title: "Email Creation AI",
    description: "A self-initiated concept for AI-assisted pharma HCP email production — designed around the approval gates, not around the AI.",
    impact: "",
    url: "/project/email-creation-ai",
    images: {
      primary: "/images/email-ai-promo.png",
      alt: "Email Creation AI workflow"
    },
    layout: "side-by-side",
    video: "/lovable-uploads/email-creation-ai-hero.mp4"
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
    layout: "side-by-side"
  },
  {
    id: "business-management",
    tags: ["Enterprise", "Small Business", "Automation"],
    title: "Blue Sky",
    description: "Unified operations platform for small businesses — cut manual errors 68% by consolidating scheduling, invoicing, and tasks into one dashboard.",
    impact: "",
    url: "/project/business-management",
    liveUrl: "https://in-situ-quickbooks-flow.lovable.app/",
    images: {
      primary: "/images/business-management/hero-three-laptops.jpg",
      alt: "Blue Sky — Customer Management, Product Catalog, and Order Management across three screens"
    },
    layout: "side-by-side"
  }
];

const CaseStudyCard: React.FC<{ 
  study: CaseStudy; 
  index: number;
}> = React.memo(({ study, index }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const showImpact = shouldShowPromoImpact(study.title, study.description, study.impact);

  // Check if we need a placeholder for Smarter Health assets
  const needsPlaceholder = (src?: string) => {
    return src && src.includes('/assets/case-studies/smarter-health/');
  };

  const showPlaceholder = needsPlaceholder(study.video) || needsPlaceholder(study.images.primary);

  const renderMedia = () => {
    if (showPlaceholder) {
      return (
        <div
          onClick={() => navigate(study.url)}
          className="block w-full h-full cursor-pointer"
        >
          <PlaceholderImage title={study.title} className="max-w-[625px] mx-auto" />
        </div>
      );
    }

    if (study.video) {
      return (
        <div
          onClick={() => navigate(study.url)}
          className="block w-full h-full group cursor-pointer"
        >
          <div className="flex w-full justify-center h-full">
            <div className="w-full aspect-video overflow-hidden" style={{ maxWidth: '625px' }}>
              <video
                src={study.video}
                poster={study.images.primary}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                muted
                loop
                playsInline
                onMouseEnter={(e) => {
                  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                    e.currentTarget.play();
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                  e.currentTarget.load();
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    
    return (
      <div
        onClick={() => navigate(study.url)}
        className="block w-full h-full group cursor-pointer"
      >
        <div className="flex w-full justify-center h-full">
          <img
            src={study.images.primary} 
            alt={study.images.alt}
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 625px, 625px"
            style={{ maxWidth: '625px', height: 'auto' }}
          />
        </div>
      </div>
    );
  };

  return (
    <motion.div
      id={`case-study-${index + 1}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="case-study-card overflow-hidden relative"
      tabIndex={-1}
    >
      {/* Mobile Layout: Stacked with Premium Background */}
      <div className="lg:hidden py-8 relative overflow-hidden"
           style={{
             background: `
               linear-gradient(135deg, hsl(220 20% 97%) 0%, hsl(220 25% 95%) 100%),
               radial-gradient(circle at 50% 0%, hsl(231 92% 98% / 0.5) 0%, transparent 50%)
             `,
             border: "1px solid hsl(220 20% 92%)",
             borderRadius: "24px",
             backdropFilter: "blur(8px)"
           }}>
        {/* Image Section - Full Width on Mobile */}
        <div className="relative py-4 min-h-[200px] flex items-center justify-center">
          <div className="w-full max-w-[625px] flex justify-center">
            {renderMedia()}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-medium rounded-full px-3 py-1">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <AnimatedText
            text={study.title}
            tag="h3"
            className="heading-subsection text-gray-900 leading-tight break-words"
            type="word"
            animation="slide"
            delay={300}
            staggerChildren={0.05}
          />

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed break-words">
            {study.description}
          </p>

          {/* Impact Metrics */}
          {showImpact ? (
            <div className="text-impact-metric-md">
              {study.impact}
            </div>
          ) : null}

          {/* CTA Buttons */}
          <div className="flex flex-row gap-3 pt-2">
            <Button asChild variant="case-study" className="flex-1">
              <Link to={study.url}>View Case Study</Link>
            </Button>
            {study.liveUrl && (
              <Button asChild variant="outline" className="flex-1">
                <a 
                  href={study.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  View Live
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout: Full-width background */}
      <div className="hidden lg:block">
        {/* Full-width Premium Background wrapper */}
        <div className="w-screen relative left-1/2 -ml-[50vw] py-8 lg:py-10 overflow-hidden"
             style={{
               background: `
                 linear-gradient(135deg, hsl(220 20% 97%) 0%, hsl(220 25% 95%) 100%),
                 radial-gradient(circle at 20% 50%, hsl(231 92% 98% / 0.3) 0%, transparent 50%),
                 radial-gradient(circle at 80% 50%, hsl(263 85% 98% / 0.2) 0%, transparent 50%)
               `,
               borderTop: "1px solid hsl(220 20% 92%)",
               borderBottom: "1px solid hsl(220 20% 92%)",
             }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            {/* Desktop content grid */}
            <div className="grid gap-4 xl:gap-5 2xl:gap-5 items-center
                            [grid-template-columns:minmax(0,3fr)_minmax(36%,2fr)]
                            2xl:[grid-template-columns:minmax(0,16fr)_minmax(36%,9fr)]">
              
              {/* Images Section */}
              <div className="relative p-4 xl:p-5 2xl:p-6 flex items-center">
                <div className="w-full flex items-center justify-center">
                  {renderMedia()}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-center py-5 xl:py-6 px-6 min-w-0"
                   style={{
                     wordWrap: 'break-word',
                     whiteSpace: 'normal'
                   }}>
                <div className="w-full max-w-[600px] space-y-3 break-words">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {study.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-medium rounded-full px-3 py-1">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <AnimatedText
                    text={study.title}
                    tag="h3"
                    className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight mb-4 break-words whitespace-normal [overflow-wrap:normal] [word-break:normal] [hyphens:none]"
                    type="word"
                    animation="slide"
                    delay={300}
                    staggerChildren={0.05}
                  />

                  {/* Description */}
                  <p className="text-gray-600 text-lg leading-relaxed mb-3 break-words whitespace-normal [overflow-wrap:normal] [word-break:normal] [hyphens:none]">
                    {study.description}
                  </p>

                  {/* Impact Metrics */}
                  {showImpact ? (
                    <div className="text-impact-metric-md mb-4">
                      {study.impact}
                    </div>
                  ) : null}

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button asChild variant="case-study" className="flex-1 sm:flex-none">
                      <Link to={study.url}>View Case Study</Link>
                    </Button>
                    {study.liveUrl && (
                      <Button asChild variant="outline" className="flex-1 sm:flex-none">
                        <a 
                          href={study.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          View Live
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const VideoCaseStudiesSection: React.FC = () => {
  return (
    <section 
      className="py-12 md:py-16 relative overflow-hidden" 
      tabIndex={-1}
      style={{
        background: `
          radial-gradient(circle at 10% 20%, hsl(231 92% 98% / 0.4) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, hsl(263 85% 98% / 0.3) 0%, transparent 50%),
          linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 20% 99%) 100%)
        `
      }}
    >
      {/* Premium Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, hsl(231 92% 95% / 0.1) 0%, transparent 40%)",
            "radial-gradient(circle at 80% 70%, hsl(263 85% 95% / 0.1) 0%, transparent 40%)",
            "radial-gradient(circle at 60% 20%, hsl(231 92% 95% / 0.1) 0%, transparent 40%)",
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.4 }}
        >
          <SectionHeader
            as="h2"
            title="Case Studies That Drive Results"
            subtitle="Real projects. Measurable outcomes. See how I transform business challenges into digital solutions."
            subtitleClassName="max-w-4xl mx-auto"
            titleAnimation="elastic"
            subtitleAnimation="fade"
            titleDelay={0}
            subtitleDelay={0.3}
          />
        </motion.div>

        {/* Case Studies Grid */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard 
              key={study.id} 
              study={study} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoCaseStudiesSection;
