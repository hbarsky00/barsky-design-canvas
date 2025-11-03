import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseStudyContactSection from "../CaseStudyContactSection";
import CaseStudyShareToolbar from "../CaseStudyShareToolbar";
import CaseStudyNavigation from "../CaseStudyNavigation";
import { useProjectPageDetection } from "@/hooks/useProjectPageDetection";
import { StructuredCaseStudyData, ImageAnnotation } from "@/data/structuredCaseStudies";
import UnifiedCaseStudyHero from "./UnifiedCaseStudyHero";
import MaximizableImage from "@/components/project/MaximizableImage";
import StructuredCaseStudySection from "./StructuredCaseStudySection";
import StructuredCaseStudyOverview from "./StructuredCaseStudyOverview";
import ProblemCallout from "../ProblemCallout";
import KeyInsightsRow from "../KeyInsightsRow";
import ResearchSectionTwoCol from "../ResearchSectionTwoCol";
import IdeationSection from "../IdeationSection";
import IterationsSection from "../IterationsSection";
import MyThoughtProcessSection from "../MyThoughtProcessSection";
import WhatDidntWorkSection from "../WhatDidntWorkSection";
import SprintZeroSection from "../SprintZeroSection";
import SingleCaseStudyPreview from "../SingleCaseStudyPreview";
import AnnotatedImage from "../AnnotatedImage";
import ProjectImageCarousel from "@/components/project/ProjectImageCarousel";
import ProjectVideo from "@/components/project/ProjectVideo";
import ClientTestimonialSection from "../ClientTestimonialSection";
import ProjectContextSection from "../ProjectContextSection";
import PostLaunchSection from "../PostLaunchSection";
import TechnicalImplementationSection from "../TechnicalImplementationSection";
import { Badge } from "@/components/ui/badge";
import PrototypeSessionCard from "../PrototypeSessionCard";
import HeadingHierarchy from "@/components/seo/HeadingHierarchy";
import StrategicDecisionsSection from "../StrategicDecisionsSection";
import AICollaborationSection from "../AICollaborationSection";
import DistributionDesignSection from "../DistributionDesignSection";
import OperationalArtifactsSection from "../OperationalArtifactsSection";
import SystemsBuiltSection from "../SystemsBuiltSection";
import CustomerVoiceCard from "../CustomerVoiceCard";
import CustomerInputCard from "../CustomerInputCard";
import OutcomeSection from "../OutcomeSection";


