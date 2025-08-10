import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

import { caseStudiesData } from "@/data/caseStudies";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudyNavigation from "./CaseStudyNavigation";
import CaseStudySection from "./CaseStudySection";
import CaseStudyContactSection from "./CaseStudyContactSection";
import BackToProjectsFab from "./BackToProjectsFab";

const CaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const caseStudy = caseStudiesData[id || ""];

  if (!caseStudy) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <BackToProjectsFab />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-background pt-[calc(var(--header-height,64px)+8px)]"
      >

        <CaseStudyHero caseStudy={caseStudy} />
        
        <div className="relative">
          <CaseStudyNavigation navigation={caseStudy.stickyNav} />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 lg:pl-12 py-16">
            {Object.entries(caseStudy.sections).map(([key, section]) => (
              <CaseStudySection 
                key={key}
                id={key}
                title={caseStudy.stickyNav.find(nav => nav.anchor === `#${key}`)?.label || key}
                content={section}
              />
            ))}
            
            <CaseStudyContactSection />
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </>
  );
};

export default CaseStudyPage;