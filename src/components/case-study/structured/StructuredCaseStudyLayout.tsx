
import React from "react";
import { motion } from "framer-motion";
import { Hash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnifiedSEO from "@/components/seo/UnifiedSEO";
import CaseStudyContactSection from "../CaseStudyContactSection";
import CaseStudyShareToolbar from "../CaseStudyShareToolbar";
import StructuredCaseStudySection, { StructuredCaseStudySectionProps } from "./StructuredCaseStudySection";
import { EditableVideo } from "./EditableVideo";
import CaseStudyNavigation from "../CaseStudyNavigation";
import ProjectLinks from "@/components/project/ProjectLinks";
import ProjectNavigation from "@/components/ProjectNavigation";
import { getCaseStudyNavItems } from "@/utils/caseStudyNav";
import { useLocation } from "react-router-dom";
import Section3DOverlay from "@/components/transitions/Section3DOverlay";
import { useCaseStudyKeyboardNavigation } from "@/hooks/useCaseStudyKeyboardNavigation";

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
  projectLink?: string;
  gradientClasses?: string;
  showNavigation?: boolean;
  heroAsImage?: boolean;
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  title,
  description,
  tags,
  heroVideo,
  sections,
  projectLink,
  gradientClasses = "from-primary-container/20 to-secondary-container/20",
  showNavigation = true,
  heroAsImage = false
}) => {
  // Get current URL for sharing
  const { pathname } = useLocation();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://barskydesign.pro${pathname}`;

  const navigationItems = sections.map(section => ({
    label: section.title,
    anchor: `#${section.id}`
  }));

  const currentProjectId = React.useMemo(() => {
    const parts = pathname.split('/');
    return parts[parts.length - 1] || '';
  }, [pathname]);

  const projectsData = React.useMemo(() => getCaseStudyNavItems(), []);

  // Build sections for keyboard navigation
  const keyboardSections = React.useMemo(() => {
    const navSections = [
      { id: 'hero-section', title: 'Overview' },
      ...sections.map(section => ({
        id: section.id,
        title: section.title
      })),
      { id: 'contact-section', title: 'Contact' },
      { id: 'project-navigation', title: 'More Projects' }
    ];
    return navSections;
  }, [sections]);

  // Add keyboard navigation
  const {
    isTransitioning,
    transitionDirection,
    transitionVariation,
  } = useCaseStudyKeyboardNavigation(keyboardSections);

  return (
    <>
      {/* Unified SEO - automatically detects page content */}
      <UnifiedSEO />
      
      {/* Hidden meta tags for SEO detection */}
      <meta name="page-title" content={title} />
      <meta name="page-description" content={description} />
      {heroVideo && <meta name="page-image" content={heroVideo.poster} />}

      <div className={`min-h-screen bg-gradient-to-br ${gradientClasses}`}>
        {/* 3D Transition Overlay */}
        <Section3DOverlay 
          isVisible={isTransitioning} 
          direction={transitionDirection}
          variation={transitionVariation}
        />

        <Header />

        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-height,64px)+12px)]">
            <div className={showNavigation ? "lg:grid lg:grid-cols-[16rem,1fr] lg:gap-8" : ""}>
              {/* Desktop sidebar + Mobile FAB navigation */}
              {showNavigation && <CaseStudyNavigation navigation={navigationItems} />}

              {/* Main content column */}
              <div>
                {/* Hero Section */}
                <motion.section
                  id="hero-section"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt-2 mb-8"
                >
                  <Card className="p-8 lg:p-12 bg-card border border-border shadow-elevated">
                    {/* Title and Description */}
                    <div className="text-center mb-8">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                        {title}
                      </h1>
                      <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
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

                    {/* Visit Live Site */}
                    {projectLink && (
                      <div className="flex justify-center mb-8">
                        <ProjectLinks projectLink={projectLink} label="Visit Live Site" variant="outlined" />
                      </div>
                    )}

                    {/* Hero Media */}
                    {heroVideo && (
                      <div className="w-full max-w-4xl mx-auto mb-8" data-hero-image>
                        {heroAsImage ? (
                          <div className="relative w-full max-w-full overflow-hidden rounded-lg shadow-2xl">
                            <img
                              src={heroVideo.poster}
                              alt={heroVideo.alt || 'Project hero image'}
                              className="w-full h-auto max-w-full object-contain"
                              loading="eager"
                              style={{ maxHeight: '70vh' }}
                            />
                          </div>
                        ) : (
                          <EditableVideo
                            src={heroVideo.src}
                            alt={heroVideo.alt}
                            poster={heroVideo.poster}
                            caption="Project demonstration video"
                            className="w-full"
                          />
                        )}
                      </div>
                    )}

                    {/* Share Toolbar - Under Hero Content */}
                    <div className="flex justify-center">
                      <CaseStudyShareToolbar 
                        url={currentUrl}
                        title={title}
                        className="flex-wrap justify-center"
                      />
                    </div>
                  </Card>
                </motion.section>

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
                  id="contact-section"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mt-20"
                >
                  <CaseStudyContactSection />
                </motion.div>

                {/* Share Toolbar - At Bottom */}
                <div className="mt-12 pt-8 border-t border-border/20 flex justify-center">
                  <CaseStudyShareToolbar 
                    url={currentUrl}
                    title={title}
                    className="flex-wrap justify-center"
                  />
                </div>

                {/* Prev/Next Navigation */}
                <div id="project-navigation" className="mt-12">
                  <ProjectNavigation
                    currentProjectId={currentProjectId}
                    projectsData={projectsData}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default StructuredCaseStudyLayout;