interface StructuredCaseStudyLayoutProps {
  caseStudyData: StructuredCaseStudyData;
  heroAsImage?: boolean;
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  caseStudyData,
  heroAsImage = false
}) => {
  const isProjectPage = useProjectPageDetection();
  
  // Helper function to get images from a specific section
  const getSectionImages = (sectionId: string) => {
    const section = caseStudyData.sections.find(s => s.id === sectionId);
    return section?.images || [];
  };
  
  // Get current URL for sharing with safety check
  const currentUrl = typeof window !== 'undefined' && window.location 
    ? window.location.href 
    : `https://barskydesign.pro${caseStudyData.seoData?.path || ''}`;

  // Create navigation items from sections in correct order
  const navigationItems = [
    { label: "Hero", anchor: "#hero" },
    { label: "Overview", anchor: "#overview" },
    ...(caseStudyData.researchSection ? [{ label: "Research", anchor: "#research" }] : []),
    ...(caseStudyData.problemCallout ? [{ label: "Problem", anchor: "#problem" }] : []),
    ...(caseStudyData.sprintZeroSection ? [{ label: "Sprint Zero", anchor: "#sprint-zero" }] : []),
    ...(caseStudyData.keyInsights ? [{ label: "Key Insights", anchor: "#key-insights" }] : []),
    ...(caseStudyData.myThoughtProcessSection ? [{ label: "My Thought Process", anchor: "#my-thought-process" }] : []),
    ...(caseStudyData.ideationSection ? [
      { label: "Ideation", anchor: "#ideation" }
    ] : []),
    ...(caseStudyData.whatDidntWorkSection ? [{ label: "What Didn't Work", anchor: "#what-didnt-work" }] : []),
    ...(caseStudyData.userTestingSection ? [{ label: "Validation & Testing", anchor: "#user-testing" }] : []),
    ...(caseStudyData.finalProductSection ? [{ label: "The Result", anchor: "#the-final-product" }] : []),
    ...(caseStudyData.outcomeSection ? [{ label: "Outcome & Impact", anchor: "#outcome-results" }] : []),
    ...(caseStudyData.postLaunchSection ? [{ label: "What Happened Next", anchor: "#post-launch" }] : []),
    ...(caseStudyData.technicalImplementation ? [{ label: "Technical Implementation", anchor: "#technical" }] : []),
    ...(caseStudyData.strategicDecisions ? [{ label: "Strategic Decisions", anchor: "#strategic-decisions" }] : []),
    ...(caseStudyData.aiCollaboration ? [{ label: "AI Collaboration", anchor: "#ai-collaboration" }] : []),
    ...(caseStudyData.distributionDesign ? [{ label: "Growth Design", anchor: "#distribution" }] : []),
    ...(caseStudyData.operationalArtifacts ? [{ label: "Operational Artifacts", anchor: "#ops" }] : []),
    ...(caseStudyData.systemsBuilt ? [{ label: "Systems Built", anchor: "#systems" }] : []),
    { label: "More Work", anchor: "#more-work" }
  ];


  return (
    <>
      {/* SEO is now handled globally by UnifiedSEO in App.tsx */}
      
      <div className={`min-h-screen bg-white ${isProjectPage ? 'projects-page' : ''}`}>
        <Header />
        
        {/* Mobile Sticky Navigation */}
        <CaseStudyNavigation 
          navigation={navigationItems}
        />
        
        <main className={`${isProjectPage ? "projects-wrap" : ""} pt-[calc(var(--header-height,64px)+16px)] pb-28 md:pb-0`}>
          <div className="section-container bg-white">
          {/* Unified Hero Section */}
          <UnifiedCaseStudyHero 
            caseStudyData={caseStudyData}
            heroAsImage={heroAsImage}
          />
          </div>

          {/* Project Context Section */}
          {caseStudyData.projectContext && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <ProjectContextSection context={caseStudyData.projectContext} />
            </div>
          )}

          {/* Client Testimonial Section */}
          {caseStudyData.clientTestimonial && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <ClientTestimonialSection testimonial={caseStudyData.clientTestimonial} />
            </div>
          )}

          {/* Overview Section - Full width band */}
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-slate-50">
            <section id="overview" data-section="overview" aria-labelledby="overview-heading" className="section-snap py-12 scroll-mt-[calc(var(--header-height,64px)+1rem)]">
              <HeadingHierarchy level="h2" id="overview-heading" className="sr-only">Overview Section</HeadingHierarchy>
              <StructuredCaseStudyOverview projectId={caseStudyData.id} />
            </section>
          </div>

          <div className="section-container bg-white">

          {/* Research Section */}
          {caseStudyData.researchSection && (
            <section id="research" data-section="research" aria-labelledby="research-heading" className="section-snap mb-12 scroll-mt-[calc(var(--header-height,64px)+1rem)]">
              <HeadingHierarchy level="h2" id="research-heading" className="sr-only">Research Section</HeadingHierarchy>
              <ResearchSectionTwoCol researchSection={caseStudyData.researchSection} />
            </section>
          )}

          {/* Problem Callout Section - Full width band */}
          {caseStudyData.problemCallout && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-muted/50">
              <section id="problem" data-section="problem" aria-labelledby="problem-heading" className="section-snap py-12 md:py-16 scroll-mt-[calc(var(--header-height,64px)+1rem)]">
                <HeadingHierarchy level="h2" id="problem-heading" className="sr-only">Problem Section</HeadingHierarchy>
                <ProblemCallout
                  eyebrow={caseStudyData.problemCallout.eyebrow}
                  statement={caseStudyData.problemCallout.statement}
                />
              </section>
            </div>
          )}

          {/* Sprint Zero Section */}
          {caseStudyData.sprintZeroSection && (
            <SprintZeroSection
              eyebrow={caseStudyData.sprintZeroSection.eyebrow}
              title={caseStudyData.sprintZeroSection.title}
              workshopKickoff={caseStudyData.sprintZeroSection.workshopKickoff}
              explorations={caseStudyData.sprintZeroSection.explorations}
              decisionPoint={caseStudyData.sprintZeroSection.decisionPoint}
              images={caseStudyData.sprintZeroSection.images}
            />
          )}

          {/* Key Insights Section */}
          {caseStudyData.keyInsights && (
            <section id="key-insights" data-section="key-insights" aria-labelledby="key-insights-heading" className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+1rem)]">
              <HeadingHierarchy level="h2" id="key-insights-heading" className="sr-only">Key Insights Section</HeadingHierarchy>
              <KeyInsightsRow insights={caseStudyData.keyInsights} video={caseStudyData.keyInsightsVideo} />
            </section>
          )}

          {/* My Thought Process Section */}
          {caseStudyData.myThoughtProcessSection && (
            <section 
              id="my-thought-process" 
              data-section="my-thought-process" 
              aria-labelledby="my-thought-process-heading" 
              className="section-snap scroll-mt-[calc(var(--header-height,64px)+1rem)]"
            >
              <HeadingHierarchy level="h2" id="my-thought-process-heading" className="sr-only">My Thought Process Section</HeadingHierarchy>
              <MyThoughtProcessSection 
                content={caseStudyData.myThoughtProcessSection.content}
                video={caseStudyData.myThoughtProcessSection.video}
                images={caseStudyData.myThoughtProcessSection.images || []}
              />
            </section>
          )}

          {/* Ideation Section - Full width band - Now appears after My Thought Process */}
          {caseStudyData.ideationSection && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-muted/50">
              <section id="ideation" data-section="ideation" aria-labelledby="ideation-heading" className="section-snap py-12 md:py-16 scroll-mt-[calc(var(--header-height,64px)+1rem)]">
                <HeadingHierarchy level="h2" id="ideation-heading" className="sr-only">Ideation Section</HeadingHierarchy>
                <IdeationSection ideationData={caseStudyData.ideationSection} />
              </section>
            </div>
          )}

          {/* Individual Iterations Sections */}
          {caseStudyData.ideationSection && (
            <IterationsSection iterations={caseStudyData.ideationSection.iterations} />
          )}

          {/* What Didn't Work Section */}
          {caseStudyData.whatDidntWorkSection && (
            <section 
              id="what-didnt-work" 
              data-section="what-didnt-work" 
              aria-labelledby="what-didnt-work-heading" 
              className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+1rem)]"
            >
              <HeadingHierarchy level="h2" id="what-didnt-work-heading" className="sr-only">What Didn't Work Section</HeadingHierarchy>
              <WhatDidntWorkSection whatDidntWorkData={caseStudyData.whatDidntWorkSection} />
            </section>
          )}

          {/* User Testing Section - Same styling as Outcome section */}
          {caseStudyData.userTestingSection && (
            <section 
              id="user-testing" 
              data-section="user-testing" 
              aria-labelledby="user-testing-heading" 
              className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+1rem)]"
            >
              <HeadingHierarchy level="h2" id="user-testing-heading" className="sr-only">{caseStudyData.userTestingSection.title} Section</HeadingHierarchy>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-12 text-center"
              >
                <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-eyebrow text-purple-700 header-spacing">
                  {caseStudyData.userTestingSection.eyebrow || "VALIDATION & TESTING"}
                </div>
                <HeadingHierarchy level="h3" className="text-section-title text-foreground font-display content-rail-center">
                  {caseStudyData.userTestingSection.title}
                </HeadingHierarchy>
              </motion.div>

              {/* Video if present */}
              {caseStudyData.userTestingSection.video && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="mb-8"
                >
                  <ProjectVideo
                    src={caseStudyData.userTestingSection.video.src}
                    title={caseStudyData.userTestingSection.video.title}
                    caption={caseStudyData.userTestingSection.video.caption}
                    projectId={caseStudyData.id}
                    className="rounded-lg shadow-sm"
                    hoverToPlay={true}
                    showControls={false}
                  />
                </motion.div>
              )}

              <div className="content-rail-left mb-8 space-y-6">
                {caseStudyData.userTestingSection.description.split('\n\n').map((paragraph, index) => {
                  const isPrototypeSession = 
                    paragraph.startsWith('Prototype sessions') ||
                    paragraph.toLowerCase().includes('prototype testing showed') ||
                    paragraph.toLowerCase().includes('tested with') ||
                    paragraph.toLowerCase().includes('testing showed') ||
                    paragraph.toLowerCase().includes('results:');
                  
                  if (isPrototypeSession) {
                    return (
                      <PrototypeSessionCard
                        key={index}
                        content={paragraph}
                      />
                    );
                  }
                  
                  return (
                    <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Display dynamic metrics */}
              {caseStudyData.userTestingSection.metrics && caseStudyData.userTestingSection.metrics.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {caseStudyData.userTestingSection.metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center p-6 bg-white rounded-lg shadow-sm border border-border/20"
                    >
                      <div className="text-impact-metric-lg mb-2">
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Display user testing images */}
              {caseStudyData.userTestingSection.images && (
                <div className="grid gap-6 md:gap-8">
                  {caseStudyData.userTestingSection.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-lg overflow-hidden shadow-sm border border-border/20"
                    >
                      <MaximizableImage
                        src={image.src}
                        alt={image.alt}
                        caption={image.caption}
                        className="w-full h-auto object-contain image-high-quality"
                        imageList={caseStudyData.userTestingSection?.images?.map(img => img.src)}
                        currentIndex={index}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Dynamic Final Product Section */}
          {caseStudyData.finalProductSection && (
            <section 
              id="the-final-product" 
              data-section="the-final-product" 
              aria-labelledby="final-product-heading" 
              className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+1rem)]"
            >
              <HeadingHierarchy level="h2" id="final-product-heading" className="sr-only">{caseStudyData.finalProductSection.title} Section</HeadingHierarchy>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-12 text-center"
              >
                <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-eyebrow text-green-700 header-spacing">
                  {caseStudyData.finalProductSection.eyebrow || "THE RESULT"}
                </div>
                <HeadingHierarchy level="h3" className="text-section-title text-foreground font-display content-rail-center">
                  {caseStudyData.finalProductSection.title}
                </HeadingHierarchy>
              </motion.div>

              <div className="content-rail-left mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {caseStudyData.finalProductSection.description}
                </p>
              </div>

              {/* Render video if present, otherwise render images */}
              {caseStudyData.finalProductSection.video ? (
                <ProjectVideo
                  src={caseStudyData.finalProductSection.video.src}
                  title={caseStudyData.finalProductSection.video.title}
                  caption={caseStudyData.finalProductSection.video.caption}
                  className="mb-8"
                  projectId={caseStudyData.id}
                />
              ) : caseStudyData.finalProductSection.images && (
                caseStudyData.finalProductSection.images.length > 3 ? (
                  <ProjectImageCarousel
                    images={caseStudyData.finalProductSection.images.map(img => img.src)}
                    imageCaptions={caseStudyData.finalProductSection.images.reduce((acc, img) => {
                      if (img.caption) acc[img.src] = img.caption;
                      return acc;
                    }, {} as Record<string, string>)}
                    imageAnnotations={caseStudyData.finalProductSection.images.reduce((acc, img) => {
                      if (img.annotations) acc[img.src] = img.annotations;
                      return acc;
                    }, {} as Record<string, ImageAnnotation[]>)}
                  />
                ) : (
                  <div className="grid gap-6 md:gap-8">
                    {caseStudyData.finalProductSection.images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white rounded-lg overflow-hidden shadow-sm border border-border/20"
                      >
                        {image.annotations && image.annotations.length > 0 ? (
                          <AnnotatedImage
                            src={image.src}
                            alt={image.alt}
                            annotations={image.annotations}
                            className="w-full h-auto rounded-lg"
                          />
                        ) : (
                          <>
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-auto object-contain image-high-quality"
                            />
                            {image.caption && (
                              <div className="p-4 text-sm text-muted-foreground text-center border-t border-border/10">
                                {image.caption}
                              </div>
                            )}
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )
              )}
            </section>
          )}

          {/* Dynamic Outcome Section */}
          {caseStudyData.outcomeSection && (
            <OutcomeSection
              title={caseStudyData.outcomeSection.title}
              description={caseStudyData.outcomeSection.description}
              eyebrow={caseStudyData.outcomeSection.eyebrow}
              metrics={caseStudyData.outcomeSection.metrics}
            />
          )}

          {/* Post-Launch Section */}
          {caseStudyData.postLaunchSection && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <section id="post-launch" data-section="post-launch" aria-labelledby="post-launch-heading" className="section-snap scroll-mt-[calc(var(--header-height,64px)+1rem)]">
                <h2 id="post-launch-heading" className="sr-only">Post-Launch Section</h2>
                <PostLaunchSection
                  title={caseStudyData.postLaunchSection.title}
                  description={caseStudyData.postLaunchSection.description}
                  eyebrow={caseStudyData.postLaunchSection.eyebrow}
                  metrics={caseStudyData.postLaunchSection.metrics}
                  images={caseStudyData.postLaunchSection.images}
                />
              </section>
            </div>
          )}

          {/* Technical Implementation Section */}
          {caseStudyData.technicalImplementation && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <section id="technical" data-section="technical" aria-labelledby="technical-heading" className="section-snap scroll-mt-[calc(var(--header-height,64px)+1rem)]">
                <h2 id="technical-heading" className="sr-only">Technical Implementation Section</h2>
                <TechnicalImplementationSection implementation={caseStudyData.technicalImplementation} />
              </section>
            </div>
          )}

          {/* FOUNDER-LEVEL SECTIONS */}
          {caseStudyData.strategicDecisions && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <StrategicDecisionsSection title={caseStudyData.strategicDecisions.title} decisions={caseStudyData.strategicDecisions.decisions} />
            </div>
          )}

          {caseStudyData.aiCollaboration && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <AICollaborationSection title={caseStudyData.aiCollaboration.title} aiHandled={caseStudyData.aiCollaboration.aiHandled} humanRefined={caseStudyData.aiCollaboration.humanRefined} combinedImpact={caseStudyData.aiCollaboration.combinedImpact} />
            </div>
          )}

          {caseStudyData.distributionDesign && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <DistributionDesignSection title={caseStudyData.distributionDesign.title} moments={caseStudyData.distributionDesign.moments} />
            </div>
          )}

          {caseStudyData.operationalArtifacts && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <OperationalArtifactsSection title={caseStudyData.operationalArtifacts.title} deliverables={caseStudyData.operationalArtifacts.deliverables} />
            </div>
          )}

          {caseStudyData.systemsBuilt && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <SystemsBuiltSection title={caseStudyData.systemsBuilt.title} systems={caseStudyData.systemsBuilt.systems} />
            </div>
          )}

          {caseStudyData.customerVoice && (
            <div className="my-16">
              <div className="text-center mb-12">
                <h2 className="text-section-title font-display">Customer Impact</h2>
                <p className="text-lg text-muted-foreground mt-4">Data + Voice: Proving empathy and impact</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {caseStudyData.customerVoice.map((voice, index) => <CustomerVoiceCard key={index} {...voice} />)}
              </div>
            </div>
          )}
          
          {/* Related Case Study Section */}
          <section id="more-work" data-section="more-work" aria-labelledby="more-work-heading" className="section-snap mb-12 py-8 scroll-mt-[calc(var(--header-height,64px)+1rem)]">
            <h2 id="more-work-heading" className="sr-only">More Work Section</h2>
            <SingleCaseStudyPreview currentProjectId={caseStudyData.id} />
          </section>
          
          {/* Contact Section */}
          <section id="contact-section" data-section="contact-section" aria-labelledby="contact-heading" className="section-snap py-12 md:py-16 scroll-mt-[calc(var(--header-height,64px)+1rem)]">
            <h2 id="contact-heading" className="sr-only">Contact Section</h2>
            <CaseStudyContactSection />
          </section>
          
          {/* Share Toolbar */}
          <div className="py-6 border-t border-border/20">
            <CaseStudyShareToolbar 
              url={currentUrl}
              title={caseStudyData.title}
              className="flex-wrap justify-center"
            />
          </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </>
  );
};

export default StructuredCaseStudyLayout;
