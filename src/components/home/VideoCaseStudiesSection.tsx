
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/shared/SectionHeader";
import MetricDisplay from "@/components/metrics/MetricDisplay";
import SpotlightCard from "@/components/effects/SpotlightCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRoomTransition } from "@/hooks/useRoomTransition";

interface CaseStudy {
  id: string;
  tags: string[];
  title: string;
  description: string;
  metricValue: string;
  metricLabel: string;
  url: string;
  liveUrl?: string;
  images: {
    primary: string;
    alt: string;
  };
  metricColor?: 'cyan' | 'purple' | 'green';
}

const caseStudies: CaseStudy[] = [
  {
    id: "daesearchproject",
    tags: ["Enterprise", "Search", "Data Discovery"],
    title: "DAE Search Platform: Making Enterprise Data Actually Findable",
    description: "Redesigned an enterprise search platform that transformed how teams discover and access critical business data. Through semantic search and visual data lineage, we reduced information retrieval time by 65% and delivered measurable ROI.",
    metricValue: "20%",
    metricLabel: "ROI from Better Data Discovery",
    url: "/project/daesearchproject",
    images: {
      primary: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae-search/DAE-Project-1.jpg",
      alt: "DAE Search Platform showing enterprise data discovery interface"
    },
    metricColor: 'cyan',
  },
  {
    id: "smarterhealth",
    tags: ["Healthcare", "Mobile App", "UX Design"],
    title: "Smarter Health: Helping Patients Stay on Track",
    description: "Designed a healthcare app that simplified medication tracking and appointment management for diabetic patients. One-tap medication logging, seamless device sync, and empathy-driven design increased patient engagement by 3× and improved appointment adherence by 60%.",
    metricValue: "60%",
    metricLabel: "Increase in Appointment Adherence",
    url: "/project/smarterhealth",
    images: {
      primary: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/smarterhealth/frontpage.png",
      alt: "Smarter Health app dashboard with medication tracker"
    },
    metricColor: 'green',
  },
  {
    id: "business-management",
    tags: ["Enterprise", "Small Business", "Automation"],
    title: "Blue Sky: Using Design Thinking to Reduce Enterprise Operation Errors by 68%",
    description: "Small business owners waste 23% of their week switching between disconnected tools—leading to costly errors and mental fatigue. I designed a unified operations platform that consolidates invoicing, scheduling, and task management into one intuitive system.",
    metricValue: "68%",
    metricLabel: "Fewer Operation Errors",
    url: "/project/business-management",
    liveUrl: "https://in-situ-quickbooks-flow.lovable.app/",
    images: {
      primary: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/warehouse/heroimage.png?v=1",
      alt: "Business management warehouse operations and inventory tracking system"
    },
    metricColor: 'purple',
  },
  {
    id: "herbalink",
    tags: ["Blue Sky", "Design Thinking", "GenAI"],
    title: "HerbaLink: 3× More Bookings for Certified Herbalists",
    description: "I built a discovery and booking platform connecting users with vetted herbalists and reliable resources. The vision centered on credibility—helping users find trusted practitioners while avoiding unverified sources and misinformation.",
    metricValue: "3×",
    metricLabel: "Increase in Practitioner Bookings",
    url: "/project/herbalink",
    liveUrl: "https://herbalink.live",
    images: {
      primary: "https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png",
      alt: "HerbaLink practitioner booking interface"
    },
    metricColor: 'cyan',
  }
];

const CaseStudyCard: React.FC<{ 
  study: CaseStudy; 
  index: number;
}> = React.memo(({ study, index }) => {
  const isMobile = useIsMobile();
  const { triggerRoomTransition } = useRoomTransition();
  
  const colors: ('cyan' | 'purple' | 'green')[] = ['cyan', 'purple', 'green'];
  const color = study.metricColor || colors[index % colors.length];
  
  const spotlightColor = color === 'cyan' ? 'hsl(180 100% 50%)' : 
                         color === 'purple' ? 'hsl(270 100% 65%)' : 'hsl(142 76% 45%)';

  return (
    <motion.div
      id={`case-study-${index + 1}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      tabIndex={-1}
    >
      <SpotlightCard
        className="rounded-2xl"
        radius={200}
        color={spotlightColor}
        intensity={0.08}
      >
        <div 
          className="p-6 sm:p-8 rounded-2xl border border-terminal-border-dim/30 
                     backdrop-blur-sm transition-all duration-300"
          style={{
            background: `
              linear-gradient(135deg, hsl(var(--terminal-surface) / 0.8) 0%, hsl(var(--terminal-bg) / 0.6) 100%)
            `,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Content side - Metric First */}
            <div className="order-2 lg:order-1 space-y-5">
              {/* Big Neon Metric */}
              <MetricDisplay
                value={study.metricValue}
                label={study.metricLabel}
                size="lg"
                color={color}
              />
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="text-xs font-mono bg-terminal-surface/50 border-terminal-border-dim/50 
                               text-muted-foreground hover:border-neon-cyan/30"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              {/* Title */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground leading-tight">
                {study.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-base leading-relaxed">
                {study.description}
              </p>
              
              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  onClick={() => triggerRoomTransition(study.url, study.title)}
                  className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-cyan-glow hover:to-neon-purple-glow 
                             text-terminal-bg font-semibold px-6"
                >
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                {study.liveUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-terminal-border-dim/50 hover:border-neon-cyan/50 hover:bg-terminal-surface/50"
                  >
                    <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                      View Live
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
            
            {/* Image side */}
            <div 
              className="order-1 lg:order-2 cursor-pointer group"
              onClick={() => triggerRoomTransition(study.url, study.title)}
            >
              <div className="relative rounded-xl overflow-hidden border border-terminal-border-dim/20">
                <img
                  src={study.images.primary}
                  alt={study.images.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  style={{ maxWidth: '625px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
});

const VideoCaseStudiesSection: React.FC = () => {
  return (
    <section 
      className="py-16 md:py-24 relative overflow-hidden" 
      tabIndex={-1}
      style={{
        background: `
          radial-gradient(circle at 10% 20%, hsl(var(--neon-cyan) / 0.03) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, hsl(var(--neon-purple) / 0.03) 0%, transparent 40%),
          linear-gradient(180deg, hsl(var(--terminal-bg)) 0%, hsl(220 25% 8%) 100%)
        `
      }}
    >
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-cyan) / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-cyan) / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Case Studies That Drive{' '}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Results
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real projects. Measurable outcomes. See how I transform business challenges into digital solutions.
          </p>
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
