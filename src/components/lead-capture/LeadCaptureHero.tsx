
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap } from 'lucide-react';

const LeadCaptureHero: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
        <Zap className="w-4 h-4" />
        Limited Time Offer
      </div>
      
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        Transform Your Website Into a 
        <span className="text-blue-600"> Lead Generation Machine</span>
      </h1>
      
      <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
        Get a comprehensive UX audit + conversion optimization strategy that typically 
        increases leads by 40-150%. Normally $2,000 - yours free for the next 72 hours.
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        {[
          "Complete UX Analysis",
          "Conversion Bottleneck ID", 
          "Action Plan Included"
        ].map((benefit, index) => (
          <div key={index} className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-gray-700 font-medium">{benefit}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LeadCaptureHero;
