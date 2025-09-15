
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScroll3DTilt } from "@/hooks/useScroll3DTilt";
import { getAnnotationClasses, getResponsiveTruncatedText } from "@/utils/captionStyles";

const featuredCaseStudies = [
  {
    id: "herbalink",
    title: "HerbaLink",
    subtitle: "AI-Powered Herbal Medicine Platform",
    description: "Launched an AI-powered symptom tracker integrated with a nationwide herbalist marketplace. The platform delivers personalized matches, instant availability checks, and a seamless booking process that removes friction for both patients and practitioners.",
    image: "/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png",
    url: "/project/herbalink",
    category: "Healthcare",
    impact: "40% faster patient-herbalist matching",
    tags: ["AI", "Healthcare", "Mobile App"]
  },
  {
    id: "crypto",
    title: "Trading Without Friction",
    subtitle: "Dual-Mode Crypto Trading Platform",
    description: "Crypto platforms force a tradeoff: easy but shallow vs powerful but confusing. Over 60% of beginners quit before their first trade, and nearly 30% of pros churn within 90 days. I designed a dual-mode trading experience that serves both ends.",
    image: "/lovable-uploads/crypto-cover.jpg",
    url: "/project/crypto",
    category: "FinTech", 
    impact: "+35% Conversion · –40% TTF Trade",
    tags: ["Fintech", "Crypto", "Mobile & Web"]
  },
  {
    id: "investor-loan",
    title: "Investor Loan App",
    subtitle: "FinTech Innovation",
    description: "Built beginner-friendly investing tools with guided onboarding, goal tracking, and real-time performance insights. The design demystifies complex financial concepts and keeps users motivated to grow their portfolios.",
    image: "/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png",
    url: "/project/investor-loan-app",
    category: "FinTech",
    impact: "50% faster loan approval process",
    tags: ["FinTech", "Real Estate", "Automation"]
  },
  {
    id: "barskyjoint",
    title: "BarskyJoint",
    subtitle: "Restaurant Ordering Platform",
    description: "Designed a dual-format restaurant ordering system that serves both web and kiosk customers. Features menu clarity, guided customization, and seamless checkout to enhance customer experience and increase average ticket size.",
    image: "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png",
    url: "/project/barskyjoint",
    liveUrl: "https://barskyjoint.com",
    category: "Restaurant Tech",
    impact: "28% higher average ticket size",
    tags: ["Restaurant Tech", "Food Service", "Kiosk Design"]
  },
  {
    id: "business-management",
    title: "Business Management",
    subtitle: "Internal Operations Tool",
    description: "Streamlined internal business operations with automated workflows, centralized data management, and performance tracking. The system reduces manual tasks and provides clear visibility into business processes.",
    image: "/lovable-uploads/business-management-cover.jpg",
    url: "/project/business-management",
    category: "Enterprise",
    impact: "40% reduction in manual tasks",
    tags: ["Enterprise", "Automation", "Analytics"]
  }
];

const FeaturedCard: React.FC<{ study: typeof featuredCaseStudies[number]; index: number }> = ({ study, index }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const { containerStyle } = useScroll3DTilt(cardRef, { maxTilt: 3, yDistance: 12, childParallax: 8 });
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
       className="group"
       style={{ ...containerStyle, transformStyle: 'preserve-3d', willChange: 'transform' }}
     >
       <div className="rounded-2xl border transition-all duration-300 overflow-hidden transform hover:-translate-y-2 bg-white/95 border-gray-200/80 hover:border-primary/30 hover:shadow-lg hover:shadow-gray-200/20">
          {/* Image Section - Clickable */}
          <Link to={study.url} className="block relative overflow-hidden">
            <img
              src={study.image}
              alt={study.title}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {study.category}
              </span>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink className="w-5 h-5 text-on-surface-variant" />
            </div>
            
            {/* Impact Badge */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className={getAnnotationClasses("max-w-none")}>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="font-medium">{getResponsiveTruncatedText(study.impact)}</span>
                </div>
              </div>
            </div>
          </Link>

         {/* Content Section */}
         <div className="p-6">
           {/* Title - Clickable */}
           <Link to={study.url} className="block mb-3">
             <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
               {study.title}
             </h3>
             <h4 className="text-lg font-semibold text-primary">
               {study.subtitle}
             </h4>
           </Link>
           <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 hidden sm:block">
             {study.description}
           </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {study.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
            >
                {tag}
              </span>
            ))}
          </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button asChild variant="case-study">
                <Link to={study.url}>
                  <span>View Case Study</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
             
              {study.liveUrl && (
                <Button asChild variant="outlined">
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
           </div>
         </div>
       </div>
     </motion.div>
  );
};

const FeaturedCaseStudiesSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50/30">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="mx-auto max-w-5xl [text-wrap:balance] text-display-medium font-bold text-on-surface mb-2">
            Featured Case Studies
          </h2>
          <p className="text-title-large text-on-surface-variant max-w-3xl mx-auto">
            Dive deep into real-world projects that showcase the power of AI-enhanced design and user-centered solutions across industries
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6" style={{ perspective: 1200, transformStyle: "preserve-3d" }}>
          {featuredCaseStudies.map((study, index) => (
            <FeaturedCard key={study.id} study={study} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCaseStudiesSection;
