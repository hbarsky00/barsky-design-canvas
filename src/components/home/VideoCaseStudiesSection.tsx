
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
  video?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "daesearchproject",
    tags: ["Enterprise", "Search", "Data Discovery"],
    title: "DAE Search Platform: Making Enterprise Data Actually Findable",
    description: "Redesigned an enterprise search platform that transformed how teams discover and access critical business data. Through semantic search and visual data lineage, we reduced information retrieval time by 65% and delivered measurable ROI.",
    impact: "20% ROI from Better Data Discovery",
    url: "/project/daesearchproject",
    images: {
      primary: "/lovable-uploads/dae-search-poster.jpg",
      alt: "DAE Search Platform showing enterprise data discovery interface"
    },
    layout: "side-by-side",
    video: "/lovable-uploads/dae-search-hero.mp4"
  },
  {
    id: "business-management",
    tags: ["Enterprise", "Small Business", "Automation"],
    title: "Blue Sky: Using Design Thinking to Reduce Enterprise Operation Errors by 68%",
    description: "It's 8:47 AM on a Tuesday, and Sarah Chen is already having the day from hell. She meant to send an invoice to TechCorp but accidentally sent it to her yoga studio client instead. Why? She was juggling Calendly, QuickBooks, Asana, and three spreadsheets—mentally fried from switching between tools. That's when I knew small businesses needed one unified platform, not better individual tools.",
    impact: "68% Fewer Operation Errors",
    url: "/project/business-management",
    liveUrl: "https://in-situ-quickbooks-flow.lovable.app/",
    images: {
      primary: "https://barskyux.com/wp-content/uploads/2025/08/featureimagenew.png",
      alt: "Sarah Chen's unified business management platform eliminating tool chaos"
    },
    layout: "side-by-side"
  },
  {
    id: "herbalink",
    tags: ["Blue Sky", "Design Thinking", "GenAI"],
    title: "HerbaLink: 3× More Bookings for Certified Herbalists",
    description: "I built a discovery and booking platform connecting users with vetted herbalists and reliable resources. The vision centered on credibility—helping users find trusted practitioners while avoiding unverified sources and misinformation.",
    impact: "3× Practitioner Bookings",
    url: "/project/herbalink",
    liveUrl: "https://herbalink.live",
    images: {
      primary: "https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png",
      alt: "HerbaLink practitioner booking interface"
    },
    layout: "side-by-side"
  },
  {
    id: "barskyjoint",
    tags: ["Restaurant Tech", "Food Service", "Kiosk Design"],
    title: "BarskyJoint: 28% Higher Average Ticket Size",
    description: "Designed a dual-format restaurant ordering platform that serves both web and kiosk customers. Features menu clarity, guided customization, seamless checkout, and integrated POS systems to enhance customer experience and operational efficiency.",
    impact: "28% Higher Average Ticket Size",
    url: "/project/barskyjoint",
    liveUrl: "https://barskyjoint.com/",
    images: {
      primary: "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png",
      alt: "BarskyJoint restaurant ordering interface showing menu and kiosk design"
    },
    layout: "web-mobile",
    video: "https://barskyux.com/wp-content/uploads/2025/08/barskyjoint-demo.mp4"
  },
  {
    id: "crypto",
    tags: ["Fintech", "Crypto", "Product Design", "Dual-Mode UX"],
    title: "Trading Without Friction",
    description: "Here's what nobody tells you about crypto apps: they're designed to fail you on purpose. I decided to call bullshit on the entire industry and build something that actually works for everyone. The result: 35% higher conversion and users who don't hate their trading app.",
    impact: "Why Every Crypto App is Designed to Fail (And How I Fixed It)",
    url: "/project/crypto",
    images: {
      primary: "https://barskyux.com/wp-content/uploads/2025/08/CryptoFeatureimage.png",
      alt: "Crypto trading platform exposing industry manipulation and providing honest alternative"
    },
    layout: "side-by-side"
  },
  {
    id: "investor-loan-app",
    tags: ["FinTech", "Investment", "B2B"],
    title: "Investor Platform: 85% Faster Deal Processing",
    description: "Created a comprehensive investment platform that connects investors with loan opportunities. Features include deal analysis, automated underwriting, portfolio management, and real-time market insights that accelerated investment decisions and improved risk assessment.",
    impact: "85% Faster Deal Processing",
    url: "/project/investor-loan-app", 
    images: {
      primary: "https://barskyux.com/wp-content/uploads/2025/08/iMac-24-inch.png",
      alt: "Investment platform showing deal analysis and portfolio management"
    },
    layout: "side-by-side"
  }
];

const CaseStudyCard: React.FC<{ 
  study: CaseStudy; 
  index: number;
}> = ({ study, index }) => {
  const isMobile = useIsMobile();


  const renderMedia = () => {
    if (study.video) {
      return (
        <Link to={study.url} className="block h-full group">
          <div className="flex justify-center h-full cursor-pointer">
            <video 
              src={study.video}
              poster={study.images.primary}
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
      <Link to={study.url} className="block h-full group">
        <div className="flex justify-center h-full cursor-pointer">
          <img 
            src={study.images.primary} 
            alt={study.images.alt}
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
    );
  };

  return (
    <motion.div
      id={`case-study-${index + 1}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="case-study-card bg-gray-50 overflow-hidden relative py-12 lg:py-16"
      tabIndex={-1}
    >
      {/* Mobile Layout: Stacked */}
      <div className="lg:hidden">
        {/* Image Section - Full Width on Mobile - Now Clickable */}
        <div className="relative bg-gray-50 py-6 min-h-[240px] flex items-center">
          {renderMedia()}
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
          <h3 className="heading-subsection text-gray-900 leading-tight break-words">
            {study.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed break-words">
            {study.description}
          </p>

          {/* Impact Metrics */}
          <div className="text-impact-metric-md">
            {study.impact}
          </div>

          {/* CTA Buttons - Updated to two-column layout */}
          <div className="flex flex-row gap-3 pt-2">
            <Button asChild variant="outline" className="flex-1">
              <Link to={study.url}>
                View Case Study
              </Link>
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

      {/* Desktop Layout: Flexible Image-Heavy Split with Smart Alignment */}
      <div className="hidden lg:grid gap-4 xl:gap-5 2xl:gap-5 items-center
                      [grid-template-columns:minmax(0,3fr)_minmax(36%,2fr)]
                      2xl:[grid-template-columns:minmax(0,16fr)_minmax(36%,9fr)]">
        
        {/* Images Section - Flexible height with target guidelines - Now Clickable */}
        <div className="relative bg-gray-50 p-4 xl:p-5 2xl:p-6 flex items-center" 
             style={{ marginRight: '-24px' }}>
          <div className="w-full min-h-[480px] xl:min-h-[520px] 2xl:min-h-[560px] flex items-center justify-center">
            {renderMedia()}
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
            <h3 className="heading-subsection lg:text-3xl xl:text-3xl text-gray-900 leading-tight mb-4 break-words overflow-wrap-anywhere">
              {study.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-4 break-words overflow-wrap-anywhere">
              {study.description}
            </p>

            {/* Impact Metrics */}
            <div className="text-impact-metric-md mb-6">
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
    <section className="py-8 md:py-12 bg-white" tabIndex={-1}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            as="h2"
            title="Case Studies That Drive Results"
            subtitle="Real projects. Measurable outcomes. See how I transform business challenges into digital solutions."
            subtitleClassName="max-w-4xl mx-auto"
          />
        </motion.div>

        {/* Case Studies Grid */}
        <div className="space-y-12">
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
