import React from "react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";

const ProcessFlowSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Code className="h-8 w-8 text-blue-600" />
            <span className="text-blue-700 font-semibold">Process Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            AI-Enhanced Development Workflow
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            From human conversation to deployed solution - how AI amplifies every step of the development process.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
        >
          <img 
            src="/lovable-uploads/3b9c3f8c-f435-4a25-94fe-f760ae0f4af1.png" 
            alt="AI-enhanced development workflow from conversation to deployment" 
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessFlowSection;