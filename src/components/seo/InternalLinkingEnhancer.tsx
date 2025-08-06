import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface InternalLink {
  title: string;
  href: string;
  description: string;
  category: string;
}

interface InternalLinkingEnhancerProps {
  currentPage: string;
  breadcrumbs?: BreadcrumbItem[];
  showRelatedLinks?: boolean;
}

const InternalLinkingEnhancer: React.FC<InternalLinkingEnhancerProps> = ({ 
  currentPage, 
  breadcrumbs = [], 
  showRelatedLinks = true 
}) => {
  // Comprehensive internal linking strategy
  const allInternalLinks: Record<string, InternalLink[]> = {
    home: [
      { title: "View My Portfolio", href: "/projects", description: "Explore featured design projects and case studies", category: "Portfolio" },
      { title: "UX Design Services", href: "/services", description: "Professional design services for startups and enterprises", category: "Services" },
      { title: "Design Process Blog", href: "/blog", description: "Insights on UX design and AI integration", category: "Content" },
      { title: "About My Background", href: "/about", description: "15+ years of product design experience", category: "About" }
    ],
    projects: [
      { title: "HerbaLink Case Study", href: "/project/herbalink", description: "AI-powered healthcare platform design", category: "Healthcare" },
      { title: "SplitTime App Design", href: "/project/splittime", description: "Smart scheduling application UX", category: "Productivity" },
      { title: "FinTech Platform", href: "/project/investor-loan-app", description: "Investment loan application design", category: "FinTech" },
      { title: "Design Services", href: "/services", description: "How I can help your project", category: "Services" }
    ],
    services: [
      { title: "Portfolio Examples", href: "/projects", description: "See my design work in action", category: "Portfolio" },
      { title: "Design Process", href: "/blog", description: "Learn about my methodology", category: "Content" },
      { title: "Get Started", href: "/contact", description: "Discuss your project needs", category: "Contact" },
      { title: "My Background", href: "/about", description: "Experience and expertise", category: "About" }
    ],
    blog: [
      { title: "Case Studies", href: "/projects", description: "Real-world design examples", category: "Portfolio" },
      { title: "Design Services", href: "/services", description: "Professional UX consulting", category: "Services" },
      { title: "Work With Me", href: "/contact", description: "Start your design project", category: "Contact" },
      { title: "Designer Profile", href: "/about", description: "Background and experience", category: "About" }
    ],
    about: [
      { title: "Featured Projects", href: "/projects", description: "Examples of my work", category: "Portfolio" },
      { title: "UX Services", href: "/services", description: "How I can help you", category: "Services" },
      { title: "Design Insights", href: "/blog", description: "Thoughts on design and AI", category: "Content" },
      { title: "Start a Project", href: "/contact", description: "Let's work together", category: "Contact" }
    ],
    contact: [
      { title: "View My Work", href: "/projects", description: "See examples of successful projects", category: "Portfolio" },
      { title: "Service Options", href: "/services", description: "Available design services", category: "Services" },
      { title: "My Approach", href: "/about", description: "Design philosophy and process", category: "About" },
      { title: "Design Resources", href: "/blog", description: "Helpful articles and insights", category: "Content" }
    ]
  };

  const contextualLinks = allInternalLinks[currentPage] || [];

  return (
    <div className="space-y-8">
      {/* Breadcrumbs for better navigation hierarchy */}
      {breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link 
                to="/" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-foreground font-medium">{item.label}</span>
                ) : (
                  <Link 
                    to={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Contextual Internal Links */}
      {showRelatedLinks && contextualLinks.length > 0 && (
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Explore More
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {contextualLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="group block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {link.category}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {link.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default InternalLinkingEnhancer;