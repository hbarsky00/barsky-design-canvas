import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
    title: "3x More Bookings: How I Connected Users to Certified Herbalists",
    description: "Launched an AI-powered symptom tracker integrated with a nationwide herbalist marketplace. The platform delivers personalized matches, instant availability checks, and a seamless booking process that removes friction for both patients and practitioners.",
    impact: "+3x Booking Rate Increase",
    url: "/project/herbalink",
    liveUrl: "https://herbalink.live",
    images: {
      primary: "https://barskyux.com/wp-content/uploads/2025/08/herbalinkpromonew.png",
      secondary: "/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png",
      alt: "HerbaLink app showing symptom tracker and herbalist finder"
    },
    layout: "side-by-side",
    video: "https://barskyux.com/wp-content/uploads/2025/08/social_u3514236419_httpss.mj_.rungHHTkRnoxDQ_have_her_stop_looking_at_7775da4e-d6bf-4b3d-8ad4-6bb240f18e2a_2.mp4"
  },
  {
    id: "splittime",
    tags: ["Family Tech", "iOS→Android", "Legal UX"],
    title: "40% Less Conflict: Designing Neutral Co-Parenting Tools",
    description: "Introduced shared calendars, neutral chat channels, and automated reminders to keep co-parents aligned. By making scheduling transparent and removing emotionally charged communication points, the app helps parents focus on their kids—not disputes.",
    impact: "-40% Conflict Reduction",
    url: "/project/splittime",
    liveUrl: "https://splittime.pro",
    images: {
      primary: "https://barskyux.com/wp-content/uploads/2025/08/mobilepromo.png",
      secondary: "images/desktop-signup-1.png",
      alt: "SplitTime web and mobile views showing scheduling features"
    },
    layout: "web-mobile",
    video: "https://barskyux.com/wp-content/uploads/2025/08/social_u3514236419_httpss.mj_.runZlcCT8sBjuU_coparenting_app_to_help__c63b8a71-d4e2-47ae-b772-394ea1404a5b_1.mp4"
  },
  {
    id: "business-management",
    tags: ["Enterprise", "Analytics", "Dashboard"],
    title: "68% Fewer Errors: Streamlining Enterprise Operations",
    description: "Developed a single dashboard for managing dispatch, inventory, and analytics. This consolidation cut redundant data entry, improved visibility into operations, and sped up decision-making for managers.",
    impact: "-68% Manual Entry Errors",
    url: "/project/business-management",
    liveUrl: "https://in-situ-quickbooks-flow.lovable.app/",
    images: {
      primary: "https://barskyux.com/wp-content/uploads/2025/08/promoimagefull.png",
      secondary: "/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png",
      alt: "Business management app showing driver and inventory management"
    },
    layout: "side-by-side",
    video: "https://barskyux.com/wp-content/uploads/2025/08/social_u3514236419_httpss.mj_.runotBezsgewiQ_transition_this_mockup_i_1dfa0b37-ac57-43c8-962d-5270ac3b12b7_0.mp4"
  },
  {
    id: "investor-loan-app",
    tags: ["FinTech", "Analytics", "WebApp"],
    title: "Redesigning Loans: 85% Fewer Errors, 40% Faster",
    description: "Transformed a chaotic Excel-based loan process into a streamlined digital platform. Built custom analytics dashboards and automated workflows that scaled operations while dramatically reducing manual errors.",
    impact: "-85% Manual Entry Errors",
    url: "/project/investor-loan-app",
    images: {
      primary: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
      alt: "Investor loan app showing analytics dashboard and loan management interface"
    },
    layout: "side-by-side"
  }
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
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
    );
  };

  return (
    <section 
      id="more-work"
      className="section-snap scroll-mt-[calc(var(--header-height,64px)+1rem)] cs-card"
      data-section="more-work"
    >
      <div className="section-container compact-section-spacing">
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
              <div className="text-impact-metric-sm">
                {relatedStudy.impact}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Button asChild size="default">
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