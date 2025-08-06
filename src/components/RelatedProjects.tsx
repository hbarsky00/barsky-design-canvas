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
    id: "splittime",
    title: "SplitTime - Smart Scheduling",
    description: "Intelligent time management app that optimizes scheduling and reduces conflicts through AI-driven insights.",
    image: "/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png",
    url: "/project/splittime",
    category: "Productivity",
    tags: ["AI", "Productivity", "Scheduling", "Mobile App"]
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
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Related Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore more case studies showcasing innovative design solutions across different industries
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
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