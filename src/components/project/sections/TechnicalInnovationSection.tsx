import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import MaximizableImage from "../MaximizableImage";

const TechnicalInnovationSection: React.FC = () => {
  const results = [
    "70% reduction in manual data entry through intelligent automation",
    "Eliminated daily frustration with unclickable interface elements",
    "Custom solution more cost-effective than existing platform",
    "Ongoing partnership based on trust and delivered results"
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <TrendingUp className="h-8 w-8 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Technical Innovation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            AI Didn't Replace My Skills - It Amplified Them
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Now I can take a project from user research through final deployment, creating solutions that actually work for real businesses.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{
              opacity: 0,
              x: -50
            }} 
            whileInView={{
              opacity: 1,
              x: 0
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              duration: 0.8
            }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Results That Matter:</h3>
              {results.map((result, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-gray-700">{result}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{
              opacity: 0,
              x: 50
            }} 
            whileInView={{
              opacity: 1,
              x: 0
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
          >
            <MaximizableImage
              src="/lovable-uploads/656c0433-9b6b-4a41-9c08-90b154ee0f32.png" 
              alt="Comprehensive System Architecture: Five Core Modules for distribution management" 
              className="w-full h-auto object-contain shadow-2xl rounded-lg shadow-elevated glass-card layered-depth" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalInnovationSection;