import React from "react";
import { motion } from "framer-motion";
import { Code, Zap, Shield, Monitor } from "lucide-react";
import { TechnicalImplementation } from "@/data/structuredCaseStudies";

interface TechnicalImplementationSectionProps {
  implementation: TechnicalImplementation;
}

const TechnicalImplementationSection: React.FC<TechnicalImplementationSectionProps> = ({ 
  implementation 
}) => {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-slate-300 mb-4">
            TECHNICAL IMPLEMENTATION
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Actually Works
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            The technical challenges, solutions, and standards that made this project successful.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Challenges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/50 rounded-lg p-6"
          >
            <div className="flex items-center mb-4">
              <Code className="w-6 h-6 text-red-400 mr-3" />
              <h3 className="text-xl font-bold">Technical Challenges</h3>
            </div>
            <ul className="space-y-3">
              {implementation.challenges.map((challenge, index) => (
                <li key={index} className="text-slate-300 flex items-start">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  {challenge}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/50 rounded-lg p-6"
          >
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-bold">Solutions Implemented</h3>
            </div>
            <ul className="space-y-3">
              {implementation.solutions.map((solution, index) => (
                <li key={index} className="text-slate-300 flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  {solution}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 rounded-lg p-6"
          >
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-bold">Accessibility Standards</h3>
            </div>
            <ul className="space-y-3">
              {implementation.accessibility.map((item, index) => (
                <li key={index} className="text-slate-300 flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-slate-800/50 rounded-lg p-6"
          >
            <div className="flex items-center mb-4">
              <Monitor className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-bold">Performance Metrics</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-400 mb-1">Load Time</div>
                <div className="text-slate-300">{implementation.performance.loadTime}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Mobile Optimization</div>
                <div className="text-slate-300">{implementation.performance.mobileOptimization}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Browser Support</div>
                <div className="text-slate-300">{implementation.performance.browserSupport}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalImplementationSection;