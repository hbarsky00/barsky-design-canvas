import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/case-study/VideoPlayer";
import CaseStudyContactSection from "@/components/case-study/CaseStudyContactSection";
import OriginalCaseStudyLayout from "@/components/case-study/OriginalCaseStudyLayout";
import { caseStudiesData } from "@/data/caseStudies";

const HerbalinkCaseStudy: React.FC = () => {
  const caseStudy = caseStudiesData["herbalink"];
  const projectId = "herbalink";

  if (!caseStudy) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
            <p className="text-gray-600">The requested case study could not be found.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <OriginalCaseStudyLayout caseStudy={caseStudy} projectId={projectId} />
  );
};

export default HerbalinkCaseStudy;
