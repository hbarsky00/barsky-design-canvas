import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";
import HeroSection from "./sections/HeroSection";
import ProblemSection from "./sections/ProblemSection";
import EvolutionSection from "./sections/EvolutionSection";
import HumanConnectionSection from "./sections/HumanConnectionSection";
import ProcessFlowSection from "./sections/ProcessFlowSection";
import TechnicalInnovationSection from "./sections/TechnicalInnovationSection";
import CallToActionSection from "./sections/CallToActionSection";

const StoryDrivenProjectDetail: React.FC = () => {
  return (
    <>
      <EnhancedGlobalSeo 
        title="Wholesale Distribution: From Designer to Gen AI Developer | Hiram Barsky Case Study" 
        description="Real conversation to custom AI-powered business solution. How UX expertise evolved into full-stack Gen AI development for wholesale distribution challenges." 
        canonicalUrl="https://barskydesign.pro/project/wholesale-distribution" 
        pageType="content" 
        keywords={["wholesale distribution software", "AI business automation", "custom development", "workflow optimization", "business solution", "Gen AI development", "restaurant conversation to solution"]}
        ogImage="https://barskydesign.pro/lovable-uploads/62c180ba-ccc8-4c56-9f71-a3374bfc43f7.png"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Header />
        
        {/* Back Navigation */}
        <div className="pt-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <Link to="/projects" className="inline-flex items-center text-amber-700 hover:text-amber-900 transition-colors font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </div>

      <HeroSection />
      <ProblemSection />
      <EvolutionSection />
      <HumanConnectionSection />
      <ProcessFlowSection />
      <TechnicalInnovationSection />
      <CallToActionSection />

        <Footer />
      </div>
    </>
  );
};
export default StoryDrivenProjectDetail;