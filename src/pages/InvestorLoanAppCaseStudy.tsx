import React from "react";
import { TrendingUp, DollarSign, BarChart3, Calculator, Shield, Clock, Target, LineChart, Users } from "lucide-react";
import SimplifiedCaseStudyTemplate from "@/components/case-study/SimplifiedCaseStudyTemplate";
import investorLoanOgImage from "@/assets/social/investor-loan-og.jpg";

const InvestorLoanAppCaseStudy: React.FC = () => {
  return (
    <SimplifiedCaseStudyTemplate
      // SEO Data
      title="Investor Loan App: Smart Portfolio Management Case Study | Hiram Barsky"
      description="Automated reporting and portfolio tracking for investors. See how AI integration streamlined complex financial workflows."
      image={`https://barskydesign.pro${investorLoanOgImage}`}
      projectName="Investor Loan App"
      seoResults={["60% faster portfolio analysis", "90% automated report generation", "Real-time market insights"]}
      technologies={["FinTech Platform", "Portfolio Management", "AI Analytics", "Automated Reporting"]}
      path="/project/investor-loan-app"
      
      // Hero Section
      hero={{
        subtitle: "Investment Portfolio Intelligence",
        title: "From Spreadsheet Chaos to Investment Intelligence",
        description: "Transforming investment management from spreadsheet chaos to intelligent portfolio tracking. Our platform automates reporting, tracks performance, and provides actionable insights for serious investors.",
        heroImage: "/lovable-uploads/d6b1c238-3889-47b9-b214-ee43ce09eb1a.png",
        heroImageAlt: "Loan Central orderbook interface showing investment deals and lender allocation details",
        projectId: "investor-loan-app",
        client: "Rodriguez Investments",
        timeline: "6 months",
        services: ["FinTech Platform", "Portfolio Management", "AI Analytics"]
      }}
      
      // Challenge Section
      challenge={{
        title: "The Challenge",
        subtitle: "Investment Management Complexity",
        description: "Professional investors lose valuable time and miss opportunities due to fragmented portfolio management tools that can't keep pace with the complexity of modern investment portfolios.",
        painPoints: [
          {
            title: "Excel-Based Portfolio Tracking",
            description: "Investors managing multiple properties through fragmented spreadsheets, leading to version conflicts and data inconsistencies that risk financial accuracy.",
            impact: "15-20 hours weekly on manual data entry and reconciliation",
            icon: <Calculator className="h-8 w-8" />
          },
          {
            title: "Manual ROI Calculations",
            description: "Time-consuming manual analysis of investment performance across different property types, preventing quick decision-making on new opportunities.",
            impact: "Delayed investment decisions by 2-3 weeks on average",
            icon: <BarChart3 className="h-8 w-8" />
          },
          {
            title: "Fragmented Financial Reporting",
            description: "No centralized view of portfolio performance, cash flow projections, or comparative analysis between different investment properties.",
            impact: "Poor visibility into overall portfolio health and optimization opportunities",
            icon: <TrendingUp className="h-8 w-8" />
          },
          {
            title: "Risk Assessment Blind Spots",
            description: "Limited ability to assess market risks, vacancy rates, and financial exposure across the entire investment portfolio simultaneously.",
            impact: "Increased exposure to market volatility and unexpected losses",
            icon: <Shield className="h-8 w-8" />
          }
        ],
        supportingImage: "/lovable-uploads/6e0291a5-2519-4b89-8402-44a9b8a27cf0.png",
        supportingImageAlt: "Complex investment workflow showing the challenges of manual portfolio management and tracking"
      }}
      
      // Solution Section
      solution={{
        title: "Our Solution",
        subtitle: "Intelligent Automation System",
        description: "Our intelligent platform automatically tracks loan performance, generates comprehensive reports, and provides real-time portfolio analytics. Investors can focus on deal-making while the system handles the administrative complexity.",
        features: [
          {
            title: "Real-Time Portfolio Dashboard",
            description: "Live tracking of investment performance, cash flow, and property values with automated data synchronization from multiple financial sources and property management platforms.",
            image: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
            imageAlt: "Portfolio Intelligence Hub showing real-time portfolio performance and analytics",
            benefit: "Instant portfolio visibility without manual updates"
          },
          {
            title: "Intelligent Risk Analytics",
            description: "AI-powered assessment of market conditions, property performance trends, and investment risk analysis with predictive modeling for future returns.",
            image: "/lovable-uploads/31f78724-10cf-467d-9ca1-7c9c9d69c792.png",
            imageAlt: "Investment Performance Analytics showing advanced financial modeling and ROI calculations",
            benefit: "Proactive risk management and investment optimization"
          },
          {
            title: "Automated Financial Reporting",
            description: "Generate comprehensive investment reports, tax documentation, and performance analytics automatically with customizable templates for different stakeholder needs.",
            image: "/lovable-uploads/e432b0d3-c551-4c71-b2e2-032792fcdb2c.png",
            imageAlt: "Risk Management System showing intelligent risk assessment and market analysis",
            benefit: "Professional reporting in minutes, not hours"
          },
          {
            title: "Investment Opportunity Scoring",
            description: "Machine learning algorithms analyze market data, property metrics, and portfolio fit to score and rank new investment opportunities automatically.",
            image: "/lovable-uploads/150a4488-94c2-481d-a7e3-f3730f963866.png",
            imageAlt: "Investment Growth Platform showing automated opportunity identification and financial projections",
            benefit: "Data-driven investment decisions with quantified opportunity assessment"
          }
        ],
        methodology: "By automating complex portfolio management tasks and providing intelligent insights, investors spend less time on spreadsheets and more time identifying profitable opportunities."
      }}
      
      // Results Section
      results={{
        title: "Results & Impact",
        subtitle: "Financial Performance Outcomes",
        description: "Professional investors report significant time savings on portfolio management tasks, improved accuracy in financial tracking, and better investment decision-making through comprehensive analytics and automated reporting.",
        metrics: [
          {
            value: "78%",
            label: "Reduction in Portfolio Management Time",
            icon: <Clock className="h-6 w-6" />
          },
          {
            value: "45%",
            label: "Faster Investment Decision Making",
            icon: <Target className="h-6 w-6" />
          },
          {
            value: "92%",
            label: "Improvement in ROI Accuracy",
            icon: <TrendingUp className="h-6 w-6" />
          },
          {
            value: "156%",
            label: "Increase in Portfolio Optimization Opportunities Identified",
            icon: <LineChart className="h-6 w-6" />
          }
        ],
        testimonial: {
          quote: "This platform transformed our entire investment operation. What used to take us days of Excel work now happens automatically. We've identified $2.3M in optimization opportunities we never would have found with our old spreadsheet approach. It's like having a CFO and data analyst built into our investment workflow.",
          author: "Michael Rodriguez",
          title: "Principal",
          company: "Rodriguez Investments - Managing $47M portfolio across 127 assets"
        }
      }}
      
      // CTA Section
      cta={{
        title: "Ready to Transform Your Investment Management?",
        description: "Let's create intelligent platforms that turn complex financial data into actionable investment insights. Your portfolio management platform deserves the same data-driven, professional approach.",
        buttonText: "Start Your FinTech Project",
        buttonAction: () => window.location.href = '/contact'
      }}
      
      // Related Projects
      currentProjectId="investor-loan-app"
    />
  );
};

export default InvestorLoanAppCaseStudy;