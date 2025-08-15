
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/shared/SectionHeader";
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
}

const caseStudies: CaseStudy[] = [
  {
    id: "herbalink",
    tags: ["Health", "Marketplace", "Gen AI"],
    title: "3x More Bookings: How I Connected Users to Certified Herbalists",
    description: "Connected users to certified herbalists across the country and increased booking rates by 3x.",
    impact: "+3x Booking Rate Increase",
    url: "/project/herbalink",
    liveUrl: "https://herbalink.live",
    images: {
      primary: "https://barskyux.com/wp-content/uploads/2025/08/promoimage2.png",
      secondary: "/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png",
      alt: "HerbaLink app showing symptom tracker and herbalist finder"
    },
    layout: "side-by-side"
  },
  {
    id: "splittime",
    tags: ["Family Tech", "iOS→Android", "Legal UX"],
    title: "40% Less Conflict: Designing Neutral Co-Parenting Tools",
    description: "Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools.",
    impact: "-40% Conflict Reduction",
    url: "/project/splittime",
    liveUrl: "https://splittime.pro",
    images: {
      primary: "/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png",
      secondary: "images/desktop-signup-1.png",
      alt: "SplitTime web and mobile views showing scheduling features"
    },
    layout: "web-mobile"
  },
  {
    id: "business-management",
    tags: ["Enterprise", "Analytics", "Dashboard"],
    title: "68% Fewer Errors: Streamlining Enterprise Operations",
    description: "Improved internal operations and reduced manual entry errors by 68% with one central tool.",
    impact: "-68% Manual Entry Errors",
    url: "/project/business-management",
    liveUrl: "https://in-situ-quickbooks-flow.lovable.app/",
    images: {
      primary: "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png",
      secondary: "/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png",
      alt: "Business management app showing driver and inventory management"
    },
    layout: "side-by-side"
  },
  {
    id: "investment-app",
    tags: ["Finance", "Analytics", "Tutorial"],
    title: "23% More Engagement: Making Investing Accessible to Beginners",
    description: "Helped users track, plan, and grow their investments, leading to 23% increase in portfolio engagement.",
    impact: "+23% Engagement Increase",
    url: "/project/investor-loan-app",
    liveUrl: "https://investor-loan-app.com",
    images: {
      primary: "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png",
      alt: "Investment app dashboard showing portfolio management"
    },
    layout: "single-centered"
  }
];

const CaseStudyCard: React.FC<{ study: CaseStudy; index: number }> = ({ study, index }) => {
  const isMobile = useIsMobile();

  const renderImage = () => {
    return (
      <div className="flex justify-center h-full">
        <img 
          src={study.images.primary} 
          alt={study.images.alt}
          className="w-full h-auto object-contain"
        />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-gray-50 overflow-hidden"
    >
      {/* Mobile Layout: Stacked */}
      <div className="lg:hidden">
        {/* Image Section - Full Width on Mobile */}
        <div className="relative bg-gray-50 p-6 min-h-[240px] flex items-center">
          {renderImage()}
        </div>

        {/* Content Section - Same background */}
        <div className="bg-gray-50 p-8 space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-medium rounded-full px-3 py-1">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 leading-tight break-words">
            {study.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed break-words">
            {study.description}
          </p>

          {/* Impact Metrics */}
          <div className="text-2xl font-bold text-primary">
            {study.impact}
          </div>

          {/* CTA Buttons - Both now use outline variant */}
          <div className="flex flex-col gap-3 pt-2">
            <Button asChild variant="outline" className="w-full">
              <Link to={study.url}>
                View Case Study
              </Link>
            </Button>
            {study.liveUrl && (
              <Button asChild variant="outline" className="w-full">
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

      {/* Desktop Layout: Flexible Image-Heavy Split with Smart Alignment */}
      <div className="hidden lg:grid gap-4 xl:gap-5 2xl:gap-5 items-center
                      [grid-template-columns:minmax(0,3fr)_minmax(36%,2fr)]
                      2xl:[grid-template-columns:minmax(0,16fr)_minmax(36%,9fr)]">
        
        {/* Images Section - Flexible height with target guidelines */}
        <div className="relative bg-gray-50 p-4 xl:p-5 2xl:p-6 flex items-center" 
             style={{ marginRight: '-24px' }}>
          <div className="w-full min-h-[480px] xl:min-h-[520px] 2xl:min-h-[560px] flex items-center justify-center">
            {renderImage()}
          </div>
        </div>

        {/* Content Section - Flexible height with minimum padding and width enforcement */}
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
              {study.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-medium rounded-full px-3 py-1">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-2xl lg:text-3xl xl:text-3xl font-bold text-gray-900 leading-tight mb-4 break-words overflow-wrap-anywhere">
              {study.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-4 break-words overflow-wrap-anywhere">
              {study.description}
            </p>

            {/* Impact Metrics */}
            <div className="text-2xl font-bold text-primary mb-6">
              {study.impact}
            </div>

            {/* CTA Buttons - Both now use outline variant */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild variant="outline" className="flex-1 sm:flex-none">
                <Link to={study.url}>
                  View Case Study
                </Link>
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
    </motion.div>
  );
};

const VideoCaseStudiesSection: React.FC = () => {
  return (
    <section id="projects" className="py-12 bg-white">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <SectionHeader
            as="h2"
            title="Case Studies That Drive Results"
            subtitle="Real projects. Measurable outcomes. See how I transform business challenges into digital solutions."
            titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface"
            subtitleClassName="text-lg sm:text-xl md:text-2xl text-on-surface-variant max-w-4xl mx-auto"
          />
        </motion.div>

        {/* Case Studies Grid */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoCaseStudiesSection;
