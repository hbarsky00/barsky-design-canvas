
import React from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";
import CaseStudyContactSection from "@/components/case-study/CaseStudyContactSection";
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";


const SimplifiedProjectDetail: React.FC = () => {
  const { pathname } = useLocation();
  // /project/dae-search is an explicit route (so it prerenders) and has no :projectId.
  const projectId = useParams<{ projectId: string }>().projectId ?? pathname.split("/").filter(Boolean).pop();
  
  if (!projectId) {
    return <Navigate to="/#case-studies" replace />;
  }

  const caseStudyData = getStructuredCaseStudy(projectId);
  
  if (!caseStudyData) {
    return <Navigate to="/#case-studies" replace />;
  }

  return (
    <StructuredCaseStudyLayout caseStudyData={caseStudyData} />
  );
};

export default SimplifiedProjectDetail;
