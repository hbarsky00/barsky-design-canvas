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
    alt: string;
  };
  layout: "left" | "right";
  video?: string;
}

// Case studies data from homepage
const caseStudies: CaseStudy[] = [
  {
    id: "herbalink",
    tags: ["Telehealth", "E-commerce", "UI/UX"],
    title: "HerbaLink Platform",
    description: "Complete telehealth platform enabling remote consultations with herbal medicine specialists, featuring secure patient management and prescription tracking.",
    impact: "300% increase in patient consultations",
    url: "/project/herbalink",
    liveUrl: "https://herbalink.vercel.app/",
    images: {
      primary: "/herbalink-hero.png",
      alt: "HerbaLink telehealth platform interface"
    },
    layout: "left",
    video: "/herbalink-demo.mp4"
  },
  {
    id: "splittime",
    tags: ["SaaS", "Scheduling", "Enterprise"],
    title: "SplitTime Scheduling App",
    description: "Enterprise scheduling solution that eliminates double-booking conflicts and streamlines team coordination with intelligent calendar management.",
    impact: "85% reduction in scheduling conflicts",
    url: "/project/splittime",
    liveUrl: "https://splittime.vercel.app/",
    images: {
      primary: "/splittime-hero.png",
      alt: "SplitTime scheduling application interface"
    },
    layout: "right",
    video: "/splittime-demo.mp4"
  },
  {
    id: "business-management",
    tags: ["Enterprise", "Dashboard", "Analytics"],
    title: "Business Management Dashboard",
    description: "Comprehensive business intelligence platform providing real-time analytics, performance tracking, and automated reporting for enterprise operations.",
    impact: "40% improvement in operational efficiency",
    url: "/project/business-management",
    liveUrl: "https://business-mgmt.vercel.app/",
    images: {
      primary: "/business-mgmt-hero.png",
      alt: "Business management dashboard interface"
    },
    layout: "left"
  },
  {
    id: "investor-loan-app",
    tags: ["FinTech", "Mobile", "Security"],
    title: "Investor Loan Application",
    description: "Secure loan application platform for investors, featuring automated document processing, risk assessment, and real-time approval workflows.",
    impact: "60% faster loan processing",
    url: "/project/investor-loan-app",
    liveUrl: "https://investor-loans.vercel.app/",
    images: {
      primary: "/investor-loan-hero.png",
      alt: "Investor loan application interface"
    },
    layout: "right"
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
    <section className="section-container section-spacing">
      <div className="content-rail-center mb-8">
        <h2 className="section-title">More Work</h2>
        <p className="section-description">
          Explore another project from my portfolio
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="case-study-card bg-gray-50 overflow-hidden cursor-pointer relative py-12 lg:py-16"
      >
        {/* Mobile Layout: Stacked */}
        <div className="lg:hidden">
          {/* Image Section - Full Width on Mobile */}
          <div className="relative bg-gray-50 p-6 min-h-[240px] flex items-center">
            {renderMedia()}
          </div>

          {/* Content Section */}
          <div className="bg-gray-50 p-8 space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {relatedStudy.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-medium rounded-full px-3 py-1">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 leading-tight break-words">
              {relatedStudy.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed break-words">
              {relatedStudy.description}
            </p>

            {/* Impact Metrics */}
            <div className="text-2xl font-bold text-primary">
              {relatedStudy.impact}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 pt-2">
              <Button asChild variant="outline" className="flex-1">
                <Link to={relatedStudy.url}>
                  View Case Study
                </Link>
              </Button>
              {relatedStudy.liveUrl && (
                <Button asChild variant="outline" className="flex-1">
                  <a 
                    href={relatedStudy.liveUrl} 
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

        {/* Desktop Layout: Flexible Image-Heavy Split */}
        <div className="hidden lg:grid gap-4 xl:gap-5 2xl:gap-5 items-center
                        [grid-template-columns:minmax(0,3fr)_minmax(36%,2fr)]
                        2xl:[grid-template-columns:minmax(0,16fr)_minmax(36%,9fr)]">
          
          {/* Images Section */}
          <div className="relative bg-gray-50 p-4 xl:p-5 2xl:p-6 flex items-center" 
               style={{ marginRight: '-24px' }}>
            <div className="w-full min-h-[480px] xl:min-h-[520px] 2xl:min-h-[560px] flex items-center justify-center">
              {renderMedia()}
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-gray-50 flex flex-col justify-center p-6 xl:p-7 min-w-0" 
               style={{ 
                 paddingLeft: '24px',
                 paddingRight: '24px',
                 wordWrap: 'break-word',
                 whiteSpace: 'normal'
               }}>
            <div className="w-full max-w-[600px] space-y-4 break-words">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {relatedStudy.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs font-medium rounded-full px-3 py-1">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl xl:text-3xl font-bold text-gray-900 leading-tight mb-4 break-words overflow-wrap-anywhere">
                {relatedStudy.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed mb-4 break-words overflow-wrap-anywhere">
                {relatedStudy.description}
              </p>

              {/* Impact Metrics */}
              <div className="text-2xl font-bold text-primary mb-6">
                {relatedStudy.impact}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild variant="outline" className="flex-1 sm:flex-none">
                  <Link to={relatedStudy.url}>
                    View Case Study
                  </Link>
                </Button>
                {relatedStudy.liveUrl && (
                  <Button asChild variant="outline" className="flex-1 sm:flex-none">
                    <a 
                      href={relatedStudy.liveUrl} 
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
      </motion.div>
    </section>
  );
};

export default SingleCaseStudyPreview;