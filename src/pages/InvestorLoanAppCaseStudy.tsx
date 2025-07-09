import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, TrendingUp, DollarSign, BarChart3, PieChart, Calculator, Shield, Clock, Target, Users, CheckCircle2, Building2, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";
import MaximizableImage from "@/components/project/MaximizableImage";
import { investorLoanImageCaptions, investorLoanGalleryImages } from "@/data/investorLoanData";
const InvestorLoanAppCaseStudy: React.FC = () => {
  const portfolioComplexities = [{
    issue: "Excel-Based Portfolio Tracking",
    description: "Investors managing multiple properties through fragmented spreadsheets, leading to version conflicts and data inconsistencies that risk financial accuracy.",
    impact: "15-20 hours weekly on manual data entry and reconciliation",
    icon: <Calculator className="h-8 w-8" />
  }, {
    issue: "Manual ROI Calculations",
    description: "Time-consuming manual analysis of investment performance across different property types, preventing quick decision-making on new opportunities.",
    impact: "Delayed investment decisions by 2-3 weeks on average",
    icon: <PieChart className="h-8 w-8" />
  }, {
    issue: "Fragmented Financial Reporting",
    description: "No centralized view of portfolio performance, cash flow projections, or comparative analysis between different investment properties.",
    impact: "Poor visibility into overall portfolio health and optimization opportunities",
    icon: <BarChart3 className="h-8 w-8" />
  }, {
    issue: "Risk Assessment Blind Spots",
    description: "Limited ability to assess market risks, vacancy rates, and financial exposure across the entire investment portfolio simultaneously.",
    impact: "Increased exposure to market volatility and unexpected losses",
    icon: <Shield className="h-8 w-8" />
  }];
  const automationFeatures = [{
    title: "Real-Time Portfolio Dashboard",
    description: "Live tracking of investment performance, cash flow, and property values with automated data synchronization from multiple financial sources and property management platforms.",
    visual: "📊",
    benefit: "Instant portfolio visibility without manual updates"
  }, {
    title: "Intelligent Risk Analytics",
    description: "AI-powered assessment of market conditions, property performance trends, and investment risk analysis with predictive modeling for future returns.",
    visual: "🎯",
    benefit: "Proactive risk management and investment optimization"
  }, {
    title: "Automated Financial Reporting",
    description: "Generate comprehensive investment reports, tax documentation, and performance analytics automatically with customizable templates for different stakeholder needs.",
    visual: "📈",
    benefit: "Professional reporting in minutes, not hours"
  }, {
    title: "Investment Opportunity Scoring",
    description: "Machine learning algorithms analyze market data, property metrics, and portfolio fit to score and rank new investment opportunities automatically.",
    visual: "💎",
    benefit: "Data-driven investment decisions with quantified opportunity assessment"
  }];
  const platformInterface = [{
    phase: "Discover",
    title: "Portfolio Intelligence Hub",
    description: "Comprehensive dashboard showing real-time portfolio performance, cash flow analysis, and investment metrics across all properties with interactive data visualization.",
    image: investorLoanGalleryImages[0] || "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png"
  }, {
    phase: "Analyze",
    title: "Investment Performance Analytics",
    description: "Advanced financial modeling with ROI calculations, comparative analysis, and market trend integration to identify top-performing investments and optimization opportunities.",
    image: investorLoanGalleryImages[1] || "/lovable-uploads/31f78724-10cf-467d-9ca1-7c9c9d69c792.png"
  }, {
    phase: "Optimize",
    title: "Risk Management System",
    description: "Intelligent risk assessment with market analysis, vacancy predictions, and financial exposure monitoring to protect and optimize investment portfolio performance.",
    image: investorLoanGalleryImages[2] || "/lovable-uploads/e432b0d3-c551-4c71-b2e2-032792fcdb2c.png"
  }, {
    phase: "Scale",
    title: "Investment Growth Platform",
    description: "Automated opportunity identification, financial projections, and portfolio expansion planning to systematically grow investment returns and market presence.",
    image: investorLoanGalleryImages[3] || "/lovable-uploads/150a4488-94c2-481d-a7e3-f3730f963866.png"
  }];
  const performanceMetrics = [{
    metric: "78%",
    label: "Reduction in Portfolio Management Time",
    icon: <Clock className="h-6 w-6" />
  }, {
    metric: "45%",
    label: "Faster Investment Decision Making",
    icon: <Target className="h-6 w-6" />
  }, {
    metric: "92%",
    label: "Improvement in ROI Accuracy",
    icon: <TrendingUp className="h-6 w-6" />
  }, {
    metric: "156%",
    label: "Increase in Portfolio Optimization Opportunities Identified",
    icon: <LineChart className="h-6 w-6" />
  }];
  return <>
      <EnhancedGlobalSeo title="Investor Loan App: FinTech Portfolio Management Platform Case Study" description="See how intelligent automation transformed investment management, reducing portfolio management time by 78% and improving ROI accuracy by 92% for professional investors." canonicalUrl="https://barskydesign.pro/case-study-investor-loan-app" pageType="content" keywords={["investment platform", "FinTech portfolio management", "automated investment reporting", "investment portfolio analytics", "investor tools", "portfolio investment tracking", "investment risk assessment", "portfolio optimization platform"]} />
      
      <div className="fintech-platform-showcase min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Back Navigation */}
        <div className="pt-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="mb-8">
            <Link to="/projects" className="inline-flex items-center text-blue-700 hover:text-blue-900 transition-colors font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </motion.div>
        </div>
        
        <main className="flex-grow">
          
          {/* Financial Portfolio Hero */}
          <section className="real-estate-investment-hero py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial={{
                opacity: 0,
                x: -50
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.8
              }} className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Building2 className="h-10 w-10 text-blue-600" />
                    <span className="text-blue-700 font-semibold text-lg">Investment Portfolio Intelligence</span>
                  </div>
                  
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                    From Spreadsheet Chaos to
                    <span className="text-blue-600 block">Investment Intelligence</span>
                  </h1>
                  
                  <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                    Transforming investment management from spreadsheet chaos to intelligent portfolio tracking. 
                    Our platform automates reporting, tracks performance, and provides actionable insights for serious investors.
                  </p>
                  
                  <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-blue-200 shadow-lg">
                    <div className="flex items-start gap-4">
                      <DollarSign className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-lg font-medium text-slate-800 mb-2">
                          Professional Investment Management
                        </p>
                        <p className="text-slate-600 italic">
                          "Investors need data-driven insights, not Excel headaches. When portfolio management becomes automated, 
                          investors can focus on what matters: finding and securing profitable opportunities."
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                x: 50
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.8,
                delay: 0.2
              }} className="relative">
                  <figure className="project-image-container">
                    <img 
                      src="/lovable-uploads/d6b1c238-3889-47b9-b214-ee43ce09eb1a.png" 
                      alt="Loan Central orderbook interface showing investment deals and lender allocation details"
                      className="w-full h-[500px] object-cover shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                    />
                    <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                      Low Fidelity Loan Central Order book
                    </figcaption>
                  </figure>
                  
                  <div className="mt-8">
                    <figure className="project-image-container mt-8">
                      <img 
                        src="/lovable-uploads/40f56bea-17cc-4a9c-aa30-11ccbdc6bb52.png" 
                        alt="Loan Central My Deals Dashboard interface"
                        className="w-full h-auto object-contain shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                      />
                      <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                        Low Fidelity Loan Central My Deals Dashboard
                      </figcaption>
                    </figure>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Investment Management Pain Analysis */}
          <section className="portfolio-management-complexity py-20 bg-white/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Calculator className="h-10 w-10 text-red-500" />
                  <span className="text-red-600 font-semibold text-lg">Investment Management Complexity</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8">
                  Where Investment Management Breaks Down
                </h2>
                
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Professional investors lose valuable time and miss opportunities due to fragmented portfolio management tools 
                  that can't keep pace with the complexity of modern investment portfolios.
                </p>
              </motion.div>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-slate-900">Critical Portfolio Management Barriers:</h3>
                  
                  {portfolioComplexities.map((complexity, index) => <motion.div key={index} initial={{
                  opacity: 0,
                  y: 30
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.6,
                  delay: index * 0.1
                }} className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200">
                      <div className="flex items-start gap-4">
                        <div className="text-red-500 flex-shrink-0">
                          {complexity.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-slate-800 mb-2">{complexity.issue}</h4>
                          <p className="text-slate-600 mb-3">{complexity.description}</p>
                          <div className="bg-red-100 p-3 rounded-lg">
                            <p className="text-sm font-medium text-red-700">Impact: {complexity.impact}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>)}
                </div>
                
                <motion.div initial={{
                opacity: 0,
                scale: 0.95
              }} whileInView={{
                opacity: 1,
                scale: 1
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.8,
                delay: 0.3
              }} className="relative">
                  <figure className="project-image-container">
                    <img 
                      src="/lovable-uploads/6e0291a5-2519-4b89-8402-44a9b8a27cf0.png" 
                      alt={investorLoanImageCaptions["/lovable-uploads/6e0291a5-2519-4b89-8402-44a9b8a27cf0.png"] || "Complex investment workflow showing the challenges of manual portfolio management and tracking"}
                      className="w-full h-[300px] shadow-2xl object-contain cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                    />
                    <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                      User Process Flow
                    </figcaption>
                  </figure>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Automated Reporting Engine */}
          <section className="intelligent-automation-system py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <BarChart3 className="h-10 w-10 text-blue-500" />
                  <span className="text-blue-600 font-semibold text-lg">Intelligent Automation System</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8">
                  Automated Investment Intelligence Platform
                </h2>
                
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Our intelligent platform automatically tracks loan performance, generates comprehensive reports, and provides real-time portfolio analytics. 
                  Investors can focus on deal-making while the system handles the administrative complexity.
                </p>
              </motion.div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {automationFeatures.map((feature, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 50
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.8,
                delay: index * 0.2
              }} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300">
                    <div className="text-4xl mb-6">{feature.visual}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">{feature.description}</p>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm font-medium text-green-700">✓ {feature.benefit}</p>
                    </div>
                  </motion.div>)}
              </div>
              
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.6
            }} className="mt-16 bg-gradient-to-r from-blue-500 to-indigo-500 p-8 rounded-3xl text-center">
                <h3 className="text-2xl font-bold mb-4 text-white">Investment-First Philosophy</h3>
                <p className="text-lg max-w-3xl mx-auto white-text-nuclear">
                  By automating complex portfolio management tasks and providing intelligent insights, 
                  investors spend less time on spreadsheets and more time identifying profitable opportunities.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Portfolio Management Platform */}
          <section className="investor-focused-platform-design py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Building2 className="h-10 w-10 text-green-500" />
                  <span className="text-green-600 font-semibold text-lg">Investor-Focused Platform Design</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8">
                  Built Specifically for Investment Management
                </h2>
                
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Built specifically for investors who manage multiple assets and loans. The dashboard provides instant access to 
                  portfolio performance, automated reporting, and investment analytics that drive better decision-making.
                </p>
              </motion.div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {platformInterface.map((item, index) => <motion.div key={index} initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.8,
                delay: index * 0.1
              }} className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-3xl border border-blue-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">{item.phase}</span>
                        <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                      </div>
                    </div>
                    
                    <MaximizableImage
                      src={item.image}
                      alt={`${item.title} - professional investment platform interface`}
                      className="w-full h-48 object-cover mb-6"
                    />
                    
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </motion.div>)}
              </div>
            </div>
          </section>

          {/* Investment Performance Impact */}
          <section className="financial-performance-outcomes py-20 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <TrendingUp className="h-10 w-10 text-green-500" />
                  <span className="text-green-600 font-semibold text-lg">Financial Performance Outcomes</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8">
                  Measurable Investment Management Improvements
                </h2>
                
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
                  Professional investors report significant time savings on portfolio management tasks, improved accuracy in financial tracking, 
                  and better investment decision-making through comprehensive analytics and automated reporting.
                </p>
              </motion.div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {performanceMetrics.map((metric, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 50
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.8,
                delay: index * 0.1
              }} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl text-center shadow-lg border border-blue-200">
                    <div className="flex justify-center mb-4 text-blue-500">
                      {metric.icon}
                    </div>
                    <div className="text-4xl font-bold text-green-600 mb-2">{metric.metric}</div>
                    <div className="text-sm text-slate-600 uppercase tracking-wide">{metric.label}</div>
                  </motion.div>)}
              </div>
              
              {/* Investor Success Story */}
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.4
            }} className="bg-white/70 backdrop-blur-sm p-12 rounded-3xl text-center max-w-5xl mx-auto border border-blue-200 shadow-xl">
                <div className="mb-8">
                  <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-2xl text-slate-700 italic leading-relaxed mb-6">
                    "This platform transformed our entire investment operation. What used to take us days of Excel work now happens automatically. 
                    We've identified $2.3M in optimization opportunities we never would have found with our old spreadsheet approach. 
                    It's like having a CFO and data analyst built into our investment workflow."
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 text-lg">Michael Rodriguez</p>
                    <p className="text-blue-600 font-medium">Principal, Rodriguez Investments</p>
                    <p className="text-sm text-slate-500">Managing $47M portfolio across 127 assets</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Building2 className="h-10 w-10 text-white" />
                  <span className="font-semibold text-lg text-white">Investment Portfolio Intelligence</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white">
                  Ready to Transform Your Investment Management?
                </h2>
                
                <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed white-text-nuclear">
                  Let's create intelligent platforms that turn complex financial data into actionable investment insights. 
                  Your portfolio management platform deserves the same data-driven, professional approach.
                </p>
                
                <Button size="lg" variant="default" className="font-semibold px-10 py-6 text-lg group" onClick={() => window.location.href = '/contact'}>
                  Start Your FinTech Project
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>;
};
export default InvestorLoanAppCaseStudy;