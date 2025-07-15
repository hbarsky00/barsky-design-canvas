import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
  tags: string[];
}

interface RelatedProjectsProps {
  currentProjectId: string;
  maxItems?: number;
}

const allCaseStudies: CaseStudy[] = [
  {
    id: "herbalink",
    title: "HerbaLink - Herbal Medicine Platform",
    description: "AI-powered platform connecting patients with certified herbalists for personalized wellness solutions.",
    image: "/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png",
    url: "/case-study-herbalink",
    category: "Healthcare",
    tags: ["AI", "Healthcare", "Mobile App", "UX/UI Design"]
  },
  {
    id: "splittime",
    title: "SplitTime - Smart Scheduling",
    description: "Intelligent time management app that optimizes scheduling and reduces conflicts through AI-driven insights.",
    image: "/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png",
    url: "/case-study-splittime",
    category: "Productivity",
    tags: ["AI", "Productivity", "Scheduling", "Mobile App"]
  },
  {
    id: "investor-loan",
    title: "Investor Loan App - FinTech Solution",
    description: "Streamlined loan application platform for real estate investors with automated approval workflows.",
    image: "/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png",
    url: "/case-study-investor-loan",
    category: "FinTech",
    tags: ["FinTech", "Real Estate", "Web App", "UX/UI Design"]
  },
  {
    id: "wholesale-distribution",
    title: "Wholesale Distribution Platform",
    description: "Enterprise B2B platform streamlining wholesale operations and inventory management.",
    image: "/lovable-uploads/3b9c3f8c-f435-4a25-94fe-f760ae0f4af1.png",
    url: "/case-studies/wholesale-distribution-ai-solution",
    category: "Enterprise",
    tags: ["B2B", "Enterprise", "Distribution", "Web Platform"]
  }
];

const RelatedProjects: React.FC<RelatedProjectsProps> = ({ 
  currentProjectId, 
  maxItems = 3 
}) => {
  // Filter out current project and get related ones
  const relatedProjects = allCaseStudies
    .filter(project => project.id !== currentProjectId)
    .slice(0, maxItems);

  if (relatedProjects.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Related Projects
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore more case studies showcasing innovative design solutions across different industries
          </p>
        </motion.div>

        {/* Mobile: Single column, Tablet: 2 columns, Desktop: 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {relatedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link
                to={project.url}
                className="block bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Hover Icon */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-background/90 backdrop-blur-sm p-1.5 rounded-full">
                      <ExternalLink className="w-4 h-4 text-foreground" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center text-primary font-medium text-sm sm:text-base group-hover:text-primary/80 transition-colors">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RelatedProjects;