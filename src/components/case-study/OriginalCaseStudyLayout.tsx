import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import CaseStudyContactSection from "./CaseStudyContactSection";
import { CaseStudyData } from "@/data/caseStudies";
import DynamicSeo from "@/components/seo/DynamicSeo";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseStudyNavigation from "./CaseStudyNavigation";
import ProjectNavigation from "@/components/ProjectNavigation";
import { getCaseStudyNavItems } from "@/utils/caseStudyNav";

interface OriginalCaseStudyLayoutProps {
  caseStudy: CaseStudyData;
  projectId: string;
}

const OriginalCaseStudyLayout: React.FC<OriginalCaseStudyLayoutProps> = ({ 
  caseStudy, 
  projectId 
}) => {
  const projectsData = React.useMemo(() => getCaseStudyNavItems(), []);

  return (
    <>
        <DynamicSeo
          type="project"
          title={caseStudy.title}
          description={caseStudy.description}
          image={caseStudy.videoThumbnail}
          projectName={caseStudy.title}
          results={[]}
          technologies={caseStudy.tags}
          path={`/${projectId}/`}
        />

      <div className="min-h-screen bg-background">
        <Header />

        

        <div className="container mx-auto px-4 pt-[calc(var(--header-height,64px)+12px)] pb-8">
          <div className="flex gap-8">
            <CaseStudyNavigation navigation={caseStudy.stickyNav} />
            {/* Main Content */}
            <main className="flex-1 max-w-4xl">
              <section className="mb-16">
                {/* Branding */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center mb-8"
                >
                  <Link to="/" className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <img 
                      alt="Hiram Barsky" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-border" 
                      src="/lovable-uploads/e52a884d-0e2f-4470-aae9-56e65adb2de0.png" 
                    />
                    <div className="text-left">
                      <div className="text-sm font-medium text-foreground">Hiram Barsky</div>
                      <div className="text-xs text-muted-foreground">Product Designer & Gen AI Developer</div>
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center mb-12"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                    {caseStudy.title}
                  </h1>
                  
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                    {caseStudy.description}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {caseStudy.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-16"
                >
                  <VideoPlayer 
                    videoSrc={caseStudy.video}
                    thumbnailSrc={caseStudy.videoThumbnail}
                    title={caseStudy.title}
                  />
                </motion.div>
              </section>

              {/* Case Study Sections */}
              {Object.entries(caseStudy.sections).map(([sectionId, section]) => {
                const navItem = caseStudy.stickyNav.find(nav => nav.anchor === `#${sectionId}`);
                const title = navItem?.label || sectionId.replace('-', ' ');

                return (
                  <motion.section
                    key={sectionId}
                    id={sectionId}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-20"
                    style={{ scrollMarginTop: 'calc(var(--header-height, 64px) + 16px)' }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-left lg:text-center">
                      {title}
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                          {section.text}
                        </p>
                      </div>
                      
                      <div className="relative">
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-muted-foreground mb-2">Image Placeholder</p>
                              <p className="text-sm text-muted-foreground">{section.image.alt}</p>
                            </div>
                          </div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
                      </div>
                    </div>
                  </motion.section>
                );
              })}

              {/* Contact Section */}
              <CaseStudyContactSection />

              {/* Prev/Next Navigation */}
              <div className="mt-12">
                <ProjectNavigation
                  currentProjectId={projectId}
                  projectsData={projectsData}
                />
              </div>
            </main>

            {/* Desktop Sidebar Navigation */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default OriginalCaseStudyLayout;