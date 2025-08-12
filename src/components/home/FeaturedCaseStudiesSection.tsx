import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, ExternalLink } from "lucide-react";
import { useScroll3DTilt } from "@/hooks/useScroll3DTilt";

const featuredCaseStudies = [
  {
    id: "herbalink",
    title: "HerbaLink",
    subtitle: "AI-Powered Herbal Medicine Platform",
    description: "Revolutionizing healthcare access by connecting patients with certified herbalists through an intelligent matching system.",
    image: "/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png",
    url: "/project/herbalink",
    category: "Healthcare",
    impact: "40% faster patient-herbalist matching",
    tags: ["AI", "Healthcare", "Mobile App"]
  },
  {
    id: "splittime",
    title: "SplitTime",
    subtitle: "Smart Scheduling Solution",
    description: "Intelligent time management app that eliminates scheduling conflicts through AI-driven optimization.",
    image: "/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png",
    url: "/project/splittime",
    category: "Productivity",
    impact: "65% reduction in scheduling conflicts",
    tags: ["AI", "Productivity", "Scheduling"]
  },
  {
    id: "investor-loan",
    title: "Investor Loan App",
    subtitle: "FinTech Innovation",
    description: "Streamlined loan application platform for real estate investors with automated approval workflows.",
    image: "/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png",
    url: "/project/investor-loan-app",
    category: "FinTech",
    impact: "50% faster loan approval process",
    tags: ["FinTech", "Real Estate", "Automation"]
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
      <Link
        to={study.url}
        className="block rounded-2xl border transition-all duration-300 overflow-hidden transform hover:-translate-y-2 bg-background border-outline/10 hover:border-primary/30 hover:shadow-md"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
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
            <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="font-medium">{study.impact}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
            {study.title}
          </h3>
          <h4 className="text-lg font-medium text-primary mb-3">
            {study.subtitle}
          </h4>
          <p className="text-on-surface-variant mb-4 line-clamp-3 hidden sm:block">
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

          <div className="flex items-center justify-between">
            <div className="flex items-center text-primary font-semibold group-hover:text-primary/90">
              <span>Read Case Study</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const FeaturedCaseStudiesSection: React.FC = () => {
  return (
    <section className="py-12 bg-transparent">
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