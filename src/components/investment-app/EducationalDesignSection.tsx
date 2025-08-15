
import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";

const EducationalDesignSection: React.FC = () => {
  const { maximizeImage } = useImageMaximizer();

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

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50">
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
        
        {/* AI-Enhanced Development Workflow */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">AI-Enhanced Development Workflow</h3>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From user needs analysis to deployed solution - how AI amplifies every step of the educational investment platform development process.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-200">
            <img 
              alt="AI-enhanced development workflow for investment education platform" 
              onClick={() => maximizeImage("/lovable-uploads/3b9c3f8c-f435-4a25-94fe-f760ae0f4af1.png", "AI-enhanced development workflow for investment education platform")}
              src="/lovable-uploads/3b9c3f8c-f435-4a25-94fe-f760ae0f4af1.png" 
              className="w-full h-auto cursor-pointer transition-transform duration-200 hover:scale-[1.02] object-contain" 
            />
          </div>
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
    </div>
  );
};

export default EducationalDesignSection;
