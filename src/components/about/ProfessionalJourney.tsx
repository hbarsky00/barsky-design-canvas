
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { workHistory } from '@/data/workHistory';

const ProfessionalJourney: React.FC = () => {
  // Derived from src/data/workHistory.ts rather than a third hand-kept copy.
  // `detail` is the long form where a role has one; otherwise the same one-liner
  // the homepage timeline shows.
  const milestones = workHistory.map(r => ({
    year: r.duration,
    title: `${r.role} - ${r.company}`,
    description: r.detail ?? r.blurb
  }));

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-16"
    >
      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 font-display">Professional Journey</h2>
        
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-6">
              <div className="w-4 h-4 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="text-sm text-blue-600 font-medium mb-1">{milestone.year}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">{milestone.title}</h3>
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
