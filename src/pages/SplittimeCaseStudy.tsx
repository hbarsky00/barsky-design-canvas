import React from "react";
import CleanCaseStudyTemplate from "@/components/case-study/CleanCaseStudyTemplate";
import splittimeOgImage from "@/assets/social/splittime-og.jpg";

const SplittimeCaseStudy: React.FC = () => {
  return (
    <CleanCaseStudyTemplate
      // SEO Data
      title="Splittime: Co-Parenting App Case Study | Hiram Barsky"
      description="Transforming co-parenting from conflict to collaboration. AI-powered features that reduce communication stress and improve family coordination."
      image={`https://barskydesign.pro${splittimeOgImage}`}
      caseStudyName="Splittime"
      seoResults={["50% reduction in onboarding time", "40% fewer support tickets", "Conflict-reduction through design"]}
      technologies={["React Native", "Family Tech", "Communication Platform", "Scheduling AI"]}
      path="/project/splittime"
      
      // Clean Content
      caseStudyTitle="Splittime"
      subtitle="Transforming co-parenting from conflict to collaboration through better communication"
      heroImage="/lovable-uploads/0152c609-c279-4472-84e0-4b6a0a2b6735.png"
      
      challenge="Divorced parents struggled with fragmented communication tools that increased conflict and stress"
      solution="Unified platform with structured communication, shared calendars, and child-focused information sharing"
      impact="73% reduction in communication conflicts with 89% improved schedule coordination"
      
      problemText="Divorced and separated parents struggle with fragmented communication tools that increase conflict and stress. Children suffer when parents can't coordinate effectively, leading to missed events, confusion, and emotional strain on the entire family through scattered conversations across multiple apps."
      problemImage="/lovable-uploads/839b6de9-4297-414c-9f99-7a3b4d2a74d7.png"
      
      solutionSteps={[
        {
          text: "Unified communication hub with all co-parenting conversations in one respectful, structured platform designed to reduce misunderstandings and promote positive communication.",
          image: "/lovable-uploads/0152c609-c279-4472-84e0-4b6a0a2b6735.png"
        },
        {
          text: "Shared family calendar with synchronized scheduling and automatic notifications, reducing conflicts over pickup times and events while keeping both parents informed.",
          image: "/lovable-uploads/839b6de9-4297-414c-9f99-7a3b4d2a74d7.png"
        },
        {
          text: "Child-centered information hub with medical info, school updates, and activity details accessible to both parents for better child care and coordination.",
          image: "/lovable-uploads/59ed017e-e0b4-4f9e-8c80-babccd697006.png"
        }
      ]}
      
      metrics={[
        { value: "73%", label: "Reduction in Communication Conflicts" },
        { value: "89%", label: "Improved Schedule Coordination" },
        { value: "94%", label: "Parent Satisfaction Rate" }
      ]}
      
      currentCaseStudyId="splittime"
    />
  );
};

export default SplittimeCaseStudy;