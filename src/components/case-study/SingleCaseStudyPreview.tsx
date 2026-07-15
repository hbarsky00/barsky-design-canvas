import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
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

// Homepage case studies data with actual image URLs
const caseStudies: CaseStudy[] = [
  {
    id: "herbalink",
    tags: ["Health", "Marketplace", "Gen AI"],
    title: "HerbaLink: Verified Herbalists, Designed Around Trust",
    description: "A booking platform where no practitioner is visible until their credentials are verified against an external registry. A guided intake replaces filter panels, and the safe path is the easy path — in a category where bad advice has medical consequences.",
    impact: "Credential-Gated Catalog",
    url: "/project/herbalink",
    liveUrl: "https://herbalink.live",
    images: {
      primary: "/uploads/archive/herbalinkpromonew.png",
      secondary: "/uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png",
      alt: "HerbaLink app showing symptom tracker and herbalist finder"
    },
    layout: "side-by-side",
    video: "/uploads/archive/herbalink-promo.mp4"
  },
  {
    id: "splittime",
    tags: ["Family Tech", "iOS→Android", "Legal UX"],
    title: "SplitTime: Co-Parenting Where Every Message Is Potential Evidence",
    description: "Clear ask → approve / decline / counter-propose → immutable timestamp. Templates strip the emotional charge out of the 80% of co-parenting messages that repeat every week, and the change history is court-ready by design.",
    impact: "Structured Requests, Not Open Chat",
    url: "/project/splittime",
    liveUrl: "https://splittime.pro",
    images: {
      primary: "/uploads/archive/mobilepromo.png",
      secondary: "images/desktop-signup-1.png",
      alt: "SplitTime web and mobile views showing scheduling features"
    },
    layout: "web-mobile",
    video: "/uploads/archive/splittime-promo.mp4"
  },
  // business-management entry removed
  // investor-loan-app entry hidden - data preserved in structuredCaseStudies.ts
];

interface SingleCaseStudyPreviewProps {
  currentProjectId: string;
}

const SingleCaseStudyPreview: React.FC<SingleCaseStudyPreviewProps> = ({ currentProjectId }) => {
  const isMobile = useIsMobile();

  // Select a different case study to show based on current project
  const getRelatedCaseStudy = (currentId: string): CaseStudy | null => {
    const availableStudies = caseStudies.filter(study => study.id !== currentId);
    if (availableStudies.length === 0) return null;
    
    // Cycle through studies based on current project
    const currentIndex = caseStudies.findIndex(study => study.id === currentId);
    const nextIndex = (currentIndex + 1) % caseStudies.length;
    return caseStudies[nextIndex] === caseStudies.find(study => study.id === currentId) 
      ? availableStudies[0] 
      : caseStudies[nextIndex];
  };

  const relatedStudy = getRelatedCaseStudy(currentProjectId);
  const showImpact = relatedStudy
    ? shouldShowPromoImpact(relatedStudy.title, relatedStudy.description, relatedStudy.impact)
    : false;

  if (!relatedStudy) return null;

  const renderMedia = () => {
    if (relatedStudy.video) {
      return (
        <Link to={relatedStudy.url} className="block h-full group">
          <div className="flex justify-center h-full cursor-pointer">
            <video 
              src={relatedStudy.video}
              poster={relatedStudy.images.primary}
              className="w-full h-auto object-cover object-top transition-transform duration-300 group-hover:scale-105"
              muted
              loop
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
                e.currentTarget.load();
              }}
            />
          </div>
        </Link>
      );
    }
    
    return (
      <Link to={relatedStudy.url} className="block h-full group">
        <div className="flex justify-center h-full cursor-pointer">
          <img 
            src={relatedStudy.images.primary} 
            alt={relatedStudy.images.alt}
            width={1200}
            height={675}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
    );
  };

  return (
    <section 
      id="more-work"
      className="section-snap scroll-mt-[calc(var(--header-height,64px)+1rem)] cs-card py-8 md:py-12"
      data-section="more-work"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Eyebrow tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {relatedStudy.tags.map((tag) => (
            <span key={tag} className="text-eyebrow text-primary">
              #{tag}
            </span>
          ))}
        </div>

        {/* Section header */}
        <div className="mb-4">
          <h2 className="text-section-title text-foreground font-display">
            More Work
          </h2>
        </div>

        {/* Content */}
        <div className="mt-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center"
          >
            {/* Image Section */}
            <div className="order-2 lg:order-1">
              <div className="relative bg-muted/20 rounded-xl overflow-hidden min-h-[200px] lg:min-h-[280px] flex items-center justify-center">
                {renderMedia()}
              </div>
            </div>

            {/* Content Section */}
            <div className="order-1 lg:order-2 space-y-4">
              {/* Title */}
              <h3 className="text-subsection-title text-foreground leading-tight font-display">
                {relatedStudy.title}
              </h3>

              {/* Description */}
              <p className="text-base text-muted-foreground leading-relaxed">
                {relatedStudy.description}
              </p>

              {/* Impact Metrics */}
              {showImpact ? (
                <div className="text-impact-metric-sm">
                  {relatedStudy.impact}
                </div>
              ) : null}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Button asChild variant="case-study" size="default">
                  <Link to={relatedStudy.url}>
                    View Case Study
                  </Link>
                </Button>
                {relatedStudy.liveUrl && (
                  <Button asChild variant="outline" size="default">
                    <a 
                      href={relatedStudy.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      View Live Project
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SingleCaseStudyPreview;