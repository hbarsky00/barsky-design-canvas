
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, DollarSign, BarChart3, PieChart, Calculator, Shield, Clock, Target, Users, CheckCircle2, Building2, LineChart, Smartphone, Zap, Star, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import { getOptimizedImageSrc } from "@/utils/imageOptimization";
import RelatedProjects from "@/components/RelatedProjects";

const InvestmentAppCaseStudy: React.FC = () => {
  const { maximizeImage } = useImageMaximizer();

  // Placeholder OG image - using a more generic approach
  const investmentAppOgImage = "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png";

  const investmentBarriers = [
    {
      title: "Financial Jargon & Complexity",
      description: "Traditional investment platforms overwhelm beginners with technical terms, complex charts, and industry jargon that creates barriers to entry.",
      icon: <Calculator className="h-8 w-8" />
    },
    {
      title: "Intimidating Interface Design",
      description: "Most investment apps prioritize advanced features over user-friendly design, making simple tasks feel overwhelming for new investors.",
      icon: <Shield className="h-8 w-8" />
    },
    {
      title: "Lack of Educational Guidance",
      description: "Platforms expect users to already understand investing fundamentals, providing little educational support for beginners learning to invest.",
      icon: <Users className="h-8 w-8" />
    }
  ];

  const educationalFeatures = [
    {
      title: "Simplified Portfolio Tracking",
      description: "Clean, intuitive dashboard that shows investment performance in plain language with visual progress indicators and goal-based tracking.",
      visual: "📊"
    },
    {
      title: "Educational Investment Guides",
      description: "Interactive tutorials and bite-sized lessons that teach investing fundamentals without overwhelming technical complexity.",
      visual: "🎓"
    },
    {
      title: "Goal-Based Investment Planning",
      description: "Helps users set specific financial goals and creates personalized investment plans to achieve them with clear milestones.",
      visual: "🎯"
    }
  ];

  const investmentJourney = [
    {
      step: "Learn",
      title: "Educational Onboarding",
      description: "Interactive tutorials introduce investing basics with simple language and visual examples to build confidence.",
      image: "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png"
    },
    {
      step: "Plan",
      title: "Goal Setting & Strategy",
      description: "Users define financial goals and receive personalized investment recommendations based on their timeline and risk tolerance.",
      image: "/lovable-uploads/fb6ed4d4-7b7a-4d99-9eac-be0b810e97f0.png"
    },
    {
      step: "Invest",
      title: "Simplified Investment Process",
      description: "One-tap investing with clear explanations of each decision, removing complexity while maintaining transparency.",
      image: "/lovable-uploads/539fc1c8-ca24-465a-b189-653e03404112.png"
    },
    {
      step: "Track",
      title: "Progress Monitoring",
      description: "Visual progress tracking with achievement milestones that celebrate investment success and encourage continued engagement.",
      image: "/lovable-uploads/210badcf-5da6-47c5-9e9c-c4ba3a0c9102.png"
    }
  ];

  const financialImpact = [
    {
      metric: "23%",
      label: "Increase in Portfolio Engagement",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      metric: "67%",
      label: "Improvement in Investment Knowledge",
      icon: <CheckCircle2 className="h-6 w-6" />
    },
    {
      metric: "84%",
      label: "User Satisfaction Rate",
      icon: <Star className="h-6 w-6" />
    },
    {
      metric: "2.5x",
      label: "Growth in New Investor Onboarding",
      icon: <Sprout className="h-6 w-6" />
    }
  ];

  return (
    <>
      <DynamicSeo 
        type="project"
        title="Investment App: Making Finance Accessible to Beginners | Hiram Barsky"
        description="23% increase in portfolio engagement through simplified design and educational approach. See how UX design made investing accessible to beginners."
        image={`https://barskydesign.pro${investmentAppOgImage}`}
        projectName="Investment App"
        results={["23% increase in engagement", "67% improvement in investment knowledge", "Simplified onboarding process"]}
        technologies={["FinTech", "Educational UX", "Mobile Design", "Investment Platform"]}
        path="/project/investment-app"
      />
      
      <div className="investment-platform-showcase min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        
        <main className="flex-grow">
          
          {/* Investment Education Hero */}
          <section className="relative min-h-screen overflow-hidden">
            {/* Single focal background image */}
            <div className="absolute inset-0">
              <img 
                src={getOptimizedImageSrc("/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png")} 
                alt="Investment app interface showing simplified portfolio tracking with clean design and educational elements for beginner investors" 
                className="w-full h-full object-cover object-center" 
              />
              {/* Strong dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/75"></div>
            </div>

            {/* Left-aligned content with subtle background */}
            <div className="relative z-10 flex items-center min-h-screen">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  {/* Subtle backdrop for text contrast */}
                  <div className="bg-black/70 backdrop-blur-md rounded-2xl p-8 lg:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="space-y-6"
                    >
                      {/* Title case heading with medium weight */}
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight">
                        Making Investing Accessible to Everyone
                      </h1>
                      
                      {/* High contrast readable subtext */}
                      <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                        Educational design that turns investment complexity into confidence.
                      </p>
                      
                      {/* Bold rectangular CTA button */}
                      <div className="pt-2">
                        <Button 
                          size="lg" 
                          variant="brand"
                          className="font-bold"
                        >
                          See the App in Action
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Investment Accessibility Barriers */}
          <section className="investment-accessibility-gap py-20 bg-white/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <BarChart3 className="h-10 w-10 text-red-500" />
                  <span className="text-red-600 font-semibold text-lg">Investment Accessibility Gap</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Why Traditional Investment Apps Fail Beginners
                </h2>
                
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                  Despite growing interest in personal investing, most platforms create unnecessary barriers 
                  that prevent beginners from building wealth and financial literacy.
                </p>
              </motion.div>
              
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-neutral-900">Critical Accessibility Barriers:</h3>
                  
                  {investmentBarriers.map((barrier, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-red-500 flex-shrink-0">
                          {barrier.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-800 mb-2">{barrier.title}</h4>
                          <p className="text-neutral-600">{barrier.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="space-y-8"
                >
                  <figure className="project-image-container">
                    <img 
                      src="/lovable-uploads/fb6ed4d4-7b7a-4d99-9eac-be0b810e97f0.png" 
                      alt="Complex investment interface showing overwhelming data and jargon that intimidates beginning investors" 
                      className="w-full h-[300px] object-cover rounded-3xl shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                      onClick={() => maximizeImage("/lovable-uploads/fb6ed4d4-7b7a-4d99-9eac-be0b810e97f0.png", "Traditional investment interfaces overwhelm beginners with complexity")}
                    />
                    <figcaption className="text-sm text-neutral-600 italic mt-2 text-center">
                      Traditional investment interfaces overwhelm beginners with complexity
                    </figcaption>
                  </figure>

                  <figure className="project-image-container">
                    <img 
                      src="/lovable-uploads/539fc1c8-ca24-465a-b189-653e03404112.png" 
                      alt="Cluttered investment platform dashboard showing information overload for new users" 
                      className="w-full h-[300px] object-cover rounded-3xl shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                      onClick={() => maximizeImage("/lovable-uploads/539fc1c8-ca24-465a-b189-653e03404112.png", "Information overload prevents beginners from taking action")}
                    />
                    <figcaption className="text-sm text-neutral-600 italic mt-2 text-center">
                      Information overload prevents beginners from taking action
                    </figcaption>
                  </figure>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Educational Design Solution */}
          <section className="educational-design-innovation py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Zap className="h-10 w-10 text-blue-500" />
                  <span className="text-blue-600 font-semibold text-lg">Educational Design Innovation</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Learning-First Investment Experience
                </h2>
                
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                  Our educational approach transforms complex financial concepts into accessible, 
                  confidence-building experiences that help users learn while they invest.
                </p>
              </motion.div>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {educationalFeatures.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-4xl mb-6 text-center">{feature.visual}</div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4 text-center">{feature.title}</h3>
                    <p className="text-neutral-600 text-center leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-16 bg-gradient-to-r from-blue-500 to-indigo-500 p-8 rounded-3xl text-center"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Education-First Philosophy</h3>
                <p className="text-lg max-w-3xl mx-auto text-white/90">
                  By prioritizing education and simplicity, users build genuine investment knowledge 
                  and confidence rather than just following recommendations they don't understand.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Investment Journey Platform */}
          <section className="beginner-focused-platform-design py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Smartphone className="h-10 w-10 text-purple-500" />
                  <span className="text-purple-600 font-semibold text-lg">Platform Experience</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Guided Investment Learning Journey
                </h2>
                
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                  Designed specifically for investment beginners, the platform guides users through 
                  learning, planning, investing, and tracking progress with confidence-building design.
                </p>
              </motion.div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {investmentJourney.map((journey, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-200"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">{journey.step}</span>
                        <h3 className="text-xl font-bold text-neutral-900">{journey.title}</h3>
                      </div>
                    </div>
                    
                    <figure className="project-image-container mb-6">
                      <img 
                        src={journey.image} 
                        alt={`${journey.title} - investment education platform interface`} 
                        className="w-full h-64 object-cover rounded-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                        onClick={() => maximizeImage(journey.image, `${journey.title} - investment education platform interface`)}
                      />
                      <figcaption className="text-sm text-neutral-600 italic mt-2 text-center">
                        {journey.title} - {journey.description}
                      </figcaption>
                    </figure>
                    
                    <p className="text-neutral-600 leading-relaxed">{journey.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Financial Impact Results */}
          <section className="educational-investment-impact py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <TrendingUp className="h-10 w-10 text-green-500" />
                  <span className="text-green-600 font-semibold text-lg">Educational Impact</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Measurable Learning & Engagement Improvements
                </h2>
                
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed mb-12">
                  Beginner investors report significant increases in financial confidence, investment knowledge, 
                  and ongoing platform engagement through our educational-first approach.
                </p>
              </motion.div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {financialImpact.map((metric, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl text-center shadow-lg border border-blue-200"
                  >
                    <div className="flex justify-center mb-4 text-blue-500">
                      {metric.icon}
                    </div>
                    <div className="text-4xl font-bold text-green-600 mb-2">{metric.metric}</div>
                    <div className="text-sm text-neutral-600 uppercase tracking-wide">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* User Success Story */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white/70 backdrop-blur-sm p-12 rounded-3xl text-center max-w-5xl mx-auto border border-blue-200 shadow-xl"
              >
                <div className="mb-8">
                  <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-2xl text-neutral-700 italic leading-relaxed mb-6">
                    "I was intimidated by investing for years, but this app made it feel approachable and educational. 
                    I actually understand what I'm investing in now, and I've been consistently growing my portfolio 
                    for 8 months. The educational approach gave me the confidence to start and the knowledge to continue."
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-neutral-900 text-lg">Sarah Chen</p>
                    <p className="text-blue-600 font-medium">First-Time Investor</p>
                    <p className="text-sm text-neutral-500">Started with $500, now managing $3,200 portfolio</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Related Projects */}
          <RelatedProjects currentProjectId="investment-app" />

          {/* Call to Action */}
          <section className="py-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
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
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default InvestmentAppCaseStudy;
