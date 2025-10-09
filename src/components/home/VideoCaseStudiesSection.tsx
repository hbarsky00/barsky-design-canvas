
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedText from "@/components/AnimatedText";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRoomTransition } from "@/hooks/useRoomTransition";

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
      primary: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae-search/DAE-Project-1.jpg",
      alt: "DAE Search Platform showing enterprise data discovery interface"
    },
    layout: "side-by-side"
  },
  {
    id: "smarterhealth",
    tags: ["Healthcare", "Mobile App", "UX Design"],
    title: "Smarter Health: Helping Patients Stay on Track",
    description: "Designed a healthcare app that simplified medication tracking and appointment management for diabetic patients. One-tap medication logging, seamless device sync, and empathy-driven design increased patient engagement by 3× and improved appointment adherence by 60%.",
    impact: "60% ↑ Appointment Adherence",
    url: "/project/smarterhealth",
    video: "/assets/case-studies/smarter-health/hero-video.mp4",
    images: {
      primary: "/assets/case-studies/smarter-health/og-cover.png",
      alt: "Smarter Health app dashboard with medication tracker"
    },
    layout: "side-by-side"
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
      primary: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/warehouse/heroimage.png?v=1",
      alt: "Business management warehouse operations and inventory tracking system"
    },
    layout: "side-by-side"
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
      alt: "Investor loan application platform showing analytics dashboard"
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
  }
];

const CaseStudyCard: React.FC<{ 
  study: CaseStudy; 
  index: number;
}> = React.memo(({ study, index }) => {
  const isMobile = useIsMobile();
  const { triggerRoomTransition } = useRoomTransition();

  const renderMedia = () => {
    if (study.video) {
      return (
        <div 
          onClick={() => triggerRoomTransition(study.url, study.title)}
          className="block h-full group cursor-pointer"
        >
          <div className="flex justify-center h-full">
            <video 
              src={study.video}
              poster={study.images.primary}
              className="w-full h-auto object-cover object-top transition-transform duration-300 group-hover:scale-105"
              muted
              loop
              playsInline
              style={{ maxWidth: '625px', height: 'auto' }}
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
                e.currentTarget.load();
              }}
            />
          </div>
        </div>
      );
    }
    
    return (
      <div 
        onClick={() => triggerRoomTransition(study.url, study.title)}
        className="block h-full group cursor-pointer"
      >
        <div className="flex justify-center h-full">
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
          <div className="text-impact-metric-md">
            {study.impact}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-3 pt-2">
            <Button 
              variant="case-study" 
              className="flex-1"
              onClick={() => triggerRoomTransition(study.url, study.title)}
            >
              View Case Study
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
              <div className="relative p-4 xl:p-5 2xl:p-6 flex items-center" 
                   style={{ marginRight: '-24px' }}>
                <div className="w-full min-h-[400px] xl:min-h-[440px] 2xl:min-h-[480px] flex items-center justify-center">
                  {renderMedia()}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-center p-5 xl:p-6 min-w-0" 
                   style={{ 
                     paddingLeft: '24px',
                     paddingRight: '24px',
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
                  <div className="text-impact-metric-md mb-4">
                    {study.impact}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button 
                      variant="case-study" 
                      className="flex-1 sm:flex-none"
                      onClick={() => triggerRoomTransition(study.url, study.title)}
                    >
                      View Case Study
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
