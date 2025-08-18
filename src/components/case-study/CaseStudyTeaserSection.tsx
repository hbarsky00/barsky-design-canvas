import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CaseStudyTeaserSectionProps {
  projectId: string;
}

// Cross-reference mapping for teasers
const teaserMapping: Record<string, string> = {
  "splittime": "herbalink",
  "herbalink": "investor-loan-app", 
  "investor-loan-app": "business-management",
  "business-management": "splittime"
};

const teaserData: Record<string, {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}> = {
  "herbalink": {
    title: "3x More Bookings: How I Connected Users to Certified Herbalists",
    description: "Connected users to certified herbalists across the country and increased booking rates by 3x through AI-powered matching and streamlined UX.",
    tags: ["GenAI", "HealthTech", "iOS", "Android", "WebApp"],
    image: "https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png",
    link: "/project/herbalink"
  },
  "splittime": {
    title: "40% Less Conflict: Designing Neutral Co-Parenting Tools",
    description: "Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools designed for high-stress family situations.",
    tags: ["FamilyTech", "iOS", "Android", "LegalUX", "ConflictReduction"],
    image: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1",
    link: "/project/splittime"
  },
  "investor-loan-app": {
    title: "Redesigning Loans: 85% Fewer Errors, 40% Faster",
    description: "How I led a banking platform redesign that replaced Excel and scaled operations with speed, accuracy, and trust.",
    tags: ["FinTech", "Analytics", "WebApp"],
    image: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
    link: "/project/investor-loan-app"
  },
  "business-management": {
    title: "68% Fewer Errors: Streamlining Enterprise Operations",
    description: "Improved internal operations and reduced manual entry errors by 68% with one central tool.",
    tags: ["Enterprise", "Operations", "WebApp", "Mobile"],
    image: "https://barskyux.com/wp-content/uploads/2025/08/promoimagefull.png",
    link: "/project/business-management"
  }
};

const CaseStudyTeaserSection: React.FC<CaseStudyTeaserSectionProps> = ({ projectId }) => {
  const targetProject = teaserMapping[projectId];
  const teaser = targetProject ? teaserData[targetProject] : null;

  if (!teaser) return null;

  return (
    <section className="py-16 md:py-24 border-t border-neutral-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            More case studies
          </h2>
          <p className="text-muted-foreground">
            Explore another project from my portfolio
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Link 
            to={teaser.link}
            className="group block bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={teaser.image}
                alt={teaser.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {teaser.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title and Description */}
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {teaser.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {teaser.description}
              </p>

              {/* CTA */}
              <div className="flex items-center text-primary font-medium">
                <span className="mr-2">View case study</span>
                <ArrowUpRight 
                  size={16} 
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyTeaserSection;