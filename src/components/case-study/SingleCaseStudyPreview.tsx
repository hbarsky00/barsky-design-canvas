import React from "react";
import { imgDims } from "@/utils/imageDims";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { shouldShowPromoImpact } from "@/utils/promoCopy";
import { caseStudies, CaseStudy } from "@/data/homeCaseStudies";

interface SingleCaseStudyPreviewProps {
  currentProjectId: string;
}

const SingleCaseStudyPreview: React.FC<SingleCaseStudyPreviewProps> = ({ currentProjectId }) => {
  const isMobile = useIsMobile();

  /* Only ever recommend a study that has a page to land on. The old copy of
     this list included SplitTime, whose /project route 301s to the homepage,
     so "Related Case Study" sent readers off the site. */
  const readable = caseStudies.filter(
    (study) => study.hasDetail !== false && study.url.startsWith("/project/")
  );

  /* Hand-authored adjacency, because "the next one along" is not an answer to
     the question a reader has at the end of a case study. They have just
     decided he can think; what they are checking now is whether he has done
     THEIR kind of work. Sequential order answered HerbaLink -- a two-sided
     marketplace about trust between strangers -- with DAE Search, enterprise
     data discovery.

     Pairings are by the problem, not the industry:
       herbalink <-> catchbuddy       trust between strangers is the product
       dae-search -> business-management   enterprise internal tooling
       business-management -> email-creation-ai   workflow and approval gates
       email-creation-ai -> dae-search     large regulated org, complex data

     Anything not listed falls back to the old sequential walk, so adding a
     case study never leaves a page with no next step. */
  const ADJACENT: Record<string, string> = {
    herbalink: "catchbuddy",
    catchbuddy: "herbalink",
    "dae-search": "business-management",
    "business-management": "email-creation-ai",
    "email-creation-ai": "dae-search",
  };

  const getRelatedCaseStudy = (currentId: string): CaseStudy | null => {
    const others = readable.filter((study) => study.id !== currentId);
    if (others.length === 0) return null;

    const preferred = others.find((study) => study.id === ADJACENT[currentId]);
    if (preferred) return preferred;

    const here = readable.findIndex((study) => study.id === currentId);
    return here === -1 ? others[0] : readable[(here + 1) % readable.length];
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
          <img {...imgDims(relatedStudy.images.primary)} 
            src={relatedStudy.images.primary} 
            alt={relatedStudy.images.alt}
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        </div>
      </Link>
    );
  };

  return (
    <section 
      /* id removed 2026-11-17: StructuredCaseStudyLayout already wraps this in
         <section id="more-work">, so both elements carried the same id. Duplicate
         ids are invalid HTML, and getElementById silently resolved to the
         outer one anyway. The outer section is the anchor target. */
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
                      View live
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