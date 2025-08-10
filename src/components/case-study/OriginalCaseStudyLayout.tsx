import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import VideoPlayer from "./VideoPlayer";
import CaseStudyContactSection from "./CaseStudyContactSection";
import { CaseStudyData } from "@/data/caseStudies";
import { Helmet } from "react-helmet-async";
import BackToProjectsFab from "./BackToProjectsFab";

interface OriginalCaseStudyLayoutProps {
  caseStudy: CaseStudyData;
  projectId: string;
}

const OriginalCaseStudyLayout: React.FC<OriginalCaseStudyLayoutProps> = ({ 
  caseStudy, 
  projectId 
}) => {
  const NavigationContent = () => (
    <nav className="space-y-2">
      {caseStudy.stickyNav.map((item) => (
        <a
          key={item.anchor}
          href={item.anchor}
          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(item.anchor)?.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      <Helmet>
        <title>{caseStudy.title} - Case Study | Hiram Barsky</title>
        <meta name="description" content={caseStudy.description} />
        <meta property="og:title" content={`${caseStudy.title} - Case Study`} />
        <meta property="og:description" content={caseStudy.description} />
        <meta property="og:image" content={caseStudy.videoThumbnail} />
        <meta property="og:url" content={`https://hirambarsky.com/project/${projectId}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header with navigation */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div />

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="py-6">
                  <h3 className="font-semibold mb-4">Case Study Sections</h3>
                  <NavigationContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavigationContent />
            </div>
          </div>
        </header>

        <BackToProjectsFab />

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Main Content */}
            <main className="flex-1 max-w-4xl">
              {/* Hero Section */}
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
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
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
            </main>

            {/* Desktop Sidebar Navigation */}
            <aside className="hidden lg:block w-64 sticky top-24 h-fit">
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold mb-4 text-foreground">Case Study Sections</h3>
                <NavigationContent />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default OriginalCaseStudyLayout;