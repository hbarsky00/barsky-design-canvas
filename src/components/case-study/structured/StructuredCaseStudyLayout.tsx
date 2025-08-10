import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Hash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";
import CaseStudyContactSection from "../CaseStudyContactSection";
import StructuredCaseStudySection, { StructuredCaseStudySectionProps } from "./StructuredCaseStudySection";
import { EditableVideo } from "./EditableVideo";

interface StructuredCaseStudyLayoutProps {
  title: string;
  description: string;
  tags: string[];
  heroVideo?: {
    src: string;
    poster: string;
    alt: string;
  };
  sections: StructuredCaseStudySectionProps[];
  gradientClasses?: string;
  seoData?: {
    image: string;
    projectName: string;
    results: string[];
    technologies: string[];
    path: string;
  };
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  title,
  description,
  tags,
  heroVideo,
  sections,
  gradientClasses = "from-primary-container/20 to-secondary-container/20",
  seoData
}) => {
  const navigationItems = sections.map(section => ({
    label: section.title,
    anchor: `#${section.id}`
  }));

  const scrollToSection = (anchor: string) => {
    const element = document.querySelector(anchor) as HTMLElement | null;
    if (element) {
      const rootStyles = getComputedStyle(document.documentElement);
      const headerHeight = parseInt(rootStyles.getPropertyValue('--header-height')) || 64;
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 16);
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* SEO */}
      {seoData && (
        <DynamicSeo
          type="project"
          title={`${title} | Case Study`}
          description={description}
          image={seoData.image}
          projectName={seoData.projectName}
          results={seoData.results}
          technologies={seoData.technologies}
          path={seoData.path}
        />
      )}

      <div className={`min-h-screen bg-gradient-to-br ${gradientClasses}`}>
        <Header />
        <div className="px-4 sm:px-6 max-w-7xl mx-auto" style={{ paddingTop: 'calc(var(--header-height, 64px) + 16px)' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link to="/projects">
              <Button variant="text" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </motion.div>
        </div>

        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <Card className="p-8 lg:p-12 bg-surface/80 backdrop-blur-sm border-outline/20">
                {/* Title and Description */}
                <div className="text-center mb-8">
                  <h1 className="text-display-large font-bold text-on-surface mb-6 leading-tight">
                    {title}
                  </h1>
                  <p className="text-headline-small text-on-surface-variant max-w-4xl mx-auto leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      <Hash className="h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Hero Video */}
                {heroVideo && (
                  <div className="max-w-4xl mx-auto">
                    <EditableVideo
                      src={heroVideo.src}
                      alt={heroVideo.alt}
                      poster={heroVideo.poster}
                      caption="Project demonstration video"
                      className="w-full"
                    />
                  </div>
                )}
              </Card>
            </motion.section>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky z-10 mb-12" style={{ top: 'calc(var(--header-height, 64px) + 12px)' }}
            >
              <Card className="p-4 bg-surface/95 backdrop-blur-sm border-outline/20">
                <nav className="flex flex-wrap justify-center gap-3">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.anchor}
                      variant="text"
                      size="sm"
                      onClick={() => scrollToSection(item.anchor)}
                      className="text-body-medium hover:bg-primary-container/50 transition-colors"
                    >
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </Card>
            </motion.div>

            {/* Case Study Sections */}
            <div className="space-y-16">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <StructuredCaseStudySection {...section} />
                </motion.div>
              ))}
            </div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20"
            >
              <CaseStudyContactSection />
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default StructuredCaseStudyLayout;