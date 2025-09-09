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
    url: "/project/herbalink",
    category: "Healthcare",
    tags: ["AI", "Healthcare", "Mobile App", "UX/UI Design"]
  },
  {
    id: "barskyjoint",
    title: "BarskyJoint - Restaurant Ordering",
    description: "Dual-format restaurant platform that increased average ticket size by 28% through menu clarity and guided customization.",
    image: "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png",
    url: "/project/barskyjoint",
    category: "Restaurant Tech",
    tags: ["Restaurant Tech", "Food Service", "Kiosk Design", "Mobile App"]
  },
  {
    id: "investor-loan",
    title: "Investor Loan App - FinTech Solution",
    description: "Streamlined loan application platform for real estate investors with automated approval workflows.",
    image: "/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png",
    url: "/project/investor-loan-app",
    category: "FinTech",
    tags: ["FinTech", "Real Estate", "Web App", "UX/UI Design"]
  },
  {
    id: "business-management",
    title: "Business Management App",
    description: "Improved internal operations and reduced manual entry errors by 68% with one central tool.",
    image: "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png",
    url: "/project/business-management",
    category: "Enterprise",
    tags: ["Enterprise", "CRM", "Dashboard"]
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
    <section className="py-8 md:py-12 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="mx-auto max-w-5xl [text-wrap:balance] text-display-medium font-bold text-on-surface mb-2 font-display">
            Related Projects
          </h2>
          <p className="text-title-large text-on-surface-variant max-w-2xl mx-auto">
            Explore more case studies showcasing innovative design solutions across different industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={project.url}
                className="group block rounded-2xl border transition-all duration-300 overflow-hidden bg-background border-outline/10 hover:border-primary/30 hover:shadow-md"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-5 h-5 text-on-surface-variant" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors font-display">
                    {project.title}
                  </h3>
                  <p className="text-on-surface-variant mb-4 line-clamp-2 hidden sm:block">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-primary font-medium group-hover:text-primary/90">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RelatedProjects;