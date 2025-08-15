
import React from "react";
import { motion } from "framer-motion";
import { Calculator, Shield, Users, BarChart3 } from "lucide-react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";

const InvestmentBarriersSection: React.FC = () => {
  const { maximizeImage } = useImageMaximizer();

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

  return (
    <div className="bg-white/60 backdrop-blur-sm">
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
    </div>
  );
};

export default InvestmentBarriersSection;
