
import React from "react";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import InvestmentAppHero from "@/components/investment-app/InvestmentAppHero";
import InvestmentBarriersSection from "@/components/investment-app/InvestmentBarriersSection";
import EducationalDesignSection from "@/components/investment-app/EducationalDesignSection";
import KeyDesignSolutionsSection from "@/components/investment-app/KeyDesignSolutionsSection";
import InvestmentJourneySection from "@/components/investment-app/InvestmentJourneySection";
import ImpactResultsSection from "@/components/investment-app/ImpactResultsSection";
import RelatedProjects from "@/components/RelatedProjects";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const InvestmentAppCaseStudy: React.FC = () => {
  // Placeholder OG image - using a more generic approach
  const investmentAppOgImage = "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png";

  const sections = [
    {
      id: "barriers",
      title: "Investment Accessibility Gap",
      content: <InvestmentBarriersSection />
    },
    {
      id: "solution",
      title: "Educational Design Innovation", 
      content: <EducationalDesignSection />
    },
    {
      id: "design-solutions",
      title: "Key Design Solutions",
      content: <KeyDesignSolutionsSection />
    },
    {
      id: "journey",
      title: "Platform Experience",
      content: <InvestmentJourneySection />
    },
    {
      id: "impact",
      title: "Educational Impact",
      content: <ImpactResultsSection />
    },
    {
      id: "related-projects",
      title: "Related Projects",
      content: <RelatedProjects currentProjectId="investment-app" />
    },
    {
      id: "cta",
      title: "Start Your Project",
      content: (
        <section className="py-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-3xl">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Building2 className="h-10 w-10 text-white" />
                <span className="font-semibold text-lg text-white">Educational FinTech Design</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white">
                Ready to Make Finance Accessible?
              </h2>
              
              <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed text-white/90">
                Let's create educational platforms that turn financial complexity into confidence. 
                Your users deserve design that teaches, not intimidates.
              </p>
              
              <Button 
                size="lg" 
                variant="brand" 
                className="font-semibold px-10 py-6 text-lg group"
                onClick={() => window.location.href = '/contact'}
              >
                Start Your FinTech Project
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>
      )
    }
  ];

  const heroSection = <InvestmentAppHero />;

  return (
    <CaseStudyLayout
      title="Investment App: Making Finance Accessible to Beginners | Hiram Barsky"
      description="23% increase in portfolio engagement through simplified design and educational approach. See how UX design made investing accessible to beginners."
      image={`https://barskydesign.pro${investmentAppOgImage}`}
      projectName="Investment App"
      results={["23% increase in engagement", "67% improvement in investment knowledge", "Simplified onboarding process"]}
      technologies={["FinTech", "Educational UX", "Mobile Design", "Investment Platform"]}
      path="/project/investment-app"
      heroSection={heroSection}
      sections={sections}
      gradientClasses="from-blue-50 via-indigo-50 to-purple-50"
    />
  );
};

export default InvestmentAppCaseStudy;
