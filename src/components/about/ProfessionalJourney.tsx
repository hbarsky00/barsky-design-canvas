
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ProfessionalJourney: React.FC = () => {
  const milestones = [
    {
      year: "2023-Present",
      title: "Gen AI Integration Specialist",
      description: "Leading AI-enhanced product designs for startups and enterprises"
    },
    {
      year: "2020-2023", 
      title: "Senior Product Designer",
      description: "Focused on conversion optimization and accessibility compliance"
    },
    {
      year: "2015-2020",
      title: "UX Designer & Researcher", 
      description: "Conducted user research and designed digital experiences"
    },
    {
      year: "2009-2015",
      title: "Digital Designer",
      description: "Started journey in web design and user interface development"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-16"
    >
      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Professional Journey</h2>
        
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-6">
              <div className="w-4 h-4 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="text-sm text-blue-600 font-medium mb-1">{milestone.year}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                <p className="text-gray-700">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProfessionalJourney;
