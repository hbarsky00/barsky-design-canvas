
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { StructuredCaseStudy } from "@/data/types/caseStudy";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCaseStudyNavItems } from "@/utils/caseStudyNav";
import SEO from "@/components/seo/SEO";
import StructuredCaseStudyHero from "./StructuredCaseStudyHero";
import StructuredCaseStudySection from "./StructuredCaseStudySection";

interface StructuredCaseStudyLayoutProps {
  caseStudy: StructuredCaseStudy;
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  caseStudy
}) => {
  const navItems = getCaseStudyNavItems();
  
  if (!caseStudy || !caseStudy.id) {
    console.error('StructuredCaseStudyLayout - Invalid caseStudy:', caseStudy);
    return <div>Error: Invalid case study data</div>;
  }

  const currentIndex = navItems.findIndex((item) => item && item.id === caseStudy.id);
  const prevItem = currentIndex > 0 ? navItems[currentIndex - 1] : null;
  const nextItem = currentIndex < navItems.length - 1 ? navItems[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        type="article"
        title={`${caseStudy.title} - Case Study`}
        description={caseStudy.seoData?.description || caseStudy.description}
        url={`https://barskydesign.pro/project/${caseStudy.id}`}
        image={caseStudy.seoData?.image || caseStudy.heroVideo?.poster || "https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png"}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <StructuredCaseStudyHero caseStudy={caseStudy} />
        
        {/* Case Study Sections */}
        <div className="max-w-4xl mx-auto mt-16 space-y-16">
          {caseStudy.sections.map((section, index) => (
            <StructuredCaseStudySection 
              key={section.id}
              section={section}
              index={index}
            />
          ))}
        </div>
        
        {/* Case Study Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-border max-w-4xl mx-auto">
          {prevItem ? (
            <Link to={`/project/${prevItem.id}`}>
              <Button variant="ghost" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Previous Case Study
              </Button>
            </Link>
          ) : (
            <div />
          )}
          
          {nextItem ? (
            <Link to={`/project/${nextItem.id}`}>
              <Button variant="ghost" className="group">
                Next Case Study
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StructuredCaseStudyLayout;
