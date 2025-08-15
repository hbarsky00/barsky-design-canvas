
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2, Star, Sprout, DollarSign, Users } from "lucide-react";

const ImpactResultsSection: React.FC = () => {
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
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
    </div>
  );
};

export default ImpactResultsSection;
