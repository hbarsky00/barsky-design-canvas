
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Users, Zap } from 'lucide-react';

const WorkingWithMe: React.FC = () => {
  const benefits = [
    {
      icon: Zap,
      title: "AI-Enhanced Solutions",
      description: "Leverage cutting-edge AI to create smarter, more efficient user experiences"
    },
    {
      icon: Clock,
      title: "Rapid Delivery",
      description: "Fast turnaround times without compromising on quality or attention to detail"
    },
    {
      icon: Users,
      title: "Collaborative Approach", 
      description: "Work closely with your team to ensure designs align with business goals"
    },
    {
      icon: CheckCircle,
      title: "Results-Driven",
      description: "Focus on measurable outcomes like conversion improvements and user engagement"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mb-16"
    >
      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 font-display">Working With Me</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default WorkingWithMe;
