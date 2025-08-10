import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { caseStudiesData } from "@/data/caseStudies";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudyNavigation from "./CaseStudyNavigation";
import CaseStudySection from "./CaseStudySection";
import CaseStudyContactSection from "./CaseStudyContactSection";

const CaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const caseStudy = caseStudiesData[id || ""];

  if (!caseStudy) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-background"
      >
        {/* Back Navigation */}
        <div className="pt-[calc(var(--header-height,64px)+16px)] px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link to="/projects" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </motion.div>
        </div>

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