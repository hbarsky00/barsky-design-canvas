
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TemplateLockManager from "./TemplateLockManager";
import SafeSEOManager from "../seo/SafeSEOManager";
import CaseStudyNavigation from "./CaseStudyNavigation";
import CaseStudyContactSection from "./CaseStudyContactSection";
import CaseStudyShareToolbar from "./CaseStudyShareToolbar";
import IdentityBadge from "@/components/shared/IdentityBadge";
import ProjectLinks from "@/components/project/ProjectLinks";
import { StructuredCaseStudy } from "@/data/structuredCaseStudies";

interface StructuredCaseStudyLayoutProps {
  caseStudy: StructuredCaseStudy;
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({ caseStudy }) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://barskydesign.pro/project/${caseStudy.id}`;

  // Create navigation items from standardized sections
  const navigationItems = [
    { label: "Overview", anchor: "#overview" },
    ...caseStudy.sections.map(section => ({
      label: section.title,
      anchor: `#${section.id}`
    }))
  ];

  return (
    <TemplateLockManager templateType="herbalink-case">
      <SafeSEOManager />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50" data-protect="structure">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-[calc(var(--header-height,64px)+12px)]" data-protect="structure">
          <div className="lg:flex lg:gap-8" data-protect="structure">
            {/* LOCK: begin structure (navigation container) */}
            <CaseStudyNavigation navigation={navigationItems} />
            {/* LOCK: end structure */}
            
            {/* LOCK: begin structure (main content wrapper) */}
            <main className="flex-1 min-w-0" data-protect="structure">
              {/* Hero Section */}
              <section id="overview" className="mb-8" data-case-section="hero" data-protect="structure">
                {/* LOCK: begin structure (hero layout) */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center mb-8"
                  data-protect="structure"
                >
                  <IdentityBadge
                    to="/"
                    imageSrc="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
                    name="Hiram Barsky"
                    subtitle="Product Designer & Gen AI Developer"
                    size="md"
                    subtitleStyle="text"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center mb-12"
                  data-protect="structure"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" data-slot="hero-title">
                    {caseStudy.title}
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto" data-slot="hero-description">
                    {caseStudy.description}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-8" data-protect="structure">
                    {caseStudy.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1" data-slot="tag">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {caseStudy.projectLink && (
                    <div className="flex justify-center" data-protect="structure">
                      <ProjectLinks projectLink={caseStudy.projectLink} />
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="max-w-4xl mx-auto mb-8"
                  data-protect="structure"
                >
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg" data-slot="hero-video">
                    <img 
                      src={caseStudy.heroImage} 
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                <div className="mt-6 flex justify-center lg:justify-start" data-protect="structure">
                  <CaseStudyShareToolbar 
                    url={currentUrl}
                    title={caseStudy.title}
                    className="flex-wrap justify-center lg:justify-start"
                  />
                </div>
                {/* LOCK: end structure */}
              </section>

              {/* Standardized Case Study Sections */}
              <div className="space-y-20 pb-20" data-protect="structure">
                {caseStudy.sections.map((section) => (
                  <section 
                    key={section.id} 
                    id={section.id} 
                    className="scroll-mt-24" 
                    data-case-section={section.id} 
                    data-protect="structure"
                  >
                    {/* LOCK: begin structure (section wrapper) */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-12 shadow-sm border border-white/20" data-protect="structure">
                      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-left lg:text-center" data-slot="section-title">
                        {section.title}
                      </h2>
                      
                      <div className="space-y-8" data-protect="structure">
                        {/* Content Text */}
                        <div className="prose prose-lg max-w-none" data-slot="section-content">
                          <p className="text-gray-700 leading-relaxed">
                            {section.content}
                          </p>
                        </div>

                        {/* Images */}
                        {section.images && section.images.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8" data-protect="structure">
                            {section.images.map((image, index) => (
                              <div key={index} className="relative" data-slot="section-image">
                                <img 
                                  src={image} 
                                  alt={`${section.title} illustration ${index + 1}`}
                                  className="w-full rounded-lg shadow-md"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Metrics (for Results section) */}
                        {section.metrics && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8" data-protect="structure" data-slot="results-metric-grid">
                            {section.metrics.map((metric, index) => (
                              <div key={index} className="bg-primary/5 rounded-lg p-6 text-center" data-slot="metric-card">
                                <p className="text-lg font-semibold text-primary">{metric}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Quote (for Results section) */}
                        {section.quote && (
                          <div className="bg-gray-50 rounded-lg p-8 mt-8" data-protect="structure">
                            <blockquote className="text-lg italic text-gray-700 mb-4" data-slot="quote-text">
                              "{section.quote.text}"
                            </blockquote>
                            <cite className="text-gray-600 font-medium" data-slot="quote-author">
                              — {section.quote.author}
                            </cite>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* LOCK: end structure */}
                  </section>
                ))}
                
                <div id="contact-section" data-protect="structure">
                  <CaseStudyContactSection />
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/20 flex justify-center" data-protect="structure">
                  <CaseStudyShareToolbar 
                    url={currentUrl}
                    title={caseStudy.title}
                    className="flex-wrap justify-center"
                  />
                </div>
              </div>
            </main>
            {/* LOCK: end structure */}
          </div>
        </div>
        
        <Footer />
      </div>
    </TemplateLockManager>
  );
};

export default StructuredCaseStudyLayout;
