
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import { useHomepageKeyboardNavigation } from "@/hooks/useHomepageKeyboardNavigation";

interface InternalLinkingEnhancerProps {
  currentPage: string;
  showRelatedLinks?: boolean;
  className?: string;
}

const InternalLinkingEnhancer: React.FC<InternalLinkingEnhancerProps> = ({
  currentPage,
  showRelatedLinks = false,
  className = ""
}) => {
  const { navigateUp, canNavigateUp, isMobile } = useHomepageKeyboardNavigation();

  const relatedLinks = [
    {
      title: "UX Design Services",
      description: "Comprehensive design solutions for modern businesses",
      href: "/services",
      internal: true
    },
    {
      title: "Latest Blog Posts",
      description: "Insights on design, technology, and business growth",
      href: "/blog",
      internal: true
    },
    {
      title: "Case Studies",
      description: "Real projects with measurable results",
      href: "#projects",
      internal: true
    },
    {
      title: "AI-Enhanced Design Process",
      description: "How I leverage AI to deliver better results faster",
      href: "/blog/ai-enhanced-design-process",
      internal: true
    }
  ];

  if (!showRelatedLinks) {
    return null;
  }

  return (
    <section id="internal-linking" className={`py-8 md:py-12 relative ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Explore More Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                {link.internal ? (
                  <Link
                    to={link.href}
                    className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-4" />
                    </div>
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-4" />
                    </div>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Hide navigation arrows on mobile - only show on desktop */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <SectionNavigation
            onNavigateUp={navigateUp}
            canNavigateUp={canNavigateUp}
            canNavigateDown={false}
            upLabel="Previous section"
          />
        </div>
      )}
    </section>
  );
};

export default InternalLinkingEnhancer;
