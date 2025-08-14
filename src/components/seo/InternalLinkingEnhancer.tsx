
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import { useHomepageKeyboardNavigation } from "@/hooks/useHomepageKeyboardNavigation";

interface InternalLinkingEnhancerProps {
  currentPage: string;
  showRelatedLinks?: boolean;
  breadcrumbs?: Array<{ label: string; href: string; }>;
}

const InternalLinkingEnhancer: React.FC<InternalLinkingEnhancerProps> = ({
  currentPage,
  showRelatedLinks = true,
  breadcrumbs
}) => {
  const { navigateUp, canNavigateUp } = useHomepageKeyboardNavigation();

  const getRelatedLinks = (page: string) => {
    const linkMap: Record<string, Array<{ title: string; url: string; description: string; external?: boolean }>> = {
      home: [
        {
          title: "UX Design Services",
          url: "/services",
          description: "Comprehensive design services for web and mobile applications"
        },
        {
          title: "Case Studies",
          url: "/case-studies",
          description: "Detailed breakdowns of successful design projects"
        },
        {
          title: "Design Blog",
          url: "/blog",
          description: "Insights on design trends, methodologies, and best practices"
        },
        {
          title: "Design Portfolio",
          url: "https://barskydesign.pro",
          description: "Complete portfolio of design work and case studies",
          external: true
        }
      ],
      services: [
        {
          title: "View Case Studies",
          url: "/case-studies",
          description: "See real examples of our design work and results"
        },
        {
          title: "Read Design Blog",
          url: "/blog",
          description: "Learn about design processes and industry insights"
        },
        {
          title: "Contact for Project",
          url: "/#contact",
          description: "Get in touch to discuss your design needs"
        }
      ],
      blog: [
        {
          title: "Design Services",
          url: "/services",
          description: "Professional UX/UI design services"
        },
        {
          title: "Portfolio Projects",
          url: "/case-studies",
          description: "Real-world design case studies and outcomes"
        }
      ]
    };

    return linkMap[page] || [];
  };

  const relatedLinks = showRelatedLinks ? getRelatedLinks(currentPage) : [];

  if (!showRelatedLinks || relatedLinks.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 bg-background relative">
      <div className="container px-4 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore More</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover related content and services that might interest you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {link.title}
                    {link.external ? (
                      <ExternalLink size={16} className="text-muted-foreground" />
                    ) : (
                      <ArrowRight size={16} className="text-muted-foreground" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{link.description}</p>
                  {link.external ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                    >
                      Visit Site
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  ) : (
                    <Link
                      to={link.url}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                    >
                      Learn More
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionNavigation
        onNavigateUp={navigateUp}
        canNavigateUp={canNavigateUp}
        canNavigateDown={false}
        upLabel="Back to FAQ"
      />
    </section>
  );
};

export default InternalLinkingEnhancer;
