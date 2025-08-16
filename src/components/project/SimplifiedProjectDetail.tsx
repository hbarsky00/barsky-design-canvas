
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";
import CaseStudyContactSection from "@/components/case-study/CaseStudyContactSection";
import StructuredCaseStudyContent from "@/components/case-study/structured/StructuredCaseStudyContent";

const SimplifiedProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  if (!projectId) {
    return <Navigate to="/projects" replace />;
  }

  const caseStudyData = getStructuredCaseStudy(projectId);
  
  if (!caseStudyData) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <>
      <Header />
      {/* SEO is now handled globally by UnifiedSEO in App.tsx - no conflicts */}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-background pt-[calc(var(--header-height,64px)+12px)]"
      >
        <StructuredCaseStudyContent caseStudyData={caseStudyData} />
        <CaseStudyContactSection />
      </motion.div>
      
      <Footer />
    </>
  );
};

export default SimplifiedProjectDetail;
