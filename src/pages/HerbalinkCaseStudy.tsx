import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/case-study/VideoPlayer";
import CaseStudyContactSection from "@/components/case-study/CaseStudyContactSection";
import { Link } from "react-router-dom";

const HerbalinkCaseStudy: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 pt-[calc(var(--header-height,64px)+12px)] pb-8">
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
              HerbaLink: Streamlining Cannabis Distribution with AI-Powered Efficiency
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Revolutionizing cannabis distribution through AI-driven logistics and compliance solutions.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Badge variant="secondary" className="px-3 py-1">
                UX Design
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                UI Design
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Product Design
              </Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <VideoPlayer 
              videoSrc="https://res.cloudinary.com/hilnmyskv/video/upload/v1708719963/HerbaLink_Case_Study_Video_Final_v2_mjy39q.mp4"
              thumbnailSrc="/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png"
              title="HerbaLink Case Study"
            />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20"
            style={{ scrollMarginTop: 'calc(var(--header-height, 64px) + 16px)' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-left lg:text-center">
              Overview
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  HerbaLink is a pioneering platform designed to revolutionize the cannabis distribution industry by leveraging AI-driven logistics and compliance solutions. This innovative system addresses the critical need for streamlined operations, regulatory adherence, and enhanced efficiency in a rapidly evolving market.
                </p>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Image Placeholder</p>
                      <p className="text-sm text-muted-foreground">HerbaLink Interface</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20"
            style={{ scrollMarginTop: 'calc(var(--header-height, 64px) + 16px)' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-left lg:text-center">
              Challenge
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  The cannabis distribution industry faces significant challenges, including complex regulatory landscapes, logistical inefficiencies, and the need for secure, transparent operations. Existing systems often lack the sophistication to handle these demands, leading to increased costs, compliance risks, and operational bottlenecks.
                </p>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Image Placeholder</p>
                      <p className="text-sm text-muted-foreground">HerbaLink Interface</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20"
            style={{ scrollMarginTop: 'calc(var(--header-height, 64px) + 16px)' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-left lg:text-center">
              Solution
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  HerbaLink offers a comprehensive solution by integrating AI-driven logistics, real-time compliance monitoring, and a secure, transparent platform for all stakeholders. The system optimizes distribution routes, automates regulatory reporting, and provides actionable insights to improve decision-making and operational efficiency.
                </p>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Image Placeholder</p>
                      <p className="text-sm text-muted-foreground">HerbaLink Interface</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20"
            style={{ scrollMarginTop: 'calc(var(--header-height, 64px) + 16px)' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-left lg:text-center">
              Results
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  Early adopters of HerbaLink have reported significant improvements in operational efficiency, a reduction in compliance-related risks, and enhanced transparency across their distribution networks. The platform's AI-driven insights have enabled better decision-making, leading to increased profitability and a stronger competitive position in the market.
                </p>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Image Placeholder</p>
                      <p className="text-sm text-muted-foreground">HerbaLink Interface</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              </div>
            </div>
          </motion.section>

          <CaseStudyContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HerbalinkCaseStudy;
