
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";
import CaseStudyContactSection from "@/components/case-study/CaseStudyContactSection";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";


const SimplifiedProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  if (!projectId) {
    return <Navigate to="/" replace />;
  }

  const caseStudyData = getStructuredCaseStudy(projectId);
  
  if (!caseStudyData) {
    return <Navigate to="/" replace />;
  }

  return (
    <StructuredCaseStudyLayout caseStudyData={caseStudyData} />
  );
};

export default SimplifiedProjectDetail;
