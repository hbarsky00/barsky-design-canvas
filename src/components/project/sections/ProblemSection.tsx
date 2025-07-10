import React from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

const ProblemSection: React.FC = () => {
  const painPoints = [
    "Grid actions that looked clickable but did nothing (pure frustration)",
    "Endless screens that buried simple tasks in complexity",
    "A system designed by people who never ran a distribution business",
    "Paying for software that actively worked against their workflow",
    "Hours of manual work that could be automated with basic scripts"
  ];

  return (
    <section className="py-16 bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Lightbulb className="h-8 w-8 text-red-600" />
            <span className="text-red-700 font-semibold">The Real Problem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            What They Were Actually Struggling With
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Their Daily Frustrations:</h3>
            {painPoints.map((pain, index) => (
              <motion.div 
                key={index} 
                initial={{
                  opacity: 0,
                  y: 20
                }} 
                whileInView={{
                  opacity: 1,
                  y: 0
                }} 
                viewport={{
                  once: true
                }} 
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }} 
                className="flex items-start gap-4 bg-red-50 p-4 rounded-xl border border-red-200"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-800">{pain}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{
              opacity: 0,
              scale: 0.95
            }} 
            whileInView={{
              opacity: 1,
              scale: 1
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              duration: 0.8
            }} 
            className="relative"
          >
            <img 
              alt="Understanding actual workflow instead of forcing users to adapt" 
              src="/lovable-uploads/a0687cd1-40e1-44e6-8efc-5e6de58db84d.png" 
              className="w-full h-[300px] shadow-xl object-contain" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;