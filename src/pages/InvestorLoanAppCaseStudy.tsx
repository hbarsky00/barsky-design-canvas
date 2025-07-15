import React from "react";
import CleanCaseStudyTemplate from "@/components/case-study/CleanCaseStudyTemplate";
import investorLoanOgImage from "@/assets/social/investor-loan-og.jpg";

const InvestorLoanAppCaseStudy: React.FC = () => {
  return (
    <CleanCaseStudyTemplate
      // SEO Data
      title="Investor Loan App: Smart Portfolio Management Case Study | Hiram Barsky"
      description="Automated reporting and portfolio tracking for investors. See how AI integration streamlined complex financial workflows."
      image={`https://barskydesign.pro${investorLoanOgImage}`}
      caseStudyName="Investor Loan App"
      seoResults={["60% faster portfolio analysis", "90% automated report generation", "Real-time market insights"]}
      technologies={["FinTech Platform", "Portfolio Management", "AI Analytics", "Automated Reporting"]}
      path="/project/investor-loan-app"
      
      // Clean Content
      caseStudyTitle="Investor Loan App"
      subtitle="Transforming investment management from spreadsheet chaos to intelligent portfolio tracking"
      heroImage="/lovable-uploads/d6b1c238-3889-47b9-b214-ee43ce09eb1a.png"
      
      challenge="Professional investors struggled with fragmented spreadsheets and manual calculations for portfolio management"
      solution="Intelligent platform that automates reporting, tracks performance, and provides real-time analytics"
      impact="78% reduction in portfolio management time with 45% faster investment decisions"
      
      problemText="Professional investors lose valuable time and miss opportunities due to fragmented portfolio management tools. Investors managing multiple properties through spreadsheets faced version conflicts, data inconsistencies, and time-consuming manual analysis that prevented quick decision-making on new opportunities."
      problemImage="/lovable-uploads/6e0291a5-2519-4b89-8402-44a9b8a27cf0.png"
      
      solutionSteps={[
        {
          text: "Real-time portfolio dashboard with live tracking of investment performance, cash flow, and property values through automated data synchronization from multiple financial sources.",
          image: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png"
        },
        {
          text: "AI-powered risk analytics that assess market conditions, property performance trends, and investment risk analysis with predictive modeling for future returns.",
          image: "/lovable-uploads/31f78724-10cf-467d-9ca1-7c9c9d69c792.png"
        },
        {
          text: "Automated financial reporting that generates comprehensive investment reports, tax documentation, and performance analytics with customizable templates for different stakeholder needs.",
          image: "/lovable-uploads/e432b0d3-c551-4c71-b2e2-032792fcdb2c.png"
        }
      ]}
      
      metrics={[
        { value: "78%", label: "Reduction in Portfolio Management Time" },
        { value: "45%", label: "Faster Investment Decisions" },
        { value: "92%", label: "Improvement in ROI Accuracy" }
      ]}
      
      currentCaseStudyId="investor-loan-app"
    />
  );
};

export default InvestorLoanAppCaseStudy;